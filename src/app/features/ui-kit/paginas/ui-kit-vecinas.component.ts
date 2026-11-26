import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '@kennedy122112/siaf-rp-ui-angular';

/** Un enlace a otra página del catálogo. */
export interface PaginaVecina {
  ruta: string;
  titulo: string;
}

/** Al pie de cada página: la anterior y la siguiente en el orden del menú lateral. */
@Component({
  selector: 'siaf-ui-kit-vecinas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RouterLink],
  template: `
    @if (anterior() || siguiente()) {
      <nav class="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2" aria-label="Páginas vecinas">
        @if (anterior(); as a) {
          <a [class]="clase" [routerLink]="a.ruta" data-vecina="anterior">
            <span class="flex items-center gap-1 text-xs text-text-muted"><siaf-icon name="arrow_back" [size]="16" />Anterior</span>
            <span class="mt-1 block font-semibold text-text">{{ a.titulo }}</span>
          </a>
        } @else {
          <span></span>
        }
        @if (siguiente(); as s) {
          <a [class]="clase + ' sm:text-right'" [routerLink]="s.ruta" data-vecina="siguiente">
            <span class="flex items-center gap-1 text-xs text-text-muted sm:justify-end">Siguiente<siaf-icon name="arrow_forward" [size]="16" /></span>
            <span class="mt-1 block font-semibold text-text">{{ s.titulo }}</span>
          </a>
        }
      </nav>
    }
  `,
})
export class UiKitVecinasComponent {
  readonly anterior = input<PaginaVecina | null>(null);
  readonly siguiente = input<PaginaVecina | null>(null);

  readonly clase =
    'block rounded-siaf-lg border border-border px-5 py-4 transition hover:border-border-states-hover hover:shadow-siaf-sm focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-states-focus';
}
