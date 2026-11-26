# Query report page

> `siaf-query-report-page` · Componente de Plantillas de pantalla

Plantilla de pantalla «Consultas y reportes» (Guía de Estructura de Pantallas, nodo 9455:107865): la nueva versión de
las consultas, armada desde un `QueryReportConfig`. Antes de consultar muestra el estado vacío; «Parámetros» abre
`siaf-query-parameters-panel` y, al aplicar, emite `queried` para que la pantalla traiga el resultado. Con resultado
pinta «Parámetros aplicados», y en «Resultado de reporte» las pestañas, la card resumen, el buscador (Filtrar y
Columnas), los filtros predeterminados, la tabla de datos detallada y la paginación. Buscar, filtrar y paginar
ocurren sobre las filas recibidas.

Con `charts` en la configuración, el encabezado del resultado suma el selector «Vista de datos | Vista de gráficas»
(nodo 22715:21316) y la vista de gráficas (nodo 22402:16766): tarjetas KPI y gráficos calculados con las mismas filas
que muestra la tabla, es decir, después de buscar y filtrar; un gráfico que se queda sin datos muestra un aviso en vez
de ejes vacíos. Esa vista se carga con `@defer` al abrirla, así Chart.js
no pesa en la pantalla hasta que alguien la usa. «Exportar» abre el menú Excel, CSV y PDF y emite `exported` con el
formato.

No llama a la API: la pantalla consulta y entrega `result` (con `loading` mientras tanto).

## Importar

```ts
import { QueryReportPageComponent } from '@kennedy122112/siaf-rp-ui-angular/graficos';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular/graficos`), instalado desde `vendor/`.

## Uso

```html
<siaf-query-report-page [config]="…" />
```

### Cuándo usarlo

- Para una pantalla «Consultas y reportes» de un proceso: título, migas, campos de parámetros, columnas (con grupos y
  la última fija), pestañas y filtros predeterminados en la configuración.
- `tabs` cuando el reporte tiene varias vistas del mismo resultado: la pantalla recibe `tabChanged` y entrega el
  resultado de esa pestaña.
- Varios reportes en una pantalla: un campo «Reporte» y los demás con `visibleWhen`; al consultar, la pantalla
  entrega otra `config` con las columnas de ese reporte (así las consultas del cierre contable anual).
- `totals` en el resultado para la fila de totales al pie de la tabla (la de todas las filas, con o sin búsqueda).
- `charts` para la vista de gráficas: cada KPI suma una columna (o cuenta filas), con un filtro opcional por valor, y
  cada gráfico agrupa por una columna (o por mes, con una fecha), en valores, índice respecto de la primera categoría
  (`index`) o variación respecto de ella (`change`). `width: 'narrow'` pone un gráfico en la columna de 336 px a la
  derecha del anterior, como en el Figma.
- `exported` para generar el archivo: trae el formato elegido y las filas que quedaron tras buscar y filtrar.
- `favoritesRequested`, `advancedFiltersRequested` y `columnsRequested` para lo que la pantalla resuelve por su cuenta
  mientras la plantilla no traiga esos paneles.

### Cuándo no

- Para la bandeja de documentos y registros de un proceso: usar `siaf-documents-records-page`.
- Para una vista de solo lectura que no es un reporte: usar `siaf-page-shell` con `siaf-page-header`.
- Maquetar otra consulta con estado vacío, panel de búsqueda y tabla a mano: pasar su configuración a esta
  plantilla.
- Calcular los KPI o los gráficos en la pantalla y pintarlos aparte: declararlos en `charts`, así siguen a la búsqueda
  y a los filtros de la tabla.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `activeTab` | `string` | `''` | Pestaña activa al empezar; por defecto, la primera. |
