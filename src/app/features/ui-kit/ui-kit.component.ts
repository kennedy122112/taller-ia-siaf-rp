import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { ButtonComponent, FocoDirective, IconComponent, TextFieldComponent, textoDeCampo } from '@kennedy122112/siaf-rp-ui-angular';
import { UiKitBuscadorComponent } from './comun/ui-kit-buscador.component';
import { filtrarSecciones } from './fundamentos/secciones';
import { filtrarPrimerosPasos } from './primeros-pasos/primeros-pasos';
import { VERSION_KIT } from './ui-kit.cargadores';
import { UiKitTemaService } from './ui-kit-tema.service';
import { FICHAS_UI_KIT, GRUPOS_UI_KIT, fichaPorId, fundamentoPorId } from './ui-kit.datos';
import { RUTA_UI_KIT, filtrar, rutaDeFicha, rutaDeFundamento, rutaDePrimerosPasos } from './ui-kit.vista';

/** Un grupo del menú lateral: los fundamentos visuales y después cada categoría con sus componentes. */
interface GrupoMenu {
  titulo: string;
  icono: string;
  enlaces: { ruta: string; nombre: string; detalle: string | null }[];
}

/**
 * Catálogo público de componentes en /ui-kit, con la estructura del sitio del design system: encabezado fijo, menú
 * lateral con los fundamentos y los componentes por categoría, y una página por cada uno (las rutas hijas de
 * `ui-kit.routes.ts`: la portada, `fundamentos/:id` y `componentes/:id`).
 *
 * Todo lo que describe a cada componente sale del código (`scripts/generar-ui-kit.mjs` escribe `ui-kit.manifest.ts`);
 * aquí solo se arma la navegación. El buscador del menú filtra fundamentos y componentes por nombre, selector o
 * descripción. En móvil y tablet el menú es un panel que se abre desde el encabezado.
 *
 * Los enlaces viejos a una sección de la página única (`/ui-kit#siaf-menu`) llevan a su página nueva.
 */
