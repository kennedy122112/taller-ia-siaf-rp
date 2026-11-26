# Mobile navigation menu

> `siaf-mobile-navigation-menu` · Componente de Armazón de la aplicación

Versión móvil del sidebar: la navegación principal del shell cuando no hay espacio para la barra fija.

Reusa el mismo tipo `SidebarNavigation` que `siaf-sidebar`, así que el shell trata ambos con los mismos
handlers. Los ítems están fijos en el componente; "Ayuda" no es una sección navegable — emite `help`
aparte y nunca se marca como activo.

## Importar

```ts
import { MobileNavigationMenuComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-mobile-navigation-menu />
```

### Cuándo usarlo

- Como navegación principal por debajo de `lg` (1024 px): `siaf-app-shell` lo abre a pantalla completa desde el
  botón de menú de `siaf-navbar`, en lugar del rail.
- Para ofrecer en una sola lista Crear documento, Panel, Bandeja, Procesos, Ayuda y Ajustes, con `ctaAdd` atado al
  permiso `document.create`.

### Cuándo no

- En escritorio: la barra fija es `siaf-sidebar` (variante `rail`), que emite los mismos eventos.
- Para listar procesos o secciones de la bandeja: al elegir el destino, el armazón abre `siaf-process-menu-tree` o
  `siaf-tray-menu`.
- Para una lista de opciones dentro de una pantalla: usar `siaf-list`, o `siaf-menu` si son acciones.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ctaAdd` | `boolean` | `false` |  |
| `hiddenNavigation` | `SidebarNavigation[]` | `[]` | Destinos que no se pintan, como «Ajustes» para quien no puede abrir ninguna de sus pantallas. |
| `navigation` | `'Default' \| 'Panel' \| 'Bandeja' \| 'Proceso' \| 'Ajustes'` | `'Panel'` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(created)` | `void` |  |
| `(help)` | `void` |  |
| `(navigationChanged)` | `'Default' \| 'Panel' \| 'Bandeja' \| 'Proceso' \| 'Ajustes'` |  |

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- **Tab**: recorre «Crear documento» (se salta si `ctaAdd` es false) y los cinco destinos, en orden.
- **Enter / Espacio**: eligen el destino (`navigationChanged`); «Ayuda» emite `help` y «Crear documento», `created`.

### Notas

- **Pendiente · 1.3.1 Información y relaciones (A)**: es un `<aside>` con `h2` y un `<nav>`, pero ninguno tiene
  `aria-label` y los destinos son botones sueltos, sin lista `ul`/`li`: el lector no dice cuántos hay.
- **1.4.1 Uso del color (A)**: el destino activo, además del fondo y el color, va en negrita.
- **1.4.3 Contraste mínimo (AA)**: «Crear documento» en `text-brand-white` sobre `bg-brand-accent` (4.89:1 / 5.65:1);
  en claro, destinos en `text-neutral-medium` sobre blanco (14.53:1). En oscuro el fondo es `bg-surfaces-field` y
  falta medirlo.
- **1.4.11 Contraste no textual (AA)**: el contorno de foco es el azul del kit (`border-states-focus`, 5.35:1 claro
  / 10.15:1 oscuro sobre la superficie).
- **Pendiente · 2.4.3 Orden del foco (A)**: no toma el foco al abrirse (el Tab pasa antes por el logo, la campana y el
  perfil del navbar), no cierra con Escape y la página de fondo sigue en el orden de tabulación. Le toca al armazón,
  que hoy no lo hace.
- **2.4.7 Foco visible (AA)**: los destinos muestran un contorno azul de 2 px con `focus-visible`; «Crear documento»
  no tiene estilo propio y queda con el anillo del navegador.
- **2.5.8 Tamaño del objetivo (AA)**: destinos de 48 px de alto y «Crear documento» de 40 px, a todo el ancho.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: cada destino es un `<button>` con su texto como nombre y «Crear
  documento» usa `disabled`, pero el activo solo se marca con estilo: falta `aria-current`.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-mobile-navigation-menu
