# Tray menu

> `siaf-tray-menu` · Componente de Armazón de la aplicación

Menú de la Bandeja de Documentos: lista Recibidos, Enviados, Borradores, Notificaciones y Papelera
con su contador, y emite en `selected` la sección elegida.

Los contadores son un `computed` que depende del rol: los de `FuenteBandeja` para las secciones (el aprobador no
tiene Borradores ni Papelera) y `FuenteNotificaciones.sinLeer()` —la misma fuente que la campana del navbar— para
Notificaciones. Las dos las provee el proyecto. Se muestran a dos dígitos, tope '99+'.

## Importar

```ts
import { TrayMenuComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-tray-menu />
```

### Cuándo usarlo

- Como panel de la Bandeja en `siaf-app-shell`: se abre desde Bandeja del rail o del menú móvil, y la sección elegida
  decide si se pinta `siaf-tray-documents-view` o `siaf-tray-notifications-view`.
- Para ver de un vistazo cuántos documentos hay por sección según el rol y cuántas notificaciones sin leer, con la
  misma cuenta que la campana de `siaf-navbar`.

### Cuándo no

- Para la navegación principal: usar `siaf-sidebar` o `siaf-mobile-navigation-menu`.
- Para alternar secciones dentro de una pantalla (Documentos / Registros): usar `siaf-tabs` o `siaf-records-tabs`.
- Para una lista de opciones con contador fuera del armazón: usar `siaf-list` con un badge al final.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `selectedItem` | `string` | `'Borradores'` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(selected)` | `string` |  |

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- **Tab**: recorre las cinco secciones en orden.
- **Enter / Espacio**: emiten `selected` con la sección (Recibidos, Enviados, Borradores, Notificaciones o Papelera).

### Notas

- **Pendiente · 1.3.1 Información y relaciones (A)**: es un `<aside>` con `h2` y un `<nav>`, pero el `nav` no tiene
  `aria-label` (en escritorio convive con el del rail) y las secciones son botones sueltos, sin lista `ul`/`li`.
- **1.4.1 Uso del color (A)**: la sección elegida, además del fondo y el color, va en negrita.
- **1.4.3 Contraste mínimo (AA)**: contadores de `siaf-badge` en blanco sobre `bg-brand-accent` (4.89:1 / 5.65:1) y,
  en claro, secciones en `text-neutral-medium` sobre blanco (14.53:1); en oscuro el fondo es
  `bg-surfaces-surface-highest` y falta medirlo.
- **1.4.11 Contraste no textual (AA)**: el contorno de foco es el azul del kit (`border-states-focus`, 5.35:1 claro
  / 10.15:1 oscuro sobre la superficie).
- **Pendiente · 2.4.3 Orden del foco (A)**: no toma el foco al abrirse ni cierra con Escape; el armazón lo pinta
  después del rail, así que desde Bandeja el Tab pasa antes por Procesos, Ayuda y Ajustes.
- **2.4.7 Foco visible (AA)**: cada sección muestra un contorno azul de 2 px con `focus-visible`.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: cada sección es un `<button>` cuyo nombre incluye el contador
  («Recibidos 03»), pero la elegida no publica `aria-current`.
- **4.1.3 Mensajes de estado (AA)**: los contadores se leen dentro del botón al enfocarlo; no son región viva, así que
  avisar de una notificación nueva le toca a la campana de `siaf-navbar`.

## Composición

Pinta por dentro: [`siaf-badge`](siaf-badge.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-tray-menu
