import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  DestroyRef,
  ViewContainerRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  reflectComponentType,
  signal,
  untracked,
  viewChild,
} from '@angular/core';

import { CheckboxComponent, MessageBoxComponent, TextFieldComponent, TextFieldOption, textoDeCampo } from '@kennedy122112/siaf-rp-ui-angular';
import { UiKitCodigoComponent } from './ui-kit-codigo.component';
import { CARGADORES_UI_KIT } from './ui-kit.cargadores';
import { ControlPlayground, ValorControl, configDe, controlesDe, fijasDe, htmlDelPlayground, seFija, tsDelPlayground, valorDelEnlace, valoresActuales } from './ui-kit.playground';
import { FichaVista } from './ui-kit.vista';

/** Cuántos eventos recientes se muestran debajo del componente. */
const EVENTOS_VISIBLES = 5;

/**
 * Playground de una ficha: pinta el componente real (cargado en diferido desde `ui-kit.cargadores.ts`) con un control
 * por cada entrada de texto, número, booleano u opciones, y el código que resulta de lo elegido. Los eventos que emite
 * aparecen debajo. Qué componentes lo tienen y qué controles muestran lo elige `ui-kit.playground-config.ts`; el código
 * es un componente standalone y su plantilla, para pegar en una pantalla del proyecto.
 */
@Component({
  selector: 'siaf-ui-kit-playground',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent, MessageBoxComponent, TextFieldComponent, UiKitCodigoComponent],
  host: { class: 'block min-w-0' },
  template: `
    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div class="min-w-0 space-y-4">
        <div class="flex min-h-[180px] items-center justify-center overflow-auto rounded-siaf-lg bg-bg-surfaces-surface-low p-6" data-playground-lienzo>
          <div class="min-w-0 max-w-full" [class.w-full]="anchoCompleto()">
            <ng-container #lienzo />
          </div>
          @if (estado() === 'cargando') {
            <p class="text-sm text-text-muted">Cargando el componente…</p>
          }
        </div>
        @if (estado() === 'error') {
          <message-box text="No se pudo pintar el componente con estos valores: revisa la consola del navegador." />
        }
        @if (eventos().length) {
          <div class="rounded-siaf-md border border-border px-4 py-3" data-playground-eventos>
            <p class="text-[11px] font-bold uppercase tracking-widest text-text-muted">Eventos</p>
            <ul class="mt-2 space-y-1 font-mono text-[12px] text-text">
              @for (ev of eventos(); track $index) {
                <li class="truncate">{{ ev }}</li>
              }
            </ul>
          </div>
        }
      </div>

      <form class="flex min-w-0 flex-col gap-6" aria-label="Controles del playground" (submit)="$event.preventDefault()" data-playground-controles>
        @for (c of controles(); track c.nombre) {
          @switch (c.tipo) {
            @case ('booleano') {
              <siaf-checkbox [label]="c.etiqueta" [checked]="valor(c) === true" (checkedChange)="cambiar(c, $event)" />
            }
            @case ('opciones') {
              <siaf-input
                type="select"
                [label]="c.etiqueta"
                [options]="opcionesDe(c)"
                [value]="texto(c)"
                [autoSuccess]="false"
                (valueChange)="cambiar(c, textoDeCampo($event) || null)"
              />
            }
            @case ('numero') {
              <siaf-input type="number" [label]="c.etiqueta" [value]="texto(c)" [autoSuccess]="false" (valueChange)="cambiarNumero(c, $event)" />
            }
            @default {
              <siaf-input [label]="c.etiqueta" [value]="texto(c)" [autoSuccess]="false" (valueChange)="cambiar(c, textoDeCampo($event))" />
            }
          }
        }
      </form>
    </div>
    <!-- El código para pegar, a todo el ancho: primero la plantilla, que es lo que cambia con los controles. -->
    <div class="mt-6 grid gap-4">
      <siaf-ui-kit-codigo archivo="ejemplo.component.html" [codigo]="html()" />
      <siaf-ui-kit-codigo archivo="ejemplo.component.ts" [codigo]="ts()" />
    </div>
  `,
})
export class UiKitPlaygroundComponent {
  protected readonly textoDeCampo = textoDeCampo;
  private readonly documento = inject(DOCUMENT);
  private readonly lienzo = viewChild.required('lienzo', { read: ViewContainerRef });

  readonly ficha = input.required<FichaVista>();
  readonly controles = computed(() => controlesDe(this.ficha()));
  /** El divisor ocupa todo el ancho del lienzo; los demás van centrados con su ancho propio. */
  readonly anchoCompleto = computed(() => this.ficha().selector === 'siaf-divider');
  /** Lo que el usuario cambió; lo demás sigue en su valor inicial. */
  readonly valores = signal<Record<string, ValorControl>>({});
  /** El código para pegar en una pantalla del proyecto: el componente y su plantilla. */
  readonly ts = computed(() => tsDelPlayground(this.ficha()));
  readonly html = computed(() => htmlDelPlayground(this.ficha(), this.controles(), this.valores()));
  readonly estado = signal<'cargando' | 'listo' | 'error'>('cargando');
  readonly eventos = signal<string[]>([]);

