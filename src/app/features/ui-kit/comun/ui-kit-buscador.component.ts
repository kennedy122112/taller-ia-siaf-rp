import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, inject, input, output, signal, untracked } from '@angular/core';
import { Router } from '@angular/router';

import { FocoDirective, IconComponent } from '@kennedy122112/siaf-rp-ui-angular';

/** El texto de un `<input>` desde su evento (el kit no exporta `valorDeEvento`). */
function valorDeEvento(evento: Event): string {
  const objetivo = evento.target;
  return objetivo instanceof HTMLInputElement ? objetivo.value : '';
}
import { ResultadoBusqueda, TipoResultado, buscarEnCatalogo } from '../ui-kit.busqueda';

const ICONO: Record<TipoResultado, string> = {
  pagina: 'menu_book',
  fundamento: 'palette',
  componente: 'widgets',
  entrada: 'input',
  evento: 'bolt',
};

/**
 * Búsqueda global del catálogo, como la de la documentación de Material UI: se abre con Ctrl+K (⌘K en Mac) o desde el
 * encabezado y busca páginas, fundamentos, componentes y sus propiedades y eventos. Las flechas recorren los resultados,
 * Enter abre el elegido y Escape cierra. Es un combobox con su lista (`aria-activedescendant`) dentro de un diálogo
 * modal con `siafFoco`.
 */
@Component({
  selector: 'siaf-ui-kit-buscador',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FocoDirective, IconComponent],
  template: `
    @if (abierto()) {
      <div class="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[10vh]" data-capa-cierre (mousedown)="alPulsarFondo($event)">
        <div
          class="flex max-h-[70vh] w-full max-w-[600px] flex-col overflow-hidden rounded-siaf-lg border border-border bg-surface shadow-siaf-lg"
          role="dialog"
          aria-modal="true"
          aria-label="Buscar en el catálogo"
          [siafFoco]="abierto()"
          (siafFocoEscape)="cerrar.emit()"
          data-ui-kit-buscador-dialogo
        >
          <div class="flex items-center gap-3 border-b border-border px-4">
            <siaf-icon class="shrink-0 text-text-muted" name="search" [size]="20" />
            <input
              class="h-14 min-w-0 flex-1 bg-transparent text-base text-text placeholder:text-text-muted focus:outline-none"
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-controls="ui-kit-buscador-resultados"
              [attr.aria-expanded]="resultados().length > 0"
              [attr.aria-activedescendant]="resultados().length ? 'ui-kit-resultado-' + activo() : null"
              aria-label="Buscar páginas, componentes y propiedades"
              placeholder="Buscar páginas, componentes y propiedades…"
              autocomplete="off"
              spellcheck="false"
              data-foco-inicial
              [value]="consulta()"
              (input)="buscar(valorDeEvento($event))"
              (keydown)="alTeclear($event)"
            />
            <kbd class="hidden shrink-0 rounded-siaf-sm border border-border px-1.5 py-0.5 font-mono text-[11px] text-text-muted sm:inline">Esc</kbd>
          </div>
          <ul class="min-h-0 flex-1 overflow-y-auto p-2" id="ui-kit-buscador-resultados" role="listbox" aria-label="Resultados">
            @for (r of resultados(); track $index; let i = $index) {
              <!-- Patrón combobox: el foco se queda en el campo y el teclado recorre las opciones con aria-activedescendant
                   (flechas y Enter en alTeclear), así que las opciones no reciben foco ni teclas propias. -->
              <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
              <li
                class="flex cursor-pointer items-center gap-3 rounded-siaf-md px-3 py-2"
                [class.bg-bg-states-light-selected]="i === activo()"
                role="option"
                [id]="'ui-kit-resultado-' + i"
                [attr.aria-selected]="i === activo()"
                [attr.data-resultado]="r.tipo"
                (mousemove)="activo.set(i)"
                (mousedown)="$event.preventDefault()"
                (click)="abrir(r)"
              >
                <siaf-icon class="shrink-0 text-text-muted" [name]="icono[r.tipo]" [size]="20" />
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-sm font-medium text-text" [class.font-mono]="r.tipo === 'entrada' || r.tipo === 'evento'">{{ r.titulo }}</span>
                  <span class="block truncate text-xs text-text-muted">{{ r.detalle }}</span>
                </span>
                @if (i === activo()) {
                  <siaf-icon class="shrink-0 text-text-muted" name="keyboard_return" [size]="16" />
                }
              </li>
            } @empty {
              <li class="px-3 py-8 text-center text-sm text-text-muted" role="presentation">Nada coincide con «{{ consulta() }}».</li>
            }
          </ul>
          <p class="border-t border-border px-4 py-2 text-xs text-text-muted" aria-hidden="true">↑ ↓ para moverte · Enter para abrir · Esc para cerrar</p>
        </div>
      </div>
    }
  `,
})
export class UiKitBuscadorComponent {
  private readonly router = inject(Router);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly valorDeEvento = valorDeEvento;

  readonly abierto = input(false);
  readonly cerrar = output<void>();

  protected readonly icono = ICONO;
  readonly consulta = signal('');
  readonly activo = signal(0);
  readonly resultados = computed(() => buscarEnCatalogo(this.consulta()));

  constructor() {
    // Cada vez que se abre, empieza vacío.
    effect(() => {
      if (this.abierto()) untracked(() => this.buscar(''));
    });
  }

  buscar(texto: string): void {
    this.consulta.set(texto);
    this.activo.set(0);
  }

  alTeclear(evento: KeyboardEvent): void {
    const total = this.resultados().length;
    if (evento.key === 'ArrowDown' || evento.key === 'ArrowUp') {
      evento.preventDefault();
      if (!total) return;
      const paso = evento.key === 'ArrowDown' ? 1 : -1;
      this.activo.set((this.activo() + paso + total) % total);
      this.mostrarActivo();
    } else if (evento.key === 'Enter') {
      evento.preventDefault();
      const elegido = this.resultados()[this.activo()];
      if (elegido) this.abrir(elegido);
    }
  }

  abrir(r: ResultadoBusqueda): void {
    this.cerrar.emit();
    void this.router.navigate([r.ruta], { fragment: r.fragmento ?? undefined });
  }

  /** Pulsar fuera del diálogo lo cierra. */
  alPulsarFondo(evento: MouseEvent): void {
    if (evento.target === evento.currentTarget) this.cerrar.emit();
  }

  private mostrarActivo(): void {
    requestAnimationFrame(() => this.host.nativeElement.querySelector(`#ui-kit-resultado-${this.activo()}`)?.scrollIntoView({ block: 'nearest' }));
  }
}
