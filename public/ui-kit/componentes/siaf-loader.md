# Loader

> `siaf-loader` · Componente de Estado y feedback

Indicador de carga en línea: ocho puntos en círculo que se atenúan por turnos.

Úsalo dentro de un botón, celda o bloque que está esperando datos. Si necesitas tapar toda la
pantalla mientras se procesa una acción, usa `siaf-loader-overlay`, que ya envuelve a este.

## Importar

```ts
import { LoaderComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-loader />
```

### Cuándo usarlo

- Mientras se valida o procesa un archivo dentro de la misma tarjeta, con un texto visible al lado: carga
  masiva del catálogo de eventos («Validando el archivo de eventos...») y carga masiva del Plan de Cuentas.
- Dentro de una celda o un bloque que espera datos, sin bloquear el resto de la pantalla.
- Con `tone="light"` sobre fondos oscuros y `decorative` cuando otro elemento ya anuncia la espera, como hace
  `siaf-loader-overlay`.

### Cuándo no

- Para bloquear la pantalla mientras se graba, verifica o aprueba: usar `siaf-loader-overlay`.
- Para la carga inicial de una grilla: usar `siaf-table-skeleton`.
- Dentro de `siaf-button`: usar su `loading`, que ya pinta el giro y publica `aria-busy`.
- Para un avance con porcentaje conocido: usar `siaf-progress-circular`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `decorative` | `boolean` | `false` |  |
| `dotSize` | `number` | `6` |  |
| `label` | `string` | `'Cargando'` |  |
| `size` | `number` | `32` |  |
| `tone` | `'current' \| 'light' \| 'brand'` | `'current'` |  |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `role="status"`, `aria-hidden`, `aria-label`.

### Teclado

- No recibe foco: no es interactivo.

### Notas

- **4.1.3 Mensajes de estado (AA)**: sin `decorative` es `role="status"` con `aria-label` («Cargando» por
  defecto), pero no tiene texto dentro y no todos los lectores anuncian una región que solo tiene nombre; el
  texto visible de al lado tampoco forma parte de la región.
- **1.1.1 Contenido no textual (A)**: los puntos son decorativos; el nombre sale de `label`, que conviene que
  diga qué se espera. Con `decorative` queda con `aria-hidden` y el padre debe anunciar la espera.
- **1.4.11 Contraste no textual (AA)**: `current` toma el color de texto del padre, `brand` usa
  `bg-brand-accent` (4.89:1 en claro, 3.14:1 en oscuro sobre la superficie) y `light` es solo para fondos
  oscuros.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-loader
