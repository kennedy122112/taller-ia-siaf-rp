# Filter pill

> `siaf-filter-pill` · Componente de Datos y tablas

Píldora dropdown de filtro, dibujada con `siaf-tag` en variante `filter` (Figma «Filter tags»), con dos estados:

1. **Sin valor** — tag sin elegir con `Label ▾`. Al pulsarlo abre el menú.
2. **Con valor** — tag elegido con `✓ Label: valor ✕`. La × limpia; pulsar el tag vuelve a abrir el menú.

La × es un botón al lado del tag, dentro del mismo borde (no un control dentro del botón).

Reemplaza el patrón inline repetido 4 veces en
`siaf-documents-records-page` (filtros Estado, Tipo de acción,
Es imputable, Naturaleza) y es el que vamos a usar en las
próximas pantallas de "Consultas y reportes …".

Las opciones se muestran con `siaf-menu` compact (220 px). Abierto con el
teclado, el foco entra en la primera opción; Escape o pulsar fuera cierra.

## Importar

```ts
import { FilterPillComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-filter-pill />
```

### Cuándo usarlo

- Para filtros rápidos de un campo con pocas opciones sobre una grilla: Estado y Tipo de acción en la bandeja y en
  la pestaña Documentos, y los filtros que configura cada módulo en Registros.
- En los resultados de Consultas y reportes: Naturaleza y Es imputable (plan de cuentas), Tipo de acción (asiento
  de ajuste), Estados y Vigencia (catálogo de tipos de asiento).
- Cuando el valor elegido debe verse en la propia píldora («Estado: Aprobado») y limpiarse con su ×.

### Cuándo no

- Para condiciones compuestas (campo, condición y valor): `siaf-custom-filter`.
- Para elegir varias opciones a la vez: la píldora guarda un solo valor; usar `siaf-input` con
  `type="select-multiple"`.
- Como campo de formulario con etiqueta y error: `siaf-input` con `type="select"`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `label` | `string` | `''` | Etiqueta visible en el chip (p.ej. "Estado"). |
| `options` | `readonly (string \| FilterPillOption)[]` | `[]` | Opciones del menú. Puede ser string[] (label === value) u objetos FilterPillOption con label y value distintos. |
| `selectedValue` | `string` | `''` | Valor actualmente seleccionado (string vacío = sin selección). |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(selectedValueChange)` | `string` | Emite el nuevo valor seleccionado, o '' al limpiar. |

## Accesibilidad

Roles y atributos del código: `aria-hidden`.

### Teclado

- **Tab**: enfoca la píldora; con un valor elegido, también su × («Quitar filtro …»).
- **Enter / Espacio**: abren o cierran el menú; al abrir, el foco pasa a la primera opción. Sobre la ×, limpian
  el filtro y el foco queda en la píldora.
- **Escape**: cierra el menú y el foco vuelve a la píldora; salir del menú con Tab también lo cierra. Dentro del
  menú, flechas, Inicio, Fin, Enter y Espacio siguen `siaf-menu`.

### Notas

- **4.1.2 Nombre, función y valor (A)**: el tag es un `<button>` con `aria-haspopup="menu"` y `aria-expanded`, con y
  sin valor, y el menú toma `label` como nombre; con valor, la × es otro `<button>` a su lado, «Quitar filtro …».
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir el foco entra en la primera opción (con o sin valor) y al
  elegir, limpiar, cerrar con Escape o salir con Tab vuelve a la píldora.
- **1.4.1 Uso del color (A)**: con valor no depende del color: suma el ícono check y el texto «Etiqueta: valor».
- **1.4.3 Contraste mínimo (AA)**: sin valor, `text-neutral-medium` sobre la superficie (14.53:1 / 12.87:1); con
  valor, `text-neutral-activated` sobre la capa `bg-states-light-selected` (7.69:1 / 17.15:1).
- **Pendiente · 1.4.11 Contraste no textual (AA)**: el borde sin valor es `border-states-enabled` (2.44:1 / 2.59:1)
  y el borde con valor, `border-states-active`, baja a 2.02:1 en oscuro.
- **2.4.7 Foco visible (AA)**: el tag y la × muestran el anillo del kit de `siaf-tag` (2 px `border-states-focus`);
  las opciones, el contorno interior azul de `siaf-menu`.
- **Pendiente · 2.5.8 Tamaño del objetivo (AA)**: la píldora mide 32 px de alto, pero la × mide 20 × 20 px, pegada
  al botón del tag, sin el espacio libre que pide la excepción.

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siaf-menu`](siaf-menu.md), [`siaf-tag`](siaf-tag.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-filter-pill
