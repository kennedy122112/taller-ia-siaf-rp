# Account history panel

> `siaf-account-history-panel` · Componente de Trazabilidad del documento

Panel lateral a pantalla completa «Historial del registro» de una cuenta contable, que abre la bandeja
`siaf-documents-records-page` desde la pestaña Registros.

Al abrirse con un `record` pide a `FuenteHistorialCuenta` (la provee el proyecto: el kit no llama a ninguna API) la
cuenta y sus solicitudes, y muestra la cuenta
(datos, atributos, dinámica contable y entidades del estado) junto con la solicitud que la creó (documento,
sustento y `siaf-action-tracker`). Se cierra con la X o pulsando el fondo, que emiten `closed`.

## Importar

```ts
import { AccountHistoryPanelComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-account-history-panel />
```

### Cuándo usarlo

- Para ver desde la bandeja del plan de cuentas cómo quedó una cuenta contable y quién elaboró, verificó y aprobó
  la solicitud que la creó, sin abrir esa solicitud.
- Para consultar en solo lectura atributos, dinámica contable, cuentas anteriores, entidades del estado y sustento
  de un registro.

### Cuándo no

- Para registros que no son cuentas contables: sus secciones son las del plan de cuentas; los asientos de ajuste
  usan `siaf-asiento-history-panel` (`recordHistoryKind: 'asiento'`).
- Para el historial de estados de un documento (pestaña Documentos): usar `siaf-document-history-panel`.
- Dentro de la solicitud abierta: usar `siaf-detail-history-tabs` y `siaf-action-tracker` en la página.
- Para modificar la cuenta: el panel es de solo lectura; el cambio va por una solicitud de modificación.

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

- **Tab**: al abrir, el foco entra en la X; recorre los controles de la tabla de entidades y da la vuelta sin salir
  del panel (`siaf-table-controls` y `siaf-pagination` siguen su propio teclado).
- **Enter / Espacio** en la X: cierran el panel (emite `closed`).
- **Escape**: cierra el panel (emite `closed`) y el foco vuelve al botón de historial.

### Notas

- **4.1.2 Nombre, función y valor (A)**: es `role="dialog"` con `aria-modal="true"` y nombre desde su título
  (`aria-labelledby`); la X se llama «Cerrar historial de cuenta contable».
- **1.3.1 Información y relaciones (A)**: títulos `h2` y `h3` por sección, cuentas anteriores y entidades en una
  `table` con `thead` y `th`, y «¿Está visible?» como checkbox nativo deshabilitado dentro de su `label`.
- **1.4.1 Uso del color (A)**: el estado del registro va en `siaf-record-status-tag`, con ícono y texto.
- **1.4.3 Contraste mínimo (AA)**: títulos y valores `text-neutral-high` 16.29:1 (oscuro 16.53:1), etiquetas
  `text-neutral-low` 5.01:1 (8.86:1) y textos `text-neutral-medium` 14.53:1 (12.87:1) sobre la superficie.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir lleva el foco a la X y lo retiene en el panel; al cerrar (X,
  Escape o clic en el fondo) lo devuelve al botón de historial.
- **2.4.7 Foco visible (AA)**: la X no define estilo de foco: muestra el contorno por defecto del navegador.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: la señal `loading` no se pinta: mientras responde la API los
  campos muestran «--» sin aviso visual ni `aria-live`.
- **1.4.13 Contenido en hover o foco (AA)**: desde `sm` los valores truncados se completan con `siafTooltip`, que
  se cierra con Escape y se puede recorrer con el puntero.
- **Pendiente · 2.1.1 Teclado (A)**: esos valores no reciben foco, así que con teclado el globo no aparece (el lector
  de pantalla sí lee el valor entero).

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siafTooltip`](siafTooltip.md), [`siaf-action-tracker`](siaf-action-tracker.md), [`siaf-icon`](siaf-icon.md), [`siaf-pagination`](siaf-pagination.md), [`siaf-record-status-tag`](siaf-record-status-tag.md), [`siaf-steps`](siaf-steps.md), [`siaf-summary-card`](siaf-summary-card.md), [`siaf-table-controls`](siaf-table-controls.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-account-history-panel
