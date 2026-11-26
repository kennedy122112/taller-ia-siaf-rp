# Pagination

> `siaf-pagination` · Componente de Datos y tablas

Paginación de las grillas: contador «1-10 de 800» y flechas Página anterior / Página siguiente, que se deshabilitan
solas en la primera y la última página.

Con `position="Bottom"` y `rowPage` suma a la izquierda el select nativo de filas por página; en `Top` es la versión
compacta que pinta `siaf-table-controls`. Solo emite eventos (`previous`, `next`, `rowsPerPageChange`): el padre
cambia `page` y las filas.

## Importar

```ts
import { PaginationComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-pagination />
```

### Cuándo usarlo

- Debajo de toda grilla, con `position="Bottom"` y `[rowPage]="true"`: bandeja, pestañas Documentos / Registros,
  panel lateral de selección, listados de Admin y tablas de solicitudes y consultas.
- Con `rowsPerPageOptions` propias si la tabla usa otros tamaños (detalle anual de apertura contable, pedidos de
  contabilización).

### Cuándo no

- `position="Top"` suelta sobre la tabla: la barra superior es siempre `siaf-table-controls`, que ya la incluye.
- Forzar `navigation="Inactive"` cuando todo cabe en una página: `Activate` (por defecto) ya deshabilita las flechas
  en los bordes.
- Para avanzar por las etapas de un flujo: `siaf-steps` o `siaf-button`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `counterPage` | `string` | `''` |  |
| `navigation` | `'Inactive' \| 'Activate'` | `'Activate'` | 'Activate' (default): flechas navegables — se deshabilitan solas en los bordes (page 1 / última). 'Inactive' fuerza ambas deshabilitadas. |
| `page` | `number` | `1` |  |
| `pageSize` | `number` | `10` |  |
| `position` | `'Top' \| 'Bottom'` | `'Top'` |  |
| `rowPage` | `boolean` | `false` |  |
| `rowsPerPage` | `number` | `10` |  |
| `rowsPerPageOptions` | `number[]` | `[10, 25, 50, 100]` |  |
| `totalItems` | `number` | `800` |  |
| `totalPages` | `number` | `1` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(next)` | `void` |  |
| `(previous)` | `void` |  |
| `(rowsPerPageChange)` | `number` |  |
| `(rowsPerPageOpened)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `aria-label`.

### Teclado

- **Tab**: recorre el select de filas por página (con `rowPage`) y las flechas; una flecha deshabilitada queda fuera.
- **Enter / Espacio**: en una flecha, cambian de página (emiten `previous` o `next`).
- **Flechas arriba / abajo**: en el select nativo eligen otra cantidad de filas (emite `rowsPerPageChange`).

### Notas

- **1.3.1 Información y relaciones (A)**: es un `<nav aria-label="Paginación">`; en la grilla estándar hay dos con el
  mismo nombre (el de `siaf-table-controls` arriba y este abajo).
- **4.1.2 Nombre, función y valor (A)**: las flechas son `<button>` con `aria-label` («Página anterior», «Página
  siguiente») y `disabled` en los bordes; el select lleva `aria-label` «Filas por página».
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: el contador es un `<span>` sin `role="status"` ni `aria-live`:
  cambiar de página o de filas por página, o filtrar, no se anuncia.
- **Pendiente · 2.4.3 Orden del foco (A)**: al llegar a la primera o la última página, la flecha enfocada pasa a
  `disabled` y el componente no mueve el foco a otro control.
- **1.4.3 Contraste mínimo (AA)**: contador en `text-neutral-low` (5.01:1 / 8.86:1) y valor del select en
  `text-neutral-high` (16.29:1 / 16.53:1) sobre la superficie.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: el borde del select es `border-states-enabled` (2.44:1 /
  2.59:1). El anillo de foco ya es el azul del kit (`border-states-focus`, 5.35:1 / 10.15:1).
- **2.4.7 Foco visible (AA)**: el select y las flechas muestran un anillo de 2 px `border-states-focus` separado
  2 px. El del select antes no se pintaba: con `outline-none`, Tailwind v4 dejaba el estilo del contorno en `none`.
- **2.5.8 Tamaño del objetivo (AA)**: flechas de 40 px y select de 32 px de alto.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-pagination
