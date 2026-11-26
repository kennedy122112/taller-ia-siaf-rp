# Loading progress

> `siaf-loading-progress` · Componente de Estado y feedback

Indicador de progreso en dos variantes: spinner circular o barra horizontal con porcentaje.

Las esperas reales de las pantallas se resuelven con textos "Cargando…" y `animate-pulse`, o con `siaf-loader` /
`siaf-loader-overlay`. La barra es la de `siaf-kpi-card` (Figma «Progress/lineal»); fuera de ella, no la
introduzcas sin acordarlo antes.

## Importar

```ts
import { LoadingProgressComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-loading-progress />
```

### Cuándo usarlo

- La barra (`variant="bar"` con `value` y `label`) para un avance real y medible, como la meta de una
  `siaf-kpi-card`.
- El spinner solo si se acuerda: las pantallas esperan con `siaf-loader`.

### Cuándo no

- Para esperas sin porcentaje: usar `siaf-loader`, o `siaf-loader-overlay` si hay que bloquear la pantalla.
- Para un avance de 0 a 100 %: usar `siaf-progress-circular`, que ya publica `role="progressbar"`.
- Dentro de `siaf-button`: usar su `loading`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `label` | `string` | `''` | Nombre de la barra para el lector de pantalla («Avance» si no hay). |
| `size` | `number` | `24` |  |
| `value` | `number` | `50` | Avance de 0 a 100 de la barra; se recorta a ese rango. |
| `variant` | `'spinner' \| 'bar'` | `'spinner'` |  |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `role="progressbar"`, `aria-label`, `aria-valuemax`, `aria-valuemin`, `aria-valuenow`.

### Teclado

- No recibe foco: no es interactivo.

### Notas

- **Pendiente · 4.1.3 Mensajes de estado (AA)**: el spinner no tiene `role`, nombre ni `aria-live`: para un
  lector de pantalla la espera no existe.
- **4.1.2 Nombre, función y valor (A)**: la barra es `role="progressbar"` con `aria-valuemin` 0, `aria-valuemax`
  100, `aria-valuenow` redondeado y `label` como nombre («Avance» si no hay). El porcentaje en texto lo pone quien
  la usa, como `siaf-kpi-card`.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: en oscuro el azul `bg-brand-primary` del spinner queda en
  2.66:1 sobre la superficie.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-loading-progress
