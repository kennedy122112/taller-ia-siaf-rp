import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { UiKitPlaygroundComponent } from './ui-kit-playground.component';
import { CARGADORES_UI_KIT } from './ui-kit.cargadores';
import { FICHAS_UI_KIT } from './ui-kit.datos';
import { MANIFIESTO_UI_KIT } from './ui-kit.manifest';
import { CONFIG_PLAYGROUND } from './ui-kit.playground-config';
import { ControlPlayground, ValorControl, controlesDe, htmlDelPlayground, literalTs, tienePlayground, tsDelPlayground } from './ui-kit.playground';
import { FichaVista } from './ui-kit.vista';

const de = (selector: string): FichaVista => FICHAS_UI_KIT.find((f) => f.selector === selector)!;

describe('Playground del catálogo: reglas', () => {
  it('el generador marca el control de cada entrada, también una unión detrás de un alias', () => {
    const snackbar = MANIFIESTO_UI_KIT.find((f) => f.selector === 'siaf-snackbar')!;
    const tono = snackbar.entradas.find((e) => e.nombre === 'tone')!;
    expect(tono.control).toBe('opciones');
    expect(tono.opciones).toEqual(['neutral', 'info', 'success', 'warning', 'error']);
    expect(snackbar.entradas.find((e) => e.nombre === 'message')?.control).toBe('texto');
    expect(MANIFIESTO_UI_KIT.find((f) => f.selector === 'siaf-tabs')!.entradas.find((e) => e.nombre === 'tabs')?.control).toBeUndefined();
  });

  it('la configuración solo nombra componentes que se cargan y entradas que existen', () => {
    for (const [selector, config] of Object.entries(CONFIG_PLAYGROUND)) {
      const f = de(selector);
      expect(f).withContext(selector).toBeDefined();
      expect(CARGADORES_UI_KIT[selector]).withContext(selector).toBeDefined();
      const nombres = f.entradas.map((e) => e.nombre);
      const usados = [...config.controles, ...Object.keys(config.valores ?? {}), ...Object.keys(config.datos ?? {})].filter((n) => n !== 'contenido');
      expect(usados.filter((n) => !nombres.includes(n))).withContext(selector).toEqual([]);
      // Un control es una entrada simple: texto, número, booleano u opciones.
      expect(config.controles.filter((c) => c !== 'contenido' && !f.entradas.find((e) => e.nombre === c)?.control && !config.tiposDeControl?.[c])).withContext(selector).toEqual([]);
    }
  });

  it('solo los componentes elegidos tienen playground', () => {
    expect(FICHAS_UI_KIT.filter(tienePlayground).map((f) => f.selector).sort()).toEqual(Object.keys(CONFIG_PLAYGROUND).sort());
    expect(tienePlayground(de('siaf-menu'))).toBeFalse();
    expect(tienePlayground(de('siaf-summary-card'))).toBeFalse();
  });

  it('el botón muestra solo lo que cambia su aspecto, con las tres variantes del Figma', () => {
    const controles = controlesDe(de('siaf-button'));
    expect(controles.map((c) => c.nombre)).toEqual(['contenido', 'variant', 'size', 'icon', 'iconPosition', 'iconOnly', 'disabled', 'loading']);
    expect(controles.find((c) => c.nombre === 'variant')?.opciones).toEqual(['filled', 'outline', 'text']);
  });

  it('la plantilla lleva solo lo que cambió, y un botón de solo ícono suma su ariaLabel', () => {
    const boton = de('siaf-button');
    const controles = controlesDe(boton);
    expect(htmlDelPlayground(boton, controles, {})).toBe('<siaf-button icon="save">Guardar</siaf-button>');
    expect(htmlDelPlayground(boton, controles, { variant: 'outline', disabled: true })).toBe('<siaf-button variant="outline" icon="save" [disabled]="true">Guardar</siaf-button>');
    expect(htmlDelPlayground(boton, controles, { icon: '', disabled: true })).toBe('<siaf-button [disabled]="true">Guardar</siaf-button>');
    expect(htmlDelPlayground(boton, controles, { iconOnly: true })).toBe('<siaf-button ariaLabel="Guardar" icon="save" [iconOnly]="true">Guardar</siaf-button>');
  });

  it('con datos y un valor que cambia: la lista como propiedad tipada y el valor en una señal', () => {
    const tabs = de('siaf-tabs');
    expect(htmlDelPlayground(tabs, controlesDe(tabs), {})).toBe(
      '<siaf-tabs\n  [tabs]="tabs"\n  [activeId]="pestana()"\n  (activeIdChange)="pestana.set($event)"\n  ariaLabel="Bandeja"\n/>',
    );
    const ts = tsDelPlayground(tabs);
    expect(ts).toContain("import { ChangeDetectionStrategy, Component, signal } from '@angular/core';");
    expect(ts).toContain("import { TabItem, TabsComponent } from '@kennedy122112/siaf-rp-ui-angular';");
    expect(ts).toContain('  imports: [TabsComponent],');
    expect(ts).toContain("  readonly tabs: TabItem[] = [\n    { id: 'documentos', label: 'Documentos', count: 12 },");
    expect(ts).toContain("  readonly pestana = signal('documentos');");
  });

  it('sin datos ni enlace, el componente queda vacío y sin signal', () => {
    const ts = tsDelPlayground(de('siaf-button'));
    expect(ts).toContain("import { ChangeDetectionStrategy, Component } from '@angular/core';");
    expect(ts).toContain('export class EjemploComponent {}');
  });

  it('el campo de texto tipa su señal con lo que emite', () => {
    expect(tsDelPlayground(de('siaf-input'))).toContain("readonly denominacion = signal<string | number | string[]>('');");
  });

  it('los literales salen con comillas simples y en varias líneas si no caben', () => {
    expect(literalTs({ label: "Ana's", n: 2, ok: true })).toBe("{ label: 'Ana\\'s', n: 2, ok: true }");
    expect(literalTs([1, 2])).toBe('[1, 2]');
  });
});

