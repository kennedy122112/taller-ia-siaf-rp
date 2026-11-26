# Progress circular

> `siaf-progress-circular` · Componente de Estado y feedback · Sin uso en la app

Avance circular: anillo que se llena en sentido horario desde arriba, con el porcentaje al centro y una
etiqueta opcional encima (Figma UI KIT, nodo 20157:95 «Progress/circular»).

Es para un avance determinado (0 a 100 %), como procedimientos completados o ítems conciliados. Para una
espera sin porcentaje va `siaf-loader` o el spinner de `siaf-loading-progress`. El anillo mide 150 px y
`size` lo escala junto con los textos; la etiqueta se muestra tal como se escribe y se corta en dos líneas.

## Importar

```ts
import { ProgressCircularComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-progress-circular />
```

### Cuándo usarlo

- Para un avance determinado de 0 a 100 %, como procedimientos completados o ítems conciliados, con un `label`
  que diga qué se mide.
- En un resumen o tablero de proceso donde el porcentaje es el dato principal. Aún no lo usa ninguna pantalla.

### Cuándo no

- Para esperas sin porcentaje: usar `siaf-loader`, o `siaf-loader-overlay` si hay que bloquear la pantalla.
- Para los pasos de un flujo: usar `siaf-steps` o `siaf-action-tracker`.
- Para ver cómo se reparte un total entre varias partes: usar `siaf-donut-chart`.
- Con `size` muy por debajo de 150 px: los textos escalan con el anillo (la etiqueta mide `size` × 0.08) y
  dejan de leerse.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `label` | `string` | `''` | Texto sobre el porcentaje (ej. «Completado»). |
| `size` | `number` | `150` | Lado del anillo en px; el grosor y los textos escalan con él. |
| `value` | `number` | `0` | Avance de 0 a 100; se recorta a ese rango. |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `role="progressbar"`, `aria-hidden`, `aria-label`, `aria-valuemax`, `aria-valuemin`, `aria-valuenow`.

### Teclado

- No recibe foco: no es interactivo.

### Notas

- **4.1.2 Nombre, función y valor (A)**: es `role="progressbar"` con `aria-valuemin` 0, `aria-valuemax` 100 y
  `aria-valuenow` redondeado; el nombre es `label`, o «Avance» si no hay.
- **1.1.1 Contenido no textual (A)**: el anillo SVG va con `aria-hidden` y el porcentaje también está en texto,
  así que el anillo no es la única pista del avance.
- **1.4.3 Contraste mínimo (AA)**: etiqueta y porcentaje en `text-neutral-medium`, 14.53:1 sobre la superficie
  (12.87:1 en oscuro).
- **4.1.3 Mensajes de estado (AA)**: una barra de progreso no es región viva: si `value` cambia en vivo, el
  lector no lo anuncia solo y el padre debe avisar los hitos.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-progress-circular
