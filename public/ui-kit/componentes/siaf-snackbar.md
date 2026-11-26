# Snackbar

> `siaf-snackbar` · Componente de Estado y feedback

Aviso flotante animado con textos predefinidos por `variant` (registro grabado, archivo subido, solicitud
elaborada/verificada/aprobada…) o mensaje libre.

`tone` sigue los tipos del Figma: `neutral` (sin ícono), `info`, `success` (por defecto), `warning` y
`error`. Los íconos usan los colores del Figma también en modo oscuro, porque el fondo es oscuro en ambos
temas. `actionLabel` agrega un botón de texto antes de la X, que emite `action`. Mide como máximo 430 px:
un mensaje largo pasa a dos líneas. `warning` y `error` se anuncian de inmediato (`role="alert"`).

Úsalo para confirmar una acción puntual del usuario. Los avisos de aprobación/rechazo de una
solicitud NO se arman a mano aquí: los emite `siaf-request-approval-modals` con `[requestType]`.

## Importar

```ts
import { SnackbarComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-snackbar>…</siaf-snackbar>
```

### Cuándo usarlo

- Para confirmar una acción puntual que ya terminó: registro grabado, cambios guardados, archivo subido.
- Para el resultado de la aprobación masiva en la bandeja (`siaf-documents-records-page`) y de la carga masiva
  del Plan de Cuentas o del catálogo de eventos.
- Con `tone="error"` cuando la acción falló y hay que avisar enseguida, como al cambiar el estado de un usuario
  en Admin.
- Con `actionLabel` para ofrecer una salida rápida, como «Deshacer».

### Cuándo no

- Para los avisos de grabar, verificar, aprobar, observar o rechazar una solicitud: los emite
  `siaf-request-approval-modals` con `[requestType]`.
- Para mensajes que deben quedar fijos en la pantalla o explicar una restricción: usar `siaf-alert`.
- Para pedir confirmación antes de actuar: usar `siaf-modal`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `actionLabel` | `string` | `''` | Texto del botón de acción (ej. «Deshacer»). Sin texto no se muestra. |
| `bulkStatus` | `string` | `''` |  |
| `dismissible` | `boolean` | `true` |  |
| `fileName` | `string` | `''` |  |
| `message` | `string` | `''` |  |
| `open` | `boolean` | `true` |  |
| `requestAction` | `string` | `''` |  |
| `requestNumber` | `string` | `'0001'` |  |
| `requestType` | `string` | `''` |  |
| `tone` | `'info' \| 'success' \| 'warning' \| 'neutral' \| 'error'` | `'success'` | Tipo del aviso: define el ícono y su color. `neutral` no lleva ícono. |
| `variant` | `SnackbarVariant` | `'custom'` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(action)` | `void` |  |
| `(closed)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `role="alert"`, `role="error"`, `role="status"`, `role="warning"`, `aria-label`.

### Teclado

- **Tab**: llega al botón de acción (con `actionLabel`) y a la × (con `dismissible`) según su lugar en el DOM;
  el aviso no toma el foco al aparecer.
- **Enter / Espacio**: el botón de acción emite `action` y la × emite `closed` (botones nativos).

### Notas

- **4.1.3 Mensajes de estado (AA)**: `warning` y `error` son `role="alert"` y los demás `role="status"`; ojo: la
  región nace junto con el texto (bloque if) y un `status` que aparece ya lleno no siempre se anuncia.
- **1.1.1 Contenido no textual (A)**: el ícono del tono es decorativo (`aria-hidden`) y `neutral` no lleva: el
  texto tiene que decir si la acción salió bien o falló.
- **1.4.3 Contraste mínimo (AA)**: texto blanco sobre el fondo casi negro del aviso en ambos temas
  (`bg-on-surfaces-high` en claro, `bg-snackbar` en oscuro).
- **4.1.2 Nombre, función y valor (A)**: la × es un `<button>` con `aria-label="Cerrar mensaje"` y el botón de
  acción se nombra con su texto visible.
- **2.4.7 Foco visible (AA)**: los dos botones muestran un contorno blanco de 2 px.
- **2.5.8 Tamaño del objetivo (AA)**: la × mide 32 × 32 px y el botón de acción, 32 px de alto.
- **2.2.1 Tiempo ajustable (A)**: no tiene temporizador: queda visible hasta que el usuario lo cierra o el padre
  cambia `open`.
- **2.4.3 Orden del foco (A)**: al cerrarlo con la × el botón desaparece y el foco queda en el documento.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-snackbar
