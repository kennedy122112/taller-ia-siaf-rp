# Kpi card

> `siaf-kpi-card` · Componente de Gráficos

Tarjeta de indicador (Figma UI KIT, nodo 22743:662 «KPI card»): título, ícono en una caja de color, el monto
destacado y la barra de avance con su porcentaje, que siempre se muestra, como en el Figma (0 % sin `progress`). La
caja del ícono tiene cuatro tonos del Figma (`informative`, `success`, `warning` y `danger`); la barra es
`siaf-loading-progress`.

## Importar

```ts
import { KpiCardComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-kpi-card />
```

### Cuándo usarlo

- Para un número clave de un tablero, como «Total Activos», con su avance respecto de una meta.
- `tone` para acompañar el sentido del dato (éxito, advertencia, riesgo), repitiéndolo en el título o el monto.
- En una grilla junto a otras tarjetas KPI, sobre las `siaf-chart-section` del mismo tablero.

### Cuándo no

- Para una serie de valores o una comparación: usar `siaf-bar-chart` o `siaf-line-chart` dentro de
  `siaf-chart-section`.
- Para el resumen de un documento o registro elegido: usar `siaf-summary-card`.
- Para un número sin avance que medir: la barra siempre se muestra y quedaría en 0 %.
- Como única señal de un estado: el tono es solo color.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `amount` | `string` | `''` | Monto ya formateado («$1,245,800.00»). |
| `icon` | `string` | `'arrow_outward'` | Ícono de Material Icons de la caja; por defecto la flecha del Figma. |
| `progress` | `number` | `0` | Avance de 0 a 100 de la barra, que siempre se muestra; se recorta a ese rango. |
| `progressLabel` | `string` | `''` | Nombre de la barra para el lector de pantalla; por defecto, el título. |
| `title` | `string` | `''` | Qué mide el indicador («Total Activos»); también nombra la tarjeta y la barra. |
| `tone` | `'success' \| 'warning' \| 'danger' \| 'informative'` | `'informative'` |  |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `aria-hidden`, `aria-label`.

### Teclado

- No recibe foco: no es interactiva.

### Notas

- **1.3.1 Información y relaciones (A)**: es un `article` nombrado con el título; el ícono es decorativo
  (`aria-hidden`).
- **4.1.2 Nombre, función y valor (A)**: la barra es `role="progressbar"` con `aria-valuenow` y el título como
  nombre; el porcentaje visible va con `aria-hidden` para no leerse dos veces.
- **1.4.1 Uso del color (A)**: el tono del ícono no dice nada por sí solo; el sentido del dato debe estar en el
  título o en el monto.
- **1.4.3 Contraste mínimo (AA)**: monto `text-neutral-high` (16.29:1 claro / 16.53:1 oscuro), título
  `text-neutral-low` (5.01:1 / 8.86:1) y porcentaje `text-neutral-medium` sobre la superficie.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: en oscuro el relleno de la barra (`bg-brand-primary`) no llega
  a 3:1 sobre su riel; la paleta oscura de los gráficos está por definir con diseño.

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-icon`](siaf-icon.md), [`siaf-loading-progress`](siaf-loading-progress.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-kpi-card
