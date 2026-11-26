import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Lenguaje } from './resaltado';
import { UiKitCodigoComponent } from '../ui-kit-codigo.component';

/**
 * «Así no / así sí»: un uso incorrecto junto a su forma correcta, cada uno en el editor con su marca en la pestaña (como
 * los avisos «❌ / ✅» de la documentación de Material UI). Lo usan las fichas (`@incorrecto` / `@correcto` del JSDoc)
 * y «Convenciones».
 */
@Component({
  selector: 'siaf-ui-kit-comparacion',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiKitCodigoComponent],
  host: { class: 'block' },
  template: `
    <div class="grid gap-3" data-ui-kit-comparacion>
      <siaf-ui-kit-codigo archivo="Así no" estado="incorrecto" [lenguajeDelCodigo]="lenguaje()" [codigo]="incorrecto()" data-incorrecto />
      <siaf-ui-kit-codigo archivo="Así sí" estado="correcto" [lenguajeDelCodigo]="lenguaje()" [codigo]="correcto()" data-correcto />
    </div>
  `,
})
export class UiKitComparacionComponent {
  readonly incorrecto = input.required<string>();
  readonly correcto = input.required<string>();
  /** Los ejemplos son plantillas: HTML de Angular, salvo que se diga otra cosa. */
  readonly lenguaje = input<Lenguaje>('html');
}
