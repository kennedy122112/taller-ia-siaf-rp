# Empty section

> `empty-section` · Componente de Estado y feedback · Sin uso en la app

Bloque de estado vacío de una sección: título, botón de acción (lupa por defecto) y recuadro
con el mensaje; `[message]` se reemplaza por el valor una vez que el usuario elige uno.

Es el componente canónico para ese patrón: úsalo SIEMPRE en vez de rehacer el título + botón +
`message-box` a mano (ya se reinventó una vez en el proyecto).

## Importar

```ts
import { EmptySectionComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<empty-section />
```

### Cuándo usarlo

- Para un dato que se elige desde un panel lateral: título, lupa y recuadro que pasa a mostrar lo elegido
  (atributos del evento en el catálogo de eventos, «Buscar evento» en el catálogo de eventos contables).
- Para selección múltiple, pasando en `message` los valores elegidos separados por comas («Ámbito
  institucional», «Conceptos para eventos contables»).
- Con `disabled` mientras no se puede elegir: en una modificación de vigencia o cuando el campo depende de
  otro que aún no tiene valor.

### Cuándo no

- Rehacer a mano el título, el botón y el `message-box`: este es el componente canónico.
- Cuando ya hay un ítem elegido con varios datos: pasar a `siaf-summary-card` (como «Buscar evento» en el
  catálogo de eventos contables) o a la grilla estándar con `siaf-table-controls` si son dos o más.
- Para una pantalla de consulta sin resultados: usar `siaf-empty-state`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `actionIcon` | `string` | `'search'` |  |
| `disabled` | `boolean` | `false` |  |
| `message` | `string` | `'No se ha seleccionado ningún tipo. Haga clic en el botón p…` | Texto del recuadro: se reemplaza por el valor una vez seleccionado. |
| `title` | `string` | `''` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(actionClicked)` | `void` |  |

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- **Tab**: enfoca el botón de acción; deshabilitado no recibe el foco.
- **Enter / Espacio**: emiten `actionClicked` (el botón sigue `siaf-button`).

### Notas

- **1.3.1 Información y relaciones (A)**: es un `<section>` con el título en un `<h3>` de nivel fijo y el
  mensaje en un párrafo (`message-box`).
- **4.1.2 Nombre, función y valor (A)**: el botón de ícono recibe `title` como `ariaLabel`, así que nombra la
  sección y no la acción; sin `title` se leería el nombre del ícono. El padre debe dar siempre `title`.
- **1.1.1 Contenido no textual (A)**: la lupa es decorativa; el nombre del botón sale de `ariaLabel`.
- **4.1.3 Mensajes de estado (AA)**: el recuadro no es región viva: al elegir un valor, el texto nuevo no se
  anuncia.
- **1.4.3 Contraste mínimo (AA)**: título `text-neutral-high` 16.29:1 (16.53:1 en oscuro) y mensaje
  `text-neutral-medium` sobre `bg-surfaces-surface-low` 13.46:1 (12.09:1).
- **2.4.7 Foco visible (AA)**: el botón muestra el borde `border-states-focus` (5.35:1) y la capa de foco.
- **2.5.8 Tamaño del objetivo (AA)**: el botón mide 40 × 40 px.

## Composición

Pinta por dentro: [`message-box`](message-box.md), [`siaf-button`](siaf-button.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/empty-section
