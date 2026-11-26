# Loader overlay

> `siaf-loader-overlay` · Componente de Estado y feedback

Capa a pantalla completa que oscurece la vista y muestra el `siaf-loader` con un mensaje.

Úsalo para bloquear la interacción mientras se procesa una acción del usuario (grabar, verificar,
aprobar). Para una espera localizada que no debe bloquear la pantalla, usa `siaf-loader` directo.

## Importar

```ts
import { LoaderOverlayComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-loader-overlay />
```

### Cuándo usarlo

- Mientras se ejecuta una acción de la solicitud (grabar, verificar, aprobar): ya lo pinta
  `siaf-request-approval-modals` con `saving`.
- Mientras carga un documento existente que no se debe tocar hasta que termine: «Cargando documento...» en la
  carga masiva del Plan de Cuentas.
- Con un `message` corto que diga qué se procesa y un `label` para el lector de pantalla.

### Cuándo no

- Para esperas locales que no deben bloquear la pantalla: usar `siaf-loader` o `siaf-table-skeleton`.
- Agregar otro en páginas que ya usan `siaf-request-approval-modals`: ese ya trae el suyo.
- Como única barrera contra un doble envío: el teclado sigue llegando a la página (ver Notas).

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `dotSize` | `number` | `6` |  |
| `label` | `string` | `'Procesando'` |  |
| `message` | `string` | `'Procesando...'` |  |
| `open` | `boolean` | `false` |  |
| `size` | `number` | `32` |  |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `role="status"`, `aria-label`, `aria-live`.

### Teclado

- **Tab**: mientras está abierta, el foco queda en la capa y no llega a la página de atrás; al cerrarse vuelve al
  control que lo tenía. No se cierra con Escape: la cierra el padre al terminar.

### Notas

- **4.1.3 Mensajes de estado (AA)**: la capa es `role="status"` con `aria-live="polite"`, `aria-label` y el
  mensaje dentro; como se crea ya llena (bloque if), no todos los lectores la anuncian.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrirse el foco pasa a la capa y Tab no sale de ella; al cerrarse
  vuelve al control que lo tenía. El lector de pantalla todavía puede recorrer la página de atrás con su cursor
  virtual: el padre debe deshabilitar las acciones mientras dura, como `confirmDisabled` en
  `siaf-request-approval-modals`.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: el mensaje es blanco sobre negro al 40 % (`bg-black/40`); encima
  de una superficie clara no llega a 4.5:1. En oscuro cumple.
- **1.1.1 Contenido no textual (A)**: el `siaf-loader` interno va `decorative` (`aria-hidden`); la espera se
  comunica con el mensaje y `label`.

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siaf-loader`](siaf-loader.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-loader-overlay
