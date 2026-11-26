# Document summary card

> `siaf-document-summary-card` · Componente de Superficies

Card de cabecera de un documento: N° de documento, N° de documento contable (opcional)
y su estado de flujo, con layout distinto en móvil y escritorio.

Úsalo en las páginas de solicitud para resumir el documento abierto. Para la card de
"ítem seleccionado" desde un side panel el componente canónico es `siaf-summary-card`.

## Importar

```ts
import { DocumentSummaryCardComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-document-summary-card />
```

### Cuándo usarlo

- En la cabecera de las pantallas de solicitud, junto a `siaf-solicitude-info-card`, para el N° y el estado del
  documento abierto: plan de cuentas, catálogo de ajustes, catálogo de eventos, eventos contables y apertura contable.
- Con `contableNumber` cuando el documento ya tiene N° de documento contable: asiento de ajuste y asiento anual de
  apertura contable.
- En el detalle de los documentos y pedidos de Contabilización.

### Cuándo no

- Para el ítem elegido desde un panel lateral: usar `siaf-summary-card`.
- Para datos generales como fecha, ente rector o entidad: usar `siaf-solicitude-info-card`.
- Para el estado de un registro (Activo, Anulado): usar `siaf-record-status-tag`; esta card muestra el estado del
  flujo del documento.
- Etiquetas largas: en escritorio la columna mide 140 px y la etiqueta se trunca.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `contableNumber` | `string \| null` | `null` | Número de documento contable (ej: AA-1-2026-01) — opcional, se muestra como tercera fila |
| `contableNumberLabel` | `string` | `'N° Doc. Contable'` |  |
| `documentNumber` | `string` | `''` |  |
| `documentNumberLabel` | `string` | `'N° documento'` |  |
| `status` | `FlowStatus` | `'Elaborado'` |  |
| `statusLabel` | `string` | `'Estado'` |  |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No recibe foco: no es interactivo.

### Notas

- **1.3.1 Información y relaciones (A)**: cada etiqueta precede a su valor en el orden de lectura; las versiones
  móvil y escritorio se ocultan con `display: none`, así que el lector de pantalla lee una sola.
- **1.4.1 Uso del color (A)**: el estado va escrito en `siaf-flow-status-tag`, no solo en el color.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: etiquetas `text-neutral-low` 5.01:1 (oscuro 8.86:1) y N° de
  documento `text-neutral-high` 16.29:1 (16.53:1) cumplen, pero el N° contable usa la clase `text-brand-primary`
  (color de fondo de marca), 2.66:1 en oscuro, y el estado Observado / Pendiente / Fallido da 3.39:1 en claro.
- **1.4.13 Contenido en hover o foco (AA)**: en escritorio el N° truncado se completa con `siafTooltip`, que se
  cierra con Escape y se puede recorrer con el puntero.
- **Pendiente · 2.1.1 Teclado (A)**: ese texto no recibe foco, así que con teclado el globo no aparece (el lector de
  pantalla sí lee el valor entero).

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-flow-status-tag`](siaf-flow-status-tag.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-document-summary-card
