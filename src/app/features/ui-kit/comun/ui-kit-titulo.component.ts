import { DOCUMENT, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, signal } from '@angular/core';

import { IconComponent } from '@kennedy122112/siaf-rp-ui-angular';

/**
 * Título de una sección del catálogo (un `h2` con su ancla) y, al pasar el mouse o enfocarlo, el botón «#» que copia el
 * enlace a esa sección, para compartirlo: `/ui-kit/componentes/siaf-tabs#siaf-tabs-api`.
 */
@Component({
  selector: 'siaf-ui-kit-titulo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  host: { class: 'block' },
  template: `
    <div class="group flex items-center gap-2">
      <h2 class="scroll-mt-20 text-2xl font-bold text-text" [id]="ancla()" data-ui-kit-titulo>{{ texto() }}</h2>
      <button
        class="inline-flex size-8 shrink-0 items-center justify-center rounded-siaf-md text-text-muted opacity-0 transition hover:bg-bg-states-light-hover focus-visible:opacity-100 focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-border-states-focus group-hover:opacity-100"
        [class.opacity-100]="copiado()"
        type="button"
        [attr.aria-label]="copiado() ? 'Enlace copiado' : 'Copiar el enlace a «' + texto() + '»'"
        data-ui-kit-copiar-enlace
        (click)="copiarEnlace()"
      >
        <siaf-icon [name]="copiado() ? 'check' : 'link'" [size]="20" />
      </button>
    </div>
  `,
})
export class UiKitTituloComponent {
  private readonly documento = inject(DOCUMENT);
  private readonly location = inject(Location);
  private readonly destroyRef = inject(DestroyRef);

  /** El id del `h2`: el fragmento del enlace. */
  readonly ancla = input.required<string>();
  readonly texto = input.required<string>();
  readonly copiado = signal(false);

  /** La dirección completa de la sección: el origen, la página sin su fragmento y el ancla. */
  enlace(): string {
    const pagina = this.location.path().split('#')[0];
    return `${this.documento.location.origin}${this.location.prepareExternalUrl(pagina)}#${this.ancla()}`;
  }

  async copiarEnlace(): Promise<void> {
    // La barra de direcciones también queda en la sección, como al usar el índice.
    this.location.replaceState(`${this.location.path().split('#')[0]}#${this.ancla()}`);
    try {
      await navigator.clipboard.writeText(this.enlace());
      this.copiado.set(true);
      const t = setTimeout(() => this.copiado.set(false), 1500);
      this.destroyRef.onDestroy(() => clearTimeout(t));
    } catch {
      // Sin permiso de portapapeles: la dirección ya quedó en la barra para copiarla a mano.
    }
  }
}
