# Landing chat button

> `siaf-landing-chat-button` · Componente de Landing público · Sin uso en la app

Botón flotante de chat por WhatsApp, fijo abajo a la derecha en todas las páginas del landing.

Abre la conversación en una pestaña nueva. En pantallas angostas muestra solo el ícono; desde
`sm` suma la palabra «Chat».

## Importar

```ts
import { LandingChatButtonComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-landing-chat-button />
```

### Cuándo usarlo

- Una sola vez por página del landing, como último elemento.

### Cuándo no

- Dentro de la aplicación: el soporte del usuario autenticado va por otros canales.
- Para cualquier otra acción flotante: este botón es solo el chat.

## Entradas

No recibe entradas.

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `aria-label`.

### Teclado

- **Tab**: lo enfoca como un enlace más, al final de la página.
- **Enter**: abre la conversación en otra pestaña.

### Notas

- **2.4.4 Propósito del enlace (A)**: el enlace se llama «Chat» aunque el texto esté oculto en móvil.
- **2.5.8 Tamaño del objetivo (AA)**: la burbuja mide 42 px más su relleno.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: el verde de WhatsApp es de marca externa y no se
  eligió por contraste; el ícono va en blanco sobre ese verde.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-landing-chat-button
