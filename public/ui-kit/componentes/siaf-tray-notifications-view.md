# Tray notifications view

> `siaf-tray-notifications-view` · Componente de Armazón de la aplicación

Sección Notificaciones de la bandeja: historial paginado con filtro Todas / No leídas / Leídas
y acción "Marcar todas como leídas".

El historial completo y el marcado masivo salen de `FuenteNotificaciones`, la misma de la campana del navbar
(que así queda en cero), que provee el proyecto: el kit no llama a ninguna API. Mientras carga muestra skeletons.
Al hacer clic navega a la `ruta` de la notificación.

## Importar

```ts
import { TrayNotificationsViewComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-tray-notifications-view />
```

### Cuándo usarlo

- Como sección Notificaciones de la Bandeja en `siaf-app-shell`: se pinta cuando `siaf-tray-menu` emite
  «Notificaciones».
- Para revisar el historial completo, filtrar leídas o no leídas y abrir el documento de cada notificación (plan de
  cuentas, asientos de ajuste, tipos y clases de ajuste, apertura contable).

### Cuándo no

- Para un vistazo rápido desde cualquier pantalla: usar la campana de `siaf-navbar`, que abre
  `siaf-notifications-panel`.
- Para las demás secciones de la bandeja (Recibidos, Enviados, Borradores, Papelera): usar `siaf-tray-documents-view`.
- Para el historial de un documento o registro: usar `siaf-document-history-panel` o `siaf-action-tracker`.

## Entradas

No recibe entradas.

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `role="tab"`, `role="tablist"`, `aria-busy`, `aria-hidden`, `aria-label`, `aria-selected`.

### Teclado

- **Tab**: recorre el Inicio de la ruta (sin acción), «Marcar todas como leídas» si hay no leídas, las tres pestañas
  de filtro (cada una es una parada), la paginación de arriba, las notificaciones y la de abajo.
- **Enter / Espacio**: en una pestaña aplica el filtro y vuelve a la página 1; en una notificación abre su documento,
  si lo tiene; en «Marcar todas como leídas», las marca.
- La paginación sigue `siaf-table-controls` y `siaf-pagination`.

### Notas

- **Pendiente · 1.3.1 Información y relaciones (A)**: `h1`, `h2` y notificaciones en lista `ul`/`li`, pero la ruta de
  navegación es un `nav` hecho a mano, sin `ol`/`li` ni `aria-current` (`siaf-breadcrumb` ya lo resuelve), y leída o
  no leída solo se ve por el punto azul, que es `aria-hidden`.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: título `text-text` 16.29:1 / 16.53:1, mensaje `text-neutral-medium`
  14.53:1 / 12.87:1, fecha y pestañas inactivas `text-neutral-low` 5.01:1 / 8.86:1 y pestaña activa blanca sobre
  `bg-brand-primary` 8.79:1 / 6.67:1; pero «Marcar todas como leídas» usa la clase `text-brand-primary` (azul de
  fondo de marca) y en oscuro queda en 2.66:1.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: en oscuro, el punto de no leída, el relleno de la pestaña activa y
  el contorno de foco, todos en `brand-primary`, quedan en 2.66:1 sobre la superficie.
- **Pendiente · 2.4.3 Orden del foco (A)**: al usar «Marcar todas como leídas» el botón desaparece y el foco se pierde.
- **2.4.7 Foco visible (AA)**: las notificaciones y «Marcar todas como leídas» muestran un contorno azul de 2 px con
  `focus-visible`; las pestañas y el Inicio de la ruta no tienen estilo propio y quedan con el anillo del navegador.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: el filtro es `role="tablist"` con `role="tab"` y `aria-selected`,
  pero sin `role="tabpanel"` ni flechas, y cada pestaña es una parada de Tab; `siaf-tabs` ya lo resuelve.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: la carga solo marca `aria-busy`, y no se anuncian el resultado de
  filtrar, el vacío «No hay notificaciones para mostrar.» ni el marcado de todas como leídas.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md), [`siaf-pagination`](siaf-pagination.md), [`siaf-table-controls`](siaf-table-controls.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-tray-notifications-view
