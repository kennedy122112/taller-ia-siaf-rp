# Landing cards carousel

> `siaf-landing-cards-carousel` · Componente de Landing público · Sin uso en la app

Carrusel horizontal de tarjetas con título y flechas: cada tarjeta lleva su etiqueta de familia,
su título, su bajada y un enlace.

Lo usan las secciones «Servicios», «Actividades relacionadas» y «Más noticias». Las flechas se
deshabilitan solas en los extremos y el desplazamiento se ajusta a la tarjeta (scroll snap).
«Saber más» lleva a `rutaBase` más el `slug` de la tarjeta.

## Importar

```ts
import { LandingCardsCarouselComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-landing-cards-carousel />
```

### Cuándo usarlo

- Para una lista de tarjetas del landing que no entra en el ancho de la página.

### Cuándo no

- Para datos de la aplicación: ahí van las grillas y `siaf-report-table`.
- Para una sola tarjeta: pintarla directamente, sin carrusel.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `cards` | `TarjetaLanding[]` | `[]` |  |
| `rutaBase` | `string` | `'/landing/servicios'` | Ruta del detalle de cada tarjeta, sin el slug. |
| `titulo` | `string` | `'Servicios'` |  |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- **Tab**: enfoca las dos flechas y luego el enlace de cada tarjeta.
- **Enter / Espacio**: en una flecha desplaza una página de tarjetas.

### Notas

- **4.1.2 Nombre, función y valor (A)**: las flechas se llaman «Anterior» y «Siguiente» y se
  deshabilitan al llegar al extremo.
- **2.1.1 Teclado (A)**: las tarjetas se alcanzan con Tab aunque no se usen las flechas; el
  desplazamiento no depende del mouse.
- **1.4.10 Reajuste del contenido (AA)**: la pista se desplaza en horizontal dentro de su zona.

## Composición

Pinta por dentro: [`siaf-button`](siaf-button.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-landing-cards-carousel
