# Select options

> `siaf-select-options` · Componente de Formularios

Listbox de opciones (simple o múltiple) con check en las seleccionadas y navegación por teclado.

Úsalo como el panel desplegable de un selector: emite el valor elegido, no guarda estado ni pinta
el input. Quien lo usa decide cómo abrirlo y qué hacer con la selección.

## Importar

```ts
import { SelectOptionsComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-select-options />
```

### Cuándo usarlo

- Como panel desplegable de `siaf-input` con `type="select"` o `select-multiple`: el campo lo abre, lo cierra y
  guarda el valor.
- Como lista de opciones de un componente compuesto con su propio disparador, como los select del panel «Crear
  documento» (`siaf-create-document`).
- `[multiple]` cuando se marcan varias opciones con check sin cerrar la lista.
- `[checkboxes]` con `selectAllLabel` en una lista múltiple como la del Figma «Parámetros de consulta»: una casilla
  por opción y, arriba, «Seleccionar todo», que emite `allSelected`.

### Cuándo no

- Para un campo de formulario completo: usar `siaf-input` con `type="select"`, que ya pinta etiqueta, borde y error.
- Para un menú de acciones (Editar, Anular, Exportar): usar `siaf-menu` o `siaf-icon-dropdown-menu`.
- Para catálogos largos: no filtra ni busca; usar `siaf-selection-side-nav`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `checkboxes` | `boolean` | `false` | Con `multiple`, una casilla nativa por opción en vez del check (Figma «Menu» con casillas). |
| `multiple` | `boolean` | `false` |  |
| `options` | `SelectOption[]` | `[]` |  |
| `selectAllLabel` | `string` | `''` | Con casillas, agrega arriba la fila que marca o desmarca todas («Seleccionar todo»). |
| `selectedValue` | `string` | `''` |  |
| `selectedValues` | `string[]` | `[]` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(allSelected)` | `boolean` | «Seleccionar todo»: `true` para marcar todas las habilitadas, `false` para desmarcarlas. |
| `(selected)` | `string` |  |

## Accesibilidad

Patrón WAI-ARIA: Lista de opciones (https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).

Roles y atributos del código: `role="listbox"`, `role="option"`, `aria-disabled`, `aria-hidden`, `aria-multiselectable`, `aria-selected`.

### Teclado

- **Tab**: la lista es una sola parada: entra por la última opción enfocada (al principio, la elegida o la primera
  habilitada) y la siguiente pulsación sale.
- **Flecha abajo / arriba**: pasan a la opción habilitada siguiente o anterior y dan la vuelta.
- **Inicio / Fin**: van a la primera o a la última opción habilitada.
- **Enter / Espacio**: eligen la opción enfocada (emite `selected`); abrir, cerrar y Escape los maneja quien lo usa.
  La opción elegida lleva `data-foco-inicial`: con `siafFoco`, el foco entra por ella al abrir la lista.
- Con casillas, **Enter / Espacio** en «Seleccionar todo» marca o desmarca todas (emite `allSelected`).

### Notas

- **4.1.2 Nombre, función y valor (A)**: `role="listbox"` con `aria-multiselectable`; cada opción es `role="option"`
  con `aria-selected` y `disabled` nativo.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: el `listbox` no tiene nombre (`aria-label` o `aria-labelledby`)
  ni una entrada para recibirlo del padre.
- **2.1.1 Teclado (A)**: al enfocar una opción con la etiqueta cortada aparece su texto completo (`siafTooltip`).
- **2.4.7 Foco visible (AA)**: la opción enfocada con teclado lleva un contorno interior azul de 2 px
  (`border-states-focus`, 5.35:1 claro / 10.15:1 oscuro), el mismo de `siaf-menu` y `siaf-list`; no cambia el
  fondo, así la elegida sigue marcada mientras tiene el foco.
- **1.4.1 Uso del color (A)**: la opción elegida además va en negrita y con un check (`aria-hidden`); con casillas,
  con la casilla marcada.
- **1.1.1 Contenido no textual (A)**: con casillas, cada opción es un elemento con `role="option"` (un `<input>` no
  puede ir dentro de un botón) y la casilla nativa lleva `aria-hidden` y `tabindex="-1"`: el estado lo publica
  `aria-selected`.
- **1.4.3 Contraste mínimo (AA)**: en claro, las opciones van en `text-neutral-medium` 14.53:1 sobre la superficie;
  la elegida, `text-neutral-activated` sobre `bg-states-light-selected`, par que la tabla no mide.
- **2.5.8 Tamaño del objetivo (AA)**: cada opción mide al menos 48 px de alto (`min-h-12`) y ocupa todo el ancho.

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-select-options
