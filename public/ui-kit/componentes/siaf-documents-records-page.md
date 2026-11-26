# Documents records page

> `siaf-documents-records-page` · Componente de Plantillas de pantalla

Pantalla «Documentos y registros» de un proceso, armada desde un `DocumentsRecordsConfig`: breadcrumb, título,
«Crear documento», pestañas Documentos / Registros, buscador con menús y filtros, grilla estándar con paginación y
los paneles de historial y de columnas.
Aplica las reglas de rol (el creador verifica elaborados, el aprobador aprueba verificados y el resto solo consulta;
`modoConsulta` quita crear y las acciones) y ejecuta verificar o aprobar en lote. El rol, el cambio de estado y la
recarga de la bandeja salen de `FuenteDocumentosRegistros`, que provee el proyecto: el kit no llama a ninguna API.
Con `serverQuery` / `serverRecordsQuery` la búsqueda y la paginación las resuelve el padre en el servidor, y la
selección sobrevive al refresco por polling.

## Importar

```ts
import { DocumentsRecordsPageComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-documents-records-page [config]="…">…</siaf-documents-records-page>
```

### Cuándo usarlo

- Como pantalla principal de cada proceso: plan de cuentas, asiento de ajuste, catálogo de ajuste, catálogo de
  eventos, eventos contables, contabilización, apertura contable (por entidad y anual) y el validador de cierre
  contable mensual.
- Cuando el creador verifica o el aprobador aprueba varias solicitudes a la vez: el botón, el modal y el snackbar
  salen del rol, sin código en el padre.
- Con `modoConsulta` en procesos de solo consulta (contabilización, apertura anual, cierre contable) y con
  `serverQuery` / `serverRecordsQuery` cuando el backend busca y pagina (plan de cuentas, asiento de ajuste,
  catálogos, apertura).
- Con `recordsTabDisabled` cuando el proceso todavía no tiene registros: la pestaña se ve pero no se abre.
- Con `estadosPropios` cuando el proceso tiene documentos fuera del ciclo creador/aprobador (Registrado y Procesado
  del cierre anual) y con `cambioEstadoLocal` si es DATA MOCK: Verificar y Aprobar en lote le avisan al almacén.
- Con `sinAccionesEnLote` cuando ningún documento del usuario se verifica ni se aprueba (el cierre anual de un Pliego
  o de una U.E.) y con `abrirHistorialRegistro` cuando el proceso mock muestra su propio historial del registro.

### Cuándo no

- Para «Consultas y reportes» con búsqueda por criterios: usar `siaf-page-shell` con `siaf-page-header`.
- Para ver o editar una solicitud: usar `siaf-solicitude-page-layout`.
- Rearmar una bandeja con `siaf-table-controls`, `siaf-documents-records-table` y `siaf-pagination` sueltos, o
  duplicar las reglas de rol: declarar otro `DocumentsRecordsConfig`.