@Component({
  selector: 'siaf-ui-kit',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, FocoDirective, IconComponent, RouterLink, RouterLinkActive, RouterOutlet, TextFieldComponent, UiKitBuscadorComponent],
  host: { '(document:keydown)': 'alTeclear($event)' },
  template: `
    <div class="min-h-screen bg-surface text-text">
      <button
        class="sr-only z-50 rounded-siaf-md bg-surface px-4 py-2 text-sm font-semibold focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-3 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-border-states-focus"
        type="button"
        (click)="saltarAlContenido()"
      >
        Saltar al contenido
      </button>

      <header class="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-surface px-4 lg:px-6" data-ui-kit-encabezado>
        <!-- El host de siaf-button fija su display: la visibilidad responsive va en un contenedor. -->
        <div class="lg:hidden">
          <siaf-button
            variant="ghost"
            size="sm"
            icon="menu"
            [iconOnly]="true"
            ariaLabel="Abrir el menú del catálogo"
            (click)="menuAbierto.set(!menuAbierto())"
          />
        </div>
        <a
          class="flex min-w-0 items-center gap-2 rounded-siaf-sm focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-states-focus"
          [routerLink]="raiz"
          aria-label="SIAF-RP Design System, inicio"
        >
          <!-- El SVG no conserva su proporción (preserveAspectRatio="none"): ancho y alto fijos, igual que el navbar de la app. -->
          <img class="h-8 w-[102px] shrink-0 object-contain" [src]="logo()" alt="" />
          <span class="hidden whitespace-nowrap text-sm text-text-muted sm:inline">Design System</span>
        </a>
        <div class="ml-auto flex items-center gap-3">
          <button
            class="hidden h-9 w-60 items-center gap-2 rounded-siaf-md border border-border px-3 text-text-muted transition hover:border-border-states-hover focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-states-focus md:flex"
            type="button"
            aria-haspopup="dialog"
            data-ui-kit-abrir-buscador
            (click)="buscadorAbierto.set(true)"
          >
            <siaf-icon name="search" [size]="18" />
            <!-- La fuente va en el texto: la regla global button { font: inherit } pisa las utilidades del botón. -->
            <span class="flex-1 text-left text-sm">Buscar…</span>
            <kbd class="rounded-siaf-sm border border-border px-1.5 font-mono text-[11px]">{{ atajo }}</kbd>
          </button>
          <div class="md:hidden">
            <siaf-button variant="ghost" size="sm" icon="search" [iconOnly]="true" ariaLabel="Buscar en el catálogo" (click)="buscadorAbierto.set(true)" />
          </div>
          <span class="hidden whitespace-nowrap rounded-full border border-border px-2.5 py-0.5 text-[11px] text-text-muted xl:inline" data-ui-kit-version>
            Kit {{ version }} · Angular 21 · Tailwind 4 · {{ total }} componentes
          </span>
          <siaf-button
            variant="ghost"
            size="sm"
            [icon]="tema() === 'dark' ? 'light_mode' : 'dark_mode'"
            [iconOnly]="true"
            [ariaLabel]="tema() === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
            (click)="alternarTema()"
          />
        </div>
      </header>
      <siaf-ui-kit-buscador [abierto]="buscadorAbierto()" (cerrar)="buscadorAbierto.set(false)" />

      <div class="lg:grid lg:grid-cols-[264px_minmax(0,1fr)]">
        @if (menuAbierto()) {
          <button class="fixed inset-0 top-14 z-20 bg-black/30 lg:hidden" type="button" aria-label="Cerrar el menú" (click)="menuAbierto.set(false)"></button>
        }
        <!-- Solo la lista se desplaza: el buscador queda fijo arriba. -->
        <aside
          id="ui-kit-menu"
          class="fixed bottom-0 left-0 top-14 z-20 w-[264px] max-w-[85vw] flex-col border-r border-border bg-surface lg:sticky lg:flex lg:h-[calc(100vh-3.5rem)] lg:max-w-none"
          [class.hidden]="!menuAbierto()"
          [class.flex]="menuAbierto()"
          aria-label="Menú del catálogo"
          [siafFoco]="menuAbierto()"
          (siafFocoEscape)="menuAbierto.set(false)"
        >
          <div class="shrink-0 px-4 pb-2 pt-4" data-ui-kit-buscador>
            <siaf-input
              label="Buscar"
              leadingIcon="search"
              [clearable]="true"
              [autoSuccess]="false"
              [value]="busqueda()"
              (valueChange)="busqueda.set(textoDeCampo($event))"
            />
            @if (busqueda()) {
              <p class="mt-2 px-1 text-xs text-text-muted" role="status">{{ resultados() }} resultados</p>
            }
          </div>
          <nav class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-8 pt-2" aria-label="Secciones" data-ui-kit-menu>
            <ul>
              <li>
                <a
                  [class]="claseEnlace"
                  [routerLink]="raiz"
                  routerLinkActive="bg-bg-states-light-selected font-semibold text-text-neutral-activated"
                  [routerLinkActiveOptions]="{ exact: true }"
                  ariaCurrentWhenActive="page"
                  data-foco-inicial
                  >Inicio</a
                >
              </li>
            </ul>
            @for (grupo of menu(); track grupo.titulo) {
              <p class="mb-1 mt-5 flex items-center gap-2 px-3 text-[11px] font-bold uppercase tracking-widest text-text-muted" data-ui-kit-grupo>
                <siaf-icon [name]="grupo.icono" [size]="16" />
                {{ grupo.titulo }}
              </p>
              <ul class="space-y-0.5">
                @for (enlace of grupo.enlaces; track enlace.ruta) {
                  <li>
                    <a
                      [class]="claseEnlace"
                      [routerLink]="enlace.ruta"
                      routerLinkActive="bg-bg-states-light-selected font-semibold text-text-neutral-activated"
                      ariaCurrentWhenActive="page"
                      [attr.title]="enlace.detalle"
                      [attr.data-ruta]="enlace.ruta"
                      >{{ enlace.nombre }}</a
                    >
                  </li>
                }
              </ul>
            } @empty {
              <p class="mt-6 px-3 text-sm text-text-muted">Ningún fundamento ni componente coincide con «{{ busqueda() }}».</p>
            }
          </nav>
        </aside>

        <main class="min-w-0 focus:outline-none" id="contenido" tabindex="-1">
          <div class="mx-auto max-w-[1200px] px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
            <router-outlet />
            <footer class="mt-20 flex flex-col gap-2 border-t border-border pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
              <p>Generado desde el código con <code class="font-mono">npm run ui-kit:manifest</code>.</p>
              <p class="shrink-0" data-ui-kit-autores>Creado por <span class="font-semibold text-text">Brian Meneses</span> y <span class="font-semibold text-text">Adib Checori</span></p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  `,
})
export class UiKitComponent {
  private readonly documento = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly textoDeCampo = textoDeCampo;
  readonly raiz = RUTA_UI_KIT;
  readonly total = FICHAS_UI_KIT.length;
  readonly claseEnlace =
    'block truncate rounded-siaf-md px-3 py-1.5 text-[13px] leading-6 text-text transition hover:bg-bg-states-light-hover focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-border-states-focus';

