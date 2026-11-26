# Side nav

> `siaf-side-nav` · Componente de Overlays

Side nav del kit (Figma UI KIT, «Sidenav»): panel lateral de 420 px con el título en mayúsculas, la X, el contenido
proyectado con su propio scroll y el pie Cancelar / Aceptar. Por defecto es un diálogo que entra desde la derecha,
sobre la página y a la derecha del riel, con la animación de los paneles laterales (`SidePanelAnimacion`). Con
`embedded` se pinta dentro de otro contenedor, sin fondo oscuro ni diálogo y sobre `surface-highest`: así lo usa
`siaf-side-panel` para su panel de filtros.

No conoce el dominio: el padre controla `open`, pone el contenido y decide qué hacer con cada evento.

## Importar

```ts
import { SideNavComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-side-nav>…</siaf-side-nav>
```

### Cuándo usarlo

- Para un panel lateral con contenido libre y, si hace falta, confirmación: un detalle breve, ayuda contextual o un
  formulario corto que no tiene ya su panel propio.
- `showFooter` en false para un panel de solo lectura; `confirmDisabled` mientras falte algo para aceptar.
- `showReturn` cuando el panel es un segundo paso y la flecha vuelve al anterior (emite `returned`).
- `embedded` para pintarlo dentro de otro contenedor, como el panel de filtros de `siaf-side-panel`.

### Cuándo no

- Para elegir registros de un catálogo: usar `siaf-selection-side-nav`; para adjuntar archivos, `siaf-upload-side-nav`;
  para los parámetros de una consulta, `siaf-query-parameters-panel`.
- Para el historial de un documento o registro: usar `siaf-document-history-panel`, `siaf-account-history-panel` o
  `siaf-asiento-history-panel`.
- Cuando el contenido necesita todo el ancho de la pantalla (una tabla, un documento): usar `siaf-side-panel`.
- Para una confirmación corta: usar `siaf-modal`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `cancelLabel` | `string` | `'Cancelar'` |  |
| `closeOnCancel` | `boolean` | `true` | El botón de la izquierda cierra el panel, como el Cancelar del Figma. En `false` solo emite `canceled`: para un pie que no cancela, como el «Limpiar todo» de los parámetros de consulta. |
| `confirmDisabled` | `boolean` | `false` |  |
| `confirmLabel` | `string` | `'Aceptar'` |  |
| `embedded` | `boolean` | `false` | Se pinta dentro de otro contenedor, sin fondo oscuro, diálogo ni animación. |
| `open` | `boolean` | `false` | Abierto o cerrado; con `embedded` no se usa: el panel se pinta siempre. |
| `showClose` | `boolean` | `true` |  |
| `showFooter` | `boolean` | `true` |  |
| `showReturn` | `boolean` | `false` | Flecha «Volver» antes del título. |
| `title` | `string` | `''` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(canceled)` | `void` |  |
| `(closed)` | `void` | La X, Escape, el fondo oscuro o Cancelar (este último, salvo con `embedded` o `closeOnCancel` en false). |
| `(confirmed)` | `void` |  |
| `(returned)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `role="dialog"`, `aria-label`, `aria-labelledby`, `aria-modal`.

### Teclado

- **Tab / Shift + Tab**: al abrir, el foco entra en el primer control del encabezado (la flecha o la X); recorren el
  contenido y Cancelar / Aceptar, y dan la vuelta sin salir del panel.
- **Escape**: cierra el panel (emite `closed`) y el foco vuelve al control que lo abrió.
- **Enter / Espacio**: la flecha emite `returned`, la X emite `closed`, Cancelar emite `canceled` (y `closed` si no es
  `embedded`) y Aceptar emite `confirmed`.
- `embedded` no atrapa el foco ni cierra con Escape: sigue el orden de la página que lo contiene.

### Notas

- **4.1.2 Nombre, función y valor (A)**: el panel es `role="dialog"` con `aria-modal="true"` y `aria-labelledby` al
  título; la X se llama «Cerrar» más el título y la flecha, «Volver». Con `embedded` es una sección nombrada por su
  título, sin diálogo.
- **1.3.1 Información y relaciones (A)**: el título es un `h2`; con `embedded`, un `h3`, porque va dentro de otro
  panel con título propio.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir lleva el foco al encabezado y al cerrar lo devuelve al control
  que lo abrió; Tab no sale a la página de atrás.
- **2.1.2 Sin trampas de teclado (A)**: Tab queda dentro mientras está abierto, pero Escape siempre lo cierra.
- **2.4.7 Foco visible (AA)**: la flecha y la X muestran el anillo `border-states-focus` de 2 px (5.35:1 claro /
  10.15:1 oscuro); Cancelar y Aceptar siguen `siaf-button`.
- **2.5.8 Tamaño del objetivo (AA)**: la flecha y la X miden 40 px.
- **1.4.3 Contraste mínimo (AA)**: título `text-neutral-high` sobre la superficie (16.29:1 claro / 16.53:1 oscuro).

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siaf-button`](siaf-button.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-side-nav
