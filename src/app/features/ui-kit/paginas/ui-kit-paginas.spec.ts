import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { VERSION_KIT } from '../ui-kit.cargadores';
import { UI_KIT_ROUTES } from '../ui-kit.routes';

describe('Páginas del catálogo', () => {
  let harness: RouterTestingHarness;
  const texto = (): string => harness.routeNativeElement?.textContent?.replace(/\s+/g, ' ') ?? '';

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'ui-kit', children: UI_KIT_ROUTES }]), provideHttpClient(), provideHttpClientTesting()],
    });
    harness = await RouterTestingHarness.create();
  });

  it('la portada presenta el design system, sus accesos y cómo está construido', async () => {
    await harness.navigateByUrl('/ui-kit');
    expect(texto()).toContain('Diseña y construye con una sola fuente');
    expect(texto()).toContain('Cómo está construido');
    const accesos = Array.from(harness.routeNativeElement!.querySelectorAll('a[data-ui-kit-acceso]')).map((a) => a.getAttribute('href'));
    expect(accesos).toEqual(['/ui-kit/primeros-pasos/instalacion', '/ui-kit/fundamentos/color', '/ui-kit/componentes/siaf-button']);
    expect(harness.routeNativeElement!.querySelectorAll('a[data-ui-kit-categoria]').length).toBeGreaterThan(10);
    expect(TestBed.inject(Title).getTitle()).toBe('SIAF-RP Design System');
  });

  it('la página de un componente pinta su ficha, su título y las páginas vecinas', async () => {
    await harness.navigateByUrl('/ui-kit/componentes/siaf-button');
    harness.detectChanges();
    expect(harness.routeNativeElement!.querySelector('siaf-ui-kit-ficha h1')?.textContent?.trim()).toBe('Button');
    expect(TestBed.inject(Title).getTitle()).toBe('Button · SIAF-RP Design System');
    expect(harness.routeNativeElement!.querySelector('[data-vecina="anterior"]')?.getAttribute('href')).toBe('/ui-kit/componentes/siafTooltip');
    expect(harness.routeNativeElement!.querySelector('[data-vecina="siguiente"]')?.getAttribute('href')).toBe('/ui-kit/componentes/siaf-buttons-group');
  });

  it('una página de «Primeros pasos» pinta sus secciones con ancla, el índice «Contenido» y la siguiente', async () => {
    await harness.navigateByUrl('/ui-kit/primeros-pasos/instalacion');
    const raiz = harness.routeNativeElement!;
    expect(raiz.querySelector('h1')?.textContent?.trim()).toBe('Instalación');
    expect(Array.from(raiz.querySelectorAll('h2[data-ui-kit-titulo]')).map((h) => h.id)).toEqual(['paquete', 'instalar', 'estilos', 'tailwind', 'fuente', 'actualizar']);
    expect(raiz.querySelectorAll('[data-contenido]').length).toBe(6);
    expect(raiz.textContent).toContain(`siaf-rp-ui-angular-${VERSION_KIT}.tgz`);
    expect(raiz.querySelector('[data-vecina="siguiente"]')?.getAttribute('href')).toBe('/ui-kit/primeros-pasos/uso');
    expect(TestBed.inject(Title).getTitle()).toBe('Instalación · SIAF-RP Design System');
  });

  it('Versiones: la política, el soporte por versión y las migraciones con diffs', async () => {
    await harness.navigateByUrl('/ui-kit/primeros-pasos/versiones');
    const raiz = harness.routeNativeElement!;
    expect(Array.from(raiz.querySelectorAll('h2[data-ui-kit-titulo]')).map((h) => h.id)).toEqual(['actual', 'politica', 'retirar', 'soporte', 'de-0-3-a-0-4', 'de-0-2-a-0-3', 'de-0-1-a-0-3']);
    const diff = raiz.querySelector('[data-ui-kit-diff]')!;
    expect(diff.querySelector('[data-linea="quita"]')?.textContent).toContain('this.tabs().activeId;');
    expect(diff.querySelector('[data-linea="agrega"]')?.textContent).toContain('this.tabs().activeId();');
    expect(raiz.querySelector('[data-paso-seccion="soporte"]')?.textContent).toContain('kit/0.1.x');
    expect(raiz.querySelector<HTMLAnchorElement>('[data-editar-pagina]')?.href).toContain('/edit/main/src/app/features/ui-kit/primeros-pasos/primeros-pasos.ts');
  });

  it('Convenciones: «Así no / así sí» en colores, íconos, foco y formularios', async () => {
    await harness.navigateByUrl('/ui-kit/primeros-pasos/convenciones');
    const comparaciones = harness.routeNativeElement!.querySelectorAll('[data-ui-kit-comparacion]');
    expect(comparaciones.length).toBe(4);
    expect(comparaciones[0].querySelector('[data-incorrecto]')?.textContent).toContain('#4B4B4D');
    expect(comparaciones[0].querySelector('[data-correcto]')?.textContent).toContain('text-text-neutral-medium');
  });

  it('la ficha de un componente lleva el índice «Contenido» con sus secciones', async () => {
    await harness.navigateByUrl('/ui-kit/componentes/siaf-button');
    const textos = Array.from(harness.routeNativeElement!.querySelectorAll('[data-contenido]')).map((a) => a.textContent?.trim());
    expect(textos).toEqual(['Uso', 'Playground', 'Implementación', 'API', 'Tokens', 'Composición', 'Accesibilidad']);
  });

  it('una dirección con sección baja hasta ella', async () => {
    const desplazar = spyOn(Element.prototype, 'scrollIntoView');
    await harness.navigateByUrl('/ui-kit/componentes/siaf-button#siaf-button-api');
    for (let i = 0; i < 5 && !desplazar.calls.count(); i++) await new Promise((listo) => requestAnimationFrame(() => listo(null)));
    const objetivo = desplazar.calls.mostRecent()?.object as Element | undefined;
    expect(objetivo?.id).toBe('siaf-button-api');
  });

  it('un componente que no existe lo dice', async () => {
    await harness.navigateByUrl('/ui-kit/componentes/siaf-no-existe');
    expect(texto()).toContain('Componente no encontrado');
  });

  it('la página de un fundamento pinta su contenido y la siguiente', async () => {
    await harness.navigateByUrl('/ui-kit/fundamentos/color');
    expect(harness.routeNativeElement!.querySelector('h1')?.textContent?.trim()).toBe('Color');
    expect(harness.routeNativeElement!.querySelector('#color[data-fundamento]')).not.toBeNull();
    expect(harness.routeNativeElement!.querySelector('[data-vecina="siguiente"]')?.getAttribute('href')).toBe('/ui-kit/fundamentos/tipografia');
    expect(TestBed.inject(Title).getTitle()).toBe('Color · SIAF-RP Design System');
  });
});
