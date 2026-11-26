# Buttons group

> `siaf-buttons-group` · Componente de Botones y acciones

Grupo de botones segmentado y unido, con una sola opción activa a la vez.

Usarlo para alternar entre pocas vistas o modos excluyentes. Para elegir un valor dentro de un
formulario van `siaf-radio-group` (con `[inline]` para Si/No) o un select, no este control.

## Importar

```ts
import { ButtonsGroupComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-buttons-group />
```

### Cuándo usarlo

- Para alternar sub-vistas excluyentes de una misma sección, como «Tipo de asiento de ajuste» y «Clases de ajustes y
  Detalles de ajustes» en la pestaña Registros de la bandeja del catálogo de ajuste.
- Para filtros o modos rápidos de pocas opciones cortas que se aplican al instante, como «Todos | Igual en oscuro |
  Fuera de Figma» en los colores y la variante y el tamaño de los íconos, en los fundamentos del `/ui-kit`.
- Con `icon` en cada opción e `iconOnly` para un selector de vista compacto, como «Vista de datos | Vista de
  gráficas» del resultado de `siaf-query-report-page` (Guía de Estructura de Pantallas, nodo 22715:21316): la
  etiqueta nombra el botón y aparece en el tooltip.

### Cuándo no

- Para elegir un valor dentro de un formulario: usar `siaf-radio-group` (con `[inline]` para Si/No) o
  `siaf-select-options`.
- Para las vistas principales de una pantalla (Documentos / Registros, Detalle / Historial): usar `siaf-records-tabs`
  o `siaf-tabs`.
- Para acciones independientes (Grabar, Cancelar): usar `siaf-button` sueltos.
- Con muchas opciones o textos largos: usar `siaf-filter-pill` o `siaf-select-options`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ariaLabel` | `string` | `''` | Nombre del grupo para el lector de pantalla («Vista del resultado»). |
| `iconOnly` | `boolean` | `false` | Las opciones con `icon` muestran solo el ícono; su etiqueta nombra el botón y aparece en el tooltip. |
| `items` | `ButtonGroupItem<T>[]` | `[]` | Con valores de un tipo propio (`ButtonGroupItem<'a' \| 'b'>[]`), `valueChange` emite ese tipo. |
| `value` | `string \| null` | `null` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(valueChange)` | `T` |  |

## Accesibilidad

Roles y atributos del código: `role="group"`, `aria-label`, `aria-pressed`.

### Teclado

- **Tab**: pasa por cada opción del grupo (todas entran en el orden de tabulación; no hay navegación con flechas).
- **Enter / Espacio**: eligen la opción enfocada y emiten `valueChange`.

### Notas

- **4.1.2 Nombre, función y valor (A)**: cada opción es un `<button>` nativo con `aria-pressed` según esté elegida,
  dentro de un `role="group"` nombrado con `ariaLabel`; con `iconOnly`, el botón se llama como su etiqueta.
- **1.1.1 Contenido no textual (A)**: con `iconOnly` el ícono es decorativo y la etiqueta va en `aria-label` y en el
  tooltip.
- **2.1.1 Teclado (A)**: Tab llega a cada opción y Enter o Espacio la eligen.
- **2.4.7 Foco visible (AA)**: contorno de 2 px con separación de 2 px (`focus-visible:outline`).
- **1.4.3 Contraste mínimo (AA)**: inactivas `text-neutral-medium` (en claro su fondo `bg-states-light-enabled` es
  transparente: 14.53:1 sobre la superficie); activa `text-neutral-activated` sobre la capa azul
  `bg-states-light-activated`.
- **1.4.1 Uso del color (A)**: la activa además va en negrita (`font-bold`); con `iconOnly` no hay texto que marcar y
  la distinguen el borde y la capa azul, además de `aria-pressed`.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: el contorno de foco usa `border-states-active`: 8.79:1 en claro,
  pero 2.02:1 en oscuro.
- **2.5.8 Tamaño del objetivo (AA)**: cada opción mide al menos 40 px de alto.

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-buttons-group
