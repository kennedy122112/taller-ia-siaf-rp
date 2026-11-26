import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent, MessageBoxComponent, StatusTagComponent, TemaApp } from '@kennedy122112/siaf-rp-ui-angular';
import { UiKitCopiarComponent } from './fundamentos/ui-kit-copiar.component';
import { UiKitCodigoComponent } from './ui-kit-codigo.component';
import { UiKitMarcoComponent } from './ui-kit-marco.component';
import { UiKitPlaygroundComponent } from './ui-kit-playground.component';
import { UiKitComparacionComponent } from './comun/ui-kit-comparacion.component';
import { UiKitContenidoComponent } from './comun/ui-kit-contenido.component';
import { UiKitTituloComponent } from './comun/ui-kit-titulo.component';
import { tienePlayground } from './ui-kit.playground';
import { FichaVista, rutaDeFicha, rutaDeFundamento } from './ui-kit.vista';

const CAPA: Record<FichaVista['capa'], string> = {
  ui: 'Design system',
  components: 'Transversal',
  layout: 'Armazón',
};

/** Una sección de la página, en el orden en que se pinta (también arma «En esta página»). */
export interface SeccionFicha {
  id: string;
  titulo: string;
}

/**
 * Página de un componente en el catálogo, con las secciones del sitio del design system:
 * - **Cabecera**: categoría, nombre, descripción (JSDoc de la clase), selector, capa, cantidad de entradas y eventos,
 *   enlaces al Figma (`@figma`) y marcas (directiva, sesión, sin uso).
 * - **Uso**: el ejemplo en vivo (en marcos de escritorio y móvil si es responsive) y cuándo usarlo y cuándo no
 *   (`@usar` / `@evitar`).
 * - **Playground** (solo los de `ui-kit.playground-config.ts`): el componente real con las propiedades que cambian su
 *   aspecto, y el código para pegar en el proyecto (componente standalone y plantilla).
 * - **Implementación**: el import y la etiqueta mínima, para copiar.
 * - **API**: entradas y eventos.
 * - **Tokens**: los `--sys-*` que usa, con muestras en vivo que siguen el tema activo.
 * - **Composición**: lo que pinta por dentro y los componentes que lo pintan.
 * - **Accesibilidad**: roles y atributos ARIA del código, teclado (`@teclado`) y notas (`@accesibilidad`).
 */
