import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';

import { ButtonComponent, IconComponent } from '@kennedy122112/siaf-rp-ui-angular';
import { GRUPOS_UI_KIT, RESUMEN_UI_KIT } from '../ui-kit.datos';
import { ARCHIVO_FIGMA_UI_KIT, rutaDeFicha, rutaDeFundamento, rutaDePrimerosPasos } from '../ui-kit.vista';

/** Un paso de «Cómo está construido». */
interface Paso {
  titulo: string;
  texto: string;
  archivo: string;
}

/**
 * Portada del catálogo: qué es el design system, accesos a los fundamentos y a un componente, cómo se arma (de las
 * variables de Figma a los tokens CSS, las utilidades de Tailwind y las fichas que salen del código) y las categorías.
 */
@Component({
  selector: 'siaf-ui-kit-inicio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, IconComponent, RouterLink],
  template: `
    <section class="max-w-3xl">
      <p class="text-[11px] font-bold uppercase tracking-widest text-text-muted">SIAF-RP · Sistema de diseño</p>
      <h1 class="mt-3 text-4xl font-bold leading-tight tracking-tight lg:text-5xl">Diseña y construye con una sola fuente</h1>
      <p class="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">
        Tokens, fundamentos y componentes del SIAF-RP. Las variables de Figma generan los tokens CSS que usan los componentes de Angular y las
        utilidades de Tailwind, en tema claro y oscuro, y cada ficha sale del código.
      </p>
      <div class="mt-8 flex flex-wrap items-center gap-3">
        <siaf-button (click)="ir(instalacion)">Empezar</siaf-button>
        <siaf-button variant="outline" (click)="ir(primerComponente)">Ver componentes</siaf-button>
        <a
          class="inline-flex h-10 items-center gap-2 rounded-siaf-md px-4 text-sm font-medium text-text-neutral-medium hover:bg-bg-states-light-hover focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-states-focus"
          [href]="figma"
          target="_blank"
          rel="noopener noreferrer"
        >
          <siaf-icon name="open_in_new" [size]="18" />
          Abrir en Figma
        </a>
      </div>
    </section>

    <section class="mt-14 grid gap-4 md:grid-cols-3" aria-label="Accesos">
      @for (acceso of accesos; track acceso.titulo) {
        <a
          class="group flex flex-col rounded-siaf-lg border border-border bg-surface p-5 transition hover:border-border-states-hover hover:shadow-siaf-sm focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-states-focus"
          [routerLink]="acceso.ruta"
          data-ui-kit-acceso
        >
          <span class="text-[11px] font-bold uppercase tracking-widest text-text-brand-primary">{{ acceso.etiqueta }}</span>
          <span class="mt-2 text-lg font-semibold text-text">{{ acceso.titulo }}</span>
          <span class="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{{ acceso.texto }}</span>
          <span class="mt-5 inline-flex items-center gap-1 text-sm font-medium text-text-brand-primary">Abrir <siaf-icon name="arrow_forward" [size]="16" /></span>
        </a>
      }
    </section>

    <section class="mt-16" aria-labelledby="ui-kit-construido">
      <h2 class="text-2xl font-bold" id="ui-kit-construido">Cómo está construido</h2>
      <ol class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        @for (paso of pasos; track paso.titulo; let i = $index) {
          <li class="flex flex-col rounded-siaf-lg bg-bg-surfaces-surface-low p-5">
            <span class="flex size-7 items-center justify-center rounded-full bg-bg-brand-primary text-sm font-bold text-text-brand-white">{{ i + 1 }}</span>
            <span class="mt-4 font-semibold text-text">{{ paso.titulo }}</span>
            <span class="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{{ paso.texto }}</span>
            <code class="mt-4 self-start rounded-siaf-sm bg-surface px-2 py-1 font-mono text-[11px] text-text [overflow-wrap:anywhere]">{{ paso.archivo }}</code>
          </li>
        }
      </ol>
    </section>

    <section class="mt-16" aria-labelledby="ui-kit-numeros">
      <h2 class="text-2xl font-bold" id="ui-kit-numeros">El kit en números</h2>
      <div class="mt-6 flex flex-wrap gap-4">
        @for (dato of resumen; track dato.etiqueta) {
          <div class="min-w-[140px] rounded-siaf-lg border border-border px-5 py-4">
            <p class="text-2xl font-bold">{{ dato.valor }}</p>
            <p class="text-xs text-text-muted">{{ dato.etiqueta }}</p>
          </div>
        }
      </div>
    </section>

    <section class="mt-16" aria-labelledby="ui-kit-categorias">
      <h2 class="text-2xl font-bold" id="ui-kit-categorias">Componentes por categoría</h2>
      <ul class="mt-6 grid gap-4 sm:grid-cols-2">
        @for (grupo of categorias; track grupo.titulo) {
          <li>
            <a
              class="flex h-full gap-4 rounded-siaf-lg border border-border p-5 transition hover:border-border-states-hover hover:shadow-siaf-sm focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-states-focus"
              [routerLink]="grupo.ruta"
              data-ui-kit-categoria
            >
              <siaf-icon class="shrink-0 text-text-brand-primary" [name]="grupo.icono" [size]="24" />
              <span class="min-w-0">
                <span class="block font-semibold text-text">{{ grupo.titulo }} <span class="font-normal text-text-muted">· {{ grupo.cantidad }}</span></span>
                <span class="mt-1 block text-sm leading-relaxed text-text-muted">{{ grupo.descripcion }}</span>
              </span>
            </a>
          </li>
        }
      </ul>
    </section>
  `,
})
export class UiKitInicioComponent {
  private readonly router = inject(Router);

