# Annulment modal

> `siaf-annulment-modal` · Componente de Overlays · Sin uso en la app

Modal de confirmación de una solicitud de anulación: detalle obligatorio y sustento .pdf antes de un paso que no se
puede revertir. El detalle es `text-area-control` (obligatorio, hasta 1000 caracteres) y el sustento, `siaf-uploader`
compacto; «Aceptar» se habilita con los dos y emite `accepted` con el detalle y el archivo. Cada vez que se abre
empieza vacío.

Hoy tiene 0 consumidores y se conserva a propósito: queda reservado para el flujo de anulación de
RAA que los MFD contemplan (`tipoAccion: 'anulacion'` ya existe en el catálogo) y que aún no se
construye. No borrarlo ni reutilizarlo como modal genérico.

## Importar

```ts
import { AnnulmentModalComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-annulment-modal />
```

### Cuándo usarlo

- Reservado para la solicitud de anulación de un registro de asiento de ajuste (RAA) aprobado, cuando se construya
  ese flujo: pide el detalle de anulación y el sustento antes de un paso que no se puede revertir.
- `accepted` trae `{ detail, file }` para enviar la solicitud; `closed`, al cancelar, con la X o con Escape.
- `uploadTitle` y `uploadDescription` para nombrar el sustento que pide cada caso.

### Cuándo no

- Como confirmación genérica: usar `siaf-modal` (presets o `custom`).
- Para observar o rechazar con motivo: usar `siaf-request-approval-modals` o `siaf-modal` con `observe` / `reject`.
- Para adjuntar el sustento de una solicitud que no es de anulación: usar `siaf-upload-side-nav`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `open` | `boolean` | `false` |  |
| `uploadDescription` | `string` | `'Adjunte el documento que respalda la solicitud.'` | Explicación bajo el título: qué documento se adjunta. |
| `uploadTitle` | `string` | `'Sustento de la anulación'` | Título de la sección del sustento. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(accepted)` | `AnnulmentRequest` | Aceptar, con el detalle y el sustento cargado. |
| `(closed)` | `void` | X, Cancelar o Escape. |

## Accesibilidad

Roles y atributos del código: `role="dialog"`, `role="presentation"`, `aria-describedby`, `aria-labelledby`, `aria-modal`.

### Teclado

- **Tab / Shift + Tab**: al abrir, el foco entra en la X; recorren el detalle, «Elegir archivo», los botones de la
  tarjeta del archivo y Cancelar / Aceptar, y dan la vuelta sin salir del diálogo.
- **Escape**: cierra como la X (emite `closed`) y el foco vuelve al control que abrió el diálogo.
- **Enter / Espacio**: en «Elegir archivo» abren el diálogo de archivos del sistema; la X y Cancelar emiten `closed`,
  y Aceptar emite `accepted` cuando hay detalle y archivo.

### Notas

- **4.1.2 Nombre, función y valor (A)**: `role="dialog"` con `aria-modal="true"`, `aria-labelledby` al título y
  `aria-describedby` a la advertencia; la X se llama «Cerrar» (ícono con `label`).
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir lleva el foco a la X y al cerrar lo devuelve al control que
  lo abrió; Tab no sale hacia la página de atrás.
- **2.1.2 Sin trampas de teclado (A)**: Tab queda dentro mientras está abierto, pero Escape siempre lo cierra.
- **3.3.2 Etiquetas o instrucciones (A)**: el detalle se ve siempre nombrado (dentro del campo o flotante) con
  asterisco y `aria-required`, y el sustento tiene su título, su explicación y los formatos que admite. Aceptar
  sigue deshabilitado hasta completar los dos.
- **Pendiente · 1.3.1 Información y relaciones (A)**: de `text-area-control`: el contador «0/1000» va dentro del
  `<label>` del detalle y se suma a su nombre.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: de `siaf-uploader`: ni el avance ni el rechazo de un archivo se
  anuncian.
- **2.4.7 Foco visible (AA)**: la X muestra el anillo `border-states-focus` de 2 px; el detalle pasa al borde azul
  de 2 px y «Elegir archivo» pinta el contorno del kit.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: el borde del detalle vacío es `border-states-enabled` (2.44:1 en
  claro, 2.59:1 en oscuro).
- **1.4.3 Contraste mínimo (AA)**: título `text-neutral-high` y textos `text-neutral-medium` sobre
  `surface-highest`, que en claro es el blanco de la superficie (16.29:1 y 14.53:1).

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siaf-button`](siaf-button.md), [`siaf-icon`](siaf-icon.md), [`siaf-uploader`](siaf-uploader.md), [`text-area-control`](text-area-control.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-annulment-modal
