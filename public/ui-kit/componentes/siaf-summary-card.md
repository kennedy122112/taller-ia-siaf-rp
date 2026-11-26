# Summary card

> `siaf-summary-card` · Componente de Superficies

Card resumen de campos etiqueta/valor, con indicador lateral, borde opcional y ✕ para limpiar.

Es LA card canónica del "ítem seleccionado" que llega desde un side panel: usarla `bordered` con
indicador, y la ✕ solo en edición. Regla del proyecto: 0 ítems → placeholder gris, 1 → esta card,
2 o más → grilla estándar (`siaf-table-controls` + `siaf-pagination Bottom`).

## Importar

```ts
import { SummaryCardComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-summary-card />
```

### Cuándo usarlo

- Para el único ítem elegido desde un panel lateral en una solicitud: plan de cuentas, cuenta contable anterior o
  entidad del estado (plan de cuentas); ámbito, período, clase y detalle (catálogo de ajustes y asiento de ajuste);
  evento (eventos contables).
- `bordered` con indicador y la ✕ solo en edición (`[showClose]="!isReadOnly"`), con un `closeLabel` que nombre el
  ítem («Quitar plan contable»).
- Para datos precargados de solo lectura con la misma forma, sin ✕: pliego, unidad ejecutora y período mensual en
  apertura contable, o la cuenta en uso de una modificación.
- Con muchos campos, `columns` (2, 3 o 4) los ordena en una grilla de esas columnas desde `lg` y de dos desde `sm`,
  como los «Datos generales del documento de pedidos de contabilización» de la SPC (cuatro columnas).

### Cuándo no

- Para 2 o más ítems: usar la grilla estándar (`siaf-table-controls` + tabla + `siaf-pagination` Bottom); sin
  ítems, el placeholder gris o `empty-section`.
- Para el N° y el estado del documento abierto: usar `siaf-document-summary-card`.
- Para ítems con detalle que se despliega: usar `siaf-collapsible-card`.
- Para elegir entre tarjetas: usar `siaf-stepper-card`; esta no es seleccionable.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `bordered` | `boolean` | `false` | Estilo con borde (sin sombra) en vez del elevado por defecto. |
| `closeLabel` | `string` | `'Cerrar'` |  |
| `columns` | `2 \| 4 \| 3 \| null` | `null` | Columnas de la grilla desde `lg` (dos desde `sm`); sin valor, los campos van en una fila que se reparte. |
| `fields` | `SummaryCardField[]` | `[]` |  |
| `showClose` | `boolean` | `true` |  |
| `showIndicator` | `boolean` | `true` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(closed)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `aria-hidden`, `aria-label`.

### Teclado

- **Tab**: enfoca la ✕ cuando `showClose` está activo; sin ella la tarjeta no recibe foco.
- **Enter / Espacio** en la ✕: emiten `closed`; el foco no se mueve solo: al quitar el ítem, el padre debe
  llevarlo, por ejemplo, al botón de búsqueda.

### Notas

- **4.1.2 Nombre, función y valor (A)**: la ✕ es un `button` con nombre desde `closeLabel` (por defecto «Cerrar»);
  el padre debe nombrar el ítem, como «Quitar entidad del estado».
- **1.1.1 Contenido no textual (A)**: la barra lateral y el ícono de la ✕ son decorativos (`aria-hidden`); el ícono
  de un campo solo se anuncia si trae `iconLabel` y, si no, queda decorativo.
- **1.4.3 Contraste mínimo (AA)**: etiquetas `text-neutral-low` 5.01:1 (oscuro 8.86:1) y valores
  `text-neutral-medium` 14.53:1 (12.87:1) sobre la superficie.
- **2.4.7 Foco visible (AA)**: la ✕ muestra un contorno de 2 px `border-states-focus` separado 2 px.
- **1.4.11 Contraste no textual (AA)**: ese contorno es el azul del kit (`border-states-focus`, 5.35:1 claro /
  10.15:1 oscuro sobre la superficie).
- **1.4.13 Contenido en hover o foco (AA)**: desde `sm` los valores truncados se completan con `siafTooltip`, que
  se cierra con Escape y se puede recorrer con el puntero.
- **Pendiente · 2.1.1 Teclado (A)**: ese texto no recibe foco, así que con teclado el globo no aparece (el lector de
  pantalla sí lo lee entero).
- **2.5.8 Tamaño del objetivo (AA)**: la ✕ mide 40 × 40 px.

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-summary-card
