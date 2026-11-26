# Document history panel

> `siaf-document-history-panel` · Componente de Trazabilidad del documento

Panel lateral a pantalla completa «Historial del documento», que abre la bandeja `siaf-documents-records-page`
desde la pestaña Documentos.

Muestra el documento, su N° y el tipo de acción, una sección plegable opcional de atributos y la tabla «Historial
de estados» (usuario, unidad organizacional, fecha y estado con `siaf-flow-status-tag`), que pide a
`FuenteHistorialDocumento` con `solicitudId` (la provee el proyecto: el kit no llama a ninguna API) o toma de
`staticRows` sin consultar. Se cierra con la X o pulsando el fondo, que emiten `closed`.

## Importar

```ts
import { DocumentHistoryPanelComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-document-history-panel />
```

### Cuándo usarlo

- Para ver desde la pestaña Documentos de cualquier bandeja quién movió el documento y cuándo pasó por Elaborado,
  Verificado, Observado o Aprobado, sin abrir la solicitud.
- Con `attributes` y `staticRows` para documentos que no son solicitudes del flujo, como los asientos de apertura
  anual (Registrado, Procesado, Anulado).

### Cuándo no

- Para registros (pestaña Registros): usar `siaf-account-history-panel` o `siaf-asiento-history-panel`.
- Dentro de la solicitud abierta: usar `siaf-detail-history-tabs` y `siaf-action-tracker` en la página.
- Para mostrar comentarios u observaciones: la tabla no pinta el `comentario` aunque viaje en cada fila; usar
  `siaf-detail-history-tabs`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `open` | `boolean` | `false` |  |
| `summary` | `DocumentHistorySummary` | `{ solicitudId: '', document: '', number: '', actionType: ''…` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(closed)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `role="dialog"`, `aria-label`, `aria-labelledby`, `aria-modal`.

### Teclado

- **Tab**: al abrir, el foco entra en la X; recorre el botón de atributos y da la vuelta sin salir del panel.
- **Enter / Espacio** en la X: cierran el panel (emite `closed`).
- **Escape**: cierra el panel (emite `closed`) y el foco vuelve al botón de historial.
- **Enter / Espacio** en el botón de atributos: pliegan o despliegan la sección.

### Notas

- **Pendiente · 4.1.2 Nombre, función y valor (A)**: es `role="dialog"` con `aria-modal`, nombre desde su título y
  la X «Cerrar historial»; pero el botón de atributos no publica `aria-expanded` ni `aria-controls`: su estado solo
  se ve en la flecha.
- **1.3.1 Información y relaciones (A)**: título `h2`, subtítulo `h3` y estados en una `table` con `thead` y `th`.
- **1.4.1 Uso del color (A)**: cada estado va escrito en `siaf-flow-status-tag`.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: etiquetas `text-neutral-low` 5.01:1 (oscuro 8.86:1), valores
  `text-neutral-high` 16.29:1 (16.53:1) y celdas `text-neutral-medium` 14.53:1 (12.87:1) cumplen, pero el estado
  Observado da 3.39:1 en claro.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir lleva el foco a la X y lo retiene en el panel; al cerrar (X,
  Escape o clic en el fondo) lo devuelve al botón de historial.
- **2.4.7 Foco visible (AA)**: la X y el botón de atributos no definen estilo de foco: muestran el contorno por
  defecto del navegador.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: la carga pinta filas grises animadas sin texto ni `aria-busy`, así
  que no se anuncia.

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siaf-flow-status-tag`](siaf-flow-status-tag.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-document-history-panel
