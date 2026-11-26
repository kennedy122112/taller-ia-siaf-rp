import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { UiKitFichaComponent } from './ui-kit-ficha.component';
import { MANIFIESTO_UI_KIT } from './ui-kit.manifest';
import { FichaVista, agrupar } from './ui-kit.vista';

describe('UiKitFichaComponent — página de un componente', () => {
  let fixture: ComponentFixture<UiKitFichaComponent>;
  const fichas = agrupar(MANIFIESTO_UI_KIT).flatMap((g) => g.fichas);
  const de = (selector: string): FichaVista => fichas.find((f) => f.selector === selector)!;
  const el = (): HTMLElement => fixture.nativeElement;
  const seccion = (id: string): HTMLElement | null => el().querySelector<HTMLElement>(`[data-ficha-seccion="${id}"]`);

  const montar = async (selector: string, cambios: Partial<FichaVista> = {}): Promise<void> => {
    fixture = TestBed.createComponent(UiKitFichaComponent);
    fixture.componentRef.setInput('datos', { ...de(selector), ...cambios });
    fixture.detectChanges();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiKitFichaComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('la cabecera lleva la categoría, el nombre, el selector, la capa, la API en números y el enlace al Figma', async () => {
    await montar('siaf-tabs');
    const cabecera = el().querySelector<HTMLElement>('[data-ficha-cabecera]')!;
    expect(cabecera.textContent).toContain('Componentes · Navegación');
    expect(cabecera.querySelector('h1')?.textContent?.trim()).toBe('Tabs');
    const chips = cabecera.querySelector('[data-ficha-chips]')!.textContent!.replace(/\s+/g, ' ');
    expect(chips).toContain('siaf-tabs');
    expect(chips).toContain('Design system');
    expect(chips).toContain(`${de('siaf-tabs').entradas.length} entradas · ${de('siaf-tabs').eventos.length} eventos`);
    const figma = cabecera.querySelector<HTMLAnchorElement>('[data-ficha-figma] a')!;
    expect(figma.href).toBe('https://www.figma.com/design/mJrG11d0rWf7BjPuE2ApPZ/?node-id=2588-135');
    expect(figma.target).toBe('_blank');
    expect(figma.rel).toContain('noopener');
  });

  it('las secciones van en el orden del sitio del design system, y «En esta página» las enlaza', async () => {
    await montar('siaf-button');
    const ids = Array.from(el().querySelectorAll('[data-ficha-seccion]')).map((s) => s.getAttribute('data-ficha-seccion'));
    expect(ids).toEqual(['uso', 'playground', 'implementacion', 'api', 'tokens', 'composicion', 'accesibilidad']);
    const enlaces = Array.from(el().querySelectorAll<HTMLAnchorElement>('[data-ficha-indice] a'));
    expect(enlaces.map((a) => a.textContent?.trim())).toEqual(['Uso', 'Playground', 'Implementación', 'API', 'Tokens', 'Composición', 'Accesibilidad']);
    expect(enlaces[0].getAttribute('href')).toBe('/ui-kit/componentes/siaf-button#siaf-button-uso');
    expect(el().querySelector('#siaf-button-uso')?.tagName).toBe('H2');
  });

  it('sin playground (un modal, que se abre sobre toda la página) la sección y su enlace no aparecen', async () => {
    await montar('siaf-modal');
    expect(seccion('playground')).toBeNull();
    expect(el().querySelector('[data-ficha-indice]')?.textContent).not.toContain('Playground');
  });

  it('Uso: el ejemplo en vivo y cuándo usarlo y cuándo no', async () => {
    await montar('siaf-tabs');
    expect(seccion('uso')?.querySelector('[data-ficha-ejemplo]')?.children.length).toBeGreaterThan(0);
    expect(seccion('uso')?.querySelector('[data-ficha-usar]')?.textContent).toContain('Para alternar entre vistas');
    expect(seccion('uso')?.querySelector('[data-ficha-evitar]')?.textContent).toContain('Pestañas anidadas');
  });

  it('la cabecera enlaza al patrón WAI-ARIA y a la ficha en Markdown; una pieza del kit no enlaza a su código, que está en el paquete', async () => {
    await montar('siaf-tabs');
    const aria = el().querySelector<HTMLAnchorElement>('[data-ficha-wai-aria] a')!;
    expect(aria.textContent).toContain('WAI-ARIA: Pestañas');
    expect(aria.href).toBe('https://www.w3.org/WAI/ARIA/apg/patterns/tabs/');
    expect(el().querySelector('[data-ficha-codigo-fuente]')).toBeNull();
    expect(el().querySelector('[data-ficha-markdown] a')?.getAttribute('href')).toBe('/ui-kit/componentes/siaf-tabs.md');
    expect(el().querySelector('[data-ficha-editar]')).toBeNull();
    expect(el().querySelector('[data-ficha-origen]')?.textContent).toContain('paquete del kit');
  });

  it('Uso muestra las limitaciones y «Así no / así sí» del JSDoc', async () => {
    await montar('siaf-button');
    expect(seccion('uso')?.querySelector('[data-ficha-limitaciones]')?.textContent).toContain('No hay tamaño lg ni variante danger');
    const comparacion = seccion('uso')!.querySelector('[data-ficha-asi-no-asi-si]')!;
    expect(comparacion.querySelector('[data-incorrecto]')?.textContent).toContain('variant="danger"');
    expect(comparacion.querySelector('[data-correcto]')?.textContent).toContain('variant="filled"');
  });

  it('sin limitaciones ni comparación, esos bloques no aparecen', async () => {
    await montar('siaf-tabs');
    expect(el().querySelector('[data-ficha-limitaciones]')).toBeNull();
    expect(el().querySelector('[data-ficha-asi-no-asi-si]')).toBeNull();
  });

  it('Uso sin guía avisa cómo documentarla', async () => {
    await montar('siaf-records-tabs', { bloquesUsar: [], bloquesEvitar: [] });
    expect(seccion('uso')?.querySelector('message-box')?.textContent).toContain('@usar');
  });

  it('todas las fichas visibles tienen guía de uso, teclado y accesibilidad con criterios WCAG', () => {
    const incompletas = fichas
      .filter((f) => !f.bloquesUsar.length || !f.bloquesEvitar.length || !f.bloquesTeclado.length || !/\d\.\d+\.\d+ /.test(f.accesibilidad ?? ''))
      .map((f) => f.selector);
    expect(incompletas).toEqual([]);
  });

  it('Implementación: el import y la etiqueta, cada uno con su archivo para copiar', async () => {
    await montar('siaf-tabs');
    const bloques = Array.from(seccion('implementacion')!.querySelectorAll('siaf-ui-kit-codigo'));
    expect(bloques.map((b) => b.textContent)).toEqual([jasmine.stringContaining('componente.ts'), jasmine.stringContaining('componente.html')]);
    expect(seccion('implementacion')?.textContent).toContain('import { TabsComponent }');
  });

  it('API: tabla de entradas y de eventos', async () => {
    await montar('siaf-tabs');
    const entradas = seccion('api')!.querySelector('[data-ficha-entradas] tbody')!;
    expect(entradas.querySelectorAll('tr').length).toBe(de('siaf-tabs').entradas.length);
    expect(entradas.textContent).toContain('idBase');
    expect(seccion('api')?.querySelector('[data-ficha-eventos]')?.textContent).toContain('(activeIdChange)');
  });

  it('Tokens: una muestra en vivo por token, que sigue el tema activo', async () => {
    await montar('siaf-tabs');
    expect(el().querySelectorAll('[data-token-usado]').length).toBe(de('siaf-tabs').tokens.length);
    const muestra = el().querySelector<HTMLElement>('[data-token-usado="--sys-color-divider-strong"] span')!;
    expect(muestra.style.backgroundColor).toBe('var(--sys-color-divider-strong)');
  });

  it('Composición: lo que pinta y «Lo usan», con enlaces a sus páginas', async () => {
    await montar('siaf-tabs');
    expect(seccion('composicion')?.querySelector('[data-ficha-usa] a')?.getAttribute('href')).toBe('/ui-kit/componentes/siaf-badge');
    const loUsan = seccion('composicion')!.querySelector<HTMLElement>('[data-ficha-lo-usan]')!;
    expect(loUsan.querySelector('h3')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Lo usan · 3');
    expect(Array.from(loUsan.querySelectorAll('a')).map((a) => [a.textContent?.trim(), a.getAttribute('href')])).toEqual([
      ['siaf-detail-history-tabs', '/ui-kit/componentes/siaf-detail-history-tabs'],
      ['siaf-query-report-page', '/ui-kit/componentes/siaf-query-report-page'],
      ['siaf-records-tabs', '/ui-kit/componentes/siaf-records-tabs'],
    ]);
    expect(loUsan.querySelector('[data-lo-usan-nota]')?.textContent).toContain('las pantallas que lo usan no aparecen');
  });

  it('«Lo usan»: un componente oculto del catálogo va sin enlace, y sin usuarios explica quién lo usa', async () => {
    await montar('siaf-tabs', { usadoPor: [{ selector: 'siaf-app-shell', nombre: 'siaf-app-shell', id: 'siaf-app-shell', enCatalogo: false }] });
    const oculto = el().querySelector<HTMLElement>('[data-ficha-lo-usan] li')!;
    expect(oculto.textContent?.trim()).toBe('siaf-app-shell');
    expect(oculto.querySelector('a')).toBeNull();

    fixture.destroy();
    await montar('siaf-tabs', { usadoPor: [], sinUso: false });
    expect(el().querySelector('[data-ficha-lo-usan]')?.textContent).toContain('lo usan directamente las pantallas');

    fixture.destroy();
    await montar('siaf-tabs', { usadoPor: [], sinUso: true });
    expect(el().querySelector('[data-ficha-lo-usan]')?.textContent).toContain('ninguna pantalla lo usa todavía');
  });

  it('un código de la descripción que nombra otra ficha enlaza a su página', async () => {
    await montar('siaf-form-table-search');
    const enlace = el().querySelector<HTMLAnchorElement>('a[data-enlace-ficha][href="/ui-kit/componentes/siaf-records-search-toolbar"]');
    expect(enlace).withContext('la descripción del buscador enlaza a su variante').not.toBeNull();
  });

  it('Accesibilidad: roles y ARIA del código, teclado y notas del JSDoc', async () => {
    await montar('siaf-tabs');
    const aria = el().querySelector('[data-ficha-aria]')!.textContent!;
    expect(aria).toContain('role="tablist"');
    expect(aria).toContain('aria-selected');
    expect(el().querySelector('[data-ficha-teclado]')?.textContent).toContain('Inicio / Fin');
    expect(el().querySelector('[data-ficha-notas]')?.textContent).toContain('idBase');
  });

  it('el texto con código no deja espacio antes de la puntuación', async () => {
    await montar('siaf-tabs');
    expect(el().querySelector('[data-ficha-teclado] li')?.textContent).toMatch(/^Tab: entra/);
  });
});
