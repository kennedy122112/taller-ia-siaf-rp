# Date time picker

> `siaf-date-time-picker` · Componente de Formularios

Selector de fecha (y opcionalmente hora) con calendario propio, label flotante,
estados de error/éxito y `[minDate]` para deshabilitar días anteriores.

Es el control canónico de fecha del design system: úsalo en vez de un `input type="date"`
nativo para que el campo respete tokens, textos en español y el formato dd/mm/aaaa.

En la cabecera del calendario, el mes y el año son botones: el mes abre los 12 meses y el año una
grilla de 12 años (las flechas dobles pasan de página). Al elegir, vuelve a los días de ese mes o año.
Con `minDate`, los meses y años que terminan antes quedan deshabilitados.

## Importar

```ts
import { DateTimePickerComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-date-time-picker />
```

### Cuándo usarlo

- Para las fechas de vigencia de una solicitud («Fecha inicio desde» y «Fecha fin hasta» en clase de ajuste, tipo de
  asiento, evento y evento contable), con `[minDate]` para que el fin no quede antes del inicio.
- Para los rangos «Fecha desde» / «Fecha hasta» de los paneles de búsqueda de las consultas y de libros contables.
- Para una fecha puntual de un formulario: la fecha del asiento de ajuste o las fechas de contrato del usuario en Admin.

### Cuándo no

- Un `input type="date"` nativo o un `siaf-input` con `trailingIcon="calendar_today"` (como la vigencia del
  formulario de cuenta contable): usar este componente.
- Dejar `defaultToToday` en `true` en filtros o fechas opcionales: pinta la fecha de hoy sin emitirla, así que el
  padre sigue vacío. Pasar `[defaultToToday]="false"`.
- `variant="datetime"` para capturar una hora: los campos de hora no están conectados; emite solo la fecha y la
  muestra con 00:00:00.
- Para mostrar una fecha que no se edita: en modo lectura va `readonly-field`, no el selector `[disabled]`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `defaultToToday` | `boolean` | `true` |  |
| `disabled` | `boolean` | `false` |  |
| `error` | `string` | `''` |  |
| `fullWidth` | `boolean` | `false` |  |
| `hint` | `string` | `''` |  |
| `label` | `string` | `''` |  |
| `maxDate` | `string` | `''` | Fecha máxima seleccionable en formato ISO (YYYY-MM-DD). Los días posteriores quedan deshabilitados. |
| `minDate` | `string` | `''` | Fecha mínima seleccionable en formato ISO (YYYY-MM-DD). Los días anteriores quedan deshabilitados. |
| `placeholder` | `string` | `''` |  |
| `required` | `boolean` | `false` |  |
| `state` | `'success' \| 'error' \| 'enabled'` | `'enabled'` |  |
| `value` | `string` | `''` |  |
| `variant` | `'date' \| 'datetime'` | `'date'` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(valueChange)` | `string` |  |

## Accesibilidad

Roles y atributos del código: `role="dialog"`, `role="listbox"`, `role="option"`, `aria-expanded`, `aria-haspopup`, `aria-hidden`, `aria-label`, `aria-required`, `aria-selected`.

### Teclado

- **Tab**: enfoca el campo. Al abrir el calendario el foco entra en el día elegido (o en hoy); desde ahí recorre
  las flechas de la cabecera, el mes, el año y cada día habilitado, y salir con Tab cierra el calendario.
- **Enter / Espacio**: en el campo abren o cierran el calendario; dentro, activan la flecha o eligen el día, mes o
  año enfocado (botones nativos). Cancelar y Aceptar de `datetime` siguen `siaf-button`.
- **Escape**: cierra el calendario y el foco vuelve al campo.
- **Flechas**: no están implementadas entre los días; el calendario también se cierra al elegir un día (variante
  `date`) o con Cancelar o Aceptar.

### Notas

- **Pendiente · 1.3.1 Información y relaciones (A)**: la etiqueta no se une al botón del campo con `aria-labelledby`
  ni `aria-label`: un único `<label>` envuelve etiqueta flotante, botón, ayuda, error y calendario, y con fecha
  elegida el botón muestra solo la fecha. En `datetime`, los tres campos de hora no tienen etiqueta.
- **Pendiente · 3.3.1 Identificación de errores (A)**: el texto de `error` se ve bajo el campo, pero no se asocia con
  `aria-describedby` ni se anuncia al aparecer; con `state="error"` y sin `error`, el aviso es solo el borde rojo.
- **Pendiente · 3.3.2 Etiquetas o instrucciones (A)**: el obligatorio es solo el asterisco rojo: `aria-required` va
  en un `<button>`, rol que no admite ese atributo en ARIA 1.2.
- **4.1.2 Nombre, función y valor (A)**: el campo publica `aria-haspopup="dialog"` y `aria-expanded`; el calendario
  es `role="dialog"` con `aria-label`, y las grillas de meses y años, `role="listbox"` con `aria-selected`.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: cada día se lee solo como número («05») y el día elegido no
  publica estado (`aria-selected` o `aria-pressed`); las grillas `listbox` no responden a flechas.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir el foco entra en el día elegido (o en hoy) y al cerrarse
  (un día, Cancelar, Aceptar, Escape o salir con Tab) vuelve al campo.
- **2.4.7 Foco visible (AA)**: el botón del campo pasa al borde azul de 2 px (`border-states-focus`, 5.35:1 claro /
  10.15:1 oscuro) al recibir el foco, también con valor (éxito); con error, el borde sigue rojo y el foco se ve en un
  contorno azul por fuera. Los botones del calendario conservan el anillo nativo.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: el borde del campo vacío es `border-states-enabled` (2.44:1
  claro, 2.59:1 oscuro).
- **1.4.3 Contraste mínimo (AA)**: valor `text-neutral-high` 16.29:1, etiqueta `text-neutral-low` 5.01:1, días
  `text-neutral-medium` 14.53:1 y día elegido en blanco sobre `bg-brand-primary` 8.79:1 (6.67:1 oscuro). Con valor,
  la ayuda pasa a `text-feedback-success`, par que la tabla no mide.
- **Pendiente · 2.5.8 Tamaño del objetivo (AA)**: las flechas de la cabecera miden 20 px (`size-5`) con 4 px entre
  ellas; los días miden 36 px y el campo, 40 px.

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siafTooltip`](siafTooltip.md), [`siaf-button`](siaf-button.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-date-time-picker