@Component({
  selector: 'siaf-ui-kit-ficha',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IconComponent,
    MessageBoxComponent,
    NgComponentOutlet,
    NgTemplateOutlet,
    RouterLink,
    StatusTagComponent,
    UiKitCodigoComponent,
    UiKitCopiarComponent,
    UiKitMarcoComponent,
    UiKitPlaygroundComponent,
    UiKitComparacionComponent,
    UiKitContenidoComponent,
    UiKitTituloComponent,
  ],
  template: `
    <!-- En una sola línea: los saltos de la plantilla dejarían un espacio antes de la puntuación que sigue a un código. -->
    <!-- Un código que nombra otra ficha es un enlace a su página. -->
    <ng-template #texto let-segmentos>@for (s of segmentos; track $index) {@switch (s.tipo) {@case ('codigo') {@if (s.enlace) {<a class="rounded-siaf-sm text-text-brand-primary underline decoration-1 underline-offset-2 hover:decoration-2 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-states-focus" [routerLink]="rutaDeFicha(s.enlace)" data-enlace-ficha><code class="rounded-siaf-sm bg-surface-muted px-1 py-0.5 font-mono text-[12px] [overflow-wrap:anywhere]">{{ s.texto }}</code></a>} @else {<code class="rounded-siaf-sm bg-surface-muted px-1 py-0.5 font-mono text-[12px] text-text [overflow-wrap:anywhere]">{{ s.texto }}</code>}} @case ('negrita') {<strong class="font-semibold text-text">{{ s.texto }}</strong>} @default {<ng-container>{{ s.texto }}</ng-container>}}}</ng-template>
    <ng-template #bloquesTpl let-bloques>
      <div class="space-y-2 text-sm leading-relaxed text-text-muted">
        @for (bloque of bloques; track $index) {
          @switch (bloque.tipo) {
            @case ('parrafo') {
              <p><ng-container *ngTemplateOutlet="texto; context: { $implicit: bloque.segmentos }" /></p>
            }
            @case ('lista') {
              <ul class="space-y-1 pl-5" [class.list-decimal]="bloque.ordenada" [class.list-disc]="!bloque.ordenada">
                @for (item of bloque.items; track $index) {
                  <li><ng-container *ngTemplateOutlet="texto; context: { $implicit: item }" /></li>
                }
              </ul>
            }
            @case ('codigo') {
              <!-- Un fragmento del JSDoc: una plantilla si empieza con una etiqueta y, si no, TypeScript. -->
              <siaf-ui-kit-codigo class="my-3" [archivo]="bloque.texto.trimStart().startsWith('<') ? 'plantilla.html' : 'ejemplo.ts'" [codigo]="bloque.texto" />
            }
          }
        }
      </div>
    </ng-template>
    <ng-template #encabezado let-seccion let-texto="texto">
      <siaf-ui-kit-titulo [ancla]="f.id + '-' + seccion.id" [texto]="seccion.titulo" />
      @if (texto) {
        <p class="mt-1 text-sm leading-relaxed text-text-muted">{{ texto }}</p>
      }
    </ng-template>
    <ng-template #subtitulo let-texto let-cantidad="cantidad">
      <h3 class="mb-3 text-sm font-semibold text-text">
        {{ texto }}@if (cantidad !== undefined) {<span class="font-normal text-text-muted"> · {{ cantidad }}</span>}
      </h3>
    </ng-template>

    @let f = ficha();
    <div class="xl:grid xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-12">
    <article class="min-w-0" [id]="f.id" data-ficha>
      <header class="max-w-3xl" data-ficha-cabecera>
        <p class="text-[11px] font-bold uppercase tracking-widest text-text-muted">Componentes · {{ f.categoria?.titulo ?? 'Otros' }}</p>
        <h1 class="mt-3 text-4xl font-bold tracking-tight text-text">{{ f.titulo }}</h1>
        <div class="mt-4">
          @if (f.bloques.length) {
            <ng-container *ngTemplateOutlet="bloquesTpl; context: { $implicit: f.bloques }" />
          } @else {
            <p class="text-sm italic text-text-muted">Sin descripción en el código: falta el comentario JSDoc sobre la clase.</p>
          }
        </div>
        <ul class="mt-5 flex flex-wrap items-center gap-2" data-ficha-chips>
          <li><span [class]="chip + ' font-mono'">{{ f.nombre }}</span></li>
          <li><span [class]="chip">{{ capa() }}</span></li>
          <li><span [class]="chip">{{ f.entradas.length }} entradas · {{ f.eventos.length }} eventos</span></li>
          @for (n of f.enlacesFigma; track n.nodo) {
            <li data-ficha-figma>
              <a [class]="chip + ' text-text-brand-primary hover:underline'" [href]="n.url" target="_blank" rel="noopener noreferrer">
                Figma {{ n.nombre ?? n.nodo }} <siaf-icon name="open_in_new" [size]="12" />
              </a>
            </li>
          }
          @if (f.waiAria; as patron) {
            <li data-ficha-wai-aria>
              <a [class]="chip + ' text-text-brand-primary hover:underline'" [href]="patron.url" target="_blank" rel="noopener noreferrer">
                WAI-ARIA: {{ patron.nombre }} <siaf-icon name="open_in_new" [size]="12" />
              </a>
            </li>
          }
          @if (f.enlaces.codigoFuente; as codigoFuente) {
            <li data-ficha-codigo-fuente>
              <a [class]="chip + ' text-text-brand-primary hover:underline'" [href]="codigoFuente" target="_blank" rel="noopener noreferrer">
                <siaf-icon name="code" [size]="14" /> Código fuente
              </a>
            </li>
          }
          <li data-ficha-markdown>
            <a [class]="chip + ' text-text-brand-primary hover:underline'" [href]="f.enlaces.markdown" target="_blank" rel="noopener" title="La ficha en Markdown, para leerla fuera de la app o pasársela a un asistente de IA">
              <siaf-icon name="description" [size]="14" /> Markdown
            </a>
          </li>
          @if (f.tipo === 'directiva') {
            <li><siaf-status-tag size="small" tone="info">Directiva</siaf-status-tag></li>
          }
          @if (f.usaSesion) {
            <li><siaf-status-tag size="small" tone="info" icon="lock">Requiere sesión</siaf-status-tag></li>
          }
          @if (f.sinUso) {
            <li><siaf-status-tag size="small" tone="warning" icon="block">Sin uso en la app</siaf-status-tag></li>
          }
        </ul>
        @if (f.nombre !== f.selector) {
          <p class="mt-3 text-xs text-text-muted">
            Se usa como atributo sobre cualquier elemento. Su selector en el código es
            <code class="rounded-siaf-sm bg-surface-muted px-1 py-0.5 font-mono text-[12px] text-text">{{ f.selector }}</code>: los corchetes solo declaran que es un atributo y no se escriben.
          </p>
        }
        @if (f.sinUso) {
          <p class="mt-3 text-xs text-text-muted">Ninguna pantalla lo usa todavía. Antes de adoptarlo, revisa si su familia ya tiene un componente en uso.</p>
        }
      </header>

      <!-- En esta página: las secciones de la ficha. -->
      <nav class="mt-8 flex flex-wrap gap-x-4 gap-y-1 text-sm xl:hidden" aria-label="En esta página" data-ficha-indice>
        @for (s of secciones(); track s.id) {
          <a class="rounded-siaf-sm text-text-brand-primary hover:underline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-states-focus" [attr.href]="rutaDeFicha(f.id) + '#' + f.id + '-' + s.id" (click)="irA($event, f.id + '-' + s.id)">{{ s.titulo }}</a>
        }
      </nav>

      <section [class]="seccion" data-ficha-seccion="uso">
        <ng-container *ngTemplateOutlet="encabezado; context: { $implicit: { id: 'uso', titulo: 'Uso' }, texto: 'El componente en vivo, con los mismos datos que usan las pantallas, y cuándo conviene.' }" />
        <div class="mt-6 min-w-0" data-ficha-ejemplo>
          @if (f.ejemplo && f.responsive; as vista) {
            <div class="grid grid-cols-[minmax(0,1fr)] gap-4 rounded-siaf-lg bg-bg-surfaces-surface-low p-4 lg:grid-cols-[minmax(0,1fr)_260px]">
              <siaf-ui-kit-marco etiqueta="Escritorio" [selector]="f.selector" [ancho]="1280" [alto]="vista.altoEscritorio" [tema]="temaActual()" />
              <div class="min-w-0">
                <siaf-ui-kit-marco etiqueta="Móvil" [selector]="f.selector" [ancho]="375" [alto]="vista.altoMovil" [tema]="temaActual()" />
              </div>
            </div>
            @if (vista.nota) {
              <p class="mt-2 text-xs text-text-muted">{{ vista.nota }}</p>
            }
          } @else if (f.ejemplo; as ejemplo) {
            <div class="rounded-siaf-lg bg-bg-surfaces-surface-low p-6">
              <ng-container *ngComponentOutlet="ejemplo; inputs: { selector: f.selector }" />
            </div>
          } @else {
            <message-box [text]="f.motivoSinEjemplo ?? ''" />
          }
        </div>
        @if (f.bloquesUsar.length || f.bloquesEvitar.length) {
          <div class="mt-6 grid gap-4 md:grid-cols-2">
            <div class="rounded-siaf-lg border border-border p-5" data-ficha-usar>
              <h3 class="mb-2 flex items-center gap-2 text-sm font-semibold text-text">
                <siaf-icon class="text-text-feedback-success" name="check_circle" [size]="20" />
                Cuándo usarlo
              </h3>
              @if (f.bloquesUsar.length) {
                <ng-container *ngTemplateOutlet="bloquesTpl; context: { $implicit: f.bloquesUsar }" />
              } @else {
                <p class="text-sm italic text-text-muted">Sin documentar (&#64;usar).</p>
              }
            </div>
            <div class="rounded-siaf-lg border border-border p-5" data-ficha-evitar>
              <h3 class="mb-2 flex items-center gap-2 text-sm font-semibold text-text">
                <siaf-icon class="text-text-feedback-danger" name="block" [size]="20" />
                Cuándo no
              </h3>
              @if (f.bloquesEvitar.length) {
                <ng-container *ngTemplateOutlet="bloquesTpl; context: { $implicit: f.bloquesEvitar }" />
              } @else {
                <p class="text-sm italic text-text-muted">Sin documentar (&#64;evitar).</p>
              }
            </div>
          </div>
        } @else {
          <div class="mt-6">
            <message-box text="Todavía no tiene guía de uso. Se documenta en el JSDoc del componente con @usar y @evitar." />
          </div>
        }
        @if (f.bloquesLimitaciones.length) {
          <div class="mt-4 rounded-siaf-lg border border-border p-5" data-ficha-limitaciones>
            <h3 class="mb-2 flex items-center gap-2 text-sm font-semibold text-text">
              <siaf-icon class="text-text-feedback-warning" name="warning_amber" [size]="20" />
              Limitaciones
            </h3>
            <ng-container *ngTemplateOutlet="bloquesTpl; context: { $implicit: f.bloquesLimitaciones }" />
          </div>
        }
        @if (f.incorrecto && f.correcto) {
          <siaf-ui-kit-comparacion class="mt-4" [incorrecto]="f.incorrecto" [correcto]="f.correcto" data-ficha-asi-no-asi-si />
        }
      </section>

      @if (playground()) {
        <section [class]="seccion" data-ficha-seccion="playground">
          <ng-container *ngTemplateOutlet="encabezado; context: { $implicit: { id: 'playground', titulo: 'Playground' }, texto: 'Cambia sus propiedades, mira el componente real y copia el código: un componente standalone y su plantilla, listos para pegar en una pantalla del proyecto.' }" />
          <div class="mt-6">
            <siaf-ui-kit-playground [ficha]="f" />
          </div>
        </section>
      }

      <section [class]="seccion" data-ficha-seccion="implementacion">
        <ng-container *ngTemplateOutlet="encabezado; context: { $implicit: { id: 'implementacion', titulo: 'Implementación' }, texto: 'Impórtalo en el componente standalone y úsalo en su plantilla.' }" />
        <div class="mt-6 grid gap-4">
          <siaf-ui-kit-codigo archivo="componente.ts" [codigo]="f.snippetImport" />
          <siaf-ui-kit-codigo archivo="componente.html" [codigo]="f.snippetUso" />
        </div>
        <p class="mt-2 truncate font-mono text-[11px] text-text-muted" [title]="f.archivo">{{ f.archivo }}</p>
      </section>

      <section [class]="seccion" data-ficha-seccion="api">
        <ng-container *ngTemplateOutlet="encabezado; context: { $implicit: { id: 'api', titulo: 'API' }, texto: 'Las entradas y los eventos tal como están en el código.' }" />
        <div class="mt-6 space-y-8">
          <div data-ficha-entradas>
            <ng-container *ngTemplateOutlet="subtitulo; context: { $implicit: 'Entradas', cantidad: f.entradas.length }" />
            @if (f.entradas.length) {
              <div class="overflow-x-auto rounded-siaf-lg border border-border">
                <table class="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead>
                    <tr class="border-b border-border bg-bg-surfaces-surface-low text-xs font-semibold text-text-muted">
                      <th class="px-4 py-2 font-semibold">Nombre</th>
                      <th class="px-4 py-2 font-semibold">Tipo</th>
                      <th class="px-4 py-2 font-semibold">Por defecto</th>
                      <th class="px-4 py-2 font-semibold">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (e of f.entradas; track e.nombre) {
                      <tr class="border-b border-border align-top last:border-b-0">
                        <td class="px-4 py-2">
                          <code class="font-mono text-[13px] font-semibold text-text">{{ e.nombre }}</code>
                          @if (e.requerida) {
                            <span class="mt-0.5 block text-[11px] font-semibold uppercase text-text-brand-primary">obligatoria</span>
                          }
                        </td>
                        <td class="px-4 py-2"><code class="break-all font-mono text-[12px] text-text-muted">{{ e.tipo }}</code></td>
                        <td class="px-4 py-2"><code class="break-all font-mono text-[12px] text-text-muted">{{ e.porDefecto ?? '—' }}</code></td>
                        <td class="px-4 py-2 text-xs leading-relaxed text-text-muted">{{ e.descripcion ?? '' }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            } @else {
              <p class="text-sm text-text-muted">No recibe entradas.</p>
            }
          </div>
          <div data-ficha-eventos>
            <ng-container *ngTemplateOutlet="subtitulo; context: { $implicit: 'Eventos', cantidad: f.eventos.length }" />
            @if (f.eventos.length) {
              <div class="overflow-x-auto rounded-siaf-lg border border-border">
                <table class="w-full min-w-[520px] border-collapse text-left text-sm">
                  <thead>
                    <tr class="border-b border-border bg-bg-surfaces-surface-low text-xs font-semibold text-text-muted">
                      <th class="px-4 py-2 font-semibold">Nombre</th>
                      <th class="px-4 py-2 font-semibold">Valor</th>
                      <th class="px-4 py-2 font-semibold">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (ev of f.eventos; track ev.nombre) {
                      <tr class="border-b border-border align-top last:border-b-0">
                        <td class="px-4 py-2"><code class="font-mono text-[13px] font-semibold text-text">({{ ev.nombre }})</code></td>
                        <td class="px-4 py-2"><code class="break-all font-mono text-[12px] text-text-muted">{{ ev.tipo }}</code></td>
                        <td class="px-4 py-2 text-xs leading-relaxed text-text-muted">{{ ev.descripcion ?? '' }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            } @else {
              <p class="text-sm text-text-muted">No emite eventos.</p>
            }
          </div>
        </div>
      </section>

      <section [class]="seccion" data-ficha-seccion="tokens" data-ficha-tokens>
        <ng-container *ngTemplateOutlet="encabezado; context: { $implicit: { id: 'tokens', titulo: 'Tokens' }, texto: 'Las muestras usan la variable CSS en vivo, así que reflejan el tema activo.' }" />
        <div class="mt-6">
          @if (f.tokensConValor.length) {
            <ul class="grid gap-3 sm:grid-cols-2">
              @for (t of f.tokensConValor; track t.token) {
                <li class="flex min-w-0 items-center gap-3 rounded-siaf-lg border border-border p-3" [attr.data-token-usado]="t.token">
                  @switch (t.valor?.tipo) {
                    @case ('color') {
                      <span class="size-10 shrink-0 rounded-siaf-md border border-border" [style.background-color]="'var(' + t.token + ')'"></span>
                    }
                    @case ('sombra') {
                      <span class="size-10 shrink-0 rounded-siaf-md bg-surface" [style.box-shadow]="'var(' + t.token + ')'"></span>
                    }
                    @default {
                      <span class="flex size-10 shrink-0 items-center justify-center rounded-siaf-md bg-surface-muted font-mono text-[10px] text-text-muted">{{ t.valor?.claro ?? '—' }}</span>
                    }
                  }
                  <span class="min-w-0">
                    <siaf-ui-kit-copiar [texto]="t.token" [copia]="'var(' + t.token + ')'" />
                    <span class="mt-0.5 block truncate px-1 font-mono text-[11px] text-text-muted" [title]="t.via.join(' · ')">{{ t.via.join(' · ') }}</span>
                    @if (t.valor?.tipo === 'color') {
                      <span class="block px-1 font-mono text-[11px] text-text-muted">{{ t.valor!.claro }} · {{ t.valor!.oscuro }}</span>
                    }
                  </span>
                </li>
              }
            </ul>
            <a class="mt-3 inline-block text-xs text-text-brand-primary hover:underline" [routerLink]="rutaDeFundamento('color')">Ver todos los colores en Fundamentos</a>
          } @else {
            <p class="text-sm text-text-muted">No usa tokens --sys-* directamente{{ f.componentesUsados.length ? ': su aspecto viene de los componentes que pinta.' : '.' }}</p>
          }
        </div>
      </section>

      <section [class]="seccion" data-ficha-seccion="composicion">
        <ng-container *ngTemplateOutlet="encabezado; context: { $implicit: { id: 'composicion', titulo: 'Composición' }, texto: 'Lo que pinta por dentro y los componentes del catálogo que lo pintan: un cambio de diseño se hace en un solo lugar.' }" />
        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <div data-ficha-usa>
            <ng-container *ngTemplateOutlet="subtitulo; context: { $implicit: 'Componentes que usa por dentro', cantidad: f.componentesUsados.length }" />
            @if (f.componentesUsados.length) {
              <ul class="flex flex-wrap gap-2">
                @for (c of f.componentesUsados; track c.selector) {
                  <li>
                    <a [class]="chip + ' font-mono hover:underline'" [routerLink]="rutaDeFicha(c.id)">{{ c.nombre }}</a>
                  </li>
                }
              </ul>
            } @else {
              <p class="text-sm text-text-muted">No pinta otros componentes del catálogo.</p>
            }
          </div>
          <div data-ficha-lo-usan>
            <ng-container *ngTemplateOutlet="subtitulo; context: { $implicit: 'Lo usan', cantidad: f.usadoPor.length }" />
            @if (f.usadoPor.length) {
              <ul class="flex flex-wrap gap-2">
                @for (u of f.usadoPor; track u.selector) {
                  <li>
                    @if (u.enCatalogo) {
                      <a [class]="chip + ' font-mono hover:underline'" [routerLink]="rutaDeFicha(u.id)">{{ u.nombre }}</a>
                    } @else {
                      <!-- Oculto en el catálogo (armazón de la app): no hay página a la que llevar. -->
                      <span class="inline-flex rounded-full border border-dashed border-border px-2.5 py-0.5 font-mono text-[12px] text-text-muted" title="Oculto en el catálogo">{{ u.nombre }}</span>
                    }
                  </li>
                }
              </ul>
              <p class="mt-2 text-xs text-text-muted" data-lo-usan-nota>Cuenta solo componentes del catálogo: las pantallas que lo usan no aparecen aquí.</p>
            } @else if (f.sinUso) {
              <p class="text-sm text-text-muted">Ningún componente del catálogo lo pinta por dentro y ninguna pantalla lo usa todavía.</p>
            } @else {
              <p class="text-sm text-text-muted">Ningún componente del catálogo lo pinta por dentro: lo usan directamente las pantallas.</p>
            }
          </div>
        </div>
      </section>

      <section [class]="seccion" data-ficha-seccion="accesibilidad">
        <ng-container *ngTemplateOutlet="encabezado; context: { $implicit: { id: 'accesibilidad', titulo: 'Accesibilidad' }, texto: 'Roles y atributos que declara el código, uso con teclado y notas con los criterios WCAG.' }" />
        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <div data-ficha-aria>
            <ng-container *ngTemplateOutlet="subtitulo; context: { $implicit: 'Roles y atributos ARIA' }" />
            @if (f.aria.roles.length || f.aria.atributos.length) {
              <ul class="flex flex-wrap gap-2">
                @for (r of f.aria.roles; track r) {
                  <li><code class="inline-flex rounded-siaf-sm bg-surface-muted px-2 py-1 font-mono text-[12px] text-text">role="{{ r }}"</code></li>
                }
                @for (a of f.aria.atributos; track a) {
                  <li><code class="inline-flex rounded-siaf-sm bg-surface-muted px-2 py-1 font-mono text-[12px] text-text">{{ a }}</code></li>
                }
              </ul>
              <p class="mt-2 text-xs text-text-muted">Leídos de la plantilla y del código del componente.</p>
            } @else {
              <p class="text-sm text-text-muted">La plantilla no declara roles ni atributos ARIA{{ f.componentesUsados.length ? ': los aportan los componentes que pinta.' : '.' }}</p>
            }
          </div>
          <div data-ficha-teclado>
            <ng-container *ngTemplateOutlet="subtitulo; context: { $implicit: 'Teclado' }" />
            @if (f.bloquesTeclado.length) {
              <ng-container *ngTemplateOutlet="bloquesTpl; context: { $implicit: f.bloquesTeclado }" />
            } @else {
              <p class="text-sm italic text-text-muted">Sin documentar (&#64;teclado).</p>
            }
          </div>
          <div class="md:col-span-2" data-ficha-notas>
            <ng-container *ngTemplateOutlet="subtitulo; context: { $implicit: 'Notas' }" />
            @if (f.bloquesAccesibilidad.length) {
              <ng-container *ngTemplateOutlet="bloquesTpl; context: { $implicit: f.bloquesAccesibilidad }" />
            } @else {
              <p class="text-sm italic text-text-muted">Sin documentar (&#64;accesibilidad).</p>
            }
          </div>
        </div>
      </section>
      <p class="mt-14 border-t border-border pt-6 text-sm">
        @if (f.enlaces.editar; as editar) {
          <a class="inline-flex items-center gap-1 rounded-siaf-sm text-text-brand-primary hover:underline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-states-focus" [href]="editar" target="_blank" rel="noopener noreferrer" data-ficha-editar>
            <siaf-icon name="edit" [size]="16" /> Editar esta página
          </a>
          <span class="text-text-muted"> · la ficha sale del JSDoc de <code class="font-mono text-[12px]">{{ f.archivo }}</code>.</span>
        } @else {
          <span class="text-text-muted" data-ficha-origen>
            La ficha sale del JSDoc del paquete del kit (<code class="font-mono text-[12px]">{{ f.archivo }}</code>): se actualiza con el kit.
          </span>
        }
      </p>
    </article>
    <!-- Contenido de la página, fijo a la derecha en pantallas anchas; en las demás, los enlaces de arriba. -->
    <aside class="hidden xl:block">
      <div class="sticky top-24">
        <siaf-ui-kit-contenido [secciones]="contenido()" />
      </div>
    </aside>
    </div>
  `,
})
export class UiKitFichaComponent {
  readonly datos = input.required<FichaVista>();
  /** Tema del catálogo: los marcos lo pasan a su iframe para seguirlo. */
  readonly temaActual = input<TemaApp>('light');

