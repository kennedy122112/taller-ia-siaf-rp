# Report table

> `siaf-report-table` · Componente de Datos y tablas

Tabla de datos de un reporte (Guía de Estructura de Pantallas, «Tabla de datos detallada»): cabecera gris en dos
niveles cuando las columnas tienen `group` (el grupo centrado arriba y cada columna debajo), filas de al menos 48 px
que pasan a dos líneas si el texto no entra, importes alineados a la derecha, valores `link` en azul y la última
columna fija a la derecha con sombra al desplazar horizontalmente. La cabecera queda fija al desplazar vertical
(480 px de alto máximo, 320 px en móvil).

No pagina, no filtra ni ordena: recibe las filas de la página visible. Con `totals`, pinta al pie una fila de totales
en negrita sobre fondo gris, que no se pagina.

## Importar

```ts
import { ReportTableComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-report-table [columns]="…" />
```

### Cuándo usarlo

- En «Resultado de reporte» de `siaf-query-report-page`, con `siaf-pagination` debajo.
- Con `group` para reportes anchos con columnas emparentadas (Acreditación: secuencia y fecha; Beneficiario: código y
  descripción) y `fixed` en el importe final, para leerlo mientras se desplaza.
- `kind: 'link'` en la columna que abre el documento de la fila.
- `totals` para los totales de un reporte contable (el balance de sumas y saldos, la hoja de trabajo): una fila al pie
  con el texto de cada columna, «TOTALES» en la que lo lleva.

### Cuándo no

- Para grillas con selección de filas y acciones: usar la grilla estándar (`siaf-table-controls` y
  `siaf-pagination`) o `siaf-documents-records-table`.
- Para una tabla corta de solo lectura sin grupos: usar `siaf-data-table`.
- `fixed` en una columna que no es la última: solo se fija la del extremo derecho.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ariaLabel` | `string` | `'Resultado del reporte'` | Nombre de la tabla y de su zona desplazable. |
| `columns` (obligatoria) | `readonly ReportTableColumn[]` | — |  |
| `emptyMessage` | `string` | `'No se encontraron resultados con los filtros aplicados.'` |  |
| `rowKey` | `string` | `''` | Clave que identifica cada fila; sin ella se usa la posición. |
| `rows` | `readonly ReportTableRow[]` | `[]` | Filas de la página visible: cada clave de columna con su texto ya formateado. |
| `totals` | `ReportTableRow \| null` | `null` | Fila de totales al pie: el texto de cada columna, ya formateado. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(linkClicked)` | `{ row: ReportTableRow; column: ReportTableColumn; }` |  |

## Accesibilidad

Roles y atributos del código: `role="region"`, `role="status"`, `aria-label`.

### Teclado

- **Tab**: entra en la zona desplazable de la tabla (con flechas se desplaza) y luego en cada enlace.
- **Enter / Espacio**: en un enlace, emiten `linkClicked` con la fila y la columna.

### Notas

- **1.3.1 Información y relaciones (A)**: tabla real con `thead`; los grupos son `th scope="colgroup"` y las columnas
  `th scope="col"`, así cada celda se anuncia con su grupo y su columna.
- **4.1.2 Nombre, función y valor (A)**: la tabla toma su nombre de `ariaLabel`; los enlaces son `button` nativos
  con el texto del valor.
- **2.1.1 Teclado (A)**: la zona desplazable es `role="region"` con nombre y `tabindex="0"`, para desplazarla con
  flechas sin mouse.
- **2.4.7 Foco visible (AA)**: la zona y los enlaces muestran el contorno de 2 px `border-states-focus`.
- **4.1.3 Mensajes de estado (AA)**: sin filas, el aviso de la tabla es `role="status"`.
- **1.4.3 Contraste mínimo (AA)**: cabecera `text-neutral-high` sobre `surface-high` (12.84:1 claro / 14.62:1
  oscuro), celdas `text-neutral-medium` (14.53:1 / 12.87:1) y enlaces `text-brand-primary` (8.79:1 / 10.15:1) sobre
  la superficie.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-report-table
