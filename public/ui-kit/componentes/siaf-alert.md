# Alert

> `siaf-alert` · Componente de Estado y feedback

Mensaje de feedback en línea, con tono (neutral/info/éxito/advertencia/error), ícono y cierre opcional.
El título, el ícono y la × se apagan por separado (`title` vacío, `leadingIcon`, `showClose`); con varias líneas
de texto, el ícono y la × quedan arriba, a la altura del título.

Usarlo para avisos fijos dentro de una pantalla o formulario. Para confirmaciones de acciones de
solicitud (aprobar, observar, rechazar) el canónico es `siaf-request-approval-modals` con su snackbar.

## Importar

```ts
import { AlertComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-alert>…</siaf-alert>
```

### Cuándo usarlo

- Para validar un dato en línea mientras se llena el formulario: el código de la cuenta en la solicitud del
  Plan de Cuentas (formato inválido, código ya registrado, validación exitosa).
- Para explicar por qué algo no se puede editar: «No se puede modificar la vigencia» de una cuenta en uso.
- Para errores de carga o de una acción que el usuario cierra con `showClose`: «No se pudo cargar el
  documento» en Apertura contable, o «Sin conexión con el servidor» cuando se muestran datos de demostración.
- Para un estado que exige atención en un detalle: «Solicitud fallida en el procesado automático» en
  Contabilización.

### Cuándo no

- Para confirmar que una acción terminó (grabar, verificar, aprobar): usar `siaf-snackbar`, que en las
  solicitudes ya emite `siaf-request-approval-modals`.
- Para notas grises sin tono: usar `message-box`.
- Para pedir una decisión antes de seguir: usar `siaf-modal`.
- Para el estado de un documento o registro: usar `siaf-flow-status-tag` o `siaf-record-status-tag`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `description` | `string` | `''` |  |
| `leadingIcon` | `boolean` | `true` |  |
| `showClose` | `boolean` | `false` |  |
| `title` | `string` | `''` |  |
| `tone` | `'info' \| 'success' \| 'warning' \| 'neutral' \| 'error'` | `'neutral'` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(closed)` | `void` |  |

## Accesibilidad

Patrón WAI-ARIA: Alerta (https://www.w3.org/WAI/ARIA/apg/patterns/alert/).

Roles y atributos del código: `role="alert"`, `aria-hidden`, `aria-label`.

### Teclado

- **Tab**: con `showClose`, enfoca la × del aviso; sin ella, el aviso no recibe foco.
- **Enter / Espacio**: la × emite `closed` (botón nativo); quien retira el aviso es el padre.

### Notas

- **4.1.3 Mensajes de estado (AA)**: el contenedor es `role="alert"` en todos los tonos: al insertarse se
  anuncia de inmediato, también los neutrales, informativos y de éxito.
- **1.1.1 Contenido no textual (A)**: el ícono del tono va con `aria-hidden`; el tipo de aviso tiene que quedar
  dicho en `title` o `description`.
- **1.4.1 Uso del color (A)**: cada tono cambia de color y de ícono, salvo neutral y éxito, que comparten
  `check_circle`: entre esos dos solo el texto los distingue.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: `warning` en claro pone `text-feedback-warning` sobre
  `bg-feedback-light-warning` con 4.43:1. Los demás cumplen (info 5.81:1, éxito 5.31:1, error 6.21:1,
  neutral 11.46:1) y en oscuro todos superan 8:1.
- **4.1.2 Nombre, función y valor (A)**: la × es un `<button>` con `aria-label="Cerrar alerta"`.
- **2.4.7 Foco visible (AA)**: la × muestra un contorno de 2 px del color del texto del tono (4.43:1 o más
  sobre el fondo del aviso).
- **2.5.8 Tamaño del objetivo (AA)**: la × mide 40 × 40 px.
- **2.4.3 Orden del foco (A)**: al cerrar, el padre retira el aviso y el foco queda en el documento; conviene
  llevarlo a un control cercano.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-alert
