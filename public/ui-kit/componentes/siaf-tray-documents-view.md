# Tray documents view

> `siaf-tray-documents-view` · Componente de Armazón de la aplicación

Vista de la Bandeja de Documentos: la grilla de una sección (`title` = Recibidos, Enviados,
Borradores o Papelera) con buscador, filtros de Estado y Tipo de acción, filtros personalizados y favoritos.

Las filas salen de `FuenteBandeja` (los documentos del rol vigente, que provee el proyecto: el kit no llama a
ninguna API) y se recortan con `SECTION_STATES`, que define qué estados ve cada sección; sin filtro de estado explícito
ordena "pendientes primero". El buscador es `siaf-records-search-toolbar`, la misma barra de Documentos y registros,
con los menús Campos y Favorito y el botón Más opciones proyectados: solo aplica con Enter o la lupa.

## Importar

```ts
import { TrayDocumentsViewComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-tray-documents-view />
```

### Cuándo usarlo

- Como contenido de la Bandeja de Documentos en `siaf-app-shell`: se pinta al elegir Recibidos, Enviados, Borradores
  o Papelera en `siaf-tray-menu`, con esa sección en `title`.
- Para revisar los documentos propios según el rol: el creador ve borradores, enviados, respuestas del aprobador y
  eliminados; el aprobador, lo que recibe para aprobar y lo que ya respondió.

### Cuándo no

- Para los documentos de un proceso (plan de cuentas, asientos de ajuste, catálogo de eventos…): usar
  `siaf-documents-records-page`, con pestañas Documentos / Registros e historial.
- Para la sección Notificaciones de la bandeja: usar `siaf-tray-notifications-view`.
- Como base de una grilla nueva: varios controles aún no hacen nada (casillas, Campos, Favorito, Más opciones,
  Historial e Inicio); partir de `siaf-table-controls`, `siaf-documents-records-table` y `siaf-pagination`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `title` | `string` | `'Borradores'` |  |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `role="button"`, `aria-hidden`, `aria-label`.

### Teclado

- **Enter** en el buscador: aplica la búsqueda, igual que la lupa; escribir no filtra por sí solo.
- **Enter / Espacio** en la X de un filtro personalizado: lo quita; sobre el resto del chip, lo abre para editarlo.
- **Tab**: al abrir el panel de filtros personalizados el foco entra en su primer campo, aunque se pinte después de
  la paginación; se cierra con Aplicar, Cancelar o Escape.
- Los demás controles siguen su componente: `siaf-records-search-toolbar`, `siaf-filter-pill`, `siaf-icon-dropdown-menu`,
  `siaf-table-controls`, `siaf-pagination` y `siaf-custom-filter`.

### Notas

- **Pendiente · 1.3.1 Información y relaciones (A)**: `h1`, `h2` y `<table>` con `<th>` están bien, pero la ruta de
  navegación es un `nav` hecho a mano, sin `ol`/`li` ni `aria-current` (`siaf-breadcrumb` ya lo resuelve); las
  columnas de casilla e Historial tienen `<th>` vacío y el encabezado «Fecha de re...» viene cortado en el texto.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: celdas en `text-neutral-medium` sobre la superficie (14.53:1 / 12.87:1),
  pero la etiqueta Observado (`siaf-flow-status-tag`) queda en 3.39:1 en claro.
- **2.4.3 Orden del foco (A)**: el panel de filtros personalizados (`siaf-custom-filter`) recibe el foco al abrirse,
  cierra con Escape y lo devuelve al botón que lo abrió, aunque se pinte después de la grilla.
- **2.4.7 Foco visible (AA)**: los botones propios (Inicio, Más opciones, chips de filtro personalizado, «Agregar
  filtro personalizado» e Historial) y las casillas no tienen estilo de foco y quedan con el anillo del navegador;
  los controles del kit traen el suyo.
- **Pendiente · 2.5.8 Tamaño del objetivo (AA)**: la X para quitar un filtro personalizado mide 20 px (`size-5`) y está
  dentro del chip, que es otro objetivo.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: las casillas de fila no tienen nombre; el chip de filtro
  personalizado se llama siempre «Filtro personalizado aplicado» (tapa campo y valor) y su X es un `role="button"`
  dentro de otro `<button>`, que los lectores no anuncian bien; «Agregar filtro personalizado» no publica
  `aria-expanded`.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: buscar, filtrar o paginar cambia la grilla y el contador «1-10 de N»
  sin anunciarlo, y sin resultados la tabla queda vacía, sin mensaje.

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-custom-filter`](siaf-custom-filter.md), [`siaf-filter-pill`](siaf-filter-pill.md), [`siaf-flow-status-tag`](siaf-flow-status-tag.md), [`siaf-icon`](siaf-icon.md), [`siaf-icon-dropdown-menu`](siaf-icon-dropdown-menu.md), [`siaf-pagination`](siaf-pagination.md), [`siaf-records-search-toolbar`](siaf-records-search-toolbar.md), [`siaf-table-controls`](siaf-table-controls.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-tray-documents-view
