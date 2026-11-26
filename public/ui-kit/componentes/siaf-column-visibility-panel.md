# Column visibility panel

> `siaf-column-visibility-panel` · Componente de Overlays

Panel lateral modal para mostrar u ocultar columnas de una grilla, agrupadas en
Predeterminado / Más columnas / Interno (estas últimas fijas, no desmarcables).

Úsalo junto a `siaf-documents-records-table` y sus `DocumentsRecordsColumn`; el
componente es controlado (recibe el estado y emite toggles, no decide la visibilidad).

## Importar

```ts
import { ColumnVisibilityPanelComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-column-visibility-panel />
```

### Cuándo usarlo

- En la bandeja «Documentos y registros» (`siaf-documents-records-page`), desde «Más opciones → Ocultar o mostrar
  columnas», para elegir qué columnas se ven en Documentos o en Registros.
- En otra grilla con `DocumentsRecordsColumn` cuando el padre guarda un borrador de columnas ocultas y solo lo aplica
  con Aplicar (`dirty` habilita el botón).

### Cuándo no

- Para filtrar filas: usar `siaf-custom-filter`, `siaf-filter-pill` o el buscador de la grilla.
- Para elegir registros de un catálogo: usar `siaf-selection-side-nav`.
- Para un menú corto de opciones sobre la grilla: usar `siaf-icon-dropdown-menu`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `allSelected` | `boolean` | `false` |  |
| `defaultColumns` | `DocumentsRecordsColumn[]` | `[]` |  |
| `dirty` | `boolean` | `false` |  |
| `internalColumns` | `DocumentsRecordsColumn[]` | `[]` |  |
| `isColumnVisible` | `(columnKey: string) => boolean` | `() => false` |  |
| `moreColumns` | `DocumentsRecordsColumn[]` | `[]` |  |
| `open` | `boolean` | `false` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(applied)` | `void` |  |
| `(closed)` | `void` |  |
| `(toggleAll)` | `Event` |  |
| `(toggleColumn)` | `{ key: string; event: Event; }` |  |

## Accesibilidad

Roles y atributos del código: `role="dialog"`, `aria-label`, `aria-labelledby`, `aria-modal`.

### Teclado

- **Tab**: al abrir, el foco entra en la X; recorre «Seleccionar todo», las casillas de cada columna y Cancelar /
  Aplicar, y da la vuelta sin salir del panel; las de Interno están deshabilitadas y no reciben foco.
- **Escape**: cierra el panel (emite `closed`) y el foco vuelve al control que lo abrió.
- **Espacio**: marca o desmarca la casilla enfocada (emite `toggleAll` o `toggleColumn`).
- **Enter / Espacio**: activan la X y Cancelar (emiten `closed`) y Aplicar (emite `applied`; habilitado solo con
  cambios).

### Notas

- **4.1.2 Nombre, función y valor (A)**: `role="dialog"` con `aria-modal="true"` y `aria-labelledby` al título; la X
  se llama «Cerrar» y cada casilla toma su nombre del texto de la columna (`<label>`).
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir lleva el foco a la X aunque en la bandeja el panel se pinte
  al final de la página, y al cerrar lo devuelve al botón que lo abrió.
- **2.1.2 Sin trampas de teclado (A)**: Tab queda dentro mientras está abierto, pero Escape siempre lo cierra.
- **1.3.1 Información y relaciones (A)**: título `h2` y los grupos Predeterminado / Más columnas / Interno con `h3`.
- **2.4.7 Foco visible (AA)**: sin estilo propio pero sin `outline-none`: la X, Cancelar y las casillas muestran el
  anillo nativo del navegador; Aplicar sigue `siaf-button`.
- **2.5.8 Tamaño del objetivo (AA)**: cada fila mide 48 px y toda la fila marca la casilla; la X y Cancelar, 40 px.
- **1.4.11 Contraste no textual (AA)**: las casillas llevan borde `icon-states-enabled` de 2 px (8.70:1 sobre la
  superficie en claro).
- **1.4.3 Contraste mínimo (AA)**: título `text-text` sobre `bg-surface` (16.29:1 / 16.53:1); las etiquetas
  `text-neutral-medium` van sobre `surface-highest`, que en claro es el blanco de la superficie (14.53:1).

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siaf-button`](siaf-button.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-column-visibility-panel
