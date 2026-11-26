# Action tracker

> `siaf-action-tracker` · Componente de Trazabilidad del documento

Trazabilidad de una solicitud: pestañas Detalle/Historial y tarjetas de quién hizo qué y cuándo.

Es el componente canónico para mostrar el avance y los comentarios de un documento (lo usan 11
archivos). No usar `siaf-steps` para esto: sus pasos no muestran responsables ni comentarios.

## Importar

```ts
import { ActionTrackerComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-action-tracker />
```

### Cuándo usarlo

- Al pie de las pantallas de solicitud, para quién elaboró, verificó y aprobó y cuándo (`[showSummaryCards]="true"`
  y `[showTabs]="false"`): plan de cuentas, catálogo de ajustes, asiento de ajuste, apertura contable y
  Contabilización.
- Dentro de `siaf-account-history-panel` y `siaf-asiento-history-panel`, para cerrar el historial del registro con
  sus responsables.
- Con `summaryItems` reales: un `actionBy` o `date` vacío muestra «No asignado aún» o «Fecha y hora no registradas».

### Cuándo no

- Para comentarios e iteraciones con pestañas Detalle / Historial: usar `siaf-detail-history-tabs`; las pestañas de
  este componente no cambian al pulsarlas y sus valores por defecto son de muestra.
- Para pasos numerados de un flujo: usar `siaf-steps`; para hitos con fecha, `siaf-timeline`.
- Para el historial de estados de un documento desde la bandeja: usar `siaf-document-history-panel`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `activeTab` | `'detail' \| 'history'` | `'detail'` |  |
| `description` | `string` | `'Lorem ipsum dolor sit amet, consectetur adipiscing elit, s…` |  |
| `detailType` | `'default' \| 'rejection-explanation' \| 'rejection-reason' \| 'evaluation-comment' \| 'acceptance-comment' \| 'observation-comment'` | `'default'` |  |
| `historyRows` | `ActionTrackerHistoryRow[]` | `[ { iteration: '1', process: 'Aceptar Solicitud', reason: '…` |  |
| `showSummaryCards` | `boolean` | `true` |  |
| `showTabs` | `boolean` | `false` |  |
| `summaryItems` | `ActionTrackerSummary[]` | `[]` |  |
| `variant` | `'default' \| 'detail'` | `'default'` |  |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- Tal como lo usa la app (solo tarjetas de responsables) no recibe foco: no es interactivo.
- **Tab** (con `showTabs` o `variant="detail"`): enfoca los botones Detalle e Historial.
- **Enter / Espacio**: no cambian de pestaña; la activa la fija el padre con `activeTab`.

### Notas

- **1.3.1 Información y relaciones (A)**: el historial es una `table` con `thead` y `th` bajo un `h3`; en las
  tarjetas cada etiqueta precede a su valor en el orden de lectura.
- **1.4.1 Uso del color (A)**: responsables, fechas y procesos van en texto; la pestaña activa además va en negrita
  y subrayada.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: en las tarjetas, etiquetas `text-neutral-low` 5.01:1 (oscuro 8.86:1)
  y valores `text-neutral-high` 16.29:1 (16.53:1) cumplen; la pestaña activa usa la clase `text-brand-primary`
  (color de fondo de marca), que en oscuro no llega a 4.5:1: da 2.66:1 sobre la superficie y la franja es
  `surface-low`, más clara.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: las pestañas Detalle / Historial son `button` sin acción, sin
  `role="tab"` ni `aria-selected`: la activa solo se distingue a la vista.

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-action-tracker