  private ref: ComponentRef<unknown> | null = null;
  /** La ficha se puede cerrar mientras el componente todavía se carga: entonces no se pinta. */
  private destruido = false;
  private texto_: Text | null = null;
  private readonly suscripciones: { unsubscribe(): void }[] = [];

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      this.destruido = true;
      this.suscripciones.forEach((s) => s.unsubscribe());
    });
    afterNextRender(() => void this.cargar());
    // Cada cambio llega al componente con setInput; el contenido proyectado se cambia en su nodo de texto.
    effect(() => {
      const valores = this.valores();
      untracked(() => this.aplicar(valores));
    });
  }

  valor(c: ControlPlayground): ValorControl {
    return c.nombre in this.valores() ? this.valores()[c.nombre] : c.inicial;
  }

  texto(c: ControlPlayground): string {
    const v = this.valor(c);
    return v === null ? '' : String(v);
  }

  opcionesDe(c: ControlPlayground): TextFieldOption[] {
    return c.opciones.map((o) => ({ value: o, label: o === '' ? '(vacío)' : o }));
  }

  cambiar(c: ControlPlayground, valor: ValorControl): void {
    this.valores.update((v) => ({ ...v, [c.nombre]: valor }));
  }

  cambiarNumero(c: ControlPlayground, valor: string | number | string[]): void {
    const n = Number(valor);
    this.cambiar(c, valor === '' || !Number.isFinite(n) ? c.inicial : n);
  }

  private async cargar(): Promise<void> {
    const f = this.ficha();
    try {
      const tipo = await CARGADORES_UI_KIT[f.selector]();
      if (this.destruido) return;
      const contenido = this.controles().find((c) => c.contenido);
      this.texto_ = contenido ? this.documento.createTextNode(String(contenido.inicial ?? '')) : null;
      this.ref = this.lienzo().createComponent(tipo, { projectableNodes: this.texto_ ? [[this.texto_]] : undefined });
      this.escucharEventos(tipo);
      this.aplicar(this.valores(), true);
      this.estado.set('listo');
    } catch (error) {
      console.error(`Playground de ${f.selector}:`, error);
      this.estado.set('error');
    }
  }

  /**
   * Pasa al componente los valores fijados: al crearlo, las listas de muestra, las entradas fijas y el valor del enlace;
   * siempre, los controles obligatorios o distintos del valor por defecto, y el texto proyectado.
   */
  private aplicar(cambios: Record<string, ValorControl>, inicio = false): void {
    const ref = this.ref;
    if (!ref) return;
    const f = this.ficha();
    const config = configDe(f);
    try {
      const valores = valoresActuales(this.controles(), cambios);
      if (inicio) {
        for (const [nombre, dato] of Object.entries(config?.datos ?? {})) ref.setInput(nombre, dato.valor);
        if (config?.enlace) ref.setInput(config.enlace.entrada, valorDelEnlace(f) ?? undefined);
      }
      for (const [nombre, valor] of Object.entries(fijasDe(f, valores))) ref.setInput(nombre, valor ?? undefined);
      for (const c of this.controles()) {
        const v = valores[c.nombre];
        if (c.contenido) {
          if (this.texto_) this.texto_.data = String(v ?? '');
        } else if (seFija(c, v) || (!inicio && c.nombre in cambios)) {
          ref.setInput(c.nombre, v ?? undefined);
        }
      }
      ref.changeDetectorRef.detectChanges();
    } catch (error) {
      console.error(`Playground de ${f.selector}:`, error);
      this.estado.set('error');
    }
  }

  private escucharEventos(tipo: Parameters<typeof reflectComponentType>[0]): void {
    const salidas = reflectComponentType(tipo)?.outputs ?? [];
    // EventEmitter, output() y model() aceptan una función: los dos últimos no aceptan un observador.
    const instancia = this.ref?.instance as Record<string, { subscribe?: (fn: (valor: unknown) => void) => { unsubscribe(): void } } | undefined>;
    for (const salida of salidas) {
      const emisor = instancia[salida.propName];
      if (typeof emisor?.subscribe !== 'function') continue;
      this.suscripciones.push(
        emisor.subscribe((valor) => this.eventos.update((lista) => [`(${salida.templateName}) ${resumir(valor)}`, ...lista].slice(0, EVENTOS_VISIBLES))),
      );
    }
  }
}

/** El valor de un evento en una línea. */
function resumir(valor: unknown): string {
  if (valor === undefined) return '';
  if (valor instanceof Event) return valor.type;
  try {
    const texto = JSON.stringify(valor);
    return texto && texto.length > 80 ? `${texto.slice(0, 79)}…` : (texto ?? String(valor));
  } catch {
    return String(valor);
  }
}