  readonly figma = `https://www.figma.com/design/${ARCHIVO_FIGMA_UI_KIT}/`;
  readonly primerComponente = rutaDeFicha('siaf-button');
  readonly instalacion = rutaDePrimerosPasos('instalacion');
  readonly resumen = RESUMEN_UI_KIT;

  readonly accesos = [
    { etiqueta: 'Primeros pasos', titulo: 'Instalación', texto: 'Agrega el kit a un proyecto Angular 21: el paquete, los estilos con o sin Tailwind y la fuente.', ruta: rutaDePrimerosPasos('instalacion') },
    { etiqueta: 'Fundamentos', titulo: 'Color', texto: 'Superficies, texto, bordes, íconos, feedback y estados, en tema claro y oscuro.', ruta: rutaDeFundamento('color') },
    { etiqueta: 'Componentes', titulo: 'Button', texto: 'Filled, Outline y Text en dos tamaños, con estados y guía de uso.', ruta: rutaDeFicha('siaf-button') },
  ];

  readonly pasos: Paso[] = [
    { titulo: 'Variables en Figma', texto: 'Las colecciones del UI KIT, exportadas a JSON y versionadas en el repositorio.', archivo: 'src/tokens/*.json' },
    { titulo: 'Tokens CSS', texto: 'Un script escribe las variables --sys-* de cada tema y tamaño de pantalla.', archivo: 'npm run tokens:build' },
    { titulo: 'Utilidades de Tailwind', texto: 'El @theme conecta cada token con su utilidad: bg-surface, text-text-muted…', archivo: 'src/styles/tokens/figma.css' },
    { titulo: 'Catálogo desde el código', texto: 'Un script lee cada componente (selector, JSDoc, entradas y tokens) y arma su ficha.', archivo: 'npm run ui-kit:manifest' },
  ];

  readonly categorias = GRUPOS_UI_KIT.map((g) => ({
    titulo: g.categoria.titulo,
    descripcion: g.categoria.descripcion,
    icono: g.categoria.icono,
    cantidad: g.fichas.length,
    ruta: rutaDeFicha(g.fichas[0].id),
  }));

  constructor() {
    inject(Title).setTitle('SIAF-RP Design System');
  }

  ir(ruta: string): void {
    void this.router.navigateByUrl(ruta);
  }
}
