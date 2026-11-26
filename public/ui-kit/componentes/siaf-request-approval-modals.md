# Request approval modals

> `siaf-request-approval-modals` · Componente de Overlays

Bloque de modales del flujo de aprobación de una solicitud/documento
(grabar, verificar, eliminar, aprobar, observar, rechazar) + loader
overlay + snackbar de confirmación. Reemplaza el bloque idéntico de
~90 líneas repetido al final de las 5 páginas de request.

El estado (qué modal está abierto, el comentario de aprobación, etc.)
lo sigue manejando el padre — este componente solo renderiza y
reenvía eventos:

  <siaf-request-approval-modals
    [saveOpen]="saveModalOpen" ...
    [saving]="saving()"
    [reason]="approvalComment()"
    (saveConfirmed)="onConfirmSave()"
    (saveClosed)="saveModalOpen = false"
    (approvalClosed)="closeApprovalModals()"
    ...
  />

## Importar

```ts
import { RequestApprovalModalsComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-request-approval-modals />
```

### Cuándo usarlo

- Al final de toda request-page con el ciclo grabar → verificar → aprobar, observar o rechazar: plan de cuentas
  (solicitud y carga masiva), asiento de ajuste, catálogo de ajuste (tipo y clase), catálogo de eventos (SCE y SCM),
  eventos contables y apertura contable.
- Para confirmar y avisar con un solo bloque: `saving` muestra el loader y el snackbar dice el tipo real de acción
  (`requestType`) y el número de la solicitud (`requestNumber`).
- Con `snackbarTone="error"` y `snackbarMessage` para mostrar el mensaje del backend cuando la acción falla.

### Cuándo no

- Para una confirmación fuera del flujo de aprobación (p. ej. cambiar contraseña): usar `siaf-modal` directo.
- En la bandeja: `siaf-documents-records-page` ya trae sus modales de verificar y aprobar múltiples.
- Para la carga inicial de la página: el loader es solo para acciones; la espera inicial va con `loading` del layout
  o `siaf-table-skeleton`.
- Volver a pintar a mano `siaf-modal`, `siaf-loader-overlay` o `siaf-snackbar` junto a él: el padre solo maneja
  `saveOpen`, `approveOpen`… y los eventos.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `approveOpen` | `boolean` | `false` |  |
| `deleteOpen` | `boolean` | `false` |  |
| `loaderLabel` | `string` | `'Grabando'` |  |
| `loaderMessage` | `string` | `'Grabando solicitud...'` |  |
| `observeOpen` | `boolean` | `false` |  |
| `reason` | `string` | `''` | Comentario de la observación / motivo del rechazo. |
| `rejectOpen` | `boolean` | `false` |  |
| `rejectReasonType` | `string` | `''` |  |
| `rejectReasonTypeOptions` | `string[]` | `[]` |  |
| `requestNumber` | `string` | `''` |  |
| `requestType` | `string` | `''` | Tipo de acción real ('modificación', 'reversión', …) — pisa la palabra del preset para que el snackbar no diga siempre "creación". |
| `saveOpen` | `boolean` | `false` |  |
| `saving` | `boolean` | `false` | Acción en curso — deshabilita confirmar y muestra el loader. |
| `snackbarMessage` | `string` | `''` |  |
| `snackbarOpen` | `boolean` | `false` |  |
| `snackbarTone` | `'success' \| 'error'` | `'success'` | Tono del snackbar (success/error) y mensaje libre (pisa a variant). |
| `snackbarVariant` | `SnackbarVariant` | `'custom'` |  |
| `verifyOpen` | `boolean` | `false` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(approvalClosed)` | `void` | Cierre de cualquiera de los modales de aprobación (approve/observe/reject). |
| `(approveConfirmed)` | `void` |  |
| `(deleteClosed)` | `void` |  |
| `(deleteConfirmed)` | `void` |  |
| `(observeConfirmed)` | `void` |  |
| `(reasonChange)` | `string` |  |
| `(rejectConfirmed)` | `void` |  |
| `(rejectReasonTypeChange)` | `string` |  |
| `(saveClosed)` | `void` |  |
| `(saveConfirmed)` | `void` |  |
| `(snackbarClosed)` | `void` |  |
| `(verifyClosed)` | `void` |  |
| `(verifyConfirmed)` | `void` |  |

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No agrega teclado propio: cada confirmación sigue `siaf-modal` (el foco entra al abrir, Tab da la vuelta dentro,
  Escape cancela y Enter o Espacio activan Cancelar y Aceptar).
- El aviso sigue `siaf-snackbar`: no toma el foco al aparecer y su X se alcanza con Tab.

### Notas

- **4.1.2 Nombre, función y valor (A)**: cada confirmación es un `siaf-modal` (`role="dialog"`, `aria-modal`) cuyo
  nombre es el título del preset: «¿Grabar solicitud?», «¿Aprobar solicitud?», «¿Rechazar solicitud?»…
- **2.4.3 Orden del foco (A)**: hereda de `siaf-modal` el foco al abrir y la vuelta al disparador al cerrar; el padre
  debe bajar `saveOpen`, `approveOpen`… a false en vez de destruir el componente.
- **2.1.2 Sin trampas de teclado (A)**: Escape cierra cada modal como Cancelar y emite `saveClosed`, `verifyClosed`,
  `deleteClosed` o `approvalClosed`.
- **4.1.3 Mensajes de estado (AA)**: el resultado se anuncia con `siaf-snackbar` (`role="status"`; `role="alert"` con
  `snackbarTone="error"`) y la espera con `siaf-loader-overlay` (`role="status"`, `aria-live="polite"` y
  `loaderLabel` como nombre).
- **Pendiente · 3.3.2 Etiquetas o instrucciones (A)**: observar y rechazar exigen el motivo sin marcarlo como
  obligatorio (hereda de `siaf-modal`).
- **Pendiente · 1.4.11 Contraste no textual (AA)**: en oscuro el anillo de foco de la X de cada modal queda bajo 3:1
  (hereda de `siaf-modal`).

## Composición

Pinta por dentro: [`siaf-loader-overlay`](siaf-loader-overlay.md), [`siaf-modal`](siaf-modal.md), [`siaf-snackbar`](siaf-snackbar.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-request-approval-modals
