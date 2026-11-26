# Timeline detail panel

> `siaf-timeline-detail-panel` · Componente de Overlays

Panel lateral «Detalle del seguimiento» de `siaf-timeline` (Figma Control de Inventarios, nodo 20182:155604):
una tarjeta con el avance (barra, «9/11» y «9 procedimientos completados de 11») y la línea de tiempo
vertical con un hito por fila (Figma UI KIT, TL_GOAL_VERTICAL: cumplido, en curso y pendiente).

Un hito cumplido muestra su fecha y `dateInfo` a la izquierda; el en curso y los pendientes muestran «-»
con «En proceso» o «No iniciado». Lo abre `siaf-timeline` con «Ver detalle», pero también se puede usar
suelto: el padre controla `open` y cierra con `closed`.

## Importar

```ts
import { TimelineDetailPanelComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-timeline-detail-panel />
```

### Cuándo usarlo

- Lo abre `siaf-timeline` con «Ver detalle» para mostrar la fecha, el estado y la descripción de cada hito de un
  proceso por etapas.
- Suelto, cuando la pantalla muestra el avance a su manera (`siaf-timeline` con `[openDetailPanel]="false"`) y solo
  necesita este detalle.
- Con `itemLabel` / `itemsLabel` para nombrar los hitos del proceso en el resumen («9 procedimientos completados
  de 11»).

### Cuándo no

- Para el historial de acciones de una solicitud (quién verificó, aprobó u observó): usar
  `siaf-document-history-panel` o `siaf-action-tracker`.
- Para los pasos de un formulario o asistente: usar `siaf-steps`.
- Para la barra de avance dentro de la página: usar `siaf-timeline`, que ya abre este panel.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `current` | `number` | `-1` | Índice del hito en curso (desde 0), igual que en `siaf-timeline`. |
| `itemLabel` | `string` | `'hito'` | Cómo se llama un hito en el resumen, en singular y plural: «9 procedimientos completados de 11». |
| `items` | `TimelineItem[]` | `[]` |  |
| `itemsLabel` | `string` | `'hitos'` |  |
| `open` | `boolean` | `false` |  |
| `processName` | `string` | `''` | Nombre del proceso en la tarjeta de avance (va en mayúsculas). |
| `title` | `string` | `'Detalle del seguimiento'` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(closed)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `role="progressbar"`, `aria-current`, `aria-hidden`, `aria-label`, `aria-valuemax`, `aria-valuemin`, `aria-valuenow`.

### Teclado

- **Tab**: al abrir, el foco entra en la X, el único control, y no sale del panel.
- **Enter / Espacio**: la X cierra el panel (emite `closed`).
- **Escape**: cierra el panel (emite `closed`) y el foco vuelve a «Ver detalle».

### Notas

- **4.1.2 Nombre, función y valor (A)**: `role="dialog"` con `aria-modal="true"` y `aria-labelledby` al título (id
  propio por instancia); la barra es `role="progressbar"` con `aria-valuenow`, `aria-valuemax` y el resumen como
  nombre, y el hito en curso lleva `aria-current="step"`.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir lleva el foco a la X y al cerrar lo devuelve a «Ver detalle».
- **2.1.2 Sin trampas de teclado (A)**: Tab queda dentro mientras está abierto, pero Escape siempre lo cierra.
- **1.3.1 Información y relaciones (A)**: título `h2` y los hitos en una lista ordenada (`ol` / `li`) con
  `aria-label`; el punto y la línea de cada hito son `aria-hidden`.
- **1.4.1 Uso del color (A)**: el estado de cada hito va en texto, no solo en el color del punto: los cumplidos
  muestran su fecha, el en curso «En proceso» y los pendientes «No iniciado».
- **1.4.3 Contraste mínimo (AA)**: `text-neutral-high` (16.29:1 / 16.53:1), `text-neutral-medium` (14.53:1 /
  12.87:1) y las descripciones `text-neutral-low` (5.01:1 / 8.86:1) sobre `bg-surface`.
- **2.4.7 Foco visible (AA)**: la X no tiene estilo de foco propio ni `outline-none`: queda el anillo nativo del
  navegador.
- **2.5.8 Tamaño del objetivo (AA)**: la X mide 40 px.

## Composición

Pinta por dentro: [`siaf-side-nav`](siaf-side-nav.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-timeline-detail-panel
