# Line chart

> `siaf-line-chart` · Componente de Gráficos

Gráfico de línea del kit (Figma UI KIT, página «Graphics»: «Line»), dibujado con Chart.js: por serie, una línea de
4 px con un punto de 12 px en cada categoría, para seguir cómo evoluciona un valor. El eje de valores no arranca en
cero, porque la línea compara la forma y no el largo: Chart.js elige un rango redondo alrededor de los datos, que se
fija con `min` y `max`. Comparte con `siaf-bar-chart` la paleta del kit, la leyenda, el tooltip, el teclado y la
tabla de datos.

## Importar

```ts
import { LineChartComponent } from '@kennedy122112/siaf-rp-ui-angular/graficos';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular/graficos`), instalado desde `vendor/`.

## Uso

```html
<siaf-line-chart />
```

### Cuándo usarlo

- Para la evolución de uno o más valores a lo largo de meses o periodos, como activos y existencias por mes.
- Dentro de `siaf-chart-section`, que le pone título y descripción.
- `min` y `max` para fijar el rango del eje (en el Figma, de 100 a 500), y `valueSuffix="%"` para porcentajes.

### Cuándo no

- Para comparar cantidades entre categorías sin un orden en el tiempo: usar `siaf-bar-chart`.
- Para variaciones que suben y bajan respecto de cero: usar `siaf-diverging-chart`.
- Con más de cuatro series: la paleta da la vuelta y los colores se repiten.

### Limitaciones

Sin animación (`animation: false`): con animación, en una pestaña que no pinta cuadros las barras quedaban a medio camino. El canvas no entiende `var()`: los colores se leen de los tokens al pintar y se repintan al cambiar el tema. En tema oscuro, la paleta del Figma no llega a 3:1 de contraste entre series (pendiente con diseño).

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ariaLabel` | `string` | `'Gráfico de línea'` | Nombre accesible del gráfico y título de su tabla de datos. |
| `categories` | `readonly string[]` | `[]` | Etiquetas de las categorías, en orden (meses, periodos). |
| `categoryLabel` | `string` | `'Categoría'` | Encabezado de la columna de categorías en la tabla de datos. |
| `height` | `number` | `252` | Alto del área del gráfico en px (sin la leyenda). |
| `max` | `number \| null` | `null` | Máximo del eje de valores; sin él, Chart.js elige uno redondo por encima del mayor valor. |
| `min` | `number \| null` | `null` | Mínimo del eje de valores; sin él, Chart.js elige uno redondo por debajo del menor valor. |
| `series` | `readonly ChartSeries[]` | `[]` |  |
| `valueSuffix` | `string` | `''` | Sufijo de los valores en el eje, el tooltip y la tabla (por ejemplo `%`). |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `role="img"`, `aria-label`, `aria-live`.

### Teclado

- **Tab**: enfoca el gráfico (una sola parada).
- **Flecha derecha / izquierda**: recorren las categorías y muestran el tooltip con el valor de cada serie; dan la
  vuelta.
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
- **1.4.1 Uso del color (A)**: las líneas se distinguen solo por color (el Figma no usa trazos distintos), pero sus
  nombres están en la leyenda, en el tooltip y en la tabla de datos.
- **1.4.13 Contenido en hover o foco (AA)**: Escape oculta el tooltip sin mover el puntero ni el foco.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: en oscuro las líneas de las series 1 y 2 (`bg-brand-primary`,
  2.66:1, y `bg-brand-secondary`, 2.99:1) no llegan a 3:1 sobre la superficie; la paleta oscura de los gráficos está
  por definir con diseño.

## Composición

Pinta por dentro: [`siaf-chart-legend`](siaf-chart-legend.md), [`siaf-chart-tooltip`](siaf-chart-tooltip.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular-graficos.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-line-chart
