# Custom filter

> `siaf-custom-filter` · Componente de Datos y tablas

Panel de filtros personalizados: filas de condición con los selects Campo, Condición y Valor (`siaf-input`) que se
agregan o quitan; cambiar el Campo vacía la Condición y el Valor, e `initialRows` precarga las filas al editar un
filtro ya aplicado.

`aplicar` emite solo las filas completas, `cancelar` las limpia y, con `deleteEnabled`, quitar la única fila emite
`eliminar`. Solo pinta el contenido: el padre lo abre como panel flotante y lo cierra.

## Importar

```ts
import { CustomFilterComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-custom-filter />
```

### Cuándo usarlo

- Para el panel «Agregar filtro» de la bandeja y de las pestañas Documentos / Registros
  (`siaf-documents-records-page`): cada filtro aplicado queda como un chip que se puede reabrir.
- Para editar ese chip: abrirlo con `initialRows` y `[deleteEnabled]="true"`, así quitar la única condición elimina
  el filtro.
- Cuando el criterio combina un campo, una condición (Es igual a, Contiene) y un valor elegido de una lista.

### Cuándo no

- Para filtrar por un solo campo con pocas opciones (Estado, Tipo de acción): `siaf-filter-pill`.
- Para buscar texto libre: `siaf-form-table-search` (en Documentos y registros y la bandeja, su variante
  `siaf-records-search-toolbar`).
- Para mostrar los criterios ya aplicados en Consultas y reportes: `siaf-consultas-filtros-chips`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `campoOptions` | `TextFieldOption[]` | `[]` |  |
| `condicionOptions` | `TextFieldOption[]` | `[]` |  |
| `deleteEnabled` | `boolean` | `false` |  |
| `initialRows` | `FilterRow[]` | `[]` |  |
| `valorOptions` | `TextFieldOption[]` | `[]` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(aplicar)` | `CustomFilterApplyEvent` |  |
| `(cancelar)` | `void` |  |
| `(eliminar)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `aria-label`.

### Teclado

- **Tab**: al abrirse, el foco entra en el primer campo; recorre fila por fila los selects Campo, Condición y Valor y
  la papelera; después «Agregar condición», Aplicar (habilitado solo con una fila completa) y Cancelar.
- **Enter / Espacio**: en «Agregar condición» suman una fila; en la papelera la quitan (con `deleteEnabled` y una
  sola fila, emiten `eliminar`).
- Los selects siguen `siaf-input` y Aplicar / Cancelar, `siaf-button`.
- **Escape**: emite `cancelar` para que el padre cierre el panel; el foco vuelve al botón que lo abrió. Con la lista
  de un select abierta, Escape cierra solo la lista.

### Notas

- **Pendiente · 1.3.1 Información y relaciones (A)**: el título «Agregar filtros personalizados» es un `<span>`, no
  un encabezado, y las filas no se agrupan (`fieldset` o `role="group"`): con varias condiciones se repiten «Campo»,
  «Condición», «Valor» y «Eliminar condicion» sin decir de qué fila son.
- **4.1.2 Nombre, función y valor (A)**: los selects de `siaf-input` publican `aria-haspopup="listbox"` y
  `aria-expanded`; la papelera es un `<button>` con `aria-label` («Eliminar condicion», sin tilde) y Aplicar usa
  `disabled`.
- **Pendiente · 2.4.3 Orden del foco (A)**: con `siafFoco` (sin atrapar Tab) el foco entra al abrirse y vuelve al
  botón que lo abrió al cerrarse, pero al agregar una condición el foco no pasa a la fila nueva y, al quitar la fila
  final, su papelera desaparece sin mover el foco.
- **3.3.2 Etiquetas o instrucciones (A)**: cada select muestra su etiqueta (Campo, Condición, Valor); no hay texto
  que diga que Aplicar necesita una fila completa.
- **1.4.3 Contraste mínimo (AA)**: título `text-neutral-medium` (14.53:1 / 12.87:1), «Agregar condición»
  `text-neutral-high` (16.29:1 / 16.53:1) y papelera `text-neutral-low` (5.01:1 / 8.86:1) sobre la superficie.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: los selects heredan de `siaf-input` el borde
  `border-states-enabled` (2.44:1 / 2.59:1) mientras no tienen foco ni valor.
- **2.4.7 Foco visible (AA)**: «Agregar condición» y la papelera muestran un contorno de 2 px del color de su texto
  (`focus-visible:outline-2`); los selects y los botones, el de su componente.
- **2.5.8 Tamaño del objetivo (AA)**: papelera de 32 px, «Agregar condición» de unos 28 px de alto y Aplicar /
  Cancelar de 32 px (`siaf-button` en `sm`).

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siaf-button`](siaf-button.md), [`siaf-icon`](siaf-icon.md), [`siaf-input`](siaf-input.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-custom-filter
