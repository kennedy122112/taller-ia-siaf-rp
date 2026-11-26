# Selection side nav

> `siaf-selection-side-nav` · Componente de Overlays · Sin uso en la app

Side-nav genérico para seleccionar uno o varios elementos de un
catálogo. Reemplaza los 15 paneles inline repetidos en los
formularios de solicitud.

Variantes:
- **single** — radio buttons, emite `accepted` con un único id.
- **multiple** — checkboxes, emite `accepted` con los ids seleccionados.

Comportamiento:
- Click en la fila marca/desmarca la selección (igual que click en
  el control).
- Backdrop (click afuera) cierra sin emitir.
- X del header cierra sin emitir.
- Cancelar cierra sin emitir.
- Aceptar emite y cierra (el padre cierra explícitamente via
  `(accepted)`).
- La tabla ocupa el alto que dejan el buscador y las barras, y se
  desplaza por dentro con el encabezado fijo; con `paginated`, la
  paginación queda siempre al pie del panel. En una pantalla muy baja
  la tabla conserva 240 px y se desplaza el cuerpo entero.
- Con `showFilters`, el cuerpo se divide: la lista a la izquierda y el
  panel de filtros de 420 px a la derecha (debajo, en pantallas
  angostas); el pie principal desaparece hasta cerrarlo.

Ejemplo single:

  <siaf-selection-side-nav
    [open]="clasePanelOpen()"
    title="Buscar clase de ajuste"
    mode="single"
    [rows]="filteredClases()"
    [columns]="claseColumns"
    [searchValue]="claseSearch()"
    [selectedIds]="tempClaseId() ? [tempClaseId()] : []"
    (searchChange)="claseSearch.set($event)"
    (selectionChange)="onClaseTempChange($event)"
    (closed)="clasePanelOpen.set(false)"
    (accepted)="confirmClaseExistente()"
  />

## Importar

```ts
import { SelectionSideNavComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-selection-side-nav>…</siaf-selection-side-nav>
```

### Cuándo usarlo

- Para elegir uno (`single`) o varios (`multiple`) registros de un catálogo desde un formulario de solicitud: cuentas
  contables, entidades, planes de cuentas, clases y detalles de ajuste, ámbitos, periodos o eventos.
- Con `paginated` y `showSelectAll` cuando el catálogo es largo (cuentas del plan, cuentas del tipo de asiento): el
  padre pagina y decide qué cuenta como «todo seleccionado».
- Con `disabledIds` para mostrar registros que no se pueden elegir, como las clases de ajuste ya usadas por un tipo de
  asiento (RN-012).
- Con `customTable` cuando la tabla no es plana: periodos del asiento de ajuste y de la apertura contable, eventos
  del catálogo de eventos contables.
- Con filtros propios del padre, como el Side Panel con Sidenav del Figma (8856:7115): el embudo del buscador emite
  `filterClick` y, con `showFilters`, el cuerpo se divide y a la derecha queda un `siaf-side-nav` embebido de 420 px
  con lo que el padre proyecta con el atributo `filtros` y su pie Cancelar / Aplicar (`filtersCanceled`,
  `filtersConfirmed`); los filtros aplicados van debajo del buscador con el atributo `filtrosAplicados`. Así filtra
  por el inicio del código el panel de cuentas de la configuración de asiento de cierre anual.

### Cuándo no

