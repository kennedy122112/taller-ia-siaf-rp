# Donut chart

> `siaf-donut-chart` · Componente de Gráficos

Gráfico de dona del kit (Figma UI KIT, página «Graphics»: «Progress» y su pieza «.a.progress»), dibujado con
Chart.js: un anillo de 150 px con las partes de un total, cada una con su color y su nombre en la leyenda. Al pasar el
puntero sobre un tramo, o al llegar a él con el teclado, el tramo se engrosa con las puntas redondeadas y el centro
muestra su nombre y su porcentaje del total. Los colores siguen el orden del Figma: primario, éxito y advertencia, y
el secundario al final (`TOKENS_DONA`).

## Importar

```ts
import { DonutChartComponent } from '@kennedy122112/siaf-rp-ui-angular/graficos';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular/graficos`), instalado desde `vendor/`.

## Uso

```html
<siaf-donut-chart />
```

### Cuándo usarlo

- Para ver cómo se reparte un total entre pocas partes: activos, patrimonio y pasivos de un balance.
- Dentro de `siaf-chart-section`, que le pone título y descripción.
- `valueSuffix` cuando los valores llevan unidad en la tabla de datos; el centro siempre muestra el porcentaje.

### Cuándo no

- Para un avance de 0 a 100 %: usar `siaf-progress-circular`.
- Para comparar cantidades entre categorías: usar `siaf-bar-chart`.
- Para la composición de un total en una barra, con el porcentaje de cada parte a la vista: usar `siaf-bar-chart` con
  `stacked` y una sola categoría.
- Con más de cuatro partes: la paleta da la vuelta y los colores se repiten.

### Limitaciones

Sin animación (`animation: false`): con animación, en una pestaña que no pinta cuadros las barras quedaban a medio camino. El canvas no entiende `var()`: los colores se leen de los tokens al pintar y se repintan al cambiar el tema. En tema oscuro, la paleta del Figma no llega a 3:1 de contraste entre series (pendiente con diseño).

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ariaLabel` | `string` | `'Gráfico de dona'` | Nombre accesible del gráfico y título de su tabla de datos. |
| `categories` | `readonly string[]` | `[]` | Nombres de las partes, en el orden de la leyenda y del anillo (sentido horario desde arriba). |
| `categoryLabel` | `string` | `'Categoría'` | Encabezado de la columna de las partes en la tabla de datos. |
| `height` | `number` | `252` | Alto del área del gráfico en px (sin la leyenda). |
| `valueLabel` | `string` | `'Valor'` | Encabezado de la columna de los valores en la tabla de datos. |
| `values` | `readonly number[]` | `[]` | Un valor por parte, en el mismo orden que `categories`; los negativos o vacíos no dibujan tramo. |
| `valueSuffix` | `string` | `''` | Sufijo de los valores en la tabla de datos y el anuncio (por ejemplo `%`). |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `role="img"`, `aria-hidden`, `aria-label`, `aria-live`.

### Teclado

- **Tab**: enfoca el gráfico (una sola parada).
- **Flecha derecha / izquierda**: recorren los tramos y muestran al centro el nombre y el porcentaje de cada uno; dan la
  vuelta.
- **Inicio / Fin**: van al primer o al último tramo.
- **Escape**: oculta el centro; salir del gráfico también lo oculta.

### Notas

- **1.1.1 Contenido no textual (A)**: el lienzo es `role="img"` con `ariaLabel` y, además, hay una tabla de datos
  oculta (`sr-only`) con el valor y el porcentaje de cada parte.
- **1.3.1 Información y relaciones (A)**: la tabla usa `caption`, `th scope="col"` y `th scope="row"` para cada parte.
- **2.1.1 Teclado (A)**: los tramos se recorren con las flechas; al moverse, una región `aria-live` anuncia la parte, su
  porcentaje y su valor.
- **2.4.7 Foco visible (AA)**: el lienzo enfocado muestra el contorno de 2 px `border-states-focus`.
- **1.4.1 Uso del color (A)**: las partes se distinguen por color, pero sus nombres están en la leyenda, en el centro y
  en la tabla de datos.
- **1.4.3 Contraste mínimo (AA)**: el centro va en `text-neutral-medium` sobre la superficie.
- **1.4.13 Contenido en hover o foco (AA)**: Escape oculta el centro sin mover el puntero ni el foco.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: en oscuro los tramos primario (`bg-brand-primary`, 2.66:1) y
  secundario (`bg-brand-secondary`, 2.99:1) no llegan a 3:1 sobre la superficie; la paleta oscura de los gráficos está
  por definir con diseño.

## Composición

Pinta por dentro: [`siaf-chart-legend`](siaf-chart-legend.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular-graficos.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-donut-chart
