# Records search toolbar

> `siaf-records-search-toolbar` · Componente de Datos y tablas

Variante de `siaf-form-table-search` para Documentos y registros: el mismo campo con lupa a todo el ancho, pero sin
los botones fijos Filtrar y Más opciones; las acciones de la derecha se proyectan con el atributo `actions`. En
Documentos y registros son los menús Campos, Favorito y Más opciones (`siaf-icon-dropdown-menu`). Siempre lleva sus
acciones: no hay variante sin ellas. En pantallas angostas las acciones bajan debajo del campo.

```html
<siaf-records-search-toolbar [value]="busqueda" placeholder="Buscar" (searchSubmit)="buscar($event)">
  <ng-container actions>
    <siaf-icon-dropdown-menu icon="layers" ariaLabel="Campos" [items]="campos" />
    <siaf-icon-dropdown-menu icon="star_border" ariaLabel="Favorito" [items]="favoritos" />
    <siaf-icon-dropdown-menu icon="more_vert" ariaLabel="Más opciones" [items]="masOpciones" />
  </ng-container>
</siaf-records-search-toolbar>
```

## Importar

```ts
import { RecordsSearchToolbarComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-records-search-toolbar>…</siaf-records-search-toolbar>
```

### Cuándo usarlo

- En la barra de las pestañas Documentos / Registros (`siaf-documents-records-page`) y en la Bandeja de Documentos
  (`siaf-tray-documents-view`), con Campos, Favorito y Más opciones proyectados con el atributo `actions`.
- Cuando las acciones de la derecha cambian según la pantalla: se proyectan, no vienen fijas.

### Cuándo no

- Sin acciones propias, sobre las tablas de las solicitudes o en Apertura contable: `siaf-form-table-search`, el
  buscador del resto de las pantallas.
- Para un campo de formulario con etiqueta y validación: `siaf-input`.
- Para filtros por opciones o por condiciones: `siaf-filter-pill` y `siaf-custom-filter` debajo de la barra, no
  como acciones.
- Rehacer el campo con la lupa y los menús a mano: la bandeja lo hacía hasta 2026-09 y quedaba distinta.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ariaLabel` | `string` | `'Buscar'` | aria-label (también se usa como sr-only para lectores de pantalla). |
| `disabled` | `boolean` | `false` | Deshabilita el input. |
| `placeholder` | `string` | `'Buscar'` | Placeholder visible. |
| `value` | `string` | `''` | Valor actual del input. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(searchSubmit)` | `string` | Emite al confirmar la búsqueda (Enter o clic en la lupa). La búsqueda ya no se dispara por tecleo: con la búsqueda en el servidor, cada consulta es un viaje HTTP y disparar una por letra sería puro desperdicio. OJO con el nombre: los inputs `type="search"` disparan un evento DOM nativo llamado `search` (Enter y la ✕ de limpiar). Un output llamado igual recibe también ese evento burbujeado, y el handler que espera un string termina pintando "[object Event]". Por eso `searchSubmit`. |
| `(valueChange)` | `string` | Emite el nuevo valor al tipear. |

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- **Tab**: recorre el campo, la lupa y después las acciones proyectadas.
- **Enter**: en el campo, confirma la búsqueda y emite `valueChange` y `searchSubmit` con lo escrito; escribir no
  busca.
- **Enter / Espacio**: en la lupa confirman igual. Las acciones siguen su componente (p. ej.
  `siaf-icon-dropdown-menu`).

### Notas

- **Pendiente · 4.1.2 Nombre, función y valor (A)**: el input `ariaLabel` no se usa en la plantilla, pese a lo que
  dice su comentario: el nombre del campo sale de `placeholder`, hoy «Buscar» en todas las pantallas. Cada acción
  proyectada necesita su propio `ariaLabel`.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: el resultado de la búsqueda no se anuncia; la pantalla debe
  anunciar el total (p. ej. con `role="status"`).
- **Pendiente · 1.4.11 Contraste no textual (AA)**: el borde del campo sin foco es `border-states-enabled` (2.44:1 /
  2.59:1). El anillo de foco de la lupa ya es el azul del kit (`border-states-focus`, 5.35:1 / 10.15:1).
- **2.4.7 Foco visible (AA)**: el campo pasa a un borde de 2 px `border-states-focus` (5.35:1 / 10.15:1) y la lupa
  muestra un anillo de 2 px.
- **2.5.8 Tamaño del objetivo (AA)**: la lupa mide 24 px; las acciones, lo que defina su componente.

## Composición

Pinta por dentro: [`siaf-input`](siaf-input.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-records-search-toolbar
