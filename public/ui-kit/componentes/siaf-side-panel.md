# Side panel

> `siaf-side-panel` · Componente de Overlays · Sin uso en la app

Side panel del kit (Figma UI KIT, «Side Panel»): panel grande que entra desde la derecha y ocupa toda el área de
contenido, a la derecha del riel, con el título en mayúsculas, la X, el cuerpo con su propio scroll y el pie Cancelar
/ Aceptar. Tiene la animación de los paneles laterales (`SidePanelAnimacion`), esquinas de 8 px y elevación 16.

Con `showNav` suma a la derecha del cuerpo el panel de filtros de la variante del Figma: un `siaf-side-nav` con
`embedded` de 420 px, con su título, su contenido (lo que se proyecta con el atributo `sidePanelNav`) y su pie
Cancelar / Aplicar. Ahí el pie principal desaparece y el cuerpo lleva una línea arriba y otra abajo, como en el Figma.
En pantallas angostas el panel de filtros baja debajo del contenido.

## Importar

```ts
import { SidePanelComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-side-panel>…</siaf-side-panel>
```

### Cuándo usarlo

- Para trabajar sobre un contenido que necesita todo el ancho sin salir de la pantalla: una tabla grande, la vista
  previa de un documento o un detalle con muchas columnas.
- `showNav` con el contenido de los filtros en un elemento con el atributo `sidePanelNav`, cuando ese contenido se
  filtra ahí mismo (emite `navConfirmed` y `navCanceled`).
- `showFooter` en false para un panel de solo lectura; `confirmDisabled` mientras falte algo para aceptar.

### Cuándo no

- Para un formulario corto o un detalle breve: usar `siaf-side-nav`, de 420 px.
- Para elegir registros, adjuntar archivos o los parámetros de una consulta: usar `siaf-selection-side-nav`,
  `siaf-upload-side-nav` o `siaf-query-parameters-panel`.
- Para una confirmación corta: usar `siaf-modal`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `cancelLabel` | `string` | `'Cancelar'` |  |
| `confirmDisabled` | `boolean` | `false` |  |
| `confirmLabel` | `string` | `'Aceptar'` |  |
| `navCancelLabel` | `string` | `'Cancelar'` |  |
| `navConfirmDisabled` | `boolean` | `false` |  |
| `navConfirmLabel` | `string` | `'Aplicar'` |  |
| `navTitle` | `string` | `'Filtros'` |  |
| `open` | `boolean` | `false` |  |
| `showClose` | `boolean` | `true` |  |
| `showFooter` | `boolean` | `true` | Pie Cancelar / Aceptar; con `showNav` no se muestra, como en el Figma. |
| `showNav` | `boolean` | `false` | Panel de filtros a la derecha del cuerpo, con el contenido que lleva el atributo `sidePanelNav`. |
| `showReturn` | `boolean` | `false` | Flecha «Volver» antes del título. |
| `title` | `string` | `''` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(canceled)` | `void` |  |
| `(closed)` | `void` | La X, Escape, el fondo oscuro o Cancelar. |
| `(confirmed)` | `void` |  |
| `(navCanceled)` | `void` | Cancelar del panel de filtros. |
| `(navConfirmed)` | `void` | Aplicar del panel de filtros. |
| `(returned)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `role="dialog"`, `aria-label`, `aria-labelledby`, `aria-modal`.

### Teclado

- **Tab / Shift + Tab**: al abrir, el foco entra en el primer control del encabezado (la flecha o la X); recorren el
  contenido, el panel de filtros y los botones del pie, y dan la vuelta sin salir del panel.
- **Escape**: cierra el panel (emite `closed`) y el foco vuelve al control que lo abrió.
- **Enter / Espacio**: la flecha emite `returned`, la X emite `closed`, Cancelar emite `canceled` y `closed`, Aceptar
  emite `confirmed`, y en el panel de filtros Cancelar y Aplicar emiten `navCanceled` y `navConfirmed`.

### Notas

- **4.1.2 Nombre, función y valor (A)**: el panel es `role="dialog"` con `aria-modal="true"` y `aria-labelledby` al
  título; la X se llama «Cerrar» más el título y la flecha, «Volver».
- **1.3.1 Información y relaciones (A)**: el título es un `h2` y el del panel de filtros, un `h3` dentro de una
  sección nombrada por él.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir lleva el foco al encabezado y al cerrar lo devuelve al control
  que lo abrió; Tab no sale a la página de atrás.
- **2.1.2 Sin trampas de teclado (A)**: Tab queda dentro mientras está abierto, pero Escape siempre lo cierra.
- **1.4.10 Reajuste del contenido (AA)**: en pantallas angostas ocupa todo el ancho y el panel de filtros baja
  debajo del contenido, sin desplazamiento horizontal.
- **2.4.7 Foco visible (AA)**: la flecha y la X muestran el anillo `border-states-focus` de 2 px (5.35:1 claro /
  10.15:1 oscuro); los botones del pie siguen `siaf-button`.
- **2.5.8 Tamaño del objetivo (AA)**: la flecha y la X miden 40 px.
- **1.4.3 Contraste mínimo (AA)**: título `text-neutral-high` sobre la superficie (16.29:1 claro / 16.53:1 oscuro).

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siaf-button`](siaf-button.md), [`siaf-icon`](siaf-icon.md), [`siaf-side-nav`](siaf-side-nav.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-side-panel
