# Tabs

> `siaf-tabs` · Componente de Navegación

Pestañas del design system (Figma UI KIT, nodo 2588:135 «Tabs content»).

Una fila de pestañas sobre una línea gris de 2 px. Texto de 14 px en gris; la activa va en negrita azul.
- `border` (por defecto `true`): la activa se dibuja como carpeta, con borde arriba y a los lados y el
  fondo de la superficie, y corta la línea. Con `border=false` la activa lleva un subrayado azul de 2 px.
- Al pasar el mouse, enfocar con teclado o presionar, una capa de estado del Figma cubre la pestaña.
- `count` muestra un contador con `siaf-badge`; `fullWidth` reparte el ancho entre las pestañas.
- `disabled` en una pestaña la deja a la vista pero sin poder elegirla: texto tenue sobre la capa gris de
  deshabilitado, sin estado al pasar el mouse.
- Con muchas pestañas (Figma «6+») la fila se desplaza en horizontal sin barra visible.

El padre mantiene el `activeId` y decide qué contenido pinta: este componente solo dibuja la fila.
`siaf-records-tabs`, la franja «Detalle | Historial» de `siaf-detail-history-tabs` y el login lo usan por dentro.

## Importar

```ts
import { TabsComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-tabs />
```

### Cuándo usarlo

- Para alternar entre vistas de una misma pantalla sin cambiar de ruta (Documentos / Registros, Detalle / Historial).
- Entre 2 y 5 pestañas con nombres cortos; con más, la fila se desplaza en horizontal.
- `border=false` bajo cabeceras y dentro de tarjetas; `border=true` cuando la pestaña activa se une a un panel blanco.

### Cuándo no

- Para acciones o para navegar a otra ruta: usar `siaf-button` o un enlace.
- Para seguir un flujo por etapas: usar `siaf-steps` o `siaf-action-tracker`.
- Pestañas anidadas dentro de otra pestaña.
- Esconder una vista que el usuario no puede abrir si el diseño la muestra: marcarla `disabled`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `activeId` | `string` | `''` |  |
| `ariaLabel` | `string` | `''` | Nombre accesible de la fila de pestañas. |
| `border` | `boolean` | `true` | Figma «Border»: `true` dibuja la activa como carpeta; `false`, con subrayado azul. |
| `fullWidth` | `boolean` | `false` | Reparte el ancho disponible entre las pestañas. |
| `idBase` | `string` | `''` | Prefijo de los ids de las pestañas (`idBase-idDeLaPestaña`), para que el panel los cite en `aria-labelledby`. |
| `tabs` | `TabItem<T>[]` | `[]` | Con ids de un tipo propio (`TabItem<'a' \| 'b'>[]`), `activeIdChange` emite ese tipo. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(activeIdChange)` | `T` | Emite el `id` de la pestaña elegida (no se emite al pulsar la que ya está activa). |
| `(selected)` | `TabItem<T>` |  |

## Accesibilidad

Patrón WAI-ARIA: Pestañas (https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

Roles y atributos del código: `role="tab"`, `role="tablist"`, `aria-label`, `aria-selected`.

### Teclado

- **Tab**: entra a la fila en la pestaña activa (o en la primera habilitada, si ninguna lo está) y el siguiente Tab
  sale de la fila.
- **Flecha izquierda / derecha**: pasan a la pestaña habilitada anterior o siguiente (dan la vuelta) y la activan.
- **Inicio / Fin**: van a la primera o a la última pestaña habilitada y la activan.
- **Enter / Espacio**: activan la pestaña enfocada (cada pestaña es un `<button>`). Las deshabilitadas no reciben
  foco.

### Notas

- **4.1.2 Nombre, función y valor (A)**: la fila es `role="tablist"` y cada pestaña un `<button>` con `role="tab"` y
  `aria-selected`. El padre debe dar `ariaLabel` a la fila (por defecto va vacío) y, en el contenido,
  `role="tabpanel"` con `aria-labelledby` apuntando al id de la pestaña (`idBase` + `-` + id de la pestaña); hoy solo
  lo hace la ficha del `/ui-kit`.
- **2.1.1 Teclado (A)**: flechas izquierda y derecha, Inicio y Fin; solo la activa (o la primera, si ninguna lo está)
  entra en el orden de tabulación (roving tabindex).
- **2.4.7 Foco visible (AA)**: `:focus-visible` pinta un contorno interior azul de 2 px (`border-states-focus`,
  5.35:1 claro / 10.15:1 oscuro) sobre la capa `bg-states-light-focus`. Es un `outline`, no una sombra: en la
  pestaña activa, que es la que recibe el foco, la sombra del subrayado o de la carpeta ya no lo tapa.
- **1.4.3 Contraste mínimo (AA)**: activa `text-neutral-activated` (8.79:1 claro / 17.76:1 oscuro) e inactivas
  `text-neutral-low` (5.01:1 / 8.86:1) sobre la superficie; con `border=false` el fondo es el del padre.
- **1.4.1 Uso del color (A)**: la activa además va en negrita, así que el estado no depende del subrayado
  (`border-states-active`, 2.02:1 en oscuro) ni del borde de carpeta.
- **2.5.8 Tamaño del objetivo (AA)**: cada pestaña mide al menos 40 px de alto.
- **4.1.2 Nombre, función y valor (A)**: una pestaña `disabled` es un `<button disabled>`, así que el lector la anuncia
  como no disponible; su texto tenue (`text-neutral-disabled`) está exento de 1.4.3 por ser un control inactivo.

## Composición

Pinta por dentro: [`siaf-badge`](siaf-badge.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-tabs
