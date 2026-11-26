# Diverging chart

> `siaf-diverging-chart` · Componente de Gráficos

Gráfico divergente del kit (Figma UI KIT, página «Graphics»: «Divergente»), dibujado con Chart.js: una barra
horizontal por categoría que sale de la línea del cero (`divider-strong`) hacia la izquierda si el valor es negativo
y hacia la derecha si es positivo. El eje es simétrico, con cinco marcas (−2p, −p, 0, p y 2p) y un paso redondo que
cubre al mayor valor, salvo que `max` fije el límite. Cada lado tiene su color y su nombre en la leyenda:
`negativeLabel` con el primario y `positiveLabel` con el secundario.

## Importar

```ts
import { DivergingChartComponent } from '@kennedy122112/siaf-rp-ui-angular/graficos';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular/graficos`), instalado desde `vendor/`.

## Uso

```html
<siaf-diverging-chart />
```

### Cuándo usarlo

- Para variaciones respecto de cero por mes o categoría: variación de existencias, superávit y déficit.
- `negativeLabel` y `positiveLabel` con lo que significa cada lado, como «Disminución» y «Aumento».
- Dentro de `siaf-chart-section`, que le pone título y descripción.

### Cuándo no

- Para valores que no cambian de signo: usar `siaf-bar-chart`, horizontal si las etiquetas son largas.
- Para varias series por categoría: usar `siaf-bar-chart` agrupado.
- Para la evolución de un valor en el tiempo: usar `siaf-line-chart`.

### Limitaciones

Sin animación (`animation: false`): con animación, en una pestaña que no pinta cuadros las barras quedaban a medio camino. El canvas no entiende `var()`: los colores se leen de los tokens al pintar y se repintan al cambiar el tema. En tema oscuro, la paleta del Figma no llega a 3:1 de contraste entre series (pendiente con diseño).

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ariaLabel` | `string` | `'Gráfico divergente'` | Nombre accesible del gráfico y título de su tabla de datos. |
| `categories` | `readonly string[]` | `[]` | Etiquetas de las categorías (meses, rubros), de arriba abajo. |
| `categoryLabel` | `string` | `'Categoría'` | Encabezado de la columna de categorías en la tabla de datos. |
| `height` | `number` | `252` | Alto del área del gráfico en px (sin la leyenda). |
| `max` | `number \| null` | `null` | Límite del eje a cada lado del cero; sin él, el doble de un paso redondo que cubre al mayor valor absoluto. |
| `negativeLabel` | `string` | `'Negativo'` | Qué significa el lado negativo, en color primario: nombre en la leyenda, el tooltip y la tabla. |
| `positiveLabel` | `string` | `'Positivo'` | Qué significa el lado positivo, en color secundario: nombre en la leyenda, el tooltip y la tabla. |
| `values` | `readonly number[]` | `[]` | Un valor con signo por categoría, en el mismo orden que `categories`. |
| `valueSuffix` | `string` | `''` | Sufijo de los valores en el eje, el tooltip y la tabla (por ejemplo `%`). |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `role="img"`, `aria-label`, `aria-live`.

### Teclado

- **Tab**: enfoca el gráfico (una sola parada).
- **Flecha abajo / arriba**: recorren las categorías y muestran el tooltip con su valor; dan la vuelta.
- **Inicio / Fin**: van a la primera o a la última categoría.
- **Escape**: oculta el tooltip; salir del gráfico también lo oculta.

### Notas

- **1.1.1 Contenido no textual (A)**: el lienzo es `role="img"` con `ariaLabel` y, además, hay una tabla de datos
  oculta (`sr-only`) con una fila por categoría y el valor en la columna de su lado.
- **1.3.1 Información y relaciones (A)**: la tabla usa `caption`, `th scope="col"` para los dos lados y
  `th scope="row"` para las categorías.
- **2.1.1 Teclado (A)**: los valores se recorren con las flechas; al moverse, una región `aria-live` anuncia la
  categoría, el lado y el valor.
- **2.4.7 Foco visible (AA)**: el lienzo enfocado muestra el contorno de 2 px `border-states-focus`.
- **1.4.1 Uso del color (A)**: el lado no depende solo del color: la barra queda a la izquierda o a la derecha del
  cero, el valor lleva su signo y el nombre del lado está en la leyenda, en el tooltip y en la tabla.
- **1.4.13 Contenido en hover o foco (AA)**: Escape oculta el tooltip sin mover el puntero ni el foco.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: en oscuro las barras de los dos lados (`bg-brand-primary`,
  2.66:1, y `bg-brand-secondary`, 2.99:1) no llegan a 3:1 sobre la superficie; la paleta oscura de los gráficos está
  por definir con diseño.

## Composición

Pinta por dentro: [`siaf-chart-legend`](siaf-chart-legend.md), [`siaf-chart-tooltip`](siaf-chart-tooltip.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular-graficos.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-diverging-chart
