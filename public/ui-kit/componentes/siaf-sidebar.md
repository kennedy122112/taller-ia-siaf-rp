# Sidebar

> `siaf-sidebar` · Componente de Armazón de la aplicación

Barra lateral de navegación del shell autenticado, en dos variantes: `rail` (iconos) y `expanded` (lista).

El rail arma sus destinos desde la constante local `RAIL_ITEMS` (Panel, Bandeja, Procesos) y suma
Crear, Ayuda y Ajustes; no navega por sí mismo: solo emite `created`, `help` y `navigationChanged`,
y pinta como activo lo que el padre le pase en `navigation`. La variante `expanded` usa `items`.

## Importar

```ts
import { SidebarComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-sidebar />
```

### Cuándo usarlo

- Variante `rail` como navegación fija de escritorio (desde `lg`): `siaf-app-shell` la pinta a la izquierda con
  Crear, Panel, Bandeja, Procesos, Ayuda y Ajustes.
- Con `ctaAdd` atado al permiso `document.create` (Crear se deshabilita si el rol no puede crear) y `buttonHelp`
  para mostrar Ayuda.
- Para indicar en qué área está el usuario: el armazón le pasa en `navigation` Panel, Procesos o Ajustes según la URL.

### Cuándo no

- En móvil: usar `siaf-mobile-navigation-menu`, que comparte `SidebarNavigation` y los mismos handlers.
- Para navegar dentro de un módulo (Documentos / Registros, Detalle / Historial): usar `siaf-tabs` o
  `siaf-records-tabs`.
- La variante `expanded` en pantallas nuevas: no tiene uso en la app y sus enlaces usan `href` en vez del router;
  para un menú de destinos, `siaf-process-menu-tree` con otro arreglo de nodos.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `buttonHelp` | `boolean` | `false` |  |
| `ctaAdd` | `boolean` | `true` |  |
| `hiddenNavigation` | `SidebarNavigation[]` | `[]` | Destinos que no se pintan, como «Ajustes» para quien no puede abrir ninguna de sus pantallas. |
| `items` | `SidebarItem[]` | `[]` |  |
| `navigation` | `'Default' \| 'Panel' \| 'Bandeja' \| 'Proceso' \| 'Ajustes'` | `'Default'` |  |
| `title` | `string` | `'SIAF RP'` |  |
| `variant` | `'rail' \| 'expanded'` | `'rail'` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(created)` | `void` |  |
| `(help)` | `void` |  |
| `(navigationChanged)` | `'Default' \| 'Panel' \| 'Bandeja' \| 'Proceso' \| 'Ajustes'` |  |

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- **Tab**: recorre Crear, Panel, Bandeja, Procesos, Ayuda (con `buttonHelp`) y Ajustes; Crear deshabilitado
  (`ctaAdd` en false) se salta.
- **Enter / Espacio**: emiten `created`, `navigationChanged` o `help`; el componente no navega ni abre paneles.
- **Enter** (variante `expanded`): sigue el enlace `<a href>` del ítem.

### Notas

- **Pendiente · 1.3.1 Información y relaciones (A)**: es un `<aside>` con un `<nav>` que solo agrupa Panel, Bandeja y
  Procesos (Crear, Ayuda y Ajustes quedan fuera); ni el `aside` ni el `nav` tienen `aria-label` y los destinos no
  van en lista `ul`/`li`.
- **Pendiente · 1.4.1 Uso del color (A)**: en el rail, el destino activo solo cambia de color (capa `brand-primary`
  detrás del ícono y el ícono en azul); el texto no cambia. En `expanded` el activo además va en `font-medium`.
- **1.4.3 Contraste mínimo (AA)**: rail con `text-neutral-medium` sobre la superficie (14.53:1 / 12.87:1); en
  `expanded`, título y activo en blanco sobre `bg-brand-secondary` (8.70:1 / 5.95:1).
- **Pendiente · 1.4.11 Contraste no textual (AA)**: el contorno de foco del rail es el azul del kit
  (`border-states-focus`, 5.35:1 / 10.15:1), pero en oscuro el ícono activo, en `bg-brand-primary`, no llega a 3:1.
- **2.4.7 Foco visible (AA)**: los botones del rail muestran un contorno azul de 2 px con `focus-visible`; los enlaces
  de `expanded` quedan con el anillo del navegador.
- **2.5.8 Tamaño del objetivo (AA)**: cada botón del rail ocupa el ancho de la barra (56 px) y más de 60 px de alto.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: cada destino es un `<button>` con su texto como nombre y Crear usa
  `disabled`, pero el activo no publica `aria-current` (tampoco `item.active` en `expanded`). En el armazón, Bandeja,
  Procesos y Ajustes abren un panel sin `aria-expanded`: el componente no recibe si está abierto.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-sidebar
