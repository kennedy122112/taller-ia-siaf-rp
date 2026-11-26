# Tag

> `siaf-tag` · Componente de Estado y feedback

Tag del kit (Figma UI KIT, «Input tags», «Choice tags», «Filter tags» y «Action tags»): la misma forma (borde, esquinas
de 8 px, íconos de 20 px y 32 o 24 px de alto) con cuatro usos, en `variant`. `input` es un texto con una × opcional
que lo quita; `choice`, un botón que se elige o se deselecciona (`aria-pressed`); `filter`, el botón que abre las
opciones de un filtro, con la flecha ▾ y el check al tener valor; y `action`, un botón de acción rápida.

Los estados son los del Figma: sin elegir va con borde gris y texto `text-neutral-medium`; elegido (`selected`),
con fondo y borde azules; hover y foco pintan su capa y su borde; `disabled` apaga el texto y quita la × y la flecha;
y `dragged` es el estado visual de arrastre (capa y sombra «Elevation 1»), sin lógica de arrastre.

La × es un botón aparte del botón principal, dentro del mismo borde: nunca un control dentro de otro.

## Importar

```ts
import { TagComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-tag>…</siaf-tag>
```

### Cuándo usarlo

- `input` con `selected` para mostrar valores aplicados, como los chips de «Filtros aplicados de búsqueda»
  (`siaf-consultas-filtros-chips`); con `removable` cuando cada uno se quita por separado (emite `removed`).
- `filter` para el disparador de un filtro con opciones: lo usa `siaf-filter-pill`, que pone el menú, el valor elegido
  y la × para limpiarlo. `expanded` expone si el menú está abierto y gira la flecha.
- `choice` para elegir entre opciones que se prenden y apagan (emite `selectedChange`), con un ícono si ayuda a
  reconocerlas.
- `action` para acciones rápidas y secundarias junto a un contenido (emite `clicked`).
- `small` (24 px) en barras densas o dentro de tablas.

### Cuándo no

- Para el estado de un documento, un registro u otro estado con color: usar `siaf-flow-status-tag`,
  `siaf-record-status-tag` o `siaf-status-tag`.
- Para un filtro con menú hecho a mano: usar `siaf-filter-pill`, que ya dibuja con `filter`.
- Para la acción principal de una pantalla o un formulario: usar `siaf-button`.
- Para contadores o avisos de novedades: usar `siaf-badge`.

### Limitaciones

El texto que se lee junto va en el mismo nodo: entre dos `span`, Angular quita el espacio y se lee «Estado:Aprobado».

### Así no / así sí

```html
<!-- ❌ Así no -->
<siaf-tag><span>Estado:</span> <span>Aprobado</span></siaf-tag>

<!-- ✅ Así sí -->
<siaf-tag>Estado: Aprobado</siaf-tag>
```

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `disabled` | `boolean` | `false` |  |
| `dragged` | `boolean` | `false` | Estado visual de arrastre del Figma (capa y sombra); no arrastra nada. |
| `expanded` | `boolean \| null` | `null` | En `filter`: si el menú que abre está abierto; con valor, publica `aria-expanded` y gira la flecha. |
| `icon` | `string` | `''` | Ícono inicial de Material Icons. En `filter`, sin él, el check aparece al estar elegido. |
| `removable` | `boolean` | `false` | Muestra la × (en `input` y `filter`); se oculta con `disabled`. |
| `removeLabel` | `string` | `'Quitar'` | Nombre de la × para el lector de pantalla: «Quitar filtro Estado». |
| `selected` | `boolean` | `false` | Elegido: fondo y borde azules. No aplica a `action`. |
| `size` | `'standard' \| 'small'` | `'standard'` |  |
| `variant` | `'input' \| 'choice' \| 'filter' \| 'action'` | `'input'` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(clicked)` | `MouseEvent` | Pulsación del botón (`choice`, `filter` y `action`). |
| `(removed)` | `MouseEvent` | La × del tag. |
| `(selectedChange)` | `boolean` | `choice`: el nuevo estado al pulsarlo. |

## Accesibilidad

Roles y atributos del código: `aria-expanded`, `aria-haspopup`, `aria-label`, `aria-pressed`.

### Teclado

- **Tab**: enfoca el botón del tag (`choice`, `filter` y `action`) y, si tiene, su ×; `input` sin × no recibe foco.
- **Enter / Espacio**: en `choice` elige o deselecciona; en `filter` y `action` emiten `clicked`; sobre la ×, emiten
  `removed`.

### Notas

- **4.1.2 Nombre, función y valor (A)**: `choice`, `filter` y `action` son `<button>` nombrados por su texto; `choice`
  publica `aria-pressed` y `filter`, con `expanded`, `aria-haspopup="menu"` y `aria-expanded`. La × es otro `<button>`
  con `aria-label` (`removeLabel`), al lado del principal y no dentro.
- **2.4.7 Foco visible (AA)**: con el foco en el botón o en la ×, el tag pinta la capa y el borde de foco del Figma y
  el anillo del kit, 2 px `border-states-focus` separado 2 px (5.35:1 claro / 10.15:1 oscuro).
- **1.4.1 Uso del color (A)**: `filter` elegido suma el check; `choice` elegido solo cambia de color en pantalla, y el
  lector lo sabe por `aria-pressed`.
- **1.4.3 Contraste mínimo (AA)**: sin elegir, `text-neutral-medium` sobre la superficie (14.53:1 claro / 12.87:1
  oscuro); elegido, `text-neutral-activated` sobre la capa `bg-states-light-selected` (7.69:1 / 17.15:1).
  Deshabilitado queda fuera del criterio.
- **2.4.3 Orden del foco (A)**: al quitar un tag, la × desaparece con el foco adentro: quien lo quita lleva el foco a
  otro control, como `siaf-filter-pill`, que lo deja en el botón de la píldora.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: el borde sin elegir es `border-states-enabled` (2.44:1 claro /
  2.59:1 oscuro) y el de elegido, `border-states-active`, baja a 2.02:1 en oscuro.
- **Pendiente · 2.5.8 Tamaño del objetivo (AA)**: la × mide 20 × 20 px, pegada al botón principal.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-tag
