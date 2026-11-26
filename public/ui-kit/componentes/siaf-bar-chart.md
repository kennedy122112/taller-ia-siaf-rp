# Bar chart

> `siaf-bar-chart` · Componente de Gráficos

Gráfico de barras del kit (Figma UI KIT, página «Graphics»: «Bar», «Bar grouped», «Comparative bars» y «Stacked
bar»), dibujado con Chart.js. Con una serie son barras simples; con dos o más, agrupadas por categoría; y con una sola
categoría (o ninguna), el comparativo: las series lado a lado, sin etiqueta de categoría y con un tooltip por barra.
`orientation="horizontal"`
pone las categorías a la izquierda. Con `stacked` las series se apilan en cada categoría, con 2 px de aire entre
tramos y el porcentaje de cada tramo adentro cuando entra; con una sola categoría es la barra 100 % del Figma: una
barra horizontal que llena el ancho, sin ejes, con el nombre de cada tramo debajo. Los colores salen de la paleta del
kit (`TOKENS_SERIES`) y se vuelven a leer al cambiar de tema; la leyenda y el tooltip son `siaf-chart-legend` y
`siaf-chart-tooltip`.

## Importar

```ts
import { BarChartComponent } from '@kennedy122112/siaf-rp-ui-angular/graficos';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular/graficos`), instalado desde `vendor/`.

## Uso

```html
<siaf-bar-chart />
```

### Cuándo usarlo

- Para comparar cantidades entre categorías o meses (recaudación, documentos por estado), con pocas series.
- Dentro de `siaf-chart-section`, que le pone título y descripción.
- `valueSuffix="%"` cuando los valores son porcentajes, y `ariaLabel` con lo que muestra el gráfico.
- `stacked` para las partes de un total en cada categoría y, con una sola categoría, para la composición de un total
  en una barra (activos y patrimonio).

### Cuándo no

- Para la evolución de un valor a lo largo del tiempo: usar `siaf-line-chart`.
- Para variaciones que suben y bajan respecto de cero: usar `siaf-diverging-chart`.
- Para las partes de un total en un anillo, con el porcentaje de cada parte al centro: usar `siaf-donut-chart`.
- Con más de cuatro series: la paleta da la vuelta y los colores se repiten.
- Para un solo número destacado: usar `siaf-kpi-card`.

### Limitaciones

Sin animación (`animation: false`): con animación, en una pestaña que no pinta cuadros las barras quedaban a medio camino. El canvas no entiende `var()`: los colores se leen de los tokens al pintar y se repintan al cambiar el tema. En tema oscuro, la paleta del Figma no llega a 3:1 de contraste entre series (pendiente con diseño).

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ariaLabel` | `string` | `'Gráfico de barras'` | Nombre accesible del gráfico y título de su tabla de datos. |
| `categories` | `readonly string[]` | `[]` | Etiquetas de las categorías (meses, estados). Con una sola, o ninguna, es el comparativo o la barra 100 %. |
| `categoryLabel` | `string` | `'Categoría'` | Encabezado de la columna de categorías en la tabla de datos. |
| `height` | `number` | `252` | Alto del área del gráfico en px (sin la leyenda). |
| `max` | `number \| null` | `null` | Máximo del eje de valores; sin él, Chart.js elige uno redondo por encima del mayor valor. |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` |  |
| `series` | `readonly ChartSeries[]` | `[]` |  |
| `stacked` | `boolean` | `false` | Apila las series de cada categoría. Con una sola categoría es la barra 100 % del Figma («Stacked bar»): horizontal, sin ejes, con el porcentaje de cada tramo adentro y su nombre debajo. |
| `valueSuffix` | `string` | `''` | Sufijo de los valores en el eje, el tooltip y la tabla (por ejemplo `%`). |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `role="img"`, `aria-label`, `aria-live`.

### Teclado

- **Tab**: enfoca el gráfico (una sola parada).
- **Flecha derecha / izquierda** (vertical) o **abajo / arriba** (horizontal): recorren las categorías y muestran el
  tooltip con el valor de cada serie; dan la vuelta.
- En el comparativo, las flechas pasan de una barra a la siguiente y el tooltip muestra solo su valor.
- **Inicio / Fin**: van a la primera o a la última categoría.
- **Escape**: oculta el tooltip; salir del gráfico también lo oculta.

### Notas

- **1.1.1 Contenido no textual (A)**: el lienzo es `role="img"` con `ariaLabel` y, además, hay una tabla de datos
  oculta (`sr-only`) con una fila por categoría y una columna por serie.
- **1.3.1 Información y relaciones (A)**: la tabla usa `caption`, `th scope="col"` para las series y
  `th scope="row"` para las categorías.
- **2.1.1 Teclado (A)**: los valores se recorren con las flechas; al moverse, una región `aria-live` anuncia la
  categoría y los valores.
- **2.4.7 Foco visible (AA)**: el lienzo enfocado muestra el contorno de 2 px `border-states-focus`.
- **1.4.1 Uso del color (A)**: las series se distinguen por color, pero sus nombres están en la leyenda, en el
  tooltip y en la tabla de datos.
- **1.4.3 Contraste mínimo (AA)**: el porcentaje dentro de un tramo apilado toma, entre blanco, `text-neutral-high` y la
  superficie, el de más contraste con su color (4.71:1 como mínimo, en claro y en oscuro); lo dibujado en el lienzo
  está también en la tabla de datos.
- **1.4.13 Contenido en hover o foco (AA)**: Escape oculta el tooltip sin mover el puntero ni el foco.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: en oscuro las barras de las series 1 y 2 (`bg-brand-primary`,
  2.66:1, y `bg-brand-secondary`, 2.99:1) no llegan a 3:1 sobre la superficie y la 2 y la 3 quedan del mismo tono;
  la paleta oscura de los gráficos está por definir con diseño.

## Composición

Pinta por dentro: [`siaf-chart-legend`](siaf-chart-legend.md), [`siaf-chart-tooltip`](siaf-chart-tooltip.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular-graficos.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-bar-chart
