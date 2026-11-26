# Button

> `siaf-button` · Componente de Botones y acciones

Botón base del design system (Figma UI KIT, nodo 8305:2071 «Buttons»).

- `variant`: `filled` (rojo acento), `outline` (borde gris) o `text` (sin borde). Siguen valiendo los
  nombres de siempre: `accent` / `primary` = filled, `secondary` = outline, `ghost` = text.
- `size`: `md` (Default, 40 px) o `sm` (Small, 32 px); en ambos, texto de 14 px e íconos de 24.
- Estados del Figma con una capa sobre el fondo: hover (capa + elevación 2; outline con borde azul),
  foco con teclado (borde azul + capa + elevación 2), presionado (capa + elevación 8) y deshabilitado
  (fondo blanco con capa gris y texto gris; en modo oscuro, la superficie deshabilitada del tema con su borde).
- Ícono opcional al inicio, al final o solo ícono (`iconOnly`, que exige `ariaLabel` en español), y `loading`.
- Botón de ícono (Figma «Icon buttons», nodo 8307:5607): 40 / 32 px; `standard` es el nombre del Figma para
  `text`. En outline y standard el ícono va en gris; en Small mide 20 px (24 en filled). `[activated]` lo deja
  presionado como interruptor (`aria-pressed`): filled con capa y elevación 1; outline y standard con capa
  azul, ícono azul y, en outline, borde azul.

Es el botón canónico de la app: usarlo siempre en vez de un `<button>` con clases sueltas.

## Importar

```ts
import { ButtonComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-button>…</siaf-button>
```

### Cuándo usarlo

- `filled` para la acción principal de la vista (una sola por bloque): Grabar, Aprobar, Crear documento.
- `outline` para acciones secundarias junto a la principal (Cancelar, Editar) y `text` para las de menor peso.
- Botón de ícono (`iconOnly`) en barras de herramientas y filas de tabla, siempre con `ariaLabel`.
- `sm` (32 px) dentro de tablas, tarjetas compactas y barras densas; `md` (40 px) en el resto.

### Cuándo no

- Para navegar a otra pantalla: usar un enlace (`routerLink`); el botón ejecuta acciones.
- Varios `filled` en el mismo bloque: compiten entre sí; dejar uno y bajar el resto a `outline` o `text`.
- Para acciones destructivas no hay variante `danger`: usar `filled` y confirmar con un modal.
- Para abrir un menú de opciones: usar `siaf-icon-dropdown-menu`.

### Limitaciones

No hay tamaño `lg` ni variante `danger`: una acción destructiva usa `filled`. Los nombres viejos de las variantes (`accent`, `primary`, `secondary`, `ghost`) siguen valiendo, pero el código nuevo usa `filled`, `outline` y `text`.

### Así no / así sí

```html
<!-- ❌ Así no -->
<siaf-button variant="danger" size="lg">Eliminar</siaf-button>

<!-- ✅ Así sí -->
<siaf-button variant="filled" icon="delete">Eliminar</siaf-button>
```

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `activated` | `boolean` | `false` | Botón de ícono presionado (interruptor): estado «Activated» del Figma. |
| `ariaLabel` | `string` | `''` |  |
| `disabled` | `boolean` | `false` |  |
| `icon` | `string` | `''` |  |
| `iconOnly` | `boolean` | `false` |  |
| `iconPosition` | `'start' \| 'end'` | `'start'` |  |
| `loading` | `boolean` | `false` |  |
| `size` | `'sm' \| 'md'` | `'md'` |  |
| `type` | `'button' \| 'reset' \| 'submit'` | `'button'` |  |
| `variant` | `'filled' \| 'outline' \| 'standard' \| 'text' \| 'primary' \| 'accent' \| 'secondary' \| 'ghost'` | `'filled'` |  |

## Eventos

No emite eventos.

## Accesibilidad

Patrón WAI-ARIA: Botón (https://www.w3.org/WAI/ARIA/apg/patterns/button/).

Roles y atributos del código: `aria-busy`, `aria-hidden`, `aria-label`, `aria-pressed`.

### Teclado

- **Tab**: enfoca el botón; el foco con teclado muestra el borde azul y la capa de estado.
- **Enter / Espacio**: ejecutan la acción. Deshabilitado o en `loading`, no recibe el foco.

### Notas

- **1.1.1 Contenido no textual (A)**: el ícono (`siaf-icon`) y el indicador de `loading` llevan `aria-hidden`; el
  nombre sale del texto proyectado o de `ariaLabel`.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: es un `<button>` nativo con `type="button"` por defecto (en
  formularios, `type="submit"` explícito) y `disabled` nativo; `iconOnly` necesita `ariaLabel` en español (sin él,
  el lector leería el nombre del ícono, p. ej. «file_upload») y `loading` publica `aria-busy`. Falta el estado
  apagado del interruptor: `activated` pone `aria-pressed="true"`, pero al desactivarse quita el atributo en vez de
  dejar `false`.
- **2.4.7 Foco visible (AA)**: `outline-none` se reemplaza en `:focus-visible` por el borde `border-states-focus`
  (5.35:1 claro / 10.15:1 oscuro), la capa de foco y la elevación 2.
- **1.4.3 Contraste mínimo (AA)**: `filled` pinta `text-brand-white` sobre `bg-brand-accent` (4.89:1 claro / 5.65:1
  oscuro); `outline` y `text`, `text-neutral-medium` sobre la superficie (14.53:1 / 12.87:1). El deshabilitado está
  exento.
- **1.4.11 Contraste no textual (AA)**: relleno de `filled` (`bg-brand-accent`, 4.89:1 / 3.14:1) e ícono gris de
  `iconOnly` en outline y standard (`icon-states-enabled`, 8.70:1 / 12.87:1) sobre la superficie. El borde gris de
  `outline` (`border-states-enabled`, 2.44:1 / 2.59:1) no llega a 3:1, pero al botón lo identifican su texto o su
  ícono.
- **Pendiente · 1.4.1 Uso del color (A)**: en `outline` y `standard`, `activated` solo cambia colores (capa, ícono
  y, en outline, borde azules; en oscuro ese borde, `border-states-active`, queda en 2.02:1). En `filled` lo
  distingue además la elevación 1.
- **2.5.8 Tamaño del objetivo (AA)**: `md` mide 40 px de alto y `sm` 32 px; el botón de ícono, 40×40 o 32×32.
- **4.1.3 Mensajes de estado (AA)**: `loading` solo deshabilita el botón y publica `aria-busy`; el resultado lo debe
  anunciar el padre (por ejemplo, con `siaf-snackbar`).

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-button
