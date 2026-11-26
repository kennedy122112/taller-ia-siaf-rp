# Asiento history panel

> `siaf-asiento-history-panel` · Componente de Trazabilidad del documento

Historial del registro para asientos de ajuste (SRAA) — pestaña Registros.

Misma cáscara que `siaf-account-history-panel` (overlay + stepper +
documento + secciones + sustento + tracker) pero con la estructura del
asiento: ámbito, período, fecha de contabilización, clase/detalle, glosa
y la grilla de cuentas contables con totales Debe/Haber. Todo sale del
documento ya grabado y las fechas del período, que pide a `FuenteHistorialAsiento` (la provee el proyecto: el kit
no llama a ninguna API).

## Importar

```ts
import { AsientoHistoryPanelComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-asiento-history-panel />
```

### Cuándo usarlo

- Para ver desde la bandeja de asientos de ajuste (pestaña Registros, `recordHistoryKind: 'asiento'`) cómo quedó un
  asiento y quién elaboró, verificó y aprobó su solicitud.
- Para revisar en solo lectura ámbito, período, glosa y cuentas con sus totales Debe y Haber, buscando y paginando
  cuando el asiento tiene muchas cuentas.

### Cuándo no

- Para registros del plan de cuentas: usar `siaf-account-history-panel`; para el historial de estados de un
  documento, `siaf-document-history-panel`.
- Dentro de la solicitud abierta: usar la pantalla del asiento con `siaf-detail-history-tabs` y
  `siaf-action-tracker`.
- Para revertir o modificar el asiento: el panel es de solo lectura; el cambio va por una solicitud.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `open` | `boolean` | `false` |  |
| `record` | `DocumentsRecordsRow \| null` | `null` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(closed)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `role="dialog"`, `aria-hidden`, `aria-label`, `aria-labelledby`, `aria-modal`.

### Teclado

- **Tab**: al abrir, el foco entra en la X; recorre «Código de asiento», el buscador y la paginación, y da la vuelta
  sin salir del panel.
- **Enter / Espacio** en la X: cierran el panel (emite `closed`).
- **Escape**: cierra el panel (emite `closed`) y el foco vuelve al botón de historial.
- **Enter / Espacio** en «Código de asiento»: pliegan o despliegan las cuentas contables.
- **Enter** en el buscador: aplica el filtro. El buscador sigue `siaf-input` y la paginación `siaf-pagination`.

### Notas

- **Pendiente · 4.1.2 Nombre, función y valor (A)**: el panel es `role="dialog"` con `aria-modal` y nombre desde su
  título, y la X se llama «Cerrar historial del asiento de ajuste»; pero «Código de asiento» no publica
  `aria-expanded` ni `aria-controls`: su estado solo se ve en la flecha.
- **1.3.1 Información y relaciones (A)**: títulos `h2` y `h3` por sección y cuentas en una `table` con `thead` y
  `th`; los totales Debe y Haber van en filas con su rótulo.
- **1.4.1 Uso del color (A)**: el tipo de movimiento va en texto, el estado del registro en
  `siaf-record-status-tag` con ícono, y los obligatorios llevan asterisco.
- **1.4.3 Contraste mínimo (AA)**: valores `text-neutral-high` 16.29:1 (oscuro 16.53:1), etiquetas
  `text-neutral-low` 5.01:1 (8.86:1) y asterisco `text-feedback-danger` 9.84:1 (10.59:1) sobre la superficie.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir lleva el foco a la X y lo retiene en el panel; al cerrar (X,
  Escape o clic en el fondo) lo devuelve al botón de historial.
- **2.4.7 Foco visible (AA)**: la X y «Código de asiento» no definen estilo de foco: muestran el contorno por
  defecto del navegador.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: ni la carga del detalle ni el resultado del buscador se anuncian;
  mientras responde la API los campos muestran «--».
- **1.4.13 Contenido en hover o foco (AA)**: desde `sm` los valores truncados se completan con `siafTooltip`, que
  se cierra con Escape y se puede recorrer con el puntero.
- **Pendiente · 2.1.1 Teclado (A)**: esos valores no reciben foco, así que con teclado el globo no aparece (el lector
  de pantalla sí lee el valor entero).

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siafTooltip`](siafTooltip.md), [`siaf-action-tracker`](siaf-action-tracker.md), [`siaf-icon`](siaf-icon.md), [`siaf-input`](siaf-input.md), [`siaf-pagination`](siaf-pagination.md), [`siaf-record-status-tag`](siaf-record-status-tag.md), [`siaf-steps`](siaf-steps.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-asiento-history-panel
