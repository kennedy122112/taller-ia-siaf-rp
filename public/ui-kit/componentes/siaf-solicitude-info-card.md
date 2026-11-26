# Solicitude info card

> `siaf-solicitude-info-card` · Componente de Superficies

Tarjeta de datos generales de una solicitud, de solo lectura: una fila por campo con la etiqueta en mayúsculas
(columna de 140 px desde `md`) y el valor en negrita.

Con `captureOpenDate`, un campo «Fecha» que llega vacío se completa una sola vez con la fecha y hora en que se
abrió la tarjeta y queda fijo.

## Importar

```ts
import { SolicitudeInfoCardComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-solicitude-info-card />
```

### Cuándo usarlo

- En la cabecera de las pantallas de solicitud con Fecha, Ente rector y Entidad, junto a
  `siaf-document-summary-card`: plan de cuentas, catálogo de ajustes, catálogo de eventos, eventos contables y
  asiento de ajuste.
- Con `[captureOpenDate]="true"` en una solicitud nueva, para que «Fecha» marque cuándo se inició y no cambie.
- En detalles de solo lectura que ya traen la fecha: apertura contable (solicitud y asiento anual) y
  Contabilización.

### Cuándo no

- Para el N° y el estado del documento: usar `siaf-document-summary-card`.
- Para el ítem elegido desde un panel lateral: usar `siaf-summary-card`.
- Para campos editables: usar `siaf-input` dentro de `siaf-solicitude-form-card`.
- Dos campos con la misma etiqueta: la etiqueta es la clave del `track` y no debe repetirse.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `captureOpenDate` | `boolean` | `false` | Cuando es true, un campo "Fecha" que llegue vacío se completa UNA sola vez con la fecha/hora en que se abrió el documento y queda CONGELADO: marca cuándo se inició la solicitud y no debe cambiar (antes usaba un reloj en vivo que se actualizaba cada segundo — incorrecto). Si el padre provee un valor explícito (p. ej. la fecha de creación persistida de un documento existente), se muestra ese valor. |
| `fields` | `SolicitudeInfoField[]` | `[]` |  |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No recibe foco: no es interactivo.

### Notas

- **1.3.1 Información y relaciones (A)**: cada etiqueta precede a su valor en el orden de lectura (`span` y
  `strong`).
- **1.4.3 Contraste mínimo (AA)**: etiquetas `text-neutral-low` 5.01:1 (oscuro 8.86:1) y valores
  `text-neutral-high` 16.29:1 (16.53:1) sobre la superficie.
- **1.4.13 Contenido en hover o foco (AA)**: desde `sm` una etiqueta larga se trunca y se completa con `siafTooltip`,
  que se cierra con Escape y se puede recorrer con el puntero.
- **Pendiente · 2.1.1 Teclado (A)**: la etiqueta no recibe foco, así que con teclado el globo no aparece (el lector
  de pantalla sí lee la etiqueta entera).

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-solicitude-info-card
