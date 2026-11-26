# Table controls

> `siaf-table-controls` · Componente de Datos y tablas

Barra superior estándar de las grillas: checkbox de seleccionar todo (con estado indeterminado), acciones sobre las
filas elegidas y, a la derecha, `siaf-pagination` en posición `Top`.

Las acciones (editar, eliminar, exportar, más opciones y las que la página proyecta con el atributo `tableAction`)
solo aparecen con `selectedCount` mayor que 0, cada una encendida con `showEditAction`, `showDeleteAction`,
`showExportAction` o `showMenuAction`. Con `[showSelection]="false"` queda solo la paginación.

## Importar

```ts
import { TableControlsComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-table-controls>…</siaf-table-controls>
```

### Cuándo usarlo

- Arriba de toda grilla, siempre: bandeja, pestañas Documentos / Registros, panel lateral de selección y tablas de
  solicitudes, consultas, Admin y Apertura contable.
- En edición, con `[showSelection]="!isReadOnly"` y las acciones que correspondan (p. ej. `showEditAction` con
  `editDisabled` si hay más de una fila elegida); en consulta, con `[showSelection]="false"`.
- Para una acción extra sobre la selección: proyectarla con `tableAction` (Libros contables proyecta un
  `siaf-icon-dropdown-menu` «Descargar la selección»; el validador del cierre contable mensual, el menú «Validar
  datos contables / Cerrar período contable»).
- `editDisabled` y `deleteDisabled` cuando el diseño muestra la acción pero no aplica a la selección: el validador
  del cierre contable mensual las deja grises junto a su menú.

### Cuándo no

- Armar la barra a mano con un checkbox y `siaf-pagination` en `Top`: esa paginación solo vive dentro de este
  componente.
- Para la paginación de abajo: `siaf-pagination` con `position="Bottom"` y `rowPage`.
- Para acciones que no dependen de la selección (crear, exportar todo): van en la cabecera de la sección con
  `siaf-button` o `siaf-icon-dropdown-menu`; aquí solo aparecen con filas elegidas.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `checked` | `boolean` | `false` |  |
| `deleteDisabled` | `boolean` | `false` |  |
| `deleteLabel` | `string` | `'Eliminar filas seleccionadas'` |  |
| `disabled` | `boolean` | `false` |  |
| `editDisabled` | `boolean` | `false` |  |
| `editLabel` | `string` | `'Editar fila seleccionada'` |  |
| `exportLabel` | `string` | `'Exportar filas seleccionadas'` |  |
| `hideTopPaginationOnMobile` | `boolean` | `false` |  |
| `indeterminate` | `boolean` | `false` |  |
| `menuLabel` | `string` | `'Mas opciones'` |  |
| `page` | `number` | `1` |  |
| `pageSize` | `number` | `10` |  |
| `selectAllLabel` | `string` | `'Seleccionar filas'` |  |
| `selectedCount` | `number` | `0` |  |
| `showDeleteAction` | `boolean` | `false` |  |
| `showEditAction` | `boolean` | `false` |  |
| `showExportAction` | `boolean` | `false` |  |
| `showMenuAction` | `boolean` | `false` |  |
| `showSelection` | `boolean` | `true` |  |
| `totalItems` | `number` | `0` |  |
| `totalPages` | `number` | `1` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(delete)` | `void` |  |
| `(edit)` | `void` |  |
| `(exported)` | `void` |  |
| `(menu)` | `void` |  |
| `(next)` | `void` |  |
| `(previous)` | `void` |  |
| `(selectionChange)` | `boolean` |  |

## Accesibilidad

Roles y atributos del código: `aria-label`.

### Teclado

- **Tab**: recorre el checkbox de seleccionar todo, las acciones visibles y las flechas de la paginación.
- **Espacio**: marca o desmarca el checkbox (nativo) y emite `selectionChange`.
- **Enter / Espacio**: ejecutan la acción enfocada. Las flechas siguen `siaf-pagination` y las acciones proyectadas,
  su componente.

### Notas

- **4.1.2 Nombre, función y valor (A)**: checkbox nativo con `aria-label` (`selectAllLabel`, «Seleccionar filas» por
  defecto) y estado mixto con `indeterminate`; las acciones son `<button>` con `aria-label` (`editLabel`,
  `deleteLabel`, `exportLabel` y `menuLabel`, este «Mas opciones» sin tilde); `editDisabled` y `deleteDisabled` usan
  `disabled`.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: el contador de la paginación superior no se anuncia al cambiar de
  página o filtrar (lo hereda de `siaf-pagination`), y tampoco hay aviso de cuántas filas quedan elegidas.
- **Pendiente · 2.4.3 Orden del foco (A)**: las acciones solo existen con filas elegidas: si una deja la selección
  en 0 (p. ej. Eliminar), su botón enfocado desaparece y el foco no pasa a otro control.
- **1.4.11 Contraste no textual (AA)**: borde del checkbox en `icon-states-enabled` (8.70:1 / 12.87:1; marcado, en
  `icon-states-active`, 8.79:1 / 10.15:1) e íconos de acción en `text-neutral-low` (5.01:1 / 8.86:1).
- **2.4.7 Foco visible (AA)**: sin estilo propio: el checkbox y los botones muestran el anillo nativo del navegador;
  las flechas, el de `siaf-pagination`.
- **2.5.8 Tamaño del objetivo (AA)**: el `<label>` del checkbox y cada acción miden 40 × 40 px.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md), [`siaf-pagination`](siaf-pagination.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-table-controls
