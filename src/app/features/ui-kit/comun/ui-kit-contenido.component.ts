import { DOCUMENT, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, NgZone, afterNextRender, inject, input, signal } from '@angular/core';

/** Una sección de la página: el id de su título y su nombre. */
export interface EntradaContenido {
  id: string;
  titulo: string;
}

/** Distancia desde arriba de la ventana a la que una sección cuenta como la que se lee: el encabezado fijo y un margen. */
const LINEA_DE_LECTURA = 120;

/**
 * Índice «Contenido» fijo a la derecha de una página del catálogo, como el de la documentación de Material UI: lista las
 * secciones, marca la que se está leyendo al desplazarse (la primera, arriba de todo) y lleva a cada una. Al pie de la
 * página, marca la última. Se pinta a partir de 1280 px (`xl`); en pantallas más chicas cada página lleva sus enlaces arriba.
 */
@Component({
  selector: 'siaf-ui-kit-contenido',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <nav aria-label="Contenido de la página" data-ui-kit-contenido>
      <p class="mb-3 text-[11px] font-bold uppercase tracking-widest text-text-muted">Contenido</p>
      <ul class="space-y-1 border-l border-border">
        @for (s of secciones(); track s.id) {
          <li>
            <a
              class="-ml-px block border-l-2 py-1 pl-3 text-[13px] leading-5 transition focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-border-states-focus"
              [class.border-text-brand-primary]="activa() === s.id"
              [class.font-semibold]="activa() === s.id"
              [class.text-text-brand-primary]="activa() === s.id"
              [class.border-transparent]="activa() !== s.id"
              [class.text-text-muted]="activa() !== s.id"
              [class.hover:text-text]="activa() !== s.id"
              [attr.href]="ruta() + '#' + s.id"
              [attr.aria-current]="activa() === s.id ? 'location' : null"
              [attr.data-contenido]="s.id"
              (click)="irA($event, s.id)"
              >{{ s.titulo }}</a
            >
          </li>
        }
      </ul>
    </nav>
  `,
})
export class UiKitContenidoComponent {
  private readonly documento = inject(DOCUMENT);
  private readonly location = inject(Location);
  private readonly zona = inject(NgZone);

  readonly secciones = input.required<readonly EntradaContenido[]>();
  readonly activa = signal<string | null>(null);

  private cuadro = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const ventana = this.documento.defaultView;
      if (!ventana) return;
      this.seguir();
      // Fuera de la zona: el scroll dispara muchos eventos y solo un cambio de sección necesita repintar.
      const alDesplazar = (): void => {
        if (this.cuadro) return;
        this.cuadro = ventana.requestAnimationFrame(() => {
          this.cuadro = 0;
          this.seguir();
        });
      };
      this.zona.runOutsideAngular(() => ventana.addEventListener('scroll', alDesplazar, { passive: true }));
      destroyRef.onDestroy(() => {
        ventana.removeEventListener('scroll', alDesplazar);
        if (this.cuadro) ventana.cancelAnimationFrame(this.cuadro);
      });
    });
  }

  /** La página sin su fragmento, para el `href` de cada enlace. */
  ruta(): string {
    return this.location.prepareExternalUrl(this.location.path().split('#')[0]);
  }

  irA(evento: Event, id: string): void {
    evento.preventDefault();
    this.activa.set(id);
    this.location.replaceState(`${this.location.path().split('#')[0]}#${id}`);
    this.documento.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /** Marca la última sección cuyo título ya subió hasta la línea de lectura; al pie de la página, la última. */
  seguir(): void {
    const ventana = this.documento.defaultView;
    if (!ventana) return;
    const pagina = this.documento.documentElement;
    const alFinal = pagina.scrollHeight > ventana.innerHeight && ventana.scrollY + ventana.innerHeight >= pagina.scrollHeight - 2;
    // Arriba de todo, antes de que suba la primera sección, se marca la primera, como en la documentación de MUI.
    let actual: string | null = this.secciones()[0]?.id ?? null;
    for (const s of this.secciones()) {
      const titulo = this.documento.getElementById(s.id);
      if (!titulo) continue;
      if (alFinal || titulo.getBoundingClientRect().top <= LINEA_DE_LECTURA) actual = s.id;
      else break;
    }
    if (alFinal) actual = this.secciones().at(-1)?.id ?? actual;
    if (actual !== this.activa()) this.zona.run(() => this.activa.set(actual));
  }
}
