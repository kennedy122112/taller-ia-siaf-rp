# Badge

> `siaf-badge` · Componente de Estado y feedback

Badge de notificación (Figma UI KIT, nodo 7262:6493 «Badges»): indica una notificación o el número de
elementos de un destino. Va en el borde final de un ícono o al final de un ítem de lista.

Sin `label` es un **punto** (12 px, o 8 px en `small`); con `label` es un **contador** en píldora
(20 px de alto, o 16 px en `small`) que crece con el texto. `color`: `accent` (rojo, por defecto) o
`primary` (azul). Con `max`, un número mayor se muestra como «99+». Un punto es decorativo salvo que
lleve `ariaLabel`; al contador conviene darle uno que diga qué cuenta («3 notificaciones sin leer»).

Para el estado de un documento o registro van `siaf-flow-status-tag` / `siaf-record-status-tag`; para otra
etiqueta con color, `siaf-status-tag`, y para valores que se eligen, filtran o quitan, `siaf-tag`.

## Importar

```ts
import { BadgeComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-badge />
```

### Cuándo usarlo

- Para el número de pendientes de un destino: cada opción de la Bandeja (`siaf-tray-menu`) y las pestañas con
  conteo de `siaf-tabs`.
- Sobre la campana del navbar, con `size="small"` y `max` 99, para las notificaciones sin leer.
- Al final de un ítem de `siaf-list`, con `minWidth` 32 como en el Figma.
- Como punto, sin `label`, para avisar que hay novedades cuando el número no importa.

### Cuándo no

- Para el estado de un documento o registro: usar `siaf-flow-status-tag` o `siaf-record-status-tag`; para otro estado,
  `siaf-status-tag`.
- Para etiquetas con texto o categorías con color: usar `siaf-status-tag`; para filtros aplicados u opciones que se
  eligen: `siaf-tag`.
- Para distinguir tipos de aviso solo por el color (`accent` rojo frente a `primary` azul).
- Suelto y sin `ariaLabel`: si el número ya está en el nombre del control, ocultarlo con `aria-hidden` (como
  en el navbar); si no, darle `ariaLabel`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ariaLabel` | `string` | `''` | Nombre accesible: qué indica el badge. |
| `color` | `'primary' \| 'accent'` | `'accent'` |  |
| `label` | `string \| number \| null \| undefined` | `''` | Texto o número del contador. Vacío o `null`: punto. |
| `max` | `number \| null \| undefined` | `null` | Tope para contadores numéricos: por encima se muestra `max+`. |
| `minWidth` | `number \| null` | `null` | Ancho mínimo del contador en px (ej. 32 al final de un ítem de lista, como en el Figma). |
| `size` | `'standard' \| 'small'` | `'standard'` |  |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `role="status"`, `aria-hidden`, `aria-label`.

### Teclado

- No recibe foco: no es interactivo.

### Notas

- **1.1.1 Contenido no textual (A)**: sin `ariaLabel`, el punto lleva `aria-hidden` y el contador se lee como un
  número suelto; con `ariaLabel`, recibe ese nombre. El padre debe darlo cuando el número no está ya en el
  control que lo contiene.
- **4.1.3 Mensajes de estado (AA)**: con `ariaLabel` es `role="status"`, así que los cambios del contador se
  anuncian de forma educada; sin él, no se anuncian.
- **1.4.1 Uso del color (A)**: `accent` y `primary` solo cambian el color; el punto informa por su presencia y
  el contador por su número.
- **1.4.3 Contraste mínimo (AA)**: texto blanco sobre `bg-brand-accent` 4.89:1 (5.65:1 en oscuro) y sobre
  `bg-brand-primary` 8.79:1 (6.67:1).
- **Pendiente · 1.4.11 Contraste no textual (AA)**: en oscuro el punto `primary` (`bg-brand-primary`) queda en
  2.66:1 sobre la superficie; el `accent` cumple (4.89:1 en claro, 3.14:1 en oscuro).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-badge
