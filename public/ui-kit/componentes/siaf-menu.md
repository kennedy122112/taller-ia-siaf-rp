# Menu

> `siaf-menu` · Componente de Botones y acciones

Menú de opciones del design system (Figma UI KIT, nodo 7440:34249 «menus»): panel de 280 px con
sombra de elevación 8 y una opción por fila.

- `leading`: `none`, `icon` (el `icon` de cada opción), `radio` (elección única, `[(selectedValue)]`)
  o `checkbox` (varias, `[(selectedValues)]`), con el radio y el checkbox nativos del kit.
- Al final, `trailingIcon` por opción, o la flecha de submenú: con `children` el submenú se abre al costado
  (puntero, clic, → o Enter; ← o Escape lo cierra) y su elección sale por el mismo `selected`. Se abre a la
  derecha, o a la izquierda / debajo si no entra en la ventana. El nivel 2
  lleva íconos si el menú los lleva; `submenuLeading="none"` lo deja solo con texto.
- `density`: `standard` (48 px por opción, íconos de 24) o `compact` (32 px, íconos de 20).
- Un texto que no entra se corta y muestra el completo con `siafTooltip`.
- `maxHeight` agrega scroll. Se navega con ↑ ↓ Inicio Fin y Escape emite `closed`.

Emite `selected` con el valor elegido. Es solo el panel: para abrirlo desde un botón con ícono va
`siaf-icon-dropdown-menu`, y para dos niveles, `siaf-cascading-menu`.

## Importar

```ts
import { MenuComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-menu />
```

### Cuándo usarlo

- Como panel de opciones de los disparadores del kit: `siaf-icon-dropdown-menu` (Campos, Favorito y Exportar),
  `siaf-filter-pill` (filtros Estado y Tipo de acción de la bandeja) y `siaf-cascading-menu` (el «+» de la solicitud
  del catálogo de eventos).
- `leading="radio"` o `checkbox` cuando la opción queda marcada (una sola o varias), en vez de dibujar el check a
  mano.
- `children` para un segundo nivel corto; `density="compact"` en barras y filtros, `standard` en menús sueltos.

### Cuándo no

- Para abrirlo desde un botón: no armar a mano el disparador, la apertura y el cierre; usar `siaf-icon-dropdown-menu`
  o `siaf-cascading-menu`.
- Para elegir un valor dentro de un formulario: usar `siaf-select-options` o `siaf-radio-group`.
- Para contenido con título, texto o acciones al pie: usar `siaf-popover`.
- Para navegar entre pantallas: usar `siaf-process-menu-tree` o enlaces.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ariaLabel` | `string` | `''` |  |
| `density` | `'standard' \| 'compact'` | `'standard'` |  |
| `esSubmenu` | `boolean` | `false` | Uso interno: el panel es un submenú (← también lo cierra). |
| `items` | `MenuItem[]` | `[]` |  |
| `leading` | `'none' \| 'icon' \| 'radio' \| 'checkbox'` | `'none'` |  |
| `maxHeight` | `number \| null` | `null` | Alto máximo en px; por encima aparece el scroll. |
| `selectedValue` | `string \| null` | `null` | Opción marcada con `leading="radio"`. |
| `selectedValues` | `string[]` | `[]` | Opciones marcadas con `leading="checkbox"`. |
| `submenuLeading` | `'none' \| 'icon' \| null` | `null` | Elemento inicial de las opciones del submenú. Por defecto, íconos si este menú los usa; si no, nada. |
| `width` | `number` | `280` | Ancho del panel en px (280 en el Figma). |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(closed)` | `void` |  |
| `(selected)` | `string` |  |
| `(selectedValueChange)` | `string` |  |
| `(selectedValuesChange)` | `string[]` |  |

## Accesibilidad

Patrón WAI-ARIA: Menú (https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).

Roles y atributos del código: `role="menu"`, `aria-checked`, `aria-disabled`, `aria-expanded`, `aria-haspopup`, `aria-hidden`, `aria-label`.

### Teclado

- **Tab**: el menú es una sola parada: entra en la última opción enfocada (al principio, la primera habilitada) y la
  siguiente pulsación sale del menú; las opciones se recorren con las flechas.
- **Flecha arriba / abajo**: pasan a la opción habilitada anterior o siguiente (dan la vuelta).
- **Inicio / Fin**: van a la primera o a la última opción habilitada.
- **Enter / Espacio**: eligen la opción y emiten `selected` (con `radio` la marcan y con `checkbox` la alternan); en
  una opción con `children`, abren el submenú y enfocan su primera opción.
- **Flecha derecha**: abre el submenú de la opción y enfoca su primera opción.
- **Flecha izquierda** (dentro del submenú): lo cierra y devuelve el foco a la opción que lo abrió.
- **Escape**: en un submenú hace lo mismo que la flecha izquierda; en el menú principal emite `closed` y quien lo
  abre decide cerrarlo.

### Notas

- **4.1.2 Nombre, función y valor (A)**: el panel es `role="menu"` con `aria-label` (el padre debe dar `ariaLabel`;
  el submenú toma el texto de su opción) y cada opción, `menuitem`, `menuitemradio` o `menuitemcheckbox` con
  `aria-checked` y `aria-disabled`; las que abren submenú llevan `aria-haspopup` y `aria-expanded`.
- **1.1.1 Contenido no textual (A)**: los íconos son decorativos y el radio y el checkbox nativos llevan
  `aria-hidden` y `tabindex="-1"`: el estado lo publica `aria-checked`.
- **2.1.1 Teclado (A)**: todo se opera con teclado y Tab sale del menú sin trampa; al enfocar una opción cortada,
  `siafTooltip` muestra su texto completo.
- **2.4.3 Orden del foco (A)**: abrir un submenú con teclado enfoca su primera opción y cerrarlo con flecha izquierda
  o Escape devuelve el foco a la opción que lo abrió. Llevar el foco al menú al abrirlo le toca al disparador
  (`siaf-icon-dropdown-menu` lo hace).
- **2.4.7 Foco visible (AA)**: la opción enfocada con teclado lleva un contorno interior azul de 2 px
  (`border-states-focus`, 5.35:1 claro / 10.15:1 oscuro) además de la capa gris `bg-states-light-focus`, que sola no
  se distinguía en oscuro.
- **1.4.3 Contraste mínimo (AA)**: texto `text-neutral-medium` sobre `bg-surfaces-surface-highest`, que en claro es
  blanco como la superficie (14.53:1). Las opciones deshabilitadas (`opacity-40`) están exentas.
- **1.4.13 Contenido en hover o foco (AA)**: el submenú que abre el puntero se pega a su opción dentro del mismo
  contenedor, así que se puede pasar el puntero sobre él sin que se cierre; se cierra con flecha izquierda o Escape.
- **2.5.8 Tamaño del objetivo (AA)**: 48 px por opción en `standard` y 32 px en `compact`.

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-divider`](siaf-divider.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-menu
