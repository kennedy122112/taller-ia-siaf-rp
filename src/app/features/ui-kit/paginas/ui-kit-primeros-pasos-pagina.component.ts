import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { EmptyStateComponent, IconComponent } from '@kennedy122112/siaf-rp-ui-angular';
import { UiKitComparacionComponent } from '../comun/ui-kit-comparacion.component';
import { UiKitContenidoComponent } from '../comun/ui-kit-contenido.component';
import { UiKitTextoComponent } from '../comun/ui-kit-texto.component';
import { UiKitTituloComponent } from '../comun/ui-kit-titulo.component';
import { PRIMEROS_PASOS, primerPasoPorId } from '../primeros-pasos/primeros-pasos';
import { UiKitCodigoComponent } from '../ui-kit-codigo.component';
import { enlaceParaEditar, rutaDePrimerosPasos, vecinas } from '../ui-kit.vista';
import { UiKitVecinasComponent } from './ui-kit-vecinas.component';

/** Página de «Primeros pasos»: `/ui-kit/primeros-pasos/:id` (instalación, uso, convenciones y versiones). */
@Component({
  selector: 'siaf-ui-kit-primeros-pasos-pagina',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    EmptyStateComponent,
    IconComponent,
    UiKitCodigoComponent,
    UiKitComparacionComponent,
    UiKitContenidoComponent,
    UiKitTextoComponent,
    UiKitTituloComponent,
    UiKitVecinasComponent,
  ],
  template: `
    @if (pagina(); as p) {
      <div class="xl:grid xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-12">
        <article class="min-w-0" [attr.data-primeros-pasos]="p.id">
          <header class="max-w-3xl">
            <p class="text-[11px] font-bold uppercase tracking-widest text-text-muted">Primeros pasos</p>
            <h1 class="mt-3 text-4xl font-bold tracking-tight">{{ p.titulo }}</h1>
            <p class="mt-4 text-base leading-relaxed text-text-muted">{{ p.descripcion }}</p>
          </header>

          @for (s of p.secciones; track s.id) {
            <section class="mt-12" [attr.data-paso-seccion]="s.id">
              <siaf-ui-kit-titulo [ancla]="s.id" [texto]="s.titulo" />
              <div class="mt-4 space-y-4 text-sm leading-relaxed text-text-muted">
                @for (b of s.bloques; track $index) {
                  @switch (b.tipo) {
                    @case ('parrafo') {
                      <p><siaf-ui-kit-texto [texto]="b.texto" /></p>
                    }
                    @case ('lista') {
                      <ul class="list-disc space-y-1.5 pl-5">
                        @for (item of b.items; track $index) {
                          <li><siaf-ui-kit-texto [texto]="item" /></li>
                        }
                      </ul>
                    }
                    @case ('codigo') {
                      <siaf-ui-kit-codigo [archivo]="b.archivo" [codigo]="b.codigo" />
                    }
                    @case ('tabla') {
                      <div class="overflow-x-auto rounded-siaf-lg border border-border">
                        <table class="w-full min-w-[520px] border-collapse text-left">
                          <thead>
                            <tr class="border-b border-border bg-bg-surfaces-surface-low text-xs font-semibold text-text-muted">
                              @for (c of b.cabeceras; track c) {
                                <th class="px-4 py-2 font-semibold">{{ c }}</th>
                              }
                            </tr>
                          </thead>
                          <tbody>
                            @for (fila of b.filas; track $index) {
                              <tr class="border-b border-border align-top last:border-b-0">
                                @for (celda of fila; track $index) {
                                  <td class="px-4 py-2"><siaf-ui-kit-texto [texto]="celda" /></td>
                                }
                              </tr>
                            }
                          </tbody>
                        </table>
                      </div>
                    }
                    @case ('comparacion') {
                      <siaf-ui-kit-comparacion [incorrecto]="b.incorrecto" [correcto]="b.correcto" />
                    }
                    @case ('diff') {
                      <siaf-ui-kit-codigo modo="diff" [archivo]="b.archivo" [codigo]="b.codigo" data-ui-kit-diff />
                    }
                    @case ('aviso') {
                      <p class="flex gap-3 rounded-siaf-lg border border-border bg-bg-surfaces-surface-low p-4 text-text">
                        <siaf-icon class="shrink-0 text-text-brand-primary" name="info" [size]="20" />
                        <span><siaf-ui-kit-texto [texto]="b.texto" /></span>
                      </p>
                    }
                  }
                }
              </div>
            </section>
          }
          <p class="mt-14 border-t border-border pt-6 text-sm">
            <a class="inline-flex items-center gap-1 rounded-siaf-sm text-text-brand-primary hover:underline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-states-focus" [href]="editar" target="_blank" rel="noopener noreferrer" data-editar-pagina>
              <siaf-icon name="edit" [size]="16" /> Editar esta página
            </a>
          </p>
          <siaf-ui-kit-vecinas [anterior]="vecinas().anterior" [siguiente]="vecinas().siguiente" />
        </article>
        <aside class="hidden xl:block">
          <div class="sticky top-24">
            <siaf-ui-kit-contenido [secciones]="contenido()" />
          </div>
        </aside>
      </div>
    } @else {
      <siaf-empty-state illustration="no-results" title="Página no encontrada" description="Elige una página de «Primeros pasos» en el menú lateral." />
    }
  `,
})
export class UiKitPrimerosPasosPaginaComponent {
  private readonly id = toSignal(inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('id') ?? '')), { initialValue: '' });

  readonly pagina = computed(() => primerPasoPorId(this.id()));
  /** Las cuatro páginas salen del mismo archivo de contenido. */
  readonly editar = enlaceParaEditar('src/app/features/ui-kit/primeros-pasos/primeros-pasos.ts');
  readonly contenido = computed(() => this.pagina()?.secciones.map((s) => ({ id: s.id, titulo: s.titulo })) ?? []);
  readonly vecinas = computed(() =>
    vecinas(
      PRIMEROS_PASOS.map((p) => ({ id: p.id, ruta: rutaDePrimerosPasos(p.id), titulo: p.titulo })),
      this.id(),
    ),
  );

  constructor() {
    const titulo = inject(Title);
    effect(() => titulo.setTitle(`${this.pagina()?.titulo ?? 'Primeros pasos'} · SIAF-RP Design System`));
  }
}