describe('UiKitPlaygroundComponent', () => {
  let fixture: ComponentFixture<UiKitPlaygroundComponent>;
  const el = (): HTMLElement => fixture.nativeElement;

  const montar = async (selector: string): Promise<void> => {
    fixture = TestBed.createComponent(UiKitPlaygroundComponent);
    fixture.componentRef.setInput('ficha', de(selector));
    fixture.detectChanges();
    // Carga diferida del componente: se espera al import y al pintado.
    for (let i = 0; i < 20 && fixture.componentInstance.estado() === 'cargando'; i++) {
      await new Promise((listo) => setTimeout(listo, 25));
      fixture.detectChanges();
    }
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [UiKitPlaygroundComponent], providers: [provideRouter([])] }).compileComponents();
  });

  it('pinta el componente real y un control por propiedad elegida', async () => {
    await montar('siaf-button');
    expect(fixture.componentInstance.estado()).toBe('listo');
    expect(el().querySelector<HTMLButtonElement>('[data-playground-lienzo] button')?.textContent).toContain('Guardar');
    expect(el().querySelectorAll('[data-playground-controles] siaf-input, [data-playground-controles] siaf-checkbox').length).toBe(controlesDe(de('siaf-button')).length);
  });

  it('cambiar un control llega al componente y a la plantilla copiable', async () => {
    await montar('siaf-button');
    const instancia = fixture.componentInstance;
    instancia.cambiar(instancia.controles().find((c) => c.nombre === 'disabled')!, true);
    instancia.cambiar(instancia.controles().find((c) => c.contenido)!, 'Registrar');
    fixture.detectChanges();
    await fixture.whenStable();
    const boton = el().querySelector<HTMLButtonElement>('[data-playground-lienzo] button')!;
    expect(boton.disabled).toBeTrue();
    expect(boton.textContent).toContain('Registrar');
    const bloques = Array.from(el().querySelectorAll('[data-ui-kit-codigo]')).map((b) => b.textContent);
    expect(bloques[0]).toBe('<siaf-button icon="save" [disabled]="true">Registrar</siaf-button>');
    expect(bloques[1]).toContain('export class EjemploComponent');
  });

  it('los eventos que emite el componente aparecen debajo', async () => {
    await montar('siaf-checkbox');
    el().querySelector<HTMLInputElement>('[data-playground-lienzo] input[type="checkbox"]')!.click();
    fixture.detectChanges();
    expect(el().querySelector('[data-playground-eventos]')?.textContent).toContain('(checkedChange) true');
  });

  // Cada propiedad del playground cambia el componente: si no, sobra (o le falta el valor del que depende).
  const ICONOS = ['icon', 'leadingIcon', 'actionIcon', 'name'];
  const otroValor = (c: ControlPlayground, actual: ValorControl): ValorControl => {
    switch (c.tipo) {
      case 'booleano':
        return !actual;
      case 'opciones':
        return c.opciones.find((o) => o !== actual) ?? actual;
      case 'numero':
        return (typeof actual === 'number' ? actual : 0) + 3;
      default:
        return ICONOS.includes(c.nombre) ? 'home' : 'Texto de prueba';
    }
  };
  for (const [selector, config] of Object.entries(CONFIG_PLAYGROUND)) {
    it(`${selector}: cada propiedad del playground cambia el componente`, async () => {
      await montar(selector);
      const instancia = fixture.componentInstance;
      const lienzo = (): string => el().querySelector('[data-playground-lienzo] > div')!.innerHTML;
      const sinEfecto: string[] = [];
      for (const nombre of config.controles) {
        const c = instancia.controles().find((x) => x.nombre === nombre)!;
        const antes = lienzo();
        const actual = instancia.valor(c);
        instancia.cambiar(c, otroValor(c, actual));
        fixture.detectChanges();
        await fixture.whenStable();
        if (lienzo() === antes) sinEfecto.push(nombre);
        instancia.cambiar(c, actual);
        fixture.detectChanges();
        await fixture.whenStable();
      }
      expect(sinEfecto.join(', ')).withContext(selector).toBe('');
    });
  }

  // Cada playground debe pintar su componente: sin error y con algo adentro.
  for (const selector of Object.keys(CONFIG_PLAYGROUND)) {
    it(`${selector} se pinta en su playground`, async () => {
      await montar(selector);
      expect(fixture.componentInstance.estado()).withContext(selector).toBe('listo');
      const host = el().querySelector<HTMLElement>('[data-playground-lienzo] > div > :not(ng-container)');
      expect(host).withContext(selector).not.toBeNull();
      expect(host!.childElementCount + (host!.textContent?.trim().length ?? 0)).withContext(`${selector} quedó vacío`).toBeGreaterThan(0);
    });
  }
});
