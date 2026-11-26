import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { COMPONENTES_EJEMPLO } from './ejemplos';
import { SECCIONES_FUNDAMENTOS } from './fundamentos/secciones';
import { UiKitComponent } from './ui-kit.component';
import { PRIMEROS_PASOS } from './primeros-pasos/primeros-pasos';
import { VERSION_KIT } from './ui-kit.cargadores';
import { FICHAS_UI_KIT } from './ui-kit.datos';

/** Clave del tema en localStorage (la del kit, que no la exporta). */
const CLAVE_TEMA = 'siaf-theme';
import { UI_KIT_ROUTES } from './ui-kit.routes';

describe('UiKitComponent (armazón del catálogo)', () => {
  let fixture: ComponentFixture<UiKitComponent>;
  let component: UiKitComponent;
  let temaPrevio: string | null;
  const el = (): HTMLElement => fixture.nativeElement;

  beforeEach(async () => {
    temaPrevio = localStorage.getItem(CLAVE_TEMA);
    localStorage.setItem(CLAVE_TEMA, 'light');
    await TestBed.configureTestingModule({
      imports: [UiKitComponent],
      providers: [provideRouter([{ path: 'ui-kit', children: UI_KIT_ROUTES }]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(UiKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (temaPrevio === null) localStorage.removeItem(CLAVE_TEMA);
    else localStorage.setItem(CLAVE_TEMA, temaPrevio);
    document.documentElement.setAttribute('data-theme', temaPrevio ?? 'light');
  });

  it('el menú lateral lleva Inicio, los primeros pasos, los fundamentos y un enlace por componente visible, agrupados por categoría', () => {
    const rutas = Array.from(el().querySelectorAll('[data-ui-kit-menu] a[data-ruta]')).map((a) => a.getAttribute('data-ruta'));
    expect(rutas.length).toBe(PRIMEROS_PASOS.length + SECCIONES_FUNDAMENTOS.length + FICHAS_UI_KIT.length);
    expect(rutas.slice(0, 4)).toEqual(['/ui-kit/primeros-pasos/instalacion', '/ui-kit/primeros-pasos/uso', '/ui-kit/primeros-pasos/convenciones', '/ui-kit/primeros-pasos/versiones']);
    expect(rutas[4]).toBe('/ui-kit/fundamentos/color');
    expect(rutas).toContain('/ui-kit/componentes/siaf-button');
    expect(el().querySelector('[data-ui-kit-menu] a')?.textContent?.trim()).toBe('Inicio');
    const grupos = Array.from(el().querySelectorAll('[data-ui-kit-grupo]')).map((g) => g.textContent?.trim().replace(/^\S+\s*/, ''));
    expect(grupos[0]).toBe('Primeros pasos');
    expect(grupos[1]).toBe('Fundamentos visuales');
    expect(grupos).toContain('Botones y acciones');
  });

  it('los componentes se nombran como en el sitio del design system, con el selector como título del enlace', () => {
    const boton = el().querySelector<HTMLAnchorElement>('a[data-ruta="/ui-kit/componentes/siaf-button"]')!;
    expect(boton.textContent?.trim()).toBe('Button');
    expect(boton.title).toBe('siaf-button');
    expect(boton.getAttribute('href')).toBe('/ui-kit/componentes/siaf-button');
  });

  it('el buscador filtra fundamentos y componentes, y sin resultados lo dice', () => {
    component.busqueda.set('sombras');
    fixture.detectChanges();
    expect(Array.from(el().querySelectorAll('a[data-ruta]')).map((a) => a.getAttribute('data-ruta'))).toContain('/ui-kit/fundamentos/sombras');

    component.busqueda.set('siaf-tabs');
    fixture.detectChanges();
    const rutas = Array.from(el().querySelectorAll('a[data-ruta]')).map((a) => a.getAttribute('data-ruta'));
    expect(rutas).toContain('/ui-kit/componentes/siaf-tabs');
    expect(rutas).not.toContain('/ui-kit/componentes/siaf-button');
    expect(rutas.some((r) => r?.includes('/fundamentos/') || r?.includes('/primeros-pasos/'))).toBeFalse();
    expect(el().querySelector('[data-ui-kit-buscador] [role="status"]')?.textContent).toContain(`${component.resultados()} resultados`);

    component.busqueda.set('zzz-no-existe');
    fixture.detectChanges();
    expect(el().querySelector('[data-ui-kit-menu]')?.textContent).toContain('Ningún fundamento ni componente coincide');
  });

  it('el pie de página da crédito a los autores', () => {
    const autores = el().querySelector('footer [data-ui-kit-autores]');
    expect(autores?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Creado por Brian Meneses y Adib Checori');
  });

  it('el encabezado muestra la versión del kit, el stack y la cantidad de componentes', () => {
    const version = el().querySelector('[data-ui-kit-version]')?.textContent ?? '';
    expect(version).toContain(`Kit ${VERSION_KIT}`);
    expect(version).toContain(`${FICHAS_UI_KIT.length} componentes`);
  });

  it('Ctrl+K y ⌘K abren y cierran la búsqueda global; también el botón del encabezado', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, cancelable: true }));
    fixture.detectChanges();
    expect(component.buscadorAbierto()).toBeTrue();
    expect(el().querySelector('[data-ui-kit-buscador-dialogo]')).not.toBeNull();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'K', metaKey: true, cancelable: true }));
    fixture.detectChanges();
    expect(component.buscadorAbierto()).toBeFalse();

    el().querySelector<HTMLButtonElement>('[data-ui-kit-abrir-buscador]')!.click();
    fixture.detectChanges();
    expect(component.buscadorAbierto()).toBeTrue();
  });

  it('el modo oscuro cambia data-theme y guarda la preferencia compartida con la app', () => {
    component.alternarTema();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem(CLAVE_TEMA)).toBe('dark');
    expect(component.logo()).toContain('white');
    component.alternarTema();
  });

  it('al navegar a otra página se cierra el menú del móvil', async () => {
    component.menuAbierto.set(true);
    await TestBed.inject(Router).navigateByUrl('/ui-kit/fundamentos/color');
    expect(component.menuAbierto()).toBeFalse();
  });
});

