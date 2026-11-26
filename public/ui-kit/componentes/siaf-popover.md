# Popover

> `siaf-popover` · Componente de Superficies · Sin uso en la app

Popover: panel flotante anclado a un disparador, con título, texto y acciones de texto al pie
(Figma UI KIT, nodo 9059:20300: «Full», «Title + Content» y «Content + Actions»).

El disparador se proyecta con el atributo `popover-trigger` y el padre controla `open`. Se arman los
tres tipos con `title`, `text` y `actions`; `text` respeta los saltos de línea (párrafos, «Posibles valores:» y una
lista), y para contenido más rico, lo que se proyecte sin atributo va debajo del texto. `width` cambia el ancho del
panel. Con `floating` el panel es fijo junto al disparador (`PanelFlotante`, como el menú con `floatingMenu`): así no
lo recorta una tabla con scroll; ya pintado, se vuelve a ubicar con su alto (abre hacia arriba si abajo no cabe y
arriba hay más lugar) y, si tampoco cabe entero, se desplaza por dentro. Emite `closed` con Escape o al pulsar fuera, y
`action` al elegir un botón.

Para el texto completo de algo truncado va `siafTooltip`; para una lista de opciones, `siaf-menu` o
`siaf-icon-dropdown-menu`.

## Importar

```ts
import { PopoverComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-popover>…</siaf-popover>
```

### Cuándo usarlo

- Para una explicación breve anclada a un control que el usuario abre con un clic: la ayuda de un campo de la
  solicitud o qué significa un estado.
- Para una confirmación liviana con una o dos acciones de texto al pie («Ver detalle», «Cerrar») sin bloquear la
  pantalla.
- Con `floating` dentro de una tabla con scroll: la ayuda de cada cabecera de las reglas de importe y las condiciones
  de obligatoriedad de la configuración de asientos de cierre anual (su ícono ⓘ abre qué contiene la columna).

### Cuándo no

- Para el texto completo de algo truncado: usar `siafTooltip`.
- Para una lista de opciones o comandos: usar `siaf-menu` o `siaf-icon-dropdown-menu`.
- Para confirmar acciones irreversibles (Eliminar, Anular) o pedir datos: usar `siaf-modal` o
  `siaf-annulment-modal`.
- Para contenido largo o formularios: usar `siaf-side-nav` (o `siaf-side-panel` si necesita todo el ancho).

### Limitaciones

Dentro de una tabla con scroll o al pie de la página, el panel absoluto queda recortado o agranda el scroll: ahí va `[floating]="true"`, que lo pinta fijo junto al disparador.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `actions` | `PopoverAction[]` | `[]` |  |
| `align` | `'start' \| 'end'` | `'end'` | Borde del disparador con el que se alinea el panel: `end` (derecha, por defecto) o `start`. |
| `ariaLabel` | `string` | `''` | Nombre accesible del panel cuando no tiene `title`. |
| `floating` | `boolean` | `false` | El panel, fijo junto al disparador: dentro de un contenedor con scroll (una tabla) no queda recortado. |
| `open` | `boolean` | `false` |  |
| `text` | `string` | `''` |  |
| `title` | `string` | `''` |  |
| `width` | `number` | `268` | Ancho del panel en px: el del Figma (UI KIT 9059:20300) es 268. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(action)` | `string` |  |
| `(closed)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `role="dialog"`, `aria-label`, `aria-labelledby`.

### Teclado

- **Escape**: emite `closed` si está abierto; el padre pone `open` en false.
- **Tab**: al abrir, el foco entra en la primera acción (o en el panel, si no tiene); salir con Tab emite `closed`.
- **Enter / Espacio** en una acción: emiten `action` con su `value` (o su `label`).

### Notas

- **4.1.2 Nombre, función y valor (A)**: el panel es `role="dialog"` con nombre desde `title` (`aria-labelledby`) o
  desde `ariaLabel`; el padre debe dar `ariaLabel` si no hay título y poner `aria-expanded` en el disparador, que el
  componente no toca.
- **1.4.13 Contenido en hover o foco (AA)**: no depende del hover: queda visible hasta Escape, un clic fuera o que
  el padre lo cierre, y se puede recorrer con el puntero sin que desaparezca.
- **2.1.2 Sin trampas de teclado (A)**: no retiene el foco; Tab sale del panel y Escape lo cierra.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir el foco entra en el panel y al cerrarse (Escape, una acción
  o salir con Tab) vuelve al disparador.
- **2.4.7 Foco visible (AA)**: las acciones muestran un contorno de 2 px `border-states-focus` separado 2 px.
- **1.4.11 Contraste no textual (AA)**: ese contorno es el azul del kit (`border-states-focus`, 5.35:1 claro /
  10.15:1 oscuro sobre la superficie).
- **2.5.8 Tamaño del objetivo (AA)**: cada acción mide al menos 32 px de alto.

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-popover
