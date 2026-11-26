# List

> `siaf-list` · Componente de Datos y tablas

Lista de ítems (Figma UI KIT, nodo 7421:7061 «Lists»): cada ítem con título, texto de apoyo y
overline opcionales, un elemento inicial (ícono, avatar con iniciales, switch o thumbnail) y uno final
(ícono, badge contador o switch).

- `size`: `standard` (48 px mínimo, íconos de 24) o `compact` (32 px, íconos de 20).
- El tipo de 1, 2 o 3+ líneas sale del contenido: sin descripción es de 1 línea; con descripción, esta
  se corta en una línea con tooltip, salvo `[wrapDescription]="true"`, que la deja crecer (3 líneas +).
- `dividers` agrega `siaf-divider` bajo cada ítem, menos el último (solo en vertical).
- `orientation="horizontal"` pone los ítems en fila, con 4 px de separación, 230 px de ancho, el contenido centrado y
  el título y la descripción en una línea cada uno (con tooltip si se cortan); el desplazamiento lo maneja el
  contenedor. `outlined` les pone borde: son las tarjetas de «Parámetros aplicados»
  (`siaf-parametros-aplicados`).
- `selectable` la vuelve una lista de opciones: hover, foco con teclado y seleccionado (fondo azul,
  título en negrita e ícono inicial en azul), con `[(selectedId)]`. Sin `selectable` es estática.
- Los switches son `siaf-switch` y emiten `switchChange` sin cambiar la selección.

## Importar

```ts
import { ListComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-list />
```

### Cuándo usarlo

- Para listas verticales de ítems con título, texto de apoyo e ícono, avatar o miniatura (p. ej. los documentos de
  un expediente, o novedades y capacitaciones).
- Con switches (`leading` o `trailing` de tipo `switch`) para una lista de preferencias, como «Avisar al aprobador».
- Con `selectable` y `[(selectedId)]` para elegir un ítem de una lista, como los expedientes del simulador del SIAF RP
  Web (AS IS).
- En horizontal y con `outlined` para una fila de tarjetas con ícono, título y valor, como los parámetros de una
  consulta: `siaf-parametros-aplicados` ya la arma con su título y su botón para desplazar.

### Cuándo no

- Para datos en columnas: `siaf-table` o `siaf-data-table`.
- Para opciones que se abren desde un botón: `siaf-menu` o `siaf-icon-dropdown-menu`.
- Combinar `selectable` con switches: el switch queda dentro de un `role="option"`, que no admite controles adentro.
- Para una jerarquía de nodos: `siaf-tree-view` o `siaf-process-menu-tree`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ariaLabel` | `string` | `''` |  |
| `dividers` | `boolean` | `false` |  |
| `items` | `ListItem[]` | `[]` |  |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | `vertical` (por defecto) o `horizontal`: ítems en fila de 230 px, sin desplazamiento propio. |
| `outlined` | `boolean` | `false` | Ítems con borde `border-states-enabled` (tarjetas). |
| `selectable` | `boolean` | `false` | Convierte la lista en opciones seleccionables con hover, foco y seleccionado. |
| `selectedId` | `string \| null` | `null` |  |
| `size` | `'standard' \| 'compact'` | `'standard'` |  |
| `wrapDescription` | `boolean` | `false` | Deja crecer la descripción en varias líneas (Figma «3 line+»). Por defecto se corta en una. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(selectedIdChange)` | `string` |  |
| `(switchChange)` | `ListSwitchChange` |  |

## Accesibilidad

Roles y atributos del código: `role="listbox"`, `role="option"`, `aria-hidden`, `aria-label`, `aria-orientation`, `aria-selected`.

### Teclado

- **Tab**: con `selectable`, la lista es una sola parada: entra por la última opción enfocada (al principio, la
  elegida o la primera) y la siguiente pulsación sale; sin `selectable`, solo pasa por los switches.
- **Flecha abajo / arriba**: con `selectable`, pasan a la opción siguiente o anterior y dan la vuelta (en horizontal,
  también **derecha / izquierda**).
- **Inicio / Fin**: van a la primera o a la última opción.
- **Enter / Espacio**: eligen la opción enfocada y emiten `selectedIdChange`; sobre un switch interno lo dejan
  actuar.
- Los switches siguen `siaf-switch`.

### Notas

- **1.3.1 Información y relaciones (A)**: `<ul>` y `<li>` reales; overline, título y descripción van como texto en
  orden de lectura.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: con `selectable` es `role="listbox"` con opciones
  `role="option"` y `aria-selected` (el padre debe dar `ariaLabel`); pero un switch dentro de una opción queda
  anidado, y ARIA trata los hijos de una opción como presentacionales.
- **1.1.1 Contenido no textual (A)**: íconos y avatar son decorativos (`aria-hidden`); la miniatura lleva `alt`
  vacío salvo que el padre dé uno (debe darlo si la imagen informa) y el badge contador necesita `ariaLabel` para
  decir qué cuenta.
- **2.1.1 Teclado (A)**: en una lista seleccionable, al enfocar la opción aparece el globo con la descripción
  cortada.
- **Pendiente · 2.1.1 Teclado (A)**: sin `selectable` las filas no reciben foco y la descripción cortada solo se
  completa con el mouse (la alternativa es `wrapDescription`).
- **1.4.13 Contenido en hover o foco (AA)**: ese tooltip (`siafTooltip`) se cierra con Escape y se puede recorrer con
  el puntero.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: título `text-neutral-medium` (14.53:1 / 12.87:1) y descripción
  `text-neutral-low` (5.01:1 / 8.86:1) sobre la superficie; en el ítem seleccionado la descripción queda sobre la
  capa `bg-states-light-selected`, que en claro la deja por debajo de 4.5:1.
- **1.4.1 Uso del color (A)**: el seleccionado no depende solo del fondo azul: el título pasa a negrita.
- **2.4.7 Foco visible (AA)**: la opción enfocada con teclado lleva un contorno interior azul de 2 px
  (`border-states-focus`, 5.35:1 claro / 10.15:1 oscuro), el mismo de `siaf-menu`, además de la capa
  `bg-states-light-focus`, que sola casi no se veía (1.27:1 en claro y sin redefinir en oscuro).
- **2.5.8 Tamaño del objetivo (AA)**: ítems de 48 px (`standard`) o 32 px (`compact`) de alto como mínimo.

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-badge`](siaf-badge.md), [`siaf-divider`](siaf-divider.md), [`siaf-icon`](siaf-icon.md), [`siaf-switch`](siaf-switch.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-list
