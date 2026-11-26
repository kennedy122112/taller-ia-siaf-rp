# Query parameters panel

> `siaf-query-parameters-panel` · Componente de Overlays

Panel lateral «Parámetros de consulta» (Guía de Estructura de Pantallas, nodo 22402:15484): los campos que la
pantalla declara (fechas, selects y selects múltiples con «Seleccionar todo»), «Limpiar todo» y «Aplicar consulta»,
que se habilita cuando están los obligatorios y hay al menos un valor. Trabaja sobre un borrador: cerrar sin aplicar
no cambia la consulta, y al volver a abrirlo muestra los parámetros aplicados.

## Importar

```ts
import { QueryParametersPanelComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-query-parameters-panel />
```

### Cuándo usarlo

- Desde «Parámetros» de `siaf-query-report-page`, que le pasa los `fields` de su configuración y los valores
  aplicados.
- `select-multiple` para criterios con varias opciones (entidades, fuentes de financiamiento): la lista trae
  casillas y «Seleccionar todo».
- `dependsOn` para un campo cuyas opciones dependen de otro, como la Entidad según el Pliego en las consultas del
  cierre contable: con el Pliego elegido solo se ofrecen sus entidades, y al cambiarlo se quita la que ya no es suya.
- `visibleWhen` para los campos que dependen de lo elegido en otro, como los de cada reporte según el «Reporte» en
  las consultas del cierre contable: los ocultos no se piden ni se aplican. Dos campos con la misma `key` que nunca se
  ven juntos pasan el valor de uno al otro (el Mes, opcional en la lista y obligatorio en un reporte mensual), y lo
  que ya no está entre las opciones del campo que aparece se quita.

### Cuándo no

- Para refinar un resultado ya consultado (condiciones, agrupar): eso es «Filtros avanzados».
- Para elegir registros de un catálogo largo con búsqueda: usar `siaf-selection-side-nav`.
- Para filtrar una grilla con píldoras: usar `siaf-filter-pill`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `fields` | `readonly QueryReportParameterField[]` | `[]` |  |
| `open` | `boolean` | `false` |  |
| `title` | `string` | `'Parámetros de consulta'` |  |
| `values` | `QueryReportParameters \| null` | `null` | Parámetros aplicados: el borrador parte de ellos cada vez que se abre. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(applied)` | `QueryReportParameters` | Valores ingresados, sin los campos vacíos. |
| `(closed)` | `void` |  |

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- **Tab**: al abrir, el foco entra en la X; recorre los campos, «Limpiar todo» y «Aplicar consulta», y da la vuelta
  sin salir del panel.
- **Escape**: cierra el panel sin aplicar (emite `closed`) y el foco vuelve al botón que lo abrió; con una lista
  abierta, Escape cierra primero la lista.
- **Enter / Espacio**: en «Aplicar consulta», emite `applied` con los valores y cierra.

### Notas

- **4.1.2 Nombre, función y valor (A)**: `role="dialog"` con `aria-modal="true"` y `aria-labelledby` al título; la X
  se llama «Cerrar» más el título.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir lleva el foco a la X y al cerrar lo devuelve al botón que lo
  abrió.
- **2.1.2 Sin trampas de teclado (A)**: Tab queda dentro mientras está abierto, pero Escape siempre lo cierra.
- **3.3.2 Etiquetas o instrucciones (A)**: cada campo lleva su etiqueta y el asterisco de obligatorio; «Aplicar
  consulta» queda deshabilitado hasta completarlos.
- **1.3.1 Información y relaciones (A)**: el título es un `h2` y los campos van en el orden en que se leen.
- **2.4.7 Foco visible (AA)**: la X muestra el contorno de 2 px `border-states-focus`; los campos y botones siguen su
  componente.

## Composición

Pinta por dentro: [`siaf-date-time-picker`](siaf-date-time-picker.md), [`siaf-input`](siaf-input.md), [`siaf-side-nav`](siaf-side-nav.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-query-parameters-panel
