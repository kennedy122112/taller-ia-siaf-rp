# Report summary card

> `siaf-report-summary-card` · Componente de Superficies

«Card resumen» del resultado de un reporte (Guía de Estructura de Pantallas, nodo 22402:16450): sobre un fondo gris
con borde, una etiqueta en versalitas, el ítem consultado con su ícono, título y descripción, y a la derecha sus
datos clave, cada uno con su etiqueta encima y el valor destacado.

## Importar

```ts
import { ReportSummaryCardComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-report-summary-card [title]="…" />
```

### Cuándo usarlo

- En «Resultado de reporte» de `siaf-query-report-page`, entre las pestañas y el buscador, para resumir de qué es el
  reporte: la entidad, la cuenta o el pliego consultado y sus totales.
- Con dos o tres `fields` cortos (código, saldo, periodo); la descripción se corta en una línea con tooltip.

### Cuándo no

- Para el ítem elegido desde un panel lateral en una solicitud: usar `siaf-summary-card`, con indicador y ✕.
- Para los criterios que el usuario aplicó: van en `siaf-parametros-aplicados`.
- Para un monto con su avance: usar `siaf-kpi-card`.
- Con muchos datos: no hace scroll; más de tres campos se apilan en pantallas angostas pero cansan la lectura.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `description` | `string` | `''` | Línea de apoyo bajo el título; si no entra, se corta con tooltip. |
| `fields` | `readonly ReportSummaryField[]` | `[]` | Datos clave a la derecha, con su etiqueta encima. |
| `icon` | `string` | `''` | Ícono de Material Icons del ítem. |
| `label` | `string` | `''` | Qué se resume, en versalitas sobre el ítem («Entidad»); también nombra la sección. |
| `title` (obligatoria) | `string` | — | Nombre del ítem consultado. |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `aria-hidden`, `aria-label`.

### Teclado

- No recibe foco: no es interactiva. Si la descripción está cortada, su texto completo aparece con el puntero.

### Notas

- **1.3.1 Información y relaciones (A)**: es una `section` nombrada con la etiqueta; los datos son una lista de
  definiciones (`dl`), así cada valor se lee con su etiqueta.
- **1.1.1 Contenido no textual (A)**: el ícono es decorativo (`aria-hidden`): el título dice qué es.
- **1.4.3 Contraste mínimo (AA)**: título, descripción y valores `text-neutral-medium` sobre `surface-low` (13.46:1
  claro / 12.09:1 oscuro) y etiquetas `text-neutral-low` (4.64:1 / 8.32:1), la más justa en claro.
- **1.4.12 Espaciado del texto (AA)**: los textos no tienen alto fijo; el título y los valores pasan a otra línea si
  no entran.

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-report-summary-card
