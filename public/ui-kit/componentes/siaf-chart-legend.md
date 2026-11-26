# Chart legend

> `siaf-chart-legend` · Componente de Gráficos

Leyenda de los gráficos del kit (Figma UI KIT, página «Graphics», «Leyenda»): un punto de 15 px con el color de
cada serie y su nombre, alineados a la derecha sobre el gráfico.

## Importar

```ts
import { ChartLegendComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-chart-legend />
```

### Cuándo usarlo

- Dentro de los gráficos del kit: `siaf-bar-chart` y `siaf-line-chart` la arman solos con los nombres de sus
  series; `siaf-diverging-chart`, con los de sus dos lados, y `siaf-donut-chart`, con los de sus partes.
- En un gráfico propio que use la paleta del kit (`TOKENS_SERIES`), para que colores y nombres coincidan.

### Cuándo no

- Como única forma de leer los datos: el gráfico debe traer además su tooltip y su tabla de datos.
- Para filtros o selección de series: no es interactiva.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `items` | `readonly ChartLegendItem[]` | `[]` |  |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `aria-hidden`.

### Teclado

- No recibe foco: no es interactiva.

### Notas

- **1.3.1 Información y relaciones (A)**: es una lista (`ul` y `li`); el punto de color va con `aria-hidden` y el
  nombre de la serie queda en texto.
- **1.4.1 Uso del color (A)**: el color solo relaciona la leyenda con las barras; los valores de cada serie también
  están en el tooltip y en la tabla de datos del gráfico.
- **1.4.3 Contraste mínimo (AA)**: nombres en `text-neutral-medium` sobre la superficie (14.53:1 claro / 12.87:1
  oscuro).
- **Pendiente · 1.4.11 Contraste no textual (AA)**: en oscuro los puntos de las series 1 y 2 (`bg-brand-primary`,
  2.66:1, y `bg-brand-secondary`, 2.99:1) no llegan a 3:1 sobre la superficie y la 2 y la 3 quedan del mismo tono;
  la paleta oscura de los gráficos está por definir con diseño.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-chart-legend