describe('UiKitComponent: enlaces de la página única de antes', () => {
  const abrir = async (url: string): Promise<string> => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'ui-kit', children: UI_KIT_ROUTES }]), provideHttpClient(), provideHttpClientTesting()],
    });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(url);
    // El armazón hace la redirección al crearse: se espera a que termine esa segunda navegación.
    await harness.fixture.whenStable();
    return TestBed.inject(Location).path();
  };

  it('/ui-kit#siaf-menu lleva a la página del componente', async () => {
    expect(await abrir('/ui-kit#siaf-menu')).toBe('/ui-kit/componentes/siaf-menu');
  });

  it('/ui-kit#color lleva a la página del fundamento', async () => {
    expect(await abrir('/ui-kit#color')).toBe('/ui-kit/fundamentos/color');
  });
});

describe('Ejemplos en vivo del ui-kit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
  });

  // Cada selector declarado debe tener su @case (si falta, el ejemplo sale vacío) y ninguno puede
  // tocar la red: /ui-kit no tiene sesión y un 401 manda al usuario al login. Se abren también
  // los paneles (botones `data-ui-kit-abrir`), que es cuando los historiales piden sus datos.
  // Van en el DOM para ver el foco: un ejemplo que se pinta abierto no puede quitárselo a la página
  // (el catálogo saltaba al ejemplo del popover al cargar).
  for (const componente of COMPONENTES_EJEMPLO) {
    for (const selector of componente.selectores) {
      it(`${componente.name} pinta ${selector} sin peticiones HTTP ni tomar el foco`, async () => {
        const fixture = TestBed.createComponent(componente);
        const el = fixture.nativeElement as HTMLElement;
        const enfocados: string[] = [];
        const alEnfocar = (evento: FocusEvent): void => {
          const destino = evento.target as HTMLElement;
          if (el.contains(destino)) enfocados.push(destino.getAttribute('aria-label') || destino.textContent?.trim() || destino.tagName);
        };
        document.body.appendChild(el);
        (document.activeElement as HTMLElement | null)?.blur();
        document.addEventListener('focusin', alEnfocar);
        try {
          fixture.componentRef.setInput('selector', selector);
          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();
          document.removeEventListener('focusin', alEnfocar);
          expect(el.children.length).withContext(selector).toBeGreaterThan(0);
          expect(enfocados).withContext(`${selector} tomó el foco al pintarse`).toEqual([]);
          el.querySelectorAll<HTMLElement>('[data-ui-kit-abrir] button').forEach((b) => b.click());
          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();
          TestBed.inject(HttpTestingController).verify();
        } finally {
          document.removeEventListener('focusin', alEnfocar);
          el.remove();
        }
      });
    }
  }
});
