# Cascading menu

> `siaf-cascading-menu` · Componente de Botones y acciones · Sin uso en la app

Menú de dos niveles anclado a un disparador: una lista de categorías y, al elegir una, sus opciones al
costado.

Es `siaf-menu` con submenú, con el diseño del UI KIT: el aspecto, el teclado (↑ ↓ → ← Escape) y el lado
del submenú (derecha, izquierda o debajo según el espacio) salen de ahí, así que un cambio de diseño se
hace en `siaf-menu`. Este componente solo agrega el disparador proyectado, `open` controlado por el padre,
el cierre al pulsar fuera y la selección con su categoría (`CascadingMenuSelection`).

## Importar

```ts
import { CascadingMenuComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-cascading-menu>…</siaf-cascading-menu>
```

### Cuándo usarlo

- Botón «+» que agrega un ítem eligiendo primero una categoría y después su tipo: en la solicitud del catálogo de
  eventos, la clase de evento y luego la etapa.
- Opciones agrupadas en pocas categorías con listas cortas, cuando juntarlas en un solo menú lo haría largo.
- Cuando el padre necesita la categoría y la opción juntas: `selected` emite ambas (`CascadingMenuSelection`).

### Cuándo no

- Con un solo nivel de opciones: usar `siaf-icon-dropdown-menu`, que además lleva el foco al menú y marca
  `aria-expanded` en su botón.
- Para catálogos largos o con más de dos niveles: usar un panel lateral de selección (`siaf-selection-side-nav`) o
  `siaf-tree-view`.
- Para elegir un valor de formulario: usar `siaf-select-options`.
- Rehacer a mano el submenú o su teclado: salen de `siaf-menu`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ariaLabel` | `string` | `''` |  |
| `groups` | `CascadingMenuGroup[]` | `[]` |  |
| `open` | `boolean` | `false` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(closed)` | `void` |  |
| `(selected)` | `CascadingMenuSelection` |  |

## Accesibilidad

Roles y atributos del código: `aria-hidden`.

### Teclado

- **Escape**: cierra todo el menú, también desde el submenú (se escucha en `document`), y emite `closed`.
- **Flecha arriba / abajo** e **Inicio / Fin**: recorren las categorías o las opciones del submenú.
- **Flecha derecha**, **Enter** o **Espacio** sobre una categoría: abren sus opciones al costado y enfocan la
  primera.
- **Flecha izquierda**: cierra el submenú y devuelve el foco a la categoría.
- **Enter / Espacio** sobre una opción: la eligen, emiten `selected` y cierran el menú.
- **Tab**: al abrir, el foco entra en la primera categoría; salir del menú con Tab lo cierra.
- El disparador proyectado sigue el teclado de su propio componente (normalmente `siaf-button`).

### Notas

- **Pendiente · 4.1.2 Nombre, función y valor (A)**: el panel es `siaf-menu` (`role="menu"`; las categorías con
  `aria-haspopup` y `aria-expanded`), pero el disparador proyectado no recibe `aria-haspopup` ni `aria-expanded`
  (`siaf-button` no los expone). Además el padre debe dar `ariaLabel` al menú: por defecto va vacío y la solicitud
  del catálogo de eventos no lo pasa.
- **2.1.1 Teclado (A)**: abrir categorías, elegir y cerrar se hace con teclado; Escape se escucha en `document` y Tab
  sale del menú sin trampa.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir el foco entra en la primera categoría y al cerrar (Escape,
  elegir o salir con Tab) vuelve al disparador. La capa que cierra al pulsar fuera no es parada de Tab.
- **2.4.7 Foco visible (AA)**: heredado de `siaf-menu`: la opción enfocada lleva un contorno interior azul de 2 px
  (`border-states-focus`, 5.35:1 claro / 10.15:1 oscuro).
- **2.5.8 Tamaño del objetivo (AA)**: categorías y opciones de 48 px de alto (`siaf-menu` en densidad `standard`).

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siaf-menu`](siaf-menu.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-cascading-menu
