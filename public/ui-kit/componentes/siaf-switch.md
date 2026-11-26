# Switch

> `siaf-switch` · Componente de Formularios

Interruptor on/off con etiqueta al costado. Al pulsarlo el círculo se desliza y el riel cambia de
color con una transición de 200 ms (sin animación si el sistema pide reducir movimiento).

Admite `[(checked)]` y formularios (`formControl`/`ngModel`). Se opera con el teclado como un
checkbox (Tab y Espacio) y se anuncia con `role="switch"`.

Sin consumidores: ninguna pantalla usa switch. Las preguntas Sí/No se resuelven con
`siaf-radio-group` y su `[inline]` para dejarlas en una sola línea.

## Importar

```ts
import { SwitchComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-switch />
```

### Cuándo usarlo

- Para activar o desactivar una opción con efecto inmediato, sin pasar por Grabar (por ejemplo, «Notificar por
  correo» en una configuración).
- Dentro de un ítem de `siaf-list`, al inicio o al final, que le pasa el título del ítem como `ariaLabel`.

### Cuándo no

- Para las preguntas Sí/No de una solicitud, que se graban con el documento: usar `siaf-radio-group` con `[inline]`.
- Para seleccionar filas o varias opciones de una lista: checkbox nativo, como en `siaf-table-controls`.
- Sin `label` visible ni `ariaLabel`: el interruptor queda sin nombre.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ariaLabel` | `string` | `''` | Nombre accesible cuando no hay `label` visible (ej. un switch dentro de un ítem de lista). |
| `checked` | `boolean` | `false` |  |
| `disabled` | `boolean` | `false` |  |
| `label` | `string` | `''` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(checkedChange)` | `boolean` |  |

## Accesibilidad

Patrón WAI-ARIA: Interruptor (https://www.w3.org/WAI/ARIA/apg/patterns/switch/).

Roles y atributos del código: `role="switch"`, `aria-checked`, `aria-hidden`, `aria-label`.

### Teclado

- **Tab**: enfoca el interruptor; el riel muestra un contorno de 2 px en `brand-primary`.
- **Espacio**: lo enciende o lo apaga (checkbox nativo con `role="switch"`; Enter no lo cambia).

### Notas

- **4.1.2 Nombre, función y valor (A)**: `<input type="checkbox" role="switch">` con `aria-checked` y `disabled`
  nativo; se nombra con el `label` que lo envuelve o con `ariaLabel` (el padre debe dar uno de los dos).
- **2.4.7 Foco visible (AA)**: el input está oculto con `sr-only` y el foco con teclado pinta en el riel un contorno
  de 2 px separado 2 px (`peer-focus-visible`).
- **Pendiente · 1.4.11 Contraste no textual (AA)**: apagado, el riel es `bg-border` (`border-states-enabled`, 2.44:1
  claro y 2.59:1 oscuro); en oscuro, el riel encendido y el contorno de foco (`brand-primary`) quedan en 2.66:1.
- **1.4.1 Uso del color (A)**: además del color, el círculo cambia de lado.
- **2.5.8 Tamaño del objetivo (AA)**: el riel mide 44 × 24 px y toda la `label` es clicable.
- **1.4.3 Contraste mínimo (AA)**: la etiqueta va en `text-neutral-high` 16.29:1; deshabilitado baja al 50 % de
  opacidad (exento).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-switch
