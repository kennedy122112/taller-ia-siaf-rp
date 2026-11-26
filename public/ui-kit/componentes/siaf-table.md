# Table

> `siaf-table` · Componente de Datos y tablas · Sin uso en la app

Envoltorio mínimo sobre `siaf-data-table`: tabla de columnas y filas, sin selección ni paginación.

Úsalo para listados simples. Cuando la tabla necesita barra superior o paginado, va la grilla
estándar: `siaf-table-controls` arriba (siempre, con `[showSelection]=false` si no hay selección)
y `siaf-pagination Bottom` abajo.

Con `reordenable` (opcional) las filas llevan su manija y se reordenan; emite `(reordenado)`. Con `padreKey`, las
hijas van debajo de su padre con la línea de nivel y el chevron que las oculta (ver `siaf-data-table`).

## Importar

```ts
import { TableComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-table [columns]="…" [rows]="…" />
```

### Cuándo usarlo

- Para un listado corto de solo lectura con columnas de texto (número, documento, estado como texto) dentro de una
  tarjeta o un panel.
- Antes de escribir otra `<table>` a mano. La usan las tablas de clasificador, metas y conceptos del simulador del
  SIAF RP Web (AS IS).

### Cuándo no

- Para enlace al documento, tags de estado, checkbox o historial por fila: `siaf-documents-records-table`.
- Para paginar o seleccionar: no lo hace; va la grilla estándar alrededor (`siaf-table-controls` arriba y
  `siaf-pagination` con `position="Bottom"` y `rowPage` abajo).
- Para ítems sin columnas (título, descripción, ícono): `siaf-list`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `columns` (obligatoria) | `DataTableColumn[]` | — |  |
| `idKey` | `string` | `'id'` |  |
| `padreKey` | `string` | `''` | El campo con el id de la fila padre: las hijas van debajo con la línea de nivel (ver `siaf-data-table`). |
| `reordenable` | `boolean` | `false` | Suma la manija a cada fila para reordenarlas. |
| `rows` (obligatoria) | `DataTableRow[]` | — |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(reordenado)` | `Reordenamiento` | Con `reordenable`: el índice anterior y el actual de la fila movida. |

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- Sin `reordenable` no recibe foco: no es interactiva. El scroll es el de `siaf-data-table`, sin `tabindex`.
- Con `reordenable`, Tab llega a la manija de cada fila; Espacio, ↑ ↓ y Escape la mueven (ver `siafReordenable`).

### Notas

- **1.3.1 Información y relaciones (A)**: pinta `siaf-data-table`: `<table>` con `<thead>` y un `<th>` por columna.
  No admite `<caption>` ni `ariaLabel` (el padre debe titularla con un encabezado cercano) y no ordena columnas,
  así que no aplica `aria-sort`.
- **1.4.3 Contraste mínimo (AA)**: celdas en `text-neutral-high` sobre la superficie (16.29:1 / 16.53:1).

## Composición

Pinta por dentro: [`siaf-data-table`](siaf-data-table.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-table
