# Navbar

> `siaf-navbar` · Componente de Armazón de la aplicación

Barra superior del shell autenticado: logo, campana de notificaciones y menú de usuario.

El contador de la campana sale de `FuenteNotificaciones.sinLeer()` y al abrir el panel la refresca; el cambio
de perfil y el cierre de sesión, de `FuenteSesion`. Las dos las provee el proyecto: el kit no llama a ninguna API.
El menú de usuario incluye cambio de perfil,
cierre de sesión y el toggle de tema, que persiste en localStorage y anima el cambio con View Transitions
cuando el navegador las soporta. Un click fuera del componente cierra ambos desplegables.

## Importar

```ts
import { NavbarComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-navbar>…</siaf-navbar>
```

### Cuándo usarlo

- Una sola vez, arriba de todo el armazón autenticado: `siaf-app-shell` la fija con `sticky top-0` y le pasa
  `userName` y `officeName` de la sesión.
- Para dar acceso desde cualquier pantalla a las notificaciones (contador en vivo por socket), al cambio de perfil,
  al tema claro u oscuro y al cierre de sesión.
- En un armazón reducido, con `showMenu`, `showNotifications` o `showProfile` en false; lo proyectado se pinta antes
  de la campana.

### Cuándo no

- Como cabecera de una pantalla o de una solicitud: usar `siaf-page-header` o `siaf-solicitude-header`; la barra ya
  la pinta el armazón y no se repite dentro de una página.
- En pantallas sin sesión, como el login: lee los perfiles y las notificaciones del usuario.
- Para un menú de opciones en otra parte: usar `siaf-icon-dropdown-menu` o `siaf-menu`; el menú de usuario está
  hecho a mano y no se reutiliza.

### Limitaciones

Sus breakpoints miran el ancho de la ventana, no el del contenedor: dentro de una columna angosta se ve con el diseño de escritorio.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `homeHref` | `string` | `'/panel'` |  |
| `initials` | `string` | `'JP'` |  |
| `officeName` | `string` | `'Office name'` |  |
| `showMenu` | `boolean` | `true` |  |
| `showNotifications` | `boolean` | `true` |  |
| `showProfile` | `boolean` | `true` |  |
| `userName` | `string` | `'Juan Doe Perez Perez'` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(menuClicked)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `role="menu"`, `role="menuitem"`, `aria-expanded`, `aria-haspopup`, `aria-hidden`, `aria-label`.

### Teclado

- **Tab**: recorre el botón de menú, el logo, la campana y el perfil. Al abrir el menú de usuario o el panel de
  notificaciones, el foco entra en su primera opción; salir con Tab los cierra.
- **Escape**: cierra el desplegable abierto y el foco vuelve a su botón (perfil o campana).
- **Enter / Espacio**: el botón de menú emite `menuClicked`; la campana y el perfil abren o cierran su desplegable
  (abrir uno cierra el otro).
- **Enter** en el logo: va a `homeHref`.
- **Enter / Espacio** en una opción del menú de usuario: la ejecuta; «Perfil» muestra u oculta la lista de perfiles.

### Notas

- **Pendiente · 1.3.1 Información y relaciones (A)**: la barra es un `<header>`, pero solo cuenta como región
  `banner` fuera de `<main>`, y `siaf-app-shell` hoy la pinta dentro.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: la barra (`text-brand-white` sobre `bg-brand-primary`, 8.79:1 / 6.67:1)
  y el menú (`text-neutral-medium` sobre la superficie, 14.53:1 / 12.87:1) cumplen; en oscuro, el perfil activo usa
  la clase `text-brand-primary` (el azul de fondo de marca) y no llega a 4.5:1.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: el contorno blanco de los botones de la barra cumple (8.79:1 /
  6.67:1) y el de las opciones es el azul del kit (`border-states-focus`, 5.35:1 / 10.15:1), pero en oscuro el ícono
  del perfil activo no llega a 3:1.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, el menú de usuario y el panel de notificaciones reciben el foco al
  abrir, cierran con Escape o al salir con Tab, y al elegir tema o perfil el foco vuelve al botón de perfil.
- **2.4.7 Foco visible (AA)**: contorno de 2 px con `focus-visible` en los botones de la barra y en las opciones del
  menú; el logo y la lista de perfiles quedan con el anillo del navegador.
- **Pendiente · 2.5.3 Etiqueta en el nombre (A)**: el botón de perfil muestra las iniciales y, desde `md`, el nombre y
  la oficina, pero su `aria-label` fijo «Perfil de usuario» los reemplaza: el lector no dice quién inició sesión.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: la campana y el perfil publican `aria-expanded`, pero «Abrir
  menu» no. El menú de usuario es un `role="menu"` hecho a mano: sin flechas, «Perfil» sin `aria-expanded` y
  perfiles `menuitem` sin `aria-checked` (el activo solo se ve); `siaf-menu` ya trae flechas, Escape y `aria-checked`.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: el número de no leídas va en el nombre de la campana
  («Notificaciones, 3 sin leer») y el badge es `aria-hidden`, pero una notificación nueva no se anuncia: no hay
  `role="status"` ni `aria-live`.

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siafTooltip`](siafTooltip.md), [`siaf-badge`](siaf-badge.md), [`siaf-icon`](siaf-icon.md), [`siaf-notifications-panel`](siaf-notifications-panel.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-navbar
