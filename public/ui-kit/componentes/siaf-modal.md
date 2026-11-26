# Modal

> `siaf-modal` · Componente de Overlays

Modal de confirmación con presets por acción (grabar, verificar, aprobar, observar, rechazar…)
que resuelven título, descripción, ilustración y motivo obligatorio; `custom` deja todo abierto.

Es el diálogo canónico del kit: úsalo para cualquier confirmación en vez de maquetar un overlay.
Los mensajes de resultado tras la acción van por `siaf-request-approval-modals` (snackbar).

## Importar

```ts
import { ModalComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-modal>…</siaf-modal>
```

### Cuándo usarlo

- Para confirmar una acción sobre una solicitud con su preset (`save`, `verify`, `approve`, `delete-request`,
  `observe`, `reject`…); en las request-pages llegan ya armados por `siaf-request-approval-modals`.
- En las acciones masivas de la bandeja: «¿Deseas verificar / aprobar múltiples solicitudes?» de
  `siaf-documents-records-page` (`custom` con ilustración).
- Con `custom` y contenido proyectado para diálogos cortos con campos, como «Cambiar contraseña» del escritorio
  virtual.
- `observe` y `reject` para pedir el motivo (`reason` / `reasonChange`): Aceptar se habilita al escribirlo.

### Cuándo no

- Repetir a mano en una request-page los seis modales del flujo: usar `siaf-request-approval-modals`.
- Para avisar el resultado después de confirmar: usar `siaf-snackbar`; para bloquear mientras se procesa,
  `siaf-loader-overlay`.
- Para buscar y elegir registros o adjuntar archivos: usar `siaf-selection-side-nav` o `siaf-upload-side-nav`.
- Dentro de un bloque if sin enlazar `open`: sin ese input no se pinta; y si el bloque lo destruye al cerrar, no anima
  la salida (el foco sí vuelve al control que lo abrió).

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `cancelLabel` | `string` | `"Cancelar"` |  |
| `confirmDisabled` | `boolean \| null` | `null` |  |
| `confirmLabel` | `string` | `""` |  |
| `confirmVariant` | `'filled' \| 'outline' \| 'standard' \| 'text' \| 'primary' \| 'accent' \| 'secondary' \| 'ghost'` | `"primary"` | Variante del botón de confirmar (las de `siaf-button`). |
| `description` | `string` | `""` |  |
| `hasProjectedActions` | `boolean` | `false` |  |
| `icon` | `string` | `""` |  |
| `illustrationSrc` | `string` | `""` |  |
| `open` | `boolean` | `false` |  |
| `reason` | `string` | `''` |  |
| `reasonDisabled` | `boolean` | `false` |  |
| `reasonLabel` | `string` | `''` |  |
| `reasonMaxLength` | `number` | `500` |  |
| `reasonPlaceholder` | `string` | `"Motivo"` |  |
| `reasonType` | `string` | `''` |  |
| `reasonTypeLabel` | `string` | `'Motivo'` |  |
| `reasonTypeOptions` | `string[]` | `[]` | Opciones para el dropdown de tipo/motivo. Si está vacío, no se muestra el select. |
| `showClose` | `boolean` | `true` |  |
| `showFooter` | `boolean` | `true` |  |
| `showIllustration` | `boolean` | `false` |  |
| `title` | `string` | `""` |  |
| `variant` | `ModalVariant` | `"custom"` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(canceled)` | `void` |  |
| `(closed)` | `void` |  |
| `(confirmed)` | `void` |  |
| `(reasonChange)` | `string` |  |
| `(reasonTypeChange)` | `string` |  |

## Accesibilidad

Patrón WAI-ARIA: Diálogo modal (https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

Roles y atributos del código: `role="dialog"`, `role="presentation"`, `aria-describedby`, `aria-labelledby`, `aria-modal`.

### Teclado

- **Tab / Shift + Tab**: al abrir, el foco ya está en el primer control (la X si `showClose`, o el diálogo si no hay
  controles); recorren los controles y dan la vuelta del último al primero sin salir del diálogo.
- **Escape**: cierra como Cancelar (emite `canceled` y `closed`) y devuelve el foco al elemento que lo tenía antes
  de abrir.
- **Enter / Espacio**: activan la X, Cancelar y Aceptar (emite `confirmed`); el campo de motivo sigue
  `text-area-control`.

### Notas

- **4.1.2 Nombre, función y valor (A)**: `role="dialog"` con `aria-modal="true"`, `aria-labelledby` al título y
  `aria-describedby` a la descripción; la X se llama «Cerrar» (ícono con `label`).
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir mueve el foco al primer control y al cerrar (con `open` en
  false o al destruirse) lo devuelve a donde estaba.
- **2.1.2 Sin trampas de teclado (A)**: Tab queda dentro del diálogo mientras está abierto, pero Escape siempre lo
  cierra.
- **Pendiente · 3.3.2 Etiquetas o instrucciones (A)**: en `observe` y `reject` el motivo es obligatorio (Aceptar
  sigue deshabilitado sin texto) pero no se marca: no pasa `required` a `text-area-control`, que pondría el
  asterisco y `aria-required`.
- **2.4.7 Foco visible (AA)**: la X muestra un anillo `border-states-focus` de 2 px con `focus-visible`; los
  botones del pie siguen `siaf-button`.
- **1.4.11 Contraste no textual (AA)**: ese anillo es el azul del kit (`border-states-focus`, 5.35:1 claro / 10.15:1
  oscuro sobre la superficie).
- **1.1.1 Contenido no textual (A)**: la ilustración va con `alt=""` y el ícono de respaldo es decorativo.
- **1.4.3 Contraste mínimo (AA)**: título `text-neutral-high` y descripción `text-neutral-medium` sobre
  `surface-highest`, que en claro es el blanco de la superficie (16.29:1 y 14.53:1).

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siaf-button`](siaf-button.md), [`siaf-icon`](siaf-icon.md), [`siaf-input`](siaf-input.md), [`text-area-control`](text-area-control.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-modal
