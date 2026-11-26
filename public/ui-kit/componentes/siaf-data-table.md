# Data table

> `siaf-data-table` · Componente de Datos y tablas

Tabla de solo lectura: una cabecera con las `columns` y una fila por registro con el texto de cada celda
(`row[column.key]`); `idKey` identifica las filas.

Con `reordenable` (opcional) suma a la izquierda la columna de la manija (`siaf-drag-handle` de 24 px, la celda
«Drag & drop» del Figma): las filas se arrastran o se mueven con el teclado (`siafReordenable`) y la tabla emite
`(reordenado)` con el índice anterior y el actual; la pantalla cambia sus `rows` con `reordenar`.

Con `padreKey` (opcional) las filas forman un árbol: la que trae en ese campo el id de otra se pinta debajo de ella,
con la línea de nivel del Figma (celda «Level line»: una «L» de 1 px en `border-states-enabled` que baja desde el
borde superior y gira hacia el contenido) y 24 px más de sangría por nivel, a cualquier profundidad. La fila padre
lleva el chevron de la celda «Collapse» (`expand_more`), que abre o cierra sus hijas; todas empiezan abiertas.

Usa las clases globales `siaf-table-*` (cabecera fija y scroll con alto máximo de 480 px, 320 px en móvil). No
selecciona, no ordena ni pagina; `siaf-table` la envuelve con la misma API.

## Importar

```ts
import { DataTableComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-data-table [columns]="…" [rows]="…" />
```

### Cuándo usarlo

- Para un listado corto de solo lectura con texto plano en cada celda (número, documento, estado como texto), sin
  acciones por fila.
- Hoy solo la pinta `siaf-table` (en el simulador del SIAF RP Web, AS IS): es la base para un listado nuevo antes de
  escribir otra `<table>` a mano.
- Con `reordenable` cuando el usuario elige el orden de las filas (prioridades, el orden de unos campos), en una
  tabla corta y sin paginar.
- Con `padreKey` para ver a qué fila pertenece cada una: cuentas y sus subcuentas, un pliego y sus unidades
  ejecutoras, un documento y sus ítems.

### Cuándo no

- Para celdas con enlace al documento, tag de estado, checkbox o historial: `siaf-documents-records-table`.
- Para seleccionar o paginar: no lo hace sola; va dentro de la grilla estándar (`siaf-table-controls` arriba y
  `siaf-pagination` con `position="Bottom"` y `rowPage` abajo).
- Para ítems sin columnas (título, descripción, ícono): `siaf-list`; para un árbol sin columnas, `siaf-tree-view`.
- `reordenable` en una tabla paginada: el arrastre solo ve la página actual.
- `padreKey` con filas paginadas: una página podría mostrar hijas sin su padre.

### Limitaciones

- `padreKey` y `reordenable` no van juntos: con jerarquía, la tabla no pinta la manija (mover una fila entre padres
  no tiene un sentido único).
- La jerarquía no es un `treegrid`: la tabla sigue siendo una tabla, y cada hija dice de quién es en texto oculto
  para el lector de pantalla.
- Una fila cuyo padre no está en `rows` se pinta como de primer nivel.

### Así no / así sí

```html
<!-- ❌ Así no -->
<siaf-data-table [columns]="columnas" [rows]="cuentas" padreKey="padre" [reordenable]="true" />

<!-- ✅ Así sí -->
<siaf-data-table [columns]="columnas" [rows]="cuentas" padreKey="padre" />
```

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `columns` (obligatoria) | `DataTableColumn[]` | — |  |
| `idKey` | `string` | `'id'` |  |
| `padreKey` | `string` | `''` | El campo de cada fila con el id de su fila padre: las hijas se pintan debajo, con la línea de nivel, y el padre lleva el chevron que las muestra u oculta. Vacío (por defecto), la tabla es plana. |
| `reordenable` | `boolean` | `false` | Suma la columna de la manija: las filas se reordenan arrastrándolas o con el teclado. No va con `padreKey`. |
| `rows` (obligatoria) | `DataTableRow[]` | — |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(reordenado)` | `Reordenamiento` | Con `reordenable`: el índice que tenía la fila y el que tiene ahora; la pantalla cambia sus `rows`. |

## Accesibilidad

Roles y atributos del código: `aria-expanded`, `aria-hidden`, `aria-label`.

### Teclado

- Sin `reordenable` ni padres no recibe foco: no es interactiva. Con `reordenable`, Tab llega a la manija de cada
  fila y Espacio, las flechas ↑ ↓ y Escape la mueven (ver `siafReordenable`).
- Con `padreKey`, Tab llega al chevron de cada fila padre y Enter o Espacio abre o cierra sus hijas.
- Si las filas pasan el alto máximo, el contenedor con scroll no lleva `tabindex`: desplazarlo con el teclado
  depende del navegador.

### Notas

- **1.3.1 Información y relaciones (A)**: `<table>` con `<thead>`, `<tbody>` y un `<th>` por columna (sin `scope`,
  que con una sola fila de cabecera no hace falta). No admite `<caption>` ni `ariaLabel`: el padre debe titularla
  con un encabezado cercano. No ordena columnas, así que no aplica `aria-sort`.
- **1.3.1 Información y relaciones (A)**: con `padreKey`, cada hija lleva en texto oculto a qué fila pertenece
  («, de 1.1 Efectivo»), porque la línea de nivel solo se ve.
- **4.1.2 Nombre, función y valor (A)**: el chevron es un `<button>` con `aria-expanded` y un nombre que dice qué
  muestra u oculta («Ocultar las filas de 1.1 Efectivo»).
- **1.4.11 Contraste no textual (AA)**: el chevron, en `icon-states-enabled` (8.70:1 / 12.87:1).
- **1.4.3 Contraste mínimo (AA)**: celdas en `text-neutral-high` sobre la superficie (16.29:1 / 16.53:1); la
  cabecera, en `text-neutral-high` sobre `bg-surfaces-surface-high` (más que `text-neutral-medium` en ese fondo,
  11.46:1 / 11.39:1).

## Composición

Pinta por dentro: [`siafReordenableItem`](siafReordenableItem.md), [`siafReordenable`](siafReordenable.md), [`siaf-drag-handle`](siaf-drag-handle.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-data-table