- Para elegir entre pocas opciones fijas: usar `siaf-input` tipo select, `siaf-select-options` o `siaf-radio-group`.
- Para adjuntar archivos: usar `siaf-upload-side-nav`; para mostrar u ocultar columnas, `siaf-column-visibility-panel`.
- Maquetar otro panel de búsqueda con overlay, tabla y botones: este reemplazó los 15 que había en los formularios.
- Para filtrar la grilla de la página: usar `siaf-custom-filter` o `siaf-filter-pill`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `acceptLabel` | `string` | `'Aceptar'` |  |
| `cancelLabel` | `string` | `'Cancelar'` | Etiquetas de botones (i18n-friendly). |
| `columns` | `SelectionColumn<T>[]` | `[]` | Columnas a mostrar. |
| `customTable` | `boolean` | `false` | Escape hatch para casos que no encajan en la tabla declarativa (p.ej. estructuras jerárquicas con grupos expandibles). Cuando es true, en vez de la tabla auto-generada se proyecta el contenido del componente (`<ng-content>`). El shell (overlay, header, búsqueda, paginación, footer) se mantiene; `columns`/`rows` se ignoran. La selección la maneja el padre; usa `selectedIds` para controlar el disabled de Aceptar. |
| `disabledIds` | `string[]` | `[]` | Ids no seleccionables (fila atenuada, checkbox/radio deshabilitado). |
| `emptyMessage` | `string` | `'No se encontraron resultados.'` | Texto en la tabla cuando no hay filas. |
| `filtersTitle` | `string` | `'Filtros'` | Título del panel de filtros. |
| `idKey` | `string` | `'id'` | Propiedad de cada fila que la identifica unívocamente. Default: 'id'. |
| `mode` | `'single' \| 'multiple'` | `'single'` | 'single' (radio) o 'multiple' (checkbox). |
| `open` | `boolean` | `false` | Si está abierto. Cuando se pasa a false el componente no renderiza nada. |
| `page` | `number` | `1` | Página actual (1-based). |
| `pageSize` | `number` | `10` | Tamaño de página. |
| `paginated` | `boolean` | `false` | Activa la paginación. Cuando es true, las `rows` que recibe ya están paginadas por el padre; el componente solo renderiza los controles `siaf-pagination` y emite los eventos de navegación. |
| `requireSelection` | `boolean` | `true` | Si Aceptar exige al menos 1 selección. Default: true. |
| `rows` | `T[]` | `[]` | Filas a renderizar. Ya filtradas por el padre. |
| `rowsPerPage` | `number` | `10` | Filas por página seleccionadas. |
| `rowsPerPageOptions` | `number[]` | `[10, 25, 50, 100]` | Opciones del selector de filas por página. |
| `searchPlaceholder` | `string` | `'Buscar'` | Placeholder/aria del buscador. |
| `searchValue` | `string` | `''` | Valor actual del buscador (controlado por el padre). |
| `selectAllChecked` | `boolean` | `false` | Estado del checkbox "seleccionar todo" (lo controla el padre). |
| `selectAllIndeterminate` | `boolean` | `false` | Estado indeterminado del checkbox "seleccionar todo". |
| `selectAllLabel` | `string` | `'Seleccionar filas'` | Etiqueta del checkbox "seleccionar todo". |
| `selectedIds` | `string[]` | `[]` | Ids actualmente seleccionados (temporal — todavía no se aplicó). |
| `showFilters` | `boolean` | `false` | Muestra a la derecha de la lista el panel de filtros del padre (lo que proyecta con el atributo `filtros`), con su pie Cancelar / Aplicar; mientras está abierto, el pie principal desaparece. Lo abre el embudo del buscador (`filterClick`), que lo publica con `aria-expanded`. |
| `showRowsPerPage` | `boolean` | `true` | Muestra el selector de filas por página en la barra inferior. |
| `showSelectAll` | `boolean` | `false` | Solo en `mode='multiple'`. Renderiza `siaf-table-controls` arriba de la tabla (en vez de la paginación superior) con un checkbox de "seleccionar todo", estado indeterminado y contador de seleccionados. La lógica de qué se considera "todo seleccionado" la decide el padre. |
| `showTopPagination` | `boolean` | `false` | Muestra también una barra de paginación arriba de la tabla. |
| `tableMinWidthClass` | `string` | `''` | Clase de ancho mínimo para la tabla (p.ej. `min-w-[1700px]`) para habilitar scroll horizontal. |
| `title` | `string` | `''` | Título mostrado en el header (también usado para aria-labels). |
| `totalItems` | `number` | `0` | Total de items (sin paginar). |
| `totalPages` | `number` | `1` | Total de páginas. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(accepted)` | `string[]` | Click en Aceptar. Emite los ids seleccionados — el padre decide si cierra. |
| `(closed)` | `void` | Click en X / backdrop / Cancelar. |
| `(filterClick)` | `void` | Click en el embudo (Filtrar) del buscador: el padre abre o cierra el panel de filtros (`showFilters`). |
| `(filtersCanceled)` | `void` | Cancelar o Escape en el panel de filtros: el padre lo cierra sin aplicar. |
| `(filtersConfirmed)` | `void` | Aplicar en el panel de filtros: el padre aplica lo que se eligió y lo cierra. |
| `(nextPage)` | `void` | Navegación de paginación: página siguiente. |
| `(previousPage)` | `void` | Navegación de paginación: página anterior. |
| `(rowsPerPageChange)` | `number` | Cambio de filas por página. |
| `(searchChange)` | `string` | El padre actualiza el `searchValue`. |
| `(selectAllChange)` | `boolean` | Toggle del checkbox "seleccionar todo" (true = marcar, false = desmarcar). |
| `(selectionChange)` | `string[]` | Emite cada vez que cambia la selección temporal (radio o check). |

## Accesibilidad

Roles y atributos del código: `role="dialog"`, `aria-label`, `aria-modal`.

### Teclado

- **Tab**: al abrir, el foco entra en la X; recorre el buscador, la barra de la grilla, los controles de selección, la
  paginación y Cancelar / Aceptar, y da la vuelta sin salir del panel. En `single` todo el grupo de radios es una sola
  parada. Con `customTable`, la tabla proyectada trae su propio teclado.
- **Escape**: cierra el panel (emite `closed`) y el foco vuelve al control que lo abrió. Con el foco en el panel de
  filtros, cierra solo los filtros (emite `filtersCanceled`), que al abrirse llevan el foco a su primer campo y al
  cerrarse lo devuelven al embudo.
- **Espacio**: en `multiple` marca o desmarca la casilla enfocada; en `single` elige el radio.
- **Flechas**: en `single` pasan al radio anterior o siguiente y lo eligen (grupo nativo por `name`); saltan los
  deshabilitados.
- **Enter** en el buscador: aplica la búsqueda (sigue `siaf-form-table-search`).
- **Enter / Espacio**: activan la X y Cancelar (emiten `closed`) y Aceptar (emite `accepted` con los ids).

### Notas

- **4.1.2 Nombre, función y valor (A)**: `role="dialog"` con `aria-modal="true"` y `aria-label` igual al `title`; la
  X se llama «Cerrar» más el título, y las casillas y los radios nativos exponen marcado y deshabilitado.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir lleva el foco a la X y al cerrar lo devuelve al campo que lo
  abrió; Tab no sale a la página de atrás.
- **2.1.2 Sin trampas de teclado (A)**: Tab queda dentro mientras está abierto, pero Escape siempre lo cierra.
- **1.3.1 Información y relaciones (A)**: título `h2` y tabla real con `thead` y un `th` por columna.
- **Pendiente · 2.4.6 Encabezados y etiquetas (AA)**: todas las casillas y radios se llaman «Seleccionar fila» (su
  columna lleva un `th` vacío), y el buscador siempre se rotula «Buscar»: `searchPlaceholder` llega al `ariaLabel` de
  `siaf-form-table-search`, que no lo usa.
- **1.4.1 Uso del color (A)**: la fila elegida lleva la casilla o el radio marcado además del fondo
  `bg-states-light-selected`; la no elegible, el control deshabilitado además de la opacidad.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: «No se encontraron resultados.» aparece dentro de la tabla sin
  `role="status"`: el resultado de la búsqueda no se anuncia.
- **2.4.7 Foco visible (AA)**: la X, las casillas y los radios muestran el anillo nativo del navegador (sin
  `outline-none`); el buscador, la barra, la paginación y los botones del pie siguen su componente.

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siaf-button`](siaf-button.md), [`siaf-form-table-search`](siaf-form-table-search.md), [`siaf-icon`](siaf-icon.md), [`siaf-pagination`](siaf-pagination.md), [`siaf-side-nav`](siaf-side-nav.md), [`siaf-table-controls`](siaf-table-controls.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-selection-side-nav
