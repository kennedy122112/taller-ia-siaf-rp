# Chart tooltip

> `siaf-chart-tooltip` · Componente de Gráficos

Tooltip de los gráficos (Figma UI KIT, nodo 22758:6756 «Tooltip-graph»): caja oscura con un título (la categoría)
y una fila por serie con su cuadrado de color y el valor. Solo dibuja la caja: la muestra y la posiciona el
gráfico que la usa al pasar el puntero o recorrer los datos con el teclado.

## Importar

```ts
import { ChartTooltipComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-chart-tooltip />
```

### Cuándo usarlo

- Dentro de los gráficos del kit: `siaf-bar-chart`, `siaf-line-chart` y `siaf-diverging-chart` la pintan sobre la
  categoría activa.
- En un gráfico propio del kit, para mostrar los valores de un punto con el mismo diseño.

### Cuándo no

- Como tooltip de texto de un botón o de algo truncado: usar `siafTooltip`.
- Con contenido interactivo: el tooltip no recibe el puntero ni el foco.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `items` | `readonly ChartTooltipItem[]` | `[]` |  |
| `title` | `string` | `''` | Título: la categoría del punto (por ejemplo «Mar»). |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `aria-hidden`.

### Teclado

- No recibe foco: la abre y la cierra el gráfico (flechas para recorrer, Escape para cerrarla).

### Notas

- **1.3.1 Información y relaciones (A)**: cada serie es un párrafo con su nombre y su valor en texto; el cuadrado de
  color va con `aria-hidden`.
- **1.4.3 Contraste mínimo (AA)**: texto `text-brand-white` sobre `bg-on-surfaces-high` (12.85:1) en claro; en
  oscuro, sobre `bg-snackbar` (15.71:1), porque el fondo del Figma se funde con la superficie oscura.
- **4.1.3 Mensajes de estado (AA)**: la caja no es región viva: el gráfico anuncia los valores en su propia región
  `aria-live` cuando se recorren con el teclado.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-chart-tooltip
