import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { FundamentoBreakpointsComponent } from './fundamento-breakpoints.component';
import { FundamentoColorComponent } from './fundamento-color.component';
import { FundamentoEspaciadoComponent } from './fundamento-espaciado.component';
import { FundamentoIconosComponent } from './fundamento-iconos.component';
import { FundamentoRadiosBordesComponent } from './fundamento-radios-bordes.component';
import { FundamentoRevisionComponent } from './fundamento-revision.component';
import { FundamentoSombrasComponent } from './fundamento-sombras.component';
import { FundamentoTipografiaComponent } from './fundamento-tipografia.component';
import { SeccionFundamento } from './secciones';

/**
 * El contenido de los fundamentos visuales del catálogo, una sección por fundamento (su página pone el título y la
 * descripción).
 * Los datos salen de los tokens reales (`ui-kit.fundamentos.ts`, generado por `npm run ui-kit:manifest`).
 */
@Component({
  selector: 'siaf-ui-kit-fundamentos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FundamentoBreakpointsComponent,
    FundamentoColorComponent,
    FundamentoEspaciadoComponent,
    FundamentoIconosComponent,
    FundamentoRadiosBordesComponent,
    FundamentoRevisionComponent,
    FundamentoSombrasComponent,
    FundamentoTipografiaComponent,
  ],
  template: `
    <div class="space-y-12">
      @for (s of secciones(); track s.id) {
        <section class="min-w-0" [id]="s.id" data-fundamento>
          <div class="min-w-0">
            @switch (s.id) {
              @case ('color') {
                <siaf-ui-kit-fundamento-color />
              }
              @case ('tipografia') {
                <siaf-ui-kit-fundamento-tipografia />
              }
              @case ('espaciado') {
                <siaf-ui-kit-fundamento-espaciado />
              }
              @case ('radios-y-bordes') {
                <siaf-ui-kit-fundamento-radios-bordes />
              }
              @case ('breakpoints') {
                <siaf-ui-kit-fundamento-breakpoints />
              }
              @case ('sombras') {
                <siaf-ui-kit-fundamento-sombras />
              }
              @case ('iconos') {
                <siaf-ui-kit-fundamento-iconos />
              }
              @case ('revision-de-tokens') {
                <siaf-ui-kit-fundamento-revision />
              }
            }
          </div>
        </section>
      }
    </div>
  `,
})
export class UiKitFundamentosComponent {
  readonly secciones = input.required<readonly SeccionFundamento[]>();
}
