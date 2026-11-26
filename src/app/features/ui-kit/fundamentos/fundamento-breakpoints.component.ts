import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FUNDAMENTOS_UI_KIT } from '../ui-kit.fundamentos';
import { UiKitCopiarComponent } from './ui-kit-copiar.component';

/** Qué pantallas cubre cada prefijo, desde su ancho mínimo. */
const USO: Readonly<Partial<Record<string, string>>> = {
  sm: 'Teléfonos grandes y en horizontal.',
  md: 'Tablet en vertical: coincide con el inicio de «Tablet» de los tokens.',
  lg: 'Tablet en horizontal y escritorio: coincide con el inicio de «Escritorio» de los tokens.',
  xl: 'Escritorio ancho.',
  '2xl': 'Pantallas muy anchas.',
};

/**
 * Fundamento «Breakpoints»: los prefijos de Tailwind con su ancho mínimo y cuántas veces los usa la app, y los
 * dispositivos de los tokens del Figma (escritorio, tablet y móvil) con su rango y su consulta.
 */
@Component({
  selector: 'siaf-ui-kit-fundamento-breakpoints',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiKitCopiarComponent],
  template: `
    <div class="space-y-10">
      <section>
        <h3 class="text-base font-semibold text-text">Prefijos de Tailwind</h3>
        <p class="mt-1 text-sm leading-relaxed text-text-muted">
          Se diseña primero para móvil: una clase sin prefijo vale siempre, y <code class="font-mono text-[12px]">md:</code> la cambia desde ese ancho
          hacia arriba.
        </p>
        <div class="mt-4 overflow-x-auto rounded-siaf-lg border border-border">
          <table class="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr class="border-b border-border bg-bg-surfaces-surface-low text-xs font-semibold text-text-muted">
                <th class="px-4 py-2 font-semibold">Prefijo</th>
                <th class="px-4 py-2 font-semibold">Desde</th>
                <th class="px-4 py-2 font-semibold">Usos en la app</th>
                <th class="px-4 py-2 font-semibold">Para qué</th>
              </tr>
            </thead>
            <tbody>
              @for (b of datos.tailwind; track b.prefijo) {
                <tr class="border-b border-border last:border-b-0" [attr.data-breakpoint]="b.prefijo">
                  <td class="px-4 py-2"><siaf-ui-kit-copiar [envolver]="false" [texto]="b.prefijo + ':'" /></td>
                  <td class="px-4 py-2 font-mono text-[12px] text-text">{{ b.desde }}</td>
                  <td class="px-4 py-2 text-text">{{ b.usos }}</td>
                  <td class="px-4 py-2 text-xs text-text-muted">{{ uso[b.prefijo] ?? '' }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 class="text-base font-semibold text-text">Dispositivos de los tokens</h3>
        <p class="mt-1 text-sm leading-relaxed text-text-muted">
          Los tokens del Figma tienen un valor por dispositivo: los tamaños de texto, los espacios y los íconos bajan en tablet y en móvil sin
          escribir ningún prefijo.
        </p>
        <ul class="mt-4 grid gap-3 sm:grid-cols-3">
          @for (d of datos.dispositivos; track d.nombre) {
            <li class="rounded-siaf-lg border border-border p-4" [attr.data-dispositivo]="d.nombre">
              <p class="font-semibold text-text">{{ d.nombre }}</p>
              <p class="mt-1 text-sm text-text-muted">{{ d.rango }}</p>
              <p class="mt-2 font-mono text-[11px] text-text-muted">{{ d.media ?? 'valor base' }}</p>
            </li>
          }
        </ul>
      </section>
    </div>
  `,
})
export class FundamentoBreakpointsComponent {
  readonly datos = FUNDAMENTOS_UI_KIT.breakpoints;
  readonly uso = USO;
}
