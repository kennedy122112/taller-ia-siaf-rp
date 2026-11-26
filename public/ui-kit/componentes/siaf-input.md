# Text field

> `siaf-input` · Componente de Formularios

Input canónico del design system: texto, número, decimal, correo, contraseña y select simple/múltiple,
con etiqueta flotante, borde verde de éxito al escribir e integración con formularios reactivos.

Usarlo para TODO campo de formulario y también para los buscadores de la app, ya migrados a él;
para mostrar un dato de solo lectura, el mismo componente con `[disabled]`.

## Importar

```ts
import { TextFieldComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-input />
```

### Cuándo usarlo

- Para los campos de una línea de las solicitudes y de Admin: nombre de clase de ajuste, número de documento o
  correo institucional del usuario.
- `type="select"` o `select-multiple` para listas cortas y cerradas: tipo de plan contable, tipo de libro y mes,
  ámbitos institucionales o estados en los paneles de búsqueda.
- `type="decimal"` para importes, como el importe de cada cuenta del asiento de ajuste; `number` solo para enteros.
- `select-multiple` con `selectAllLabel="Seleccionar todo"` en los paneles de parámetros de las consultas: casillas,
  la fila para marcar todas y el valor en una línea.
- Con `trailingIcon` y `trailingButtonLabel` para una acción dentro del campo: «Buscar» en la bandeja de documentos
  y en `siaf-records-search-toolbar`, «Mostrar contraseña» en el login.
- Con `floatingList` en un select dentro de una tabla con scroll, como las tablas editables del cierre contable anual
  o el tipo de movimiento y los conceptos de cada asiento del catálogo de eventos contables: la lista flota con
  posición fija junto al campo (encima si abajo no cabe) y la tabla ya no la recorta.

### Cuándo no

- Para fechas: usar `siaf-date-time-picker`, no `trailingIcon="calendar_today"` (como la vigencia del formulario de
  cuenta contable).
- Para textos largos (justificación, glosa, descripción): usar `text-area-control`.
- Para elegir de un catálogo largo que hay que buscar (los atributos del evento, por ejemplo): usar `empty-section`
  con `siaf-selection-side-nav`; para un Sí/No, `siaf-radio-group` con `[inline]`.
- `type="number"` para importes: el campo se vacía al teclear el separador; usar `decimal`.

### Limitaciones

Lo que emite `valueChange` es `string | number | string[]`: se lee con `textoDeCampo`, `listaDeCampo` u `opcionDe`. Dentro de una tabla con scroll o al pie de la página, el panel absoluto queda recortado o agranda el scroll: ahí va `[floatingList]="true"`, que lo pinta fijo junto al disparador.

### Así no / así sí

