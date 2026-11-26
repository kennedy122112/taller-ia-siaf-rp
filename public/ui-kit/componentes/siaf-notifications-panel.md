# Notifications panel

> `siaf-notifications-panel` · Componente de Armazón de la aplicación

Desplegable de notificaciones que abre la campana del navbar (lista, skeleton, vacío y "marcar leídas").

Lee y marca las notificaciones de `FuenteNotificaciones` — la misma fuente del contador de la campana, que
provee el proyecto: el kit no llama a ninguna API. Al tocar una notificación navega a su `ruta`.

## Importar

```ts
import { NotificationsPanelComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-notifications-panel />
```

### Cuándo usarlo

- Solo como desplegable de la campana de `siaf-navbar`, que lo pinta al abrirse y lo quita al recibir `closed`.
- Para revisar de un vistazo las notificaciones recientes y saltar al documento (SCC, SCMPC, SRAA, STAA, SCA o CAM)
  sin pasar por la bandeja.

### Cuándo no

- Para el historial completo, con filtro y paginación: usar `siaf-tray-notifications-view` (Bandeja › Notificaciones).
- Para avisar el resultado de una acción del usuario: usar `siaf-snackbar` o `siaf-alert`.
- Suelto en una pantalla: `open` no lo oculta (lo decide quien lo pinta) y su posición supone la campana del navbar.

### Limitaciones

Sus breakpoints miran el ancho de la ventana, no el del contenedor: dentro de una columna angosta se ve con el diseño de escritorio.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `open` | `boolean` | `false` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(closed)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `role="dialog"`, `role="status"`, `aria-hidden`, `aria-label`, `aria-live`.

### Teclado

- **Tab**: al abrir, el foco entra en «Marcar todas como leídas», si hay no leídas, o en la primera notificación;
  luego recorre cada notificación y puede salir del panel (no atrapa el foco: no es modal).
- **Escape**: cierra el panel (emite `closed`) y el foco vuelve a la campana.
- **Enter / Espacio**: en una notificación, emite `closed` y, si tiene documento, lo abre; en «Marcar todas como
  leídas», las marca.

### Notas

- **1.3.1 Información y relaciones (A)**: encabezado `h3` y notificaciones en lista `ul`/`li`; cada una es un
  `<button>` cuyo nombre reúne título, fecha, mensaje y número del documento.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: título `text-text` 16.29:1 / 16.53:1, mensaje `text-neutral-medium`
  14.53:1 / 12.87:1, fecha `text-neutral-low` 5.01:1 / 8.86:1 y código blanco sobre `bg-brand-accent` 4.89:1 / 5.65:1;
  pero «Marcar todas como leídas» usa la clase `text-brand-primary` (azul de fondo de marca) y en oscuro queda en
  2.66:1.
- **1.4.11 Contraste no textual (AA)**: el contorno de foco es el azul del kit (`border-states-focus`, 5.35:1 claro
  / 10.15:1 oscuro sobre la superficie).
- **Pendiente · 2.4.3 Orden del foco (A)**: con `siafFoco` (sin atrapar Tab) el foco entra al abrir y Escape cierra
  devolviéndolo a la campana, pero al marcar todas como leídas el botón desaparece y el foco se pierde.
- **2.4.7 Foco visible (AA)**: «Marcar todas como leídas» y cada notificación muestran un contorno azul de 2 px con
  `focus-visible`.
- **4.1.2 Nombre, función y valor (A)**: el panel es `role="dialog"` con `aria-label="Notificaciones"`, y la campana
  de `siaf-navbar` publica `aria-expanded` y `aria-haspopup="dialog"`.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: la carga se marca con `role="status"` y `aria-live="polite"`, pero no
  se anuncia el resultado: ni el vacío «No tienes notificaciones nuevas.» ni el marcado de todas como leídas.

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-notifications-panel
