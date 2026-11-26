# Timeline

> `siaf-timeline` · Componente de Trazabilidad del documento · Sin uso en la app

Seguimiento horizontal del avance de un proceso: título, «Ver detalle» y una barra con un punto por hito
(Figma UI KIT, nodo 19149:1300 «TIMELINE»).

La barra se llena hasta el hito `current` (índice desde 0): los anteriores quedan cumplidos, ese va en
curso y los siguientes pendientes. `current = -1` es un proceso sin empezar y `current = items.length`,
uno terminado. Cada punto muestra su nombre y fecha con `siafTooltip` al pasar el puntero o al llegar
con el teclado, y los lectores de pantalla lo anuncian con su posición y estado.

«Ver detalle» abre `siaf-timeline-detail-panel` con el avance y la línea de tiempo vertical (fecha,
`dateInfo` y `description` de cada hito) y además emite `detail`. Con `[openDetailPanel]="false"` solo
emite, para que el padre muestre su propio detalle.

## Importar

```ts
import { TimelineComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-timeline />
```

### Cuándo usarlo

- Para seguir el avance de un proceso largo por hitos con fecha dentro de una tarjeta de resumen, por ejemplo las
  etapas del ejercicio contable (apertura, contabilización y cierre) en un tablero.
- Cuando cada hito tiene fecha, `dateInfo` o `description` que conviene ver en el panel «Ver detalle», o el padre
  muestra su propio detalle con `[openDetailPanel]="false"`.
- Hoy sin consumidores fuera del catálogo `/ui-kit`.

### Cuándo no

- Para el flujo de aprobación de una solicitud (Elaborado, Verificado, Aprobado): usar `siaf-action-tracker`.
- Para pasos con el nombre siempre visible: usar `siaf-steps`; aquí el nombre de cada hito solo sale en el tooltip.
- Con muchos hitos en poco ancho: cada hito mide al menos 16 px y los puntos se amontonan; usar `siaf-steps`
  vertical.
- Para un porcentaje sin hitos: usar `siaf-loading-progress` o `siaf-progress-circular`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `current` | `number` | `-1` | Índice del hito en curso (desde 0). -1: sin empezar; `items.length`: terminado. |
| `detailLabel` | `string` | `'Ver detalle'` |  |
| `itemLabel` | `string` | `'hito'` | Cómo se llama un hito en el resumen del detalle: «9 procedimientos completados de 11». |
| `items` | `TimelineItem[]` | `[]` |  |
| `itemsLabel` | `string` | `'hitos'` |  |
| `openDetailPanel` | `boolean` | `true` | Si «Ver detalle» abre el panel de detalle incluido. En `false` solo emite `detail`. |
| `processName` | `string` | `''` | Nombre del proceso en la tarjeta del detalle; por defecto, el `title`. |
| `showDetail` | `boolean` | `true` |  |
| `title` | `string` | `''` | Qué proceso se sigue; va en mayúsculas y se corta con tooltip si no entra. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(detail)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `aria-current`, `aria-label`.

### Teclado

- **Tab**: pasa por «Ver detalle» y luego por cada punto de la barra; al enfocar un punto aparece su tooltip con
  nombre y fecha.
- **Enter / Espacio** en «Ver detalle»: abren `siaf-timeline-detail-panel` y emiten `detail` (sigue `siaf-button`).
- El panel de detalle se cierra con su X o con Escape; el foco vuelve a «Ver detalle».

### Notas

- **1.3.1 Información y relaciones (A)**: los hitos son una lista ordenada (`ol` y `li`) dentro de un `section`
  con `aria-label` igual al título, que además es un `h3`.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: cada punto anuncia «Hito N de M: nombre · fecha, estado» y el
  actual lleva `aria-current="step"`, pero es un `span` con `tabindex="0"` sin rol: ARIA no admite `aria-label` en
  un elemento genérico y no todos los lectores de pantalla lo leen.
- **1.4.1 Uso del color (A)**: el avance se ve por el largo de la barra llena, que llega hasta el hito en curso, no
  solo por el tono de los puntos.
- **1.4.3 Contraste mínimo (AA)**: título `text-neutral-high` 16.29:1 (oscuro 16.53:1) sobre la superficie.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: en oscuro la barra llena y el contorno de foco de los puntos
  (`bg-brand-primary`) dan 2.66:1 sobre la superficie; en los hitos cumplidos ese contorno además se funde con la
  barra del mismo color.
- **1.4.13 Contenido en hover o foco (AA)**: el tooltip de los puntos se cierra con Escape y se puede recorrer con el
  puntero.
- **Pendiente · 2.1.1 Teclado (A)**: el título truncado no recibe foco: su texto completo solo sale con el puntero
  (el lector de pantalla sí lo lee entero).
- **2.4.7 Foco visible (AA)**: cada punto muestra un contorno de 2 px `border-states-focus` (5.35:1 claro / 10.15:1
  oscuro); «Ver detalle» sigue `siaf-button`.
- **2.4.3 Orden del foco (A)**: el panel de «Ver detalle» (`siaf-timeline-detail-panel`, con `siafFoco`) lleva el
  foco a su X al abrir, cierra con Escape y lo devuelve a «Ver detalle».

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-button`](siaf-button.md), [`siaf-timeline-detail-panel`](siaf-timeline-detail-panel.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-timeline
