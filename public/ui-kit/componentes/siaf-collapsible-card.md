# Collapsible card

> `siaf-collapsible-card` · Componente de Superficies · Sin uso en la app

Tarjeta colapsable (Figma UI KIT, nodo 19632:66 «accordion/collapsible_card»): cabecera de 60 px con una
marca azul a la izquierda, la flecha, la información del ítem y una X para quitarlo; al abrir, el detalle
aparece debajo separado por una línea.

La cabecera se proyecta con el atributo `card-info` y el detalle con el contenido sin atributo, así que
sirve para cualquier ítem de una lista (un documento, un asiento…). `[(expanded)]` controla si está
abierta; la X emite `closed` y se oculta con `[closable]="false"`. El padre decide qué hacer al cerrar.

## Importar

```ts
import { CollapsibleCardComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-collapsible-card>…</siaf-collapsible-card>
```

### Cuándo usarlo

- Ítems de una lista que se revisan de a uno: un documento o un asiento con su resumen en la cabecera y todos sus
  datos al abrir.
- Cuando además el usuario puede quitar el ítem con la X y el padre decide qué pasa con `closed`.
- Hoy sin uso en la app; empieza cerrada y `[(expanded)]` sirve para abrir la primera o recordar el estado.

### Cuándo no

- Para 2 o más registros comparables en una solicitud: usar la grilla estándar (`siaf-table-controls` + tabla +
  `siaf-pagination`).
- Para el único ítem elegido desde un panel lateral, sin detalle que desplegar: usar `siaf-summary-card`.
- Para secciones con título y menú ⋮, sin X: usar `siaf-expansion-panel`; para preguntas de solo texto,
  `siaf-accordion`.
- Con la X visible en modo consulta: ocultarla con `[closable]="false"`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `closable` | `boolean` | `true` | Muestra la X que emite `closed`. |
| `closeLabel` | `string` | `'Quitar'` |  |
| `expanded` | `boolean` | `false` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(closed)` | `void` |  |
| `(expandedChange)` | `boolean` |  |

## Accesibilidad

Roles y atributos del código: `role="region"`, `aria-controls`, `aria-expanded`, `aria-hidden`, `aria-label`, `aria-labelledby`.

### Teclado

- **Tab**: pasa por la flecha, lo que el padre proyecte en la cabecera y la X.
- **Enter / Espacio** en la flecha: abren o cierran el detalle y emiten `expandedChange`.
- **Enter / Espacio** en la X: emiten `closed`; si el padre quita la tarjeta, el foco no se mueve solo.

### Notas

- **4.1.2 Nombre, función y valor (A)**: la flecha es un `button` con `aria-expanded`, `aria-controls` hacia el
  detalle y nombre «Expandir detalle» / «Contraer detalle»; la X toma su nombre de `closeLabel`, que el padre debe
  completar con el ítem (por ejemplo «Quitar documento PAA-…») cuando hay varias tarjetas.
- **1.3.1 Información y relaciones (A)**: el detalle abierto es `role="region"` rotulado por la cabecera
  (`aria-labelledby`).
- **1.1.1 Contenido no textual (A)**: la marca azul y los íconos de los botones son decorativos (`aria-hidden`).
- **1.4.1 Uso del color (A)**: abierta o cerrada se distingue por la flecha y por el detalle visible; la marca azul
  no indica estado.
- **2.4.3 Orden del foco (A)**: al quitar la tarjeta, el padre debe llevar el foco al ítem siguiente o a la acción
  de agregar: el componente no lo mueve.
- **2.4.7 Foco visible (AA)**: los dos botones muestran un contorno de 2 px `border-states-focus` separado 2 px.
- **1.4.11 Contraste no textual (AA)**: ese contorno es el azul del kit (`border-states-focus`, 5.35:1 claro /
  10.15:1 oscuro sobre la superficie).
- **2.5.8 Tamaño del objetivo (AA)**: flecha y X miden 32 × 32 px.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-collapsible-card