| `config` (obligatoria) | `QueryReportConfig` | — |  |
| `loading` | `boolean` | `false` | Mientras la pantalla consulta: la tabla o las gráficas pasan a esqueleto y «Exportar» se deshabilita. |
| `result` | `QueryReportResult \| null` | `null` | Resultado de la consulta (o de la pestaña) para los parámetros aplicados. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(advancedFiltersRequested)` | `void` | «Filtrar» del buscador (Filtros avanzados). |
| `(columnsRequested)` | `void` | «Columnas» del buscador (Columnas visibles). |
| `(exported)` | `QueryReportExportEvent` | Un formato de «Exportar»: la pantalla genera el archivo con las filas recibidas. |
| `(favoritesRequested)` | `void` |  |
| `(linkClicked)` | `{ row: ReportTableRow; column: ReportTableColumn; }` |  |
| `(queried)` | `QueryReportParameters` | «Aplicar consulta»: la pantalla consulta con estos parámetros y entrega `result`. |
| `(tabChanged)` | `string` |  |

## Accesibilidad

Roles y atributos del código: `aria-labelledby`, `aria-live`.

### Teclado

- **Tab**: recorre las migas, «Favoritos» y «Parámetros», las tarjetas de parámetros aplicados, el selector de vista,
  «Exportar», las pestañas y, en la vista de datos, el buscador y sus botones, los filtros, la tabla y la paginación;
  en la de gráficas, cada gráfico.
- **Enter** en el buscador: busca en todas las columnas (sin distinguir mayúsculas ni tildes) y vuelve a la primera
  página.
- El panel de parámetros, el selector de vista, el menú «Exportar», las pestañas, las píldoras, la tabla y los
  gráficos siguen su componente.

### Notas

- **1.3.1 Información y relaciones (A)**: el título de la pantalla es el `h1` de `siaf-page-header`; el de la tarjeta
  del resultado, un `h2`, y el de cada gráfico, el `h3` de `siaf-chart-section`.
- **4.1.2 Nombre, función y valor (A)**: el selector de vista es un grupo «Vista del resultado» con `aria-pressed` en
  cada botón, nombrado como su tooltip; «Exportar» anuncia su menú con `aria-haspopup` y `aria-expanded`.
- **4.1.3 Mensajes de estado (AA)**: el total de filas tras buscar o filtrar se anuncia en una región
  `aria-live="polite"` que no se ve.
- **2.4.3 Orden del foco (A)**: al cerrar el panel de parámetros el foco vuelve a «Parámetros».
- **3.2.2 Al introducir datos (A)**: escribir en el buscador no cambia la tabla hasta pulsar Enter; elegir un filtro
  predeterminado sí filtra al momento, y se anuncia.
- **1.1.1 Contenido no textual (A)**: cada gráfico se llama como su título y lleva su tabla de datos oculta; con una
  búsqueda o un filtro activos, una nota avisa con cuántas filas se calcularon.
- **1.4.10 Reajuste del contenido (AA)**: en pantallas angostas las acciones del encabezado bajan, las tarjetas KPI
  y los gráficos pasan a una columna y la tabla se desplaza dentro de su zona, sin desplazar la página.

## Composición

Pinta por dentro: [`message-box`](message-box.md), [`siaf-bar-chart`](siaf-bar-chart.md), [`siaf-button`](siaf-button.md), [`siaf-buttons-group`](siaf-buttons-group.md), [`siaf-chart-section`](siaf-chart-section.md), [`siaf-diverging-chart`](siaf-diverging-chart.md), [`siaf-donut-chart`](siaf-donut-chart.md), [`siaf-empty-state`](siaf-empty-state.md), [`siaf-filter-pill`](siaf-filter-pill.md), [`siaf-form-table-search`](siaf-form-table-search.md), [`siaf-icon-dropdown-menu`](siaf-icon-dropdown-menu.md), [`siaf-kpi-card`](siaf-kpi-card.md), [`siaf-line-chart`](siaf-line-chart.md), [`siaf-page-header`](siaf-page-header.md), [`siaf-page-shell`](siaf-page-shell.md), [`siaf-pagination`](siaf-pagination.md), [`siaf-parametros-aplicados`](siaf-parametros-aplicados.md), [`siaf-query-parameters-panel`](siaf-query-parameters-panel.md), [`siaf-report-summary-card`](siaf-report-summary-card.md), [`siaf-report-table`](siaf-report-table.md), [`siaf-table-skeleton`](siaf-table-skeleton.md), [`siaf-tabs`](siaf-tabs.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular-graficos.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-query-report-page