  readonly version = VERSION_KIT;
  /** El atajo de la búsqueda global, como lo escribe cada sistema. */
  readonly atajo = /Mac|iPhone|iPad/.test(globalThis.navigator?.platform ?? '') ? '⌘K' : 'Ctrl K';
  readonly buscadorAbierto = signal(false);
  readonly busqueda = signal('');
  readonly menuAbierto = signal(false);
  private readonly temas = inject(UiKitTemaService);
  readonly tema = this.temas.tema;
  readonly logo = computed(() => `assets/figma/logos/siaf-rp-default-${this.tema() === 'dark' ? 'white' : 'color'}.svg`);

  readonly menu = computed<GrupoMenu[]>(() => {
    const q = this.busqueda();
    const fundamentos = filtrarSecciones(q);
    const grupos: GrupoMenu[] = filtrar(GRUPOS_UI_KIT, q).map((g) => ({
      titulo: g.categoria.titulo,
      icono: g.categoria.icono,
      enlaces: g.fichas.map((f) => ({ ruta: rutaDeFicha(f.id), nombre: f.titulo, detalle: f.nombre })),
    }));
    const pasos = filtrarPrimerosPasos(q);
    return [
      ...(pasos.length ? [{ titulo: 'Primeros pasos', icono: 'rocket_launch', enlaces: pasos.map((p) => ({ ruta: rutaDePrimerosPasos(p.id), nombre: p.titulo, detalle: null })) }] : []),
      ...(fundamentos.length ? [{ titulo: 'Fundamentos visuales', icono: 'palette', enlaces: fundamentos.map((s) => ({ ruta: rutaDeFundamento(s.id), nombre: s.titulo, detalle: null })) }] : []),
      ...grupos,
    ];
  });
  readonly resultados = computed(() => this.menu().reduce((n, g) => n + g.enlaces.length, 0));

  constructor() {
    this.temas.aplicar();
    this.redirigirEnlaceViejo();
    // Cada página empieza arriba, y en móvil el menú se cierra al elegir.
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.menuAbierto.set(false);
        // Con una sección en la dirección (/ui-kit/componentes/siaf-tabs#siaf-tabs-api) se va a ella; si no, arriba.
        const fragmento = this.router.parseUrl(this.router.url).fragment;
        if (fragmento) this.irAlFragmento(fragmento);
        else this.documento.defaultView?.scrollTo({ top: 0 });
      });
  }

  /** Ctrl+K (⌘K en Mac) abre la búsqueda global desde cualquier parte del catálogo. */
  alTeclear(evento: KeyboardEvent): void {
    if ((evento.ctrlKey || evento.metaKey) && evento.key.toLowerCase() === 'k') {
      evento.preventDefault();
      this.buscadorAbierto.set(!this.buscadorAbierto());
    }
  }

  /** La página se carga en diferido: se espera a que su sección exista, unos cuadros como máximo. */
  private irAlFragmento(id: string, intentos = 30): void {
    const destino = this.documento.getElementById(id);
    if (destino) {
      destino.scrollIntoView({ block: 'start' });
      return;
    }
    if (intentos > 0) this.documento.defaultView?.requestAnimationFrame(() => this.irAlFragmento(id, intentos - 1));
  }

  alternarTema(): void {
    this.temas.alternar();
  }

  saltarAlContenido(): void {
    this.host.nativeElement.querySelector<HTMLElement>('#contenido')?.focus();
  }

  /** `/ui-kit#siaf-menu` o `/ui-kit#color` (la página única de antes) → la página de ese componente o fundamento. */
  private redirigirEnlaceViejo(): void {
    const id = this.route.snapshot.fragment;
    if (!id || this.route.snapshot.firstChild?.routeConfig?.path !== '') return;
    const ruta = fichaPorId(id) ? rutaDeFicha(id) : fundamentoPorId(id) ? rutaDeFundamento(id) : null;
    if (ruta) void this.router.navigateByUrl(ruta, { replaceUrl: true });
  }
}
