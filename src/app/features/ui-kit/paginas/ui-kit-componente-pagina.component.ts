import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { EmptyStateComponent } from '@kennedy122112/siaf-rp-ui-angular';
import { UiKitTemaService } from '../ui-kit-tema.service';
import { UiKitFichaComponent } from '../ui-kit-ficha.component';
import { FICHAS_UI_KIT, fichaPorId } from '../ui-kit.datos';
import { rutaDeFicha, vecinas } from '../ui-kit.vista';
import { UiKitVecinasComponent } from './ui-kit-vecinas.component';

/** Página de un componente: `/ui-kit/componentes/:id`, con su ficha y los enlaces al anterior y al siguiente. */
@Component({
  selector: 'siaf-ui-kit-componente-pagina',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EmptyStateComponent, UiKitFichaComponent, UiKitVecinasComponent],
  template: `
    @if (ficha(); as f) {
      <!-- Una ficha por componente: al cambiar de página se crea otra y no arrastra el estado del playground. -->
      @for (x of [f]; track x.id) {
        <siaf-ui-kit-ficha [datos]="x" [temaActual]="tema()" />
      }
      <siaf-ui-kit-vecinas [anterior]="vecinas().anterior" [siguiente]="vecinas().siguiente" />
    } @else {
      <siaf-empty-state illustration="no-results" title="Componente no encontrado" description="Elige un componente en el menú lateral o búscalo por su nombre." />
    }
  `,
})
export class UiKitComponentePaginaComponent {
  private readonly id = toSignal(inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('id') ?? '')), { initialValue: '' });

  /** Los marcos de escritorio y móvil cargan su iframe con el tema de la página. */
  readonly tema = inject(UiKitTemaService).tema;
  readonly ficha = computed(() => fichaPorId(this.id()));
  readonly vecinas = computed(() => {
    const paginas = FICHAS_UI_KIT.map((f) => ({ id: f.id, ruta: rutaDeFicha(f.id), titulo: f.titulo }));
    return vecinas(paginas, this.id());
  });

  constructor() {
    const titulo = inject(Title);
    effect(() => titulo.setTitle(`${this.ficha()?.titulo ?? 'Componente'} · SIAF-RP Design System`));
  }
}
