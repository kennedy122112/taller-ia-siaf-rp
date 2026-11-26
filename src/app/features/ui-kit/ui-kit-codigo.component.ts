import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, input, signal } from '@angular/core';

import { IconComponent } from '@kennedy122112/siaf-rp-ui-angular';
import { Lenguaje, TipoTrozo, Trozo, lenguajeDe, resaltar } from './comun/resaltado';

/** Una línea del editor: sus trozos resaltados y, en un diff, si se quita o se agrega. */
interface LineaEditor {
  trozos: Trozo[];
  cambio: 'quita' | 'agrega' | null;
}

/** El color de cada tipo de trozo, con los tokens del editor. */
const COLOR: Record<TipoTrozo, string> = {
  texto: 'text-code-text',
  comentario: 'text-code-comment italic',
  etiqueta: 'text-code-tag',
  atributo: 'text-code-attribute',
  cadena: 'text-code-string',
  clave: 'text-code-keyword',
  tipo: 'text-code-type',
  funcion: 'text-code-function',
  numero: 'text-code-number',
  puntuacion: 'text-code-punctuation',
};

/** El ícono y su color en la pestaña, según el lenguaje. */
const PESTANA: Record<Lenguaje, { icono: string; color: string }> = {
  html: { icono: 'code', color: 'text-code-string' },
  ts: { icono: 'data_object', color: 'text-code-tag' },
  css: { icono: 'tag', color: 'text-code-attribute' },
  json: { icono: 'data_object', color: 'text-code-function' },
  terminal: { icono: 'terminal', color: 'text-code-muted' },
  texto: { icono: 'description', color: 'text-code-muted' },
};

/**
 * Bloque de código del catálogo con la apariencia de un editor oscuro (la paleta de VS Code «Dark+», siempre en oscuro
 * aunque la página esté en claro): una barra con la pestaña del archivo y su ícono, el botón de copiar, los números de
 * línea y la sintaxis resaltada (`comun/resaltado.ts`). En un diff, las líneas con `-` se marcan en rojo y las con `+`
 * en verde, con su signo en lugar del número; copiar da la versión nueva. Con `estado`, la pestaña dice «Así no» o
 * «Así sí» con su ícono. Los números van en un `::before`, así que no se copian ni los lee el lector de pantalla.
 */
@Component({
  selector: 'siaf-ui-kit-codigo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  host: { class: 'block min-w-0' },
  template: `
    <div class="overflow-hidden rounded-siaf-lg border border-code-border bg-code-bg" [attr.data-ui-kit-editor]="lenguaje()" [attr.data-estado]="estado()">
      <div class="flex h-9 items-stretch border-b border-code-border bg-code-bar">
        <!-- La pestaña activa, como en el editor: el fondo del código y una línea arriba. -->
        <div class="flex min-w-0 items-center gap-2 border-r border-t-2 border-code-border border-t-code-tag bg-code-bg px-3">
          @if (estado(); as e) {
            <siaf-icon [class]="e === 'incorrecto' ? 'text-code-diff-removed-sign' : 'text-code-diff-added-sign'" [name]="e === 'incorrecto' ? 'cancel' : 'check_circle'" [size]="16" />
            <span class="truncate font-mono text-xs text-code-text" data-ui-kit-estado>{{ e === 'incorrecto' ? 'Así no' : 'Así sí' }}</span>
          } @else {
            <siaf-icon [class]="pestana().color" [name]="pestana().icono" [size]="16" />
            <span class="truncate font-mono text-xs text-code-text">{{ archivo() }}</span>
          }
        </div>
        <span class="flex-1"></span>
        <button
          class="m-1 inline-flex size-7 items-center justify-center rounded-siaf-md text-code-muted transition hover:bg-code-border hover:text-code-text focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-code-attribute"
          type="button"
          [attr.aria-label]="copiado() ? 'Copiado' : 'Copiar ' + (estado() ? 'el código' : archivo())"
          (click)="copiar()"
        >
          <siaf-icon [name]="copiado() ? 'check' : 'content_copy'" [size]="16" />
        </button>
      </div>
      <!-- La barra de desplazamiento también en oscuro, como la del editor. -->
      <pre class="overflow-x-auto py-3 font-mono text-[12px] leading-relaxed [scrollbar-color:var(--sys-color-code-border)_var(--sys-color-code-bg)]" data-ui-kit-codigo><code class="block min-w-max">@for (linea of lineas(); track $index; let i = $index) {<span
            class="flex min-h-[1.625em] pr-6 before:w-12 before:shrink-0 before:select-none before:pr-4 before:text-right before:content-[attr(data-n)]"
            [class.bg-code-diff-removed]="linea.cambio === 'quita'"
            [class.bg-code-diff-added]="linea.cambio === 'agrega'"
            [class.before:text-code-diff-removed-sign]="linea.cambio === 'quita'"
            [class.before:text-code-diff-added-sign]="linea.cambio === 'agrega'"
            [class.before:text-code-muted]="!linea.cambio"
            [attr.data-n]="modo() === 'diff' ? (linea.cambio === 'quita' ? '−' : linea.cambio === 'agrega' ? '+' : ' ') : i + 1"
            [attr.data-linea]="modo() === 'diff' ? (linea.cambio === 'quita' ? 'quita' : linea.cambio === 'agrega' ? 'agrega' : 'igual') : null"
            ><span class="whitespace-pre">@for (t of linea.trozos; track $index) {<span [class]="color[t.tipo]">{{ t.texto }}</span>}</span></span
          >}</code></pre>
    </div>
  `,
})
export class UiKitCodigoComponent {
  private readonly destroyRef = inject(DestroyRef);

