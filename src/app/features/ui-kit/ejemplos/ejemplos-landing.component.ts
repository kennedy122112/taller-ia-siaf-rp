import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import {
  LandingCardsCarouselComponent,
  LandingChatButtonComponent,
  LandingDetailHeroComponent,
  LandingFooterComponent,
  LandingHeaderComponent,
  LandingSystemsBarComponent,
  type SistemaLanding,
  type TarjetaLanding,
} from '@kennedy122112/siaf-rp-ui-angular';

const RESUMEN = 'Conoce información, servicios y herramientas que fortalecen la gestión financiera de las entidades públicas.';

/**
 * Ejemplos en vivo de la categoría Página de inicio.
 *
 * El chat es `fixed`, así que su ejemplo lo pinta dentro de un recuadro con `transform` (`transform-gpu`), que pasa a ser
 * su contenedor: si no, se iría a la esquina de la página del catálogo. Las fotos vienen en los assets del kit
 * (`assets/landing`).
 */
@Component({
  selector: 'ui-kit-ejemplos-landing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LandingCardsCarouselComponent,
    LandingChatButtonComponent,
    LandingDetailHeroComponent,
    LandingFooterComponent,
    LandingHeaderComponent,
    LandingSystemsBarComponent,
  ],
  template: `
    @switch (selector()) {
      @case ('siaf-landing-header') {
        <siaf-landing-header />
      }
      @case ('siaf-landing-systems-bar') {
        <siaf-landing-systems-bar [sistemas]="sistemas" activo="tesoreria" />
      }
      @case ('siaf-landing-detail-hero') {
        <siaf-landing-detail-hero
          titulo="Tesorería"
          bajada="Conoce cómo Tesorería se integra al SIAF-RP para estandarizar procesos, compartir información confiable y fortalecer la gestión de los recursos públicos."
          imagen="assets/landing/servicio-detalle-hero.webp"
          alt="Sistema de Tesorería"
        />
      }
      @case ('siaf-landing-cards-carousel') {
        <siaf-landing-cards-carousel titulo="Servicios" [cards]="servicios" />
      }
      @case ('siaf-landing-footer') {
        <siaf-landing-footer [flush]="true" />
      }
      @case ('siaf-landing-chat-button') {
        <div class="relative h-[120px] transform-gpu overflow-hidden rounded-siaf-md bg-landing-bg-section">
          <siaf-landing-chat-button />
        </div>
      }
    }
  `,
})
export class EjemplosLandingComponent {
  static readonly selectores = [
    'siaf-landing-header',
    'siaf-landing-systems-bar',
    'siaf-landing-detail-hero',
    'siaf-landing-cards-carousel',
    'siaf-landing-footer',
    'siaf-landing-chat-button',
  ];
  readonly selector = input('');

  readonly sistemas: SistemaLanding[] = [
    { slug: 'contabilidad', nombre: 'Contabilidad', icono: 'savings' },
    { slug: 'abastecimiento', nombre: 'Abastecimiento', icono: 'ballot' },
    { slug: 'tesoreria', nombre: 'Tesorería', icono: 'account_balance_wallet' },
    { slug: 'presupuesto', nombre: 'Presupuesto', icono: 'fact_check' },
    { slug: 'endeudamiento', nombre: 'Endeudamiento', icono: 'admin_panel_settings' },
    { slug: 'inversiones', nombre: 'Inversiones', icono: 'assessment' },
    { slug: 'recursos-humanos', nombre: 'Recursos humanos', icono: 'accessibility_new' },
  ];

  /** Colores de etiqueta del Figma: tokens del landing en el tema del kit. */
  readonly servicios: TarjetaLanding[] = [
    {
      slug: 'seguimiento-inversiones',
      etiqueta: 'SIAF-RP',
      etiquetaColor: 'var(--sys-color-landing-tag-siaf)',
      titulo: 'Seguimiento y Eval. de las inversiones',
      resumen: RESUMEN,
      imagen: 'assets/landing/servicio-1.webp',
    },
    {
      slug: 'informacion-legal',
      etiqueta: 'NORMAS',
      etiquetaColor: 'var(--sys-color-landing-tag-normas)',
      titulo: 'Información legal',
      resumen: RESUMEN,
      imagen: 'assets/landing/servicio-2.webp',
    },
    {
      slug: 'indicadores-de-reportes',
      etiqueta: 'CONSULTA AMIGABLE',
      etiquetaColor: 'var(--sys-color-landing-tag-consulta)',
      titulo: 'Indicadores de reportes',
      resumen: RESUMEN,
      imagen: 'assets/landing/servicio-3.webp',
    },
    {
      slug: 'principales-consultas',
      etiqueta: 'PREGUNTAS FRECUENTES',
      etiquetaColor: 'var(--sys-color-landing-tag-faq)',
      titulo: 'Principales Consultas',
      resumen: RESUMEN,
      imagen: 'assets/landing/servicio-4.webp',
    },
  ];
}
