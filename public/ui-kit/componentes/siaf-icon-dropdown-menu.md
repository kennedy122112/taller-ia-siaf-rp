# Icon dropdown menu

> `siaf-icon-dropdown-menu` · Componente de Botones y acciones

Botón cuadrado (40×40) con icono que abre un menú flotante. Cubre
los 3 patrones idénticos que estaban inline en
`siaf-documents-records-page`:
  - "Campos" (layers)
  - "Favorito" (star_border)
  - "Más opciones" (more_vert)

También sirve para cualquier botón-acción que necesite ofrecer una
lista corta de comandos (kebab menus de tablas, etc.).

El panel es `siaf-menu`, compact salvo `density="standard"` (diseño del Figma UI KIT):
este componente solo pone el botón, lo ancla (`align`), cierra al pulsar
fuera o con Escape y respeta `closeOnSelect`. Un cambio de diseño del
menú se hace en `siaf-menu`. Abierto con el teclado, el foco entra en la
primera opción y ↑ ↓ recorren el resto.

## Importar

```ts
import { IconDropdownMenuComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-icon-dropdown-menu />
```

### Cuándo usarlo

- Botones de ícono de la barra de búsqueda de la bandeja (`siaf-documents-records-page`): Campos (`layers`), Favorito
  (`star_border`) y Más opciones (`more_vert`).
- Exportar con `variant="accent"` e ícono `file_download` en el encabezado de resultados de las consultas (Plan de
  Cuentas, Asiento de ajuste, Catálogo de ajuste, Contabilización y Libros contables).
- Acciones sobre las filas marcadas, proyectado en `siaf-table-controls` con el atributo `tableAction` (Gestor de
  Usuarios de Admin, descarga de Libros contables), y el menú ⋮ de `siaf-expansion-panel`.
- Con `label` cuando el Figma pide un botón con texto que abre el menú: «Exportar» (Excel, CSV y PDF) del resultado de
  `siaf-query-report-page`, con `density="standard"` como su menú «Opciones de tabla» (nodo 22402:16485).
- Con `floatingMenu` cuando el botón queda al pie de la página o dentro de un contenedor con scroll, como «Agregar
  nuevo asiento contable» de la configuración de asiento de cierre anual: el menú flota con posición fija junto al
  botón (encima si abajo no cabe) y no agranda el scroll.

### Cuándo no

- Para una sola acción: usar `siaf-button` con `iconOnly` y `ariaLabel`, sin menú.
- Con opciones en dos niveles: usar `siaf-cascading-menu`.
- Para filtrar por un valor que debe quedar a la vista: usar `siaf-filter-pill`.
- Un botón de ícono con una lista flotante hecha a mano: este componente ya da `aria-expanded`, Escape y el cierre al
  pulsar fuera, y dibuja el panel con `siaf-menu`.

### Limitaciones

Dentro de una tabla con scroll o al pie de la página, el panel absoluto queda recortado o agranda el scroll: ahí va `[floatingMenu]="true"`, que lo pinta fijo junto al disparador.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `align` | `'right' \| 'left'` | `'right'` | Alineación del menú respecto al botón. Default: 'right'. |
| `ariaLabel` | `string` | `'Más opciones'` | aria-label del botón (también se usa en aria-labels secundarios). |
| `closeOnSelect` | `boolean` | `true` | Si true, NO cierra el menú al seleccionar un item (útil para items `hasChildren` donde el padre va a abrir un submenú separado). |
| `density` | `'standard' \| 'compact'` | `'compact'` | Densidad del menú: `compact` (32 px por opción, la de las barras de búsqueda) o `standard` (48 px). |
| `disabled` | `boolean` | `false` | Deshabilita el botón disparador. |
| `floatingMenu` | `boolean` | `false` | El menú se dibuja con posición fija junto al botón (hacia arriba si abajo no cabe) y lo sigue si la página se desplaza. Para un botón al pie de la página o dentro de un contenedor con scroll: el menú de posición absoluta agrandaba el scroll y había que desplazarse para verlo. |
| `icon` | `string` | `''` | Nombre del icono Material Symbols. |
| `items` | `IconDropdownMenuItem<T>[]` | `[]` | Items del menú. Con valores de un tipo propio (`IconDropdownMenuItem<'pdf' \| 'excel'>[]`), `selected` emite ese tipo. |
| `label` | `string` | `''` | Texto del disparador: con él, el botón es de contorno (Figma «Buttons» outline, 40 px) con el ícono y el texto, y el texto lo nombra; sin él, es el botón de solo ícono. |
| `menuWidth` | `number` | `248` | Ancho del menú flotante en px. Default 248. |
| `variant` | `'accent' \| 'ghost'` | `'ghost'` | Estilo del botón disparador: 'ghost' (default) o 'accent' (color de marca). |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(selected)` | `T` | Emite el `value` del item seleccionado (o `label` si no tiene value). |

## Accesibilidad

Patrón WAI-ARIA: Botón de menú (https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/).

Roles y atributos del código: `aria-expanded`, `aria-haspopup`, `aria-hidden`, `aria-label`.

### Teclado

- **Tab**: enfoca el botón.
- **Enter / Espacio**: abren o cierran el menú; al abrir, el foco entra en la primera opción habilitada.
- **Flecha arriba / abajo** e **Inicio / Fin**: recorren las opciones (de `siaf-menu`).
- **Enter / Espacio** sobre una opción: la eligen y cierran el menú, salvo con `closeOnSelect=false`.
- **Escape**: cierra el menú y el foco vuelve al botón.
- **Tab** desde el menú: lo cierra y el foco sigue al control siguiente.

### Notas

- **4.1.2 Nombre, función y valor (A)**: el disparador es un `<button>` con `aria-label` (por defecto «Más opciones»:
  el padre debe dar uno propio, como «Exportar resultados»), `aria-haspopup="menu"` y `aria-expanded`; el panel es
  `siaf-menu` con el mismo nombre. Con `label`, el texto visible nombra el botón y el menú, sin `aria-label`.
- **2.5.3 Etiqueta en el nombre (A)**: con `label`, el nombre es el mismo texto que se ve.
- **1.1.1 Contenido no textual (A)**: el ícono del botón es decorativo (`siaf-icon`); el nombre lo da `aria-label`.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir el foco entra en la primera opción y al cerrar (Escape o
  elegir) vuelve al botón; salir con Tab cierra el menú. La capa que cierra al pulsar fuera no es parada de Tab.
- **2.4.7 Foco visible (AA)**: el botón tiene contorno de 2 px `bg-brand-accent` en `accent` (4.89:1 claro / 3.14:1
  oscuro), el anillo del kit `border-states-focus` con `label` y el anillo del navegador en `ghost`; las opciones, el
  contorno interior azul de `siaf-menu` (`border-states-focus`).
- **1.4.11 Contraste no textual (AA)**: en `accent`, relleno 4.89:1 / 3.14:1 sobre la superficie e ícono blanco
  (`text-brand-white` sobre `bg-brand-accent`) 4.89:1 / 5.65:1; en `ghost` el ícono hereda el color del texto del
  padre.
- **2.5.8 Tamaño del objetivo (AA)**: botón de 40 px de alto y opciones de 32 px (`compact`) o 48 px (`standard`).

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siaf-icon`](siaf-icon.md), [`siaf-menu`](siaf-menu.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-icon-dropdown-menu