```html
<!-- ❌ Así no -->
<!-- En un buscador, el verde de éxito no valida nada -->
<siaf-input label="Buscar" leadingIcon="search" />

<!-- ✅ Así sí -->
<siaf-input label="Buscar" leadingIcon="search" [autoSuccess]="false" />
```

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `autocomplete` | `string` | `''` |  |
| `autoSuccess` | `boolean` | `true` | Mantiene el borde neutro después de escribir cuando el contexto no representa una validación. |
| `clearable` | `boolean` | `false` |  |
| `decimals` | `number` | `2` | Decimales admitidos cuando `type="decimal"` (importes contables: 2). |
| `disabled` | `boolean` | `false` |  |
| `error` | `string` | `''` |  |
| `floatingList` | `boolean` | `false` | En `select` y `select-multiple`, la lista se dibuja con posición fija junto al campo (hacia arriba si abajo no cabe) y lo sigue si la página o la tabla se desplazan. Para un select dentro de una tabla con scroll, que recortaba la lista y se desplazaba por dentro. |
| `hint` | `string` | `''` |  |
| `label` | `string` | `''` |  |
| `leadingIcon` | `string` | `''` |  |
| `options` | `TextFieldOption[]` | `[]` |  |
| `placeholder` | `string` | `''` |  |
| `required` | `boolean` | `false` |  |
| `selectAllLabel` | `string` | `''` | En `select-multiple`, la lista del Figma «Parámetros de consulta»: una casilla por opción, arriba esta fila para marcar o desmarcar todas, y el valor en una sola línea en vez de chips. |
| `state` | `'success' \| 'error' \| 'enabled'` | `'enabled'` |  |
| `trailingButtonLabel` | `string` | `''` |  |
| `trailingIcon` | `string` | `''` |  |
| `type` | `'number' \| 'text' \| 'decimal' \| 'email' \| 'correo' \| 'password' \| 'select' \| 'select-multiple'` | `'text'` |  |
| `value` | `string \| number \| string[]` | `''` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(trailingAction)` | `void` |  |
| `(valueChange)` | `string \| number \| string[]` |  |

## Accesibilidad

Roles y atributos del código: `role="button"`, `aria-expanded`, `aria-haspopup`, `aria-hidden`, `aria-label`, `aria-required`.

### Teclado

- **Tab**: enfoca el campo o el botón del select; el botón de `trailingIcon` es otra parada.
- **Texto, número, decimal, correo y contraseña**: el teclado nativo del `<input>`; en `decimal` se descarta lo que
  no sea dígito o separador (la coma se guarda como punto) y al salir se completan los decimales.
- **Enter / Espacio** (select): abren o cierran la lista; al abrir, el foco entra en la opción elegida (o en la
  primera), que siguen `siaf-select-options` (flechas, Inicio y Fin).
- **Escape** (select): cierra la lista y el foco vuelve al botón del campo; salir de la lista con Tab también la
  cierra. Con la lista abierta, Escape no cierra el panel que contiene al campo.

### Notas

- **Pendiente · 1.3.1 Información y relaciones (A)**: en los tipos de texto el `<label>` envuelve el `<input>`, pero
  la etiqueta flotante solo existe con foco o valor, y la ayuda y el error, dentro del mismo `<label>`, se suman al
  nombre en vez de ir por `aria-describedby`. Con `hint` y el campo vacío, la ayuda desplaza al `placeholder` como
  nombre.
- **Pendiente · 3.3.1 Identificación de errores (A)**: el error se ve (borde rojo de 2 px, ícono y texto), pero el
  `<input>` no publica `aria-invalid` y el texto no se anuncia al aparecer; con `state="error"` y sin `error`, el
  aviso es solo el color del borde.
- **Pendiente · 3.3.2 Etiquetas o instrucciones (A)**: el `<input>` de texto publica `aria-required`, pero en `select`
  y `select-multiple` el obligatorio es solo el asterisco: el botón no lo publica.
- **4.1.2 Nombre, función y valor (A)**: el select es un `<button>` con `aria-haspopup="listbox"`, `aria-expanded` y
  `aria-label` con la etiqueta. El botón de `trailingIcon` se nombra con `trailingButtonLabel`: el padre debe darlo
  o queda sin nombre.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: el `aria-label` del select tapa el valor elegido, que no se
  anuncia; «Limpiar» y la X de cada chip son `span` con `role="button"` anidados dentro del botón, cuyos hijos son
  presentacionales.
- **Pendiente · 2.1.1 Teclado (A)**: «Limpiar» (`clearable`) y «Quitar» de cada chip tienen `tabindex="-1"`: solo
  funcionan con el mouse (en `select-multiple` se puede desmarcar desde la lista).
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir el select el foco entra en la opción elegida y al elegir en
  `select`, cerrar con Escape o salir con Tab vuelve al botón del campo.
- **2.4.7 Foco visible (AA)**: el foco pinta el borde de 2 px `border-states-focus` (5.35:1 claro / 10.15:1 oscuro),
  también en éxito (el select con valor) y al llegar con Tab al botón del select. Con error, el borde sigue rojo y el
  foco se ve en un contorno azul de 2 px por fuera.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: el borde del campo vacío es `border-states-enabled` (2.44:1
  claro, 2.59:1 oscuro).
- **1.4.3 Contraste mínimo (AA)**: texto `text-neutral-medium` 14.53:1, valor del select `text-neutral-high` 16.29:1,
  etiqueta y `placeholder` `text-neutral-low` 5.01:1 y error `text-feedback-danger` 9.84:1.

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siafTooltip`](siafTooltip.md), [`siaf-icon`](siaf-icon.md), [`siaf-select-options`](siaf-select-options.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-input