  protected readonly rutaDeFicha = rutaDeFicha;
  protected readonly rutaDeFundamento = rutaDeFundamento;
  readonly ficha = computed(() => this.datos());
  readonly capa = computed(() => CAPA[this.ficha().capa]);
  readonly playground = computed(() => tienePlayground(this.ficha()));
  readonly secciones = computed<SeccionFicha[]>(() => [
    { id: 'uso', titulo: 'Uso' },
    ...(this.playground() ? [{ id: 'playground', titulo: 'Playground' }] : []),
    { id: 'implementacion', titulo: 'Implementación' },
    { id: 'api', titulo: 'API' },
    { id: 'tokens', titulo: 'Tokens' },
    { id: 'composicion', titulo: 'Composición' },
    { id: 'accesibilidad', titulo: 'Accesibilidad' },
  ]);
  /** Las mismas secciones para el índice «Contenido», con el id de su título. */
  readonly contenido = computed(() => this.secciones().map((s) => ({ id: `${this.ficha().id}-${s.id}`, titulo: s.titulo })));

  readonly seccion = 'mt-14 border-t border-border pt-10';
  readonly chip = 'inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-[12px] text-text-muted';

  /** «En esta página» desplaza a la sección sin recargar: con `<base href="/">` un `#id` sacaría del catálogo. */
  irA(evento: Event, id: string): void {
    evento.preventDefault();
    const destino = (evento.target as HTMLElement).ownerDocument.getElementById(id);
    destino?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
