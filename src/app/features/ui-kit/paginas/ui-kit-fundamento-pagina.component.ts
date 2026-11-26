import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { EmptyStateComponent } from '@kennedy122112/siaf-rp-ui-angular';
import { SECCIONES_FUNDAMENTOS } from '../fundamentos/secciones';
import { UiKitFundamentosComponent } from '../fundamentos/ui-kit-fundamentos.component';
import { fundamentoPorId } from '../ui-kit.datos';
import { rutaDeFundamento, vecinas } from '../ui-kit.vista';
import { UiKitVecinasComponent } from './ui-kit-vecinas.component';

/** Página de un fundamento visual: `/ui-kit/fundamentos/:id` (color, tipografía, espaciado…). */
@Component({
  selector: 'siaf-ui-kit-fundamento-pagina',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EmptyStateComponent, UiKitFundamentosComponent, UiKitVecinasComponent],
  template: `
    @if (seccion(); as s) {
      <header class="max-w-3xl">
        <p class="text-[11px] font-bold uppercase tracking-widest text-text-muted">Fundamentos</p>
        <h1 class="mt-3 text-4xl font-bold tracking-tight">{{ s.titulo }}</h1>
        <p class="mt-4 text-base leading-relaxed text-text-muted">{{ s.descripcion }}</p>
      </header>
      <div class="mt-10">
        <siaf-ui-kit-fundamentos [secciones]="[s]" />
      </div>
      <siaf-ui-kit-vecinas [anterior]="vecinas().anterior" [siguiente]="vecinas().siguiente" />
    } @else {
      <siaf-empty-state illustration="no-results" title="Fundamento no encontrado" description="Elige un fundamento en el menú lateral." />
    }
  `,
})
export class UiKitFundamentoPaginaComponent {
  private readonly id = toSignal(inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('id') ?? '')), { initialValue: '' });

  readonly seccion = computed(() => fundamentoPorId(this.id()));
  readonly vecinas = computed(() => {
    const paginas = SECCIONES_FUNDAMENTOS.map((s) => ({ id: s.id, ruta: rutaDeFundamento(s.id), titulo: s.titulo }));
    return vecinas(paginas, this.id());
  });

  constructor() {
    const titulo = inject(Title);
    effect(() => titulo.setTitle(`${this.seccion()?.titulo ?? 'Fundamentos'} · SIAF-RP Design System`));
  }
}
