import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FICHAS_UI_KIT } from '../ui-kit.datos';
import { rutaDeFicha, segmentar } from '../ui-kit.vista';

/** Destino de cada componente por su nombre de uso y por su selector. */
const DESTINOS = new Map(FICHAS_UI_KIT.flatMap((f) => [[f.nombre, f.id] as const, [f.selector, f.id] as const]));

/**
 * Un texto de las páginas del catálogo con `código` entre backticks y **negrita**; un código que nombra un componente
 * del catálogo enlaza a su página.
 */
@Component({
  selector: 'siaf-ui-kit-texto',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  // En una sola línea: los saltos de la plantilla dejarían un espacio antes de la puntuación que sigue a un código.
  template: `@for (s of segmentos(); track $index) {@switch (s.tipo) {@case ('codigo') {@if (s.enlace) {<a class="rounded-siaf-sm text-text-brand-primary underline decoration-1 underline-offset-2 hover:decoration-2 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-states-focus" [routerLink]="s.enlace"><code class="rounded-siaf-sm bg-surface-muted px-1 py-0.5 font-mono text-[12px] [overflow-wrap:anywhere]">{{ s.texto }}</code></a>} @else {<code class="rounded-siaf-sm bg-surface-muted px-1 py-0.5 font-mono text-[12px] text-text [overflow-wrap:anywhere]">{{ s.texto }}</code>}} @case ('negrita') {<strong class="font-semibold text-text">{{ s.texto }}</strong>} @default {<ng-container>{{ s.texto }}</ng-container>}}}`,
})
export class UiKitTextoComponent {
  readonly texto = input.required<string>();

  readonly segmentos = computed(() =>
    segmentar(this.texto()).map((s) => {
      const destino = s.tipo === 'codigo' ? DESTINOS.get(s.texto) : undefined;
      return { ...s, enlace: destino ? rutaDeFicha(destino) : null };
    }),
  );
}
