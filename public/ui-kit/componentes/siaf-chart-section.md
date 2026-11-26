# Chart section

> `siaf-chart-section` · Componente de Gráficos

Sección de gráfico (Figma UI KIT, nodo 22743:668 «Section-graph»): tarjeta con título, descripción opcional y el
gráfico proyectado debajo. Es la pieza que se usa en pantalla; los gráficos del kit (`siaf-bar-chart`,
`siaf-line-chart`, `siaf-diverging-chart` y `siaf-donut-chart`) van adentro.

## Importar

```ts
import { ChartSectionComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-chart-section>…</siaf-chart-section>
```

### Cuándo usarlo

- Para presentar un gráfico con su título y una línea que explique qué mide, por ejemplo «Evolución comparada» y
  «Crecimiento acumulado de recaudación».
- Con un gráfico del kit proyectado: `<siaf-chart-section title="…"><siaf-bar-chart … /></siaf-chart-section>`.

### Cuándo no

- Para un número destacado sin gráfico: usar `siaf-kpi-card`.
- Para tarjetas de datos o formularios: usar `siaf-card` o `siaf-solicitude-form-card`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `description` | `string` | `''` | Línea bajo el título que explica qué mide el gráfico; vacía, no se muestra. |
| `title` | `string` | `''` |  |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `aria-labelledby`.

### Teclado

- No recibe foco: el gráfico proyectado sigue su propio teclado.

### Notas

- **1.3.1 Información y relaciones (A)**: es un `section` con el título como `h3` y `aria-labelledby`, así la
  sección y su gráfico quedan nombrados.
- **1.4.3 Contraste mínimo (AA)**: título `text-neutral-medium` (14.53:1 claro / 12.87:1 oscuro) y descripción
  `text-neutral-low` (5.01:1 / 8.86:1) sobre la superficie.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-chart-section
