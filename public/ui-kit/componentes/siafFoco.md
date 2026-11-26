# Foco

> `siafFoco` · Directiva de Overlays

Maneja el foco de un diálogo, panel lateral o panel desplegable, con el patrón que ya tenía `siaf-modal`
(WCAG 2.4.3 Orden del foco, 2.1.1 Teclado y 2.1.2 Sin trampas de teclado):

- Al activarse guarda el elemento enfocado y lleva el foco adentro: al elemento marcado con `data-foco-inicial`,
  si no al primer control y, si no hay controles, al propio contenedor (que recibe `tabindex="-1"`). Sin atrapar Tab
  (panel no modal), solo si al abrirse había un control enfocado: lo que se pinta abierto al cargar la página no le
  quita el foco a nadie ni mueve el scroll.
- Con `siafFocoAtrapar` en true (por defecto), Tab y Shift + Tab dan la vuelta dentro del contenedor.
- Escape emite `siafFocoEscape`: el componente decide cerrar. Sin nadie escuchando, Escape no hace nada.
- Al desactivarse (o al destruirse) devuelve el foco al elemento que lo tenía, si el foco llegó a entrar, ese
  elemento sigue en la página y el foco no se fue a otro lado.
- `siafFocoSalida` avisa cuando el foco sale del contenedor hacia otro control (con Tab o Shift + Tab, también si
  antes pasó por la barra del navegador): un desplegable se cierra ahí. Si el foco ya está en otro control, al
  desactivarse no lo devuelve.

Se pone en el elemento que contiene los controles (el `aside` del panel, la `section` del diálogo) y se activa con
el mismo `open` del componente; con la animación de `SidePanelAnimacion` el foco vuelve apenas empieza a cerrar.

## Importar

```ts
import { FocoDirective } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<span siafFoco="…"></span>
```

### Cuándo usarlo

- En todo modal o panel lateral del kit: `siaf-modal`, `siaf-annulment-modal`, `siaf-side-nav`, `siaf-side-panel`,
  los paneles de selección, carga, columnas e historiales.
- Con `siafFocoAtrapar` en false para paneles no modales que se abren sobre la página, como el de notificaciones o
  el filtro personalizado de la bandeja: el foco entra y Escape cierra, pero Tab puede salir.
- En desplegables (menús, listas de un select, calendario, popover) con `siafFocoAtrapar` en false y
  `siafFocoSalida` para cerrarlos cuando el foco se va con Tab. La capa invisible que cierra al pulsar fuera va con
  `tabindex="-1"`, `aria-hidden` y sin robar el foco al pulsarla.
- En un overlay que bloquea la página mientras se procesa (`siaf-loader-overlay`), sin `siafFocoEscape`.

### Cuándo no

- Reescribir a mano en otro componente el guardado y devolución del foco o la vuelta de Tab: usar esta directiva.
- En menús de opciones con flechas: `siaf-menu` ya maneja su propio teclado.
- En contenido que no se abre ni se cierra (una tarjeta, una sección de la página).

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `siafFoco` | `boolean \| '' \| null \| undefined` | — | Activa el manejo del foco; basta con escribir el atributo (`siafFoco`) para activarlo al pintarse. |
| `siafFocoAtrapar` | `boolean` | `true` | Tab da la vuelta dentro del contenedor (diálogos modales). En false, solo mueve el foco y atiende Escape. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(siafFocoEscape)` | `KeyboardEvent` | Escape dentro del contenedor mientras está activo. |
| `(siafFocoSalida)` | `FocusEvent` | El foco salió del contenedor hacia otro control de la página (un desplegable se cierra). |

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- **Tab / Shift + Tab**: con `siafFocoAtrapar` en true, recorren los controles del contenedor y dan la vuelta del
  último al primero; en false, siguen el orden normal de la página.
- **Escape**: emite `siafFocoEscape` para que el componente cierre; el foco vuelve a donde estaba al abrir.
- **Tab** fuera de un desplegable: emite `siafFocoSalida` y el foco sigue al control siguiente.

### Notas

- **2.4.3 Orden del foco (A)**: mueve el foco al abrir y lo devuelve al cerrar, así el recorrido con Tab sigue
  desde el control que abrió el panel.
- **2.1.2 Sin trampas de teclado (A)**: el foco queda atrapado solo mientras el diálogo está activo y Escape siempre
  ofrece la salida cuando el componente escucha `siafFocoEscape`.
- **2.1.1 Teclado (A)**: cerrar con Escape equivale al botón de cerrar.
- **4.1.2 Nombre, función y valor (A)**: no pone roles: el componente declara `role="dialog"`, `aria-modal` y el
  nombre (`aria-labelledby` o `aria-label`).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siafFoco
