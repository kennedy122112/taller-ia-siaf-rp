# Documents records table

> `siaf-documents-records-table` · Componente de Datos y tablas

Tabla de las pestañas Documentos / Registros: columnas configurables, celdas por tipo
(enlace al documento, tag de flujo, tag de registro), checkbox de selección y botón de historial.

Es la tabla interna de `siaf-documents-records-page`; para una grilla nueva compón la grilla
estándar (`siaf-table-controls` arriba + `siaf-pagination Bottom` abajo) alrededor de ella.

## Importar

```ts
import { DocumentsRecordsTableComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-documents-records-table />
```

### Cuándo usarlo

- En las pestañas Documentos / Registros de `siaf-documents-records-page` (plan de cuentas, asiento de ajuste,
  catálogo de ajuste, catálogos de eventos, apertura contable y contabilización).
- Cuando las columnas vienen de configuración (`DocumentsRecordsColumn` con `kind`, `align` y `widthClass`) y el
  panel de columnas decide cuáles se ven.
- Con `selectionDisabled` para dejar marcables solo los documentos de la acción masiva: Elaborados para el creador
  (Verificar) y Verificados para el aprobador (Aprobar).

### Cuándo no

- Para un listado de solo lectura con texto plano: `siaf-table`.
- Usarla sola, sin barra ni paginado: va dentro de la grilla estándar (`siaf-table-controls` arriba, con el
  seleccionar todo, y `siaf-pagination` con `position="Bottom"` y `rowPage` abajo).
- Mientras llegan las filas: `siaf-table-skeleton` con las mismas columnas y `minWidthClass`, no la tabla vacía.
- Copiar su marcado en otra pantalla: `siaf-tray-documents-view` todavía tiene una tabla parecida hecha a mano.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `activeTab` | `'documents' \| 'records'` | `'documents'` |  |
| `columns` | `DocumentsRecordsColumn[]` | `[]` |  |
| `documentRoute` | `(row: DocumentsRecordsRow) => string` | `() => ''` |  |
| `minWidthClass` | `string` | `''` |  |
| `recordHistoryLabel` | `string` | `'Ver historial de cuenta contable'` | Nombre y tooltip del botón de historial en la pestaña Registros. |
| `recordTrackKey` | `string` | `''` |  |
| `rows` | `DocumentsRecordsRow[]` | `[]` |  |
| `selectionDisabled` | `(row: DocumentsRecordsRow) => boolean` | `() => false` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(documentOpened)` | `string` | Se abrió un documento desde su enlace: emite su id (la plantilla marca leídas sus notificaciones). |
| `(historyOpened)` | `DocumentsRecordsRow` |  |
| `(selectionChanged)` | `DocumentsRecordsSelectionChange` |  |

## Accesibilidad

Roles y atributos del código: `aria-label`.

### Teclado

- **Tab**: recorre, fila por fila, el checkbox (solo en Documentos), el enlace al documento y el botón de historial;
  un checkbox deshabilitado queda fuera.
- **Espacio**: marca o desmarca el checkbox de la fila (emite `selectionChanged`).
- **Enter**: en el enlace, abre el documento (`routerLink`).
- **Enter / Espacio**: en el botón de historial, emiten `historyOpened`.

### Notas

- **1.3.1 Información y relaciones (A)**: `<table>` con `<thead>` y un `<th>` por columna (sin `scope`, que con una
  sola fila de cabecera no hace falta); las columnas del checkbox y del historial tienen el `<th>` vacío. No ordena
  columnas, así que no aplica `aria-sort`.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: el checkbox de cada fila no tiene nombre (ni `aria-label` ni
  `<label>`). El botón de historial sí lleva `aria-label`; en Registros es `recordHistoryLabel`, que por defecto dice
  «Ver historial de cuenta contable», también en los asientos de ajuste.
- **Pendiente · 2.1.1 Teclado (A)**: la fila no es clicable y sus acciones son nativas, pero el texto completo de
  las cabeceras y celdas cortadas solo sale con `siafTooltip` al pasar el mouse: esas celdas no reciben foco (el
  enlace sí lo muestra al enfocarlo).
- **1.4.13 Contenido en hover o foco (AA)**: ese tooltip se cierra con Escape y se puede recorrer con el puntero.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: el enlace va en `text-neutral-high` (16.29:1 / 16.53:1) y «Nuevo» en
  blanco sobre `bg-brand-primary` (8.79:1 / 6.67:1), pero la etiqueta Observado de `siaf-flow-status-tag` (también
  Pendiente y Fallido) da 3.39:1 en claro, y el enlace en hover (`text-brand-primary`) pinta en oscuro con
  `bg-brand-primary` (2.66:1 sobre la superficie).
- **1.4.1 Uso del color (A)**: los estados llevan su nombre en la etiqueta y «Nuevo» es texto.
- **2.4.7 Foco visible (AA)**: sin estilo propio: enlace, checkbox y botón muestran el anillo nativo del navegador.
- **2.5.8 Tamaño del objetivo (AA)**: botón de historial de 32 px; el checkbox mide 16 px, pero cumple por
  espaciado (celda de 40 × 58 px).

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-flow-status-tag`](siaf-flow-status-tag.md), [`siaf-icon`](siaf-icon.md), [`siaf-record-status-tag`](siaf-record-status-tag.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-documents-records-table
