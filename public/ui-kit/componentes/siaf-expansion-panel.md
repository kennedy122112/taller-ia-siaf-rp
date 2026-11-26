# Expansion panel

> `siaf-expansion-panel` · Componente de Superficies · Sin uso en la app

Panel expandible de una sola sección (Figma UI KIT, nodo 9214:5839 «Expansion panels»): tarjeta con borde,
cabecera con la flecha, el título y un menú ⋮ opcional, y el contenido proyectado debajo al expandir.

Se apilan varios para armar un acordeón con contenido libre. `[(expanded)]` controla si está abierto; el
menú aparece solo con `actions` (reusa `siaf-icon-dropdown-menu`) y emite `action` con el valor elegido.
Para una lista de preguntas de solo texto va `siaf-accordion`; con marca lateral y X, `siaf-collapsible-card`.

## Importar

```ts
import { ExpansionPanelComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-expansion-panel>…</siaf-expansion-panel>
```

### Cuándo usarlo

- Bloques repetibles con contenido rico que el usuario pliega: cada asiento contable del formulario de eventos
  contables, con su grilla de cuentas adentro.
- Cuando cada bloque necesita acciones propias en el menú ⋮ (por ejemplo, «Eliminar asiento») mediante `actions`.
- Secciones largas de consulta que conviene plegar, como la paleta tonal en los fundamentos de `/ui-kit`.

### Cuándo no

- Para preguntas frecuentes de solo texto: usar `siaf-accordion`.
- Para ítems de una selección con marca lateral que se quitan con X: usar `siaf-collapsible-card`.
- Para secciones obligatorias de la solicitud que siempre deben verse: usar `siaf-solicitude-form-card` sin plegar.
- Para un menú de acciones sin contenido plegable: usar `siaf-icon-dropdown-menu` directamente.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `actions` | `IconDropdownMenuItem<string>[]` | `[]` | Opciones del menú ⋮. Sin opciones no se muestra el botón. |
| `expanded` | `boolean` | `false` |  |
| `menuWidth` | `number` | `200` | Ancho del menú ⋮ en px. |
| `title` | `string` | `''` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(action)` | `string` |  |
| `(expandedChange)` | `boolean` |  |

## Accesibilidad

Patrón WAI-ARIA: Panel desplegable (https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/).

Roles y atributos del código: `role="region"`, `aria-controls`, `aria-expanded`, `aria-label`, `aria-labelledby`.

### Teclado

- **Tab**: pasa por la flecha, el menú ⋮ (si hay `actions`) y después por el contenido abierto.
- **Enter / Espacio** en la flecha: abren o cierran el panel y emiten `expandedChange`.
- El título también abre y cierra con clic, pero no recibe foco: con teclado se usa la flecha. El menú ⋮ sigue
  `siaf-icon-dropdown-menu`; si una acción quita el panel, el padre debe mover el foco.

### Notas

- **4.1.2 Nombre, función y valor (A)**: la flecha es un `button` con `aria-expanded`, `aria-controls` hacia el
  contenido y nombre «Expandir …» / «Contraer …» con el `title`; el ⋮ se llama «Más opciones de …».
- **1.3.1 Información y relaciones (A)**: el título es un `h3` y el contenido abierto un `role="region"` rotulado
  por él; el padre debe ubicar el panel donde un `h3` respete la jerarquía.
- **2.1.1 Teclado (A)**: el clic en el título tiene su equivalente en la flecha, que es un botón nativo.
- **1.4.1 Uso del color (A)**: abierto o cerrado se distingue por la flecha, no por color.
- **1.4.3 Contraste mínimo (AA)**: título y contenido en `text-neutral-medium` sobre la superficie, 14.53:1 (oscuro
  12.87:1).
- **2.4.7 Foco visible (AA)**: la flecha muestra un contorno de 2 px `border-states-focus` separado 2 px.
- **1.4.11 Contraste no textual (AA)**: ese contorno es el azul del kit (`border-states-focus`, 5.35:1 claro /
  10.15:1 oscuro sobre la superficie).
- **2.5.8 Tamaño del objetivo (AA)**: flecha y ⋮ miden 40 × 40 px.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md), [`siaf-icon-dropdown-menu`](siaf-icon-dropdown-menu.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-expansion-panel