- Para la Bandeja de Documentos del shell (Recibidos, Enviados, Borradores, Papelera): es `siaf-tray-documents-view`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `config` (obligatoria) | `DocumentsRecordsConfig` | — |  |
| `loading` | `boolean` | `false` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(documentsQueryChange)` | `DocumentsQuery` | Consulta remota de la pestaña Documentos (solo si la config declara `serverQuery`): se emite al confirmar la búsqueda (Enter/lupa), al cambiar de página y al cambiar el tamaño de página. El padre la resuelve contra el backend y devuelve `documentRows` ya filtrados y paginados. |
| `(recordsQueryChange)` | `DocumentsQuery` | Igual que `documentsQueryChange`, para la pestaña Registros (`serverRecordsQuery`). |
| `(tabChange)` | `'documents' \| 'records'` |  |

## Accesibilidad

Roles y atributos del código: `role="button"`, `aria-hidden`, `aria-label`.

### Teclado

- **Tab**: recorre el breadcrumb, «Crear documento», las pestañas, el buscador y sus menús, los filtros, «Agregar
  filtro», la barra de la grilla, la tabla y la paginación; cada control sigue su componente.
- **Flechas izquierda / derecha, Inicio y Fin**: cambian entre Documentos y Registros (`siaf-tabs`).
- **Enter** en el buscador: aplica la búsqueda (con búsqueda en el servidor, recién ahí consulta).
- **Enter / Espacio** en un chip de filtro personalizado: lo abre para editarlo; en su X, lo quita.
- **Escape**: cierra el popover «Crear documento» o el filtro personalizado y el foco vuelve a su botón; salir del
  popover con Tab también lo cierra. Las capas transparentes que cierran al pulsar fuera no son paradas de Tab.

### Notas

- **1.3.1 Información y relaciones (A)**: el título del proceso es el `h1` y «Documentos existentes» / «Registros
  existentes», el `h2` de la grilla; el breadcrumb es un `nav` y la página vive dentro del `main` del shell.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: las pestañas no apuntan a un `role="tabpanel"` (la grilla no lo
  declara), y la X que quita un filtro personalizado es un `span` `role="button"` dentro de otro `<button>`: un
  control anidado en un botón puede no anunciarse.
- **Pendiente · 2.5.3 Etiqueta en el nombre (A)**: cada chip de filtro personalizado se llama «Filtro personalizado
  aplicado» y su texto visible («Campo: valor») no forma parte del nombre.
- **2.4.3 Orden del foco (A)**: el popover «Crear documento» y el filtro personalizado reciben el foco al abrirse,
  cierran con Escape y lo devuelven a su botón (`siafFoco`).
- **Pendiente · 2.4.11 Foco no oculto (AA)**: en escritorio la cabecera (breadcrumb, título y pestañas) queda fija
  bajo el navbar y no hay `scroll-padding`: al volver con Shift + Tab, un control de la grilla puede quedar tapado.
- **4.1.3 Mensajes de estado (AA)**: la carga de la grilla se anuncia con `siaf-table-skeleton` (`role="status"`) y
  el resultado de verificar o aprobar en lote con `siaf-snackbar` (`role="status"`; `role="alert"` si falla).
- **2.4.7 Foco visible (AA)**: los chips de filtro personalizado y «Agregar filtro» no tienen estilo propio ni
  `outline-none`: queda el anillo nativo; el resto sigue su componente.
- **1.4.3 Contraste mínimo (AA)**: `h1` y `h2` en `text-text` (16.29:1 / 16.53:1) y el subtítulo en
  `text-text-muted` (5.01:1 / 8.86:1) sobre `bg-surface`.

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siaf-account-history-panel`](siaf-account-history-panel.md), [`siaf-asiento-history-panel`](siaf-asiento-history-panel.md), [`siaf-breadcrumb`](siaf-breadcrumb.md), [`siaf-button`](siaf-button.md), [`siaf-column-visibility-panel`](siaf-column-visibility-panel.md), [`siaf-create-document`](siaf-create-document.md), [`siaf-custom-filter`](siaf-custom-filter.md), [`siaf-document-history-panel`](siaf-document-history-panel.md), [`siaf-documents-records-table`](siaf-documents-records-table.md), [`siaf-filter-pill`](siaf-filter-pill.md), [`siaf-icon`](siaf-icon.md), [`siaf-icon-dropdown-menu`](siaf-icon-dropdown-menu.md), [`siaf-modal`](siaf-modal.md), [`siaf-pagination`](siaf-pagination.md), [`siaf-records-search-toolbar`](siaf-records-search-toolbar.md), [`siaf-records-tabs`](siaf-records-tabs.md), [`siaf-snackbar`](siaf-snackbar.md), [`siaf-table-controls`](siaf-table-controls.md), [`siaf-table-skeleton`](siaf-table-skeleton.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-documents-records-page
