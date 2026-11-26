# Empty state

> `siaf-empty-state` · Componente de Estado y feedback

Estado vacío ilustrado para pantallas de consulta, reportes y
listados. Centra una ilustración + título + descripción y, opcional,
un CTA primario.

No confundir con `empty-section` (shared/ui/empty-section), que es
un placeholder de SECCIÓN dentro de un formulario.

Ejemplo:

  <siaf-empty-state
    illustration="no-results"
    title="Aún no se encontraron resultados"
    description="Ingrese los criterios de búsqueda para visualizar la información disponible."
  />

## Importar

```ts
import { EmptyStateComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-empty-state />
```

### Cuándo usarlo

- En las pantallas de Consultas y reportes antes de la primera búsqueda: «Aún no se encontraron resultados»
  (Plan de Cuentas, Asiento de ajuste, Catálogo de tipos de asiento, Contabilización, Libros contables).
- Cuando un listado no tiene registros (`illustration="no-data"`) o falta elegir un registro para ver su
  detalle (`no-selection`).
- `illustration="no-records"` (la hoja con casillas «Sin registros», exportada del Figma) en la plantilla
  `siaf-query-report-page`, la nueva versión de Consultas y reportes.
- Con `actionLabel` cuando hay una acción directa para salir del vacío.

### Cuándo no

- Para una sección de formulario sin valor elegido: usar `empty-section`.
- Para una nota breve dentro de una tarjeta: usar `message-box`.
- Mientras los datos cargan: usar `siaf-table-skeleton` o `siaf-loader`.
- Para un error al cargar: usar `siaf-alert` con `tone="error"`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `actionDisabled` | `boolean` | `false` |  |
| `actionIcon` | `string` | `''` |  |
| `actionLabel` | `string` | `''` |  |
| `description` | `string` | `''` |  |
| `illustration` | `'no-results' \| 'no-data' \| 'no-selection' \| 'no-records'` | `'no-results'` |  |
| `title` | `string` | `''` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(actionClicked)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `aria-hidden`, `aria-live`.

### Teclado

- **Tab**: con `actionLabel`, enfoca el botón de acción (deshabilitado no recibe el foco); sin él, no hay nada
  que enfocar.
- **Enter / Espacio**: el botón emite `actionClicked` (sigue `siaf-button`).

### Notas

- **1.1.1 Contenido no textual (A)**: la ilustración SVG va con `aria-hidden`; el mensaje está en el título y la
  descripción.
- **1.3.1 Información y relaciones (A)**: el título es un `<h2>` de nivel fijo, que encaja bajo el `<h1>` de
  `siaf-page-header` en las consultas; la descripción es un párrafo.
- **4.1.3 Mensajes de estado (AA)**: el bloque es `aria-live="polite"` y anuncia los cambios de título o
  descripción; si el padre lo inserta ya lleno con un bloque if, no todos los lectores lo anuncian.
- **1.4.3 Contraste mínimo (AA)**: título `text-neutral-high` 16.29:1 (16.53:1 en oscuro) y descripción
  `text-neutral-medium` 14.53:1 (12.87:1) sobre la superficie.
- **4.1.2 Nombre, función y valor (A)**: el botón de acción es un `siaf-button` con `ariaLabel` igual a su texto
  visible (`actionLabel`).

## Composición

Pinta por dentro: [`siaf-button`](siaf-button.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-empty-state
