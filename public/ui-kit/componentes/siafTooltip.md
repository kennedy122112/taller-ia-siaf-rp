# Tooltip

> `siafTooltip` · Directiva de Fundamentos

Tooltip para textos truncados y elementos con ayuda contextual.

Es el único tooltip del design system (el componente envoltorio `siaf-tooltip` se retiró en
2026-09: pintaba el globo con CSS dentro del elemento). Se monta en `document.body` con
`position: fixed`, así que **nunca lo recorta**
un contenedor con `overflow` — el caso de las tablas con scroll horizontal.
Además no agrega nodos al DOM hasta que el usuario lo pide.

En escritorio se muestra al pasar el mouse o al enfocar con el teclado el elemento o el control que lo contiene
(la opción de un menú, un botón); el puntero puede pasar al globo sin que desaparezca y Escape lo oculta. En
móvil no hay hover, así que se muestra manteniendo pulsado ~500 ms; el texto
que puede envolver en pantallas chicas debería usar `sm:truncate` en vez de
`truncate` y no depender de este gesto.

Dos modos según se le pase texto o no:

```html
<!-- Texto truncado: usa el propio contenido y SOLO aparece si está cortado -->
<td class="truncate" siafTooltip>{{ fila.nombre }}</td>

<!-- Ayuda contextual: texto explícito, siempre visible al hover -->
<siaf-icon name="info" siafTooltip="Explicación del campo" />
```

El globo sale arriba del elemento; `tooltipPosition` elige otro lado (`right`, `bottom` o `left`). Si no entra en
la pantalla de ese lado, pasa al opuesto. Al costado (`right`) va, por ejemplo, en los botones de solo ícono de un
menú lateral contraído, para no tapar el botón de arriba:

```html
<siaf-button variant="text" icon="group" [iconOnly]="true" ariaLabel="Usuarios" siafTooltip="Usuarios"
  tooltipMode="always" tooltipPosition="right" />
```

## Importar

```ts
import { TooltipDirective } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<span siafTooltip="…"></span>
```

### Cuándo usarlo

- Texto que se corta con `truncate` y cuyo valor completo importa: celdas de la grilla de la bandeja
  (`siaf-documents-records-table`), descripciones en la solicitud del catálogo de eventos, datos de
  `siaf-summary-card` y el usuario y la oficina de `siaf-navbar`. Solo aparece si el texto está cortado.
- Ayuda breve junto a un ícono `info`, como «Criterios de búsqueda ingresados» en las consultas de Plan de Cuentas,
  Asiento de ajuste, Catálogo de ajuste y Contabilización, con `tabindex="0"` y `aria-label` en el elemento.
- Para mostrar al pasar el mouse qué hace un botón de solo ícono, como «Carga masiva» en la carga masiva de cuentas
  contables, sin quitar su `ariaLabel`.
- Dentro de tablas o paneles con scroll: el globo se monta en el `body` y el contenedor no lo recorta.

### Cuándo no

- Para información imprescindible, instrucciones o errores: dejarla visible (`siaf-input` con su error, `message-box`
  o `siaf-alert`); el globo solo aparece con el puntero o el foco y en móvil exige una pulsación larga.
- Para contenido con título, enlaces o botones: usar `siaf-popover`; el globo solo muestra texto.
- Para texto que puede envolver en pantallas chicas: usar `sm:truncate` en vez de `truncate` y no depender del globo.
- Un globo hecho a mano con CSS o con el atributo `title`: esta directiva es el único tooltip del kit.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `siafTooltip` | `string \| null \| undefined` | — | Texto a mostrar. Vacío = usa el textContent del elemento (modo truncado). |
| `tooltipMode` | `'auto' \| 'always' \| 'truncated'` | `'auto'` | Fuerza el comportamiento respecto al truncado: - `auto` (default): si NO se pasó texto, solo aparece cuando está truncado. - `always`: aparece siempre. - `truncated`: aparece solo cuando el contenido está truncado. |
| `tooltipPosition` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Lado en que sale el globo (`top` por defecto); si no entra, pasa al opuesto. |

## Eventos

No emite eventos.

## Accesibilidad

Patrón WAI-ARIA: Tooltip (https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/).

Roles y atributos del código: `role="tooltip"`, `aria-hidden`, `aria-label`.

### Teclado

- **Tab**: al llegar el foco al elemento, o al control que contiene el texto (una opción de `siaf-menu`,
  `siaf-select-options` o `siaf-list`, un botón, un enlace), aparece el globo; al salir se oculta. Si el control
  tiene varios textos cortados, muestra el primero. En dispositivos sin hover no aparece con el foco.
- **Escape**: oculta el globo; el menú o el panel que lo contiene sigue recibiendo la tecla.

### Notas

- **4.1.2 Nombre, función y valor (A)**: con texto de ayuda, el control queda enlazado por `aria-describedby` a una
  descripción oculta que existe desde el inicio, así el lector la anuncia al enfocarlo aunque el globo no se haya
  pintado; si el nombre del control ya incluye ese texto, no lo repite. El globo es `role="tooltip"` con
  `aria-hidden` (solo visual). En modo truncado no se enlaza: el texto completo ya está en el DOM.
- **1.4.13 Contenido en hover o foco (AA)**: Escape lo oculta sin mover el puntero ni el foco; se puede llevar el
  puntero sobre el globo sin que desaparezca (espera 150 ms al salir del elemento) y sigue visible mientras el
  elemento tenga el puntero o el foco. Se oculta al desplazar la página.
- **1.4.3 Contraste mínimo (AA)**: `text-brand-white` sobre `bg-feedback-dark-default` 12.24:1 en claro; en oscuro,
  sobre `bg-snackbar` (el mismo fondo del snackbar), 15.71:1.
- **Pendiente · 2.1.1 Teclado (A)**: la directiva no agrega `tabindex`: un texto cortado que no está dentro de un
  control enfocable (un título, una celda, una etiqueta) solo se completa con el mouse o con la pulsación larga; el
  lector de pantalla sí lee el texto entero.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siafTooltip