  /** El nombre del archivo de la pestaña; con él se elige el lenguaje. */
  readonly archivo = input.required<string>();
  readonly codigo = input.required<string>();
  /** El lenguaje, si el nombre del archivo no lo dice. */
  readonly lenguajeDelCodigo = input<Lenguaje | null>(null);
  /** `diff`: las líneas que empiezan con `-` se quitan y las con `+` se agregan. */
  readonly modo = input<'codigo' | 'diff'>('codigo');
  /** «Así no» o «Así sí» en la pestaña, en vez del archivo. */
  readonly estado = input<'incorrecto' | 'correcto' | null>(null);

  protected readonly color = COLOR;
  readonly copiado = signal(false);

  readonly lenguaje = computed<Lenguaje>(() => this.lenguajeDelCodigo() ?? lenguajeDe(this.archivo()));
  readonly pestana = computed(() => PESTANA[this.lenguaje()]);

  /** Las líneas del diff con su cambio y sin el signo; en código, cada línea tal cual. */
  private readonly partes = computed(() => {
    const lineas = this.codigo()
      .split('\n')
      .map((texto) => {
        if (this.modo() !== 'diff') return { texto, cambio: null };
        const cambio = texto.startsWith('-') ? 'quita' : texto.startsWith('+') ? 'agrega' : null;
        return { texto: cambio || texto.startsWith(' ') ? texto.slice(1) : texto, cambio } as const;
      });
    if (this.modo() !== 'diff') return lineas;
    // Sin el signo, se quita la sangría que tienen todas las líneas: el código queda alineado al borde.
    const sangria = Math.min(...lineas.filter((l) => l.texto.trim()).map((l) => l.texto.length - l.texto.trimStart().length));
    return lineas.map((l) => ({ ...l, texto: l.texto.slice(Number.isFinite(sangria) ? sangria : 0) }));
  });

  readonly lineas = computed<LineaEditor[]>(() => {
    const partes = this.partes();
    const resaltadas = resaltar(partes.map((p) => p.texto).join('\n'), this.lenguaje());
    return partes.map((p, i) => ({ trozos: resaltadas[i] ?? [], cambio: p.cambio }));
  });

  /** Lo que se copia: el código tal cual o, en un diff, la versión nueva (sin las líneas que se quitan). */
  readonly textoACopiar = computed(() =>
    this.modo() === 'diff'
      ? this.partes()
          .filter((p) => p.cambio !== 'quita')
          .map((p) => p.texto)
          .join('\n')
      : this.codigo(),
  );

  async copiar(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.textoACopiar());
      this.copiado.set(true);
      const t = setTimeout(() => this.copiado.set(false), 1500);
      this.destroyRef.onDestroy(() => clearTimeout(t));
    } catch {
      // Sin permiso de portapapeles (iframe o navegador antiguo): el código sigue visible para copiarlo a mano.
    }
  }
}
