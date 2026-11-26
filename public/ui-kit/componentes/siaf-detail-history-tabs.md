# Detail history tabs

> `siaf-detail-history-tabs` · Componente de Trazabilidad del documento

Tabs reutilizables "Detalle | Historial" para vistas de solicitudes.
- Detalle: muestra un único comentario contextual (observación, rechazo, etc.)
- Historial: tabla completa con todas las iteraciones del flujo.

Diseño basado en Figma nodes 6591:3280 (tabs) y 30:6121 (historial). La franja de pestañas es
`siaf-tabs` subrayado (Figma «Tabs», Border=False).

## Importar

```ts
import { DetailHistoryTabsComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-detail-history-tabs />
```

### Cuándo usarlo

- En la solicitud abierta, para el comentario vigente (observación o motivo de rechazo) y la tabla de iteraciones:
  plan de cuentas (individual y carga masiva), clase y tipo de asiento de ajuste, asiento de ajuste y solicitud de
  apertura contable.
- Encima de `siaf-action-tracker`, que completa la trazabilidad con los responsables.
- Con `buildHistoryEntries` y `buildCurrentComment` de `detail-history-tabs.utils.ts` para armar los datos desde el
  historial de la solicitud.

### Cuándo no

- Para ver el historial desde la bandeja sin abrir la solicitud: usar `siaf-document-history-panel`.
- Para quién elaboró, verificó y aprobó: usar `siaf-action-tracker`.
- Para otras pestañas: usar `siaf-tabs` directamente; este componente fija Detalle / Historial y sus columnas.
- Rehacer a mano la tabla de iteraciones en otra solicitud: reusar este componente.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `comentario` | `DetailHistoryComment \| null` | `null` | Comentario del estado actual (opcional). Si está vacío se muestra `emptyDetalle`. |
| `detalleLabel` | `string` | `'Detalle'` | Etiquetas configurables. |
| `emptyDetalle` | `string` | `'Sin comentarios para mostrar.'` |  |
| `emptyHistorial` | `string` | `'Sin registros en el historial.'` |  |
| `emptyText` | `string` | `'—'` |  |
| `entries` | `DetailHistoryEntry[]` | `[]` | Entradas a renderizar en la tabla del historial. |
| `historialLabel` | `string` | `'Historial'` |  |
| `historialTitle` | `string` | `'Historial de comentarios y detalles'` |  |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- **Tab**: entra a la fila de pestañas en la activa y sale al contenido.
- **Flecha izquierda / derecha**: pasan de Detalle a Historial y viceversa, como en `siaf-tabs`.
- **Inicio / Fin**: van a Detalle o a Historial.

### Notas

- **Pendiente · 4.1.2 Nombre, función y valor (A)**: las pestañas son `siaf-tabs` (`role="tab"` con
  `aria-selected`), pero la fila no recibe `ariaLabel` y el contenido no es `role="tabpanel"` con `aria-labelledby`.
- **1.3.1 Información y relaciones (A)**: el historial es una `table` con `thead` y `th` bajo un `h3`; el comentario
  va como rótulo y párrafo.
- **1.4.1 Uso del color (A)**: la pestaña activa va en negrita con subrayado; proceso, comentario y fecha de cada
  iteración están en texto.
- **1.4.3 Contraste mínimo (AA)**: pestañas inactivas `text-neutral-low` 4.64:1 (oscuro 8.32:1) sobre
  `surface-low`; rótulo `text-neutral-low` 5.01:1 (8.86:1), celdas `text-neutral-medium` 14.53:1 (12.87:1) y título
  `text-neutral-high` 16.29:1 (16.53:1) sobre la superficie.
- **2.1.1 Teclado (A)**: se cambia de pestaña con flechas, Inicio y Fin; solo la activa entra en el orden de
  tabulación.
- **2.4.7 Foco visible (AA)**: sigue `siaf-tabs`: borde interior de 2 px `border-states-focus` y capa de foco.

## Composición

Pinta por dentro: [`siaf-tabs`](siaf-tabs.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-detail-history-tabs
