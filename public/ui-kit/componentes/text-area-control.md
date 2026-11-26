# Text area control

> `text-area-control` · Componente de Formularios

Textarea del design system con etiqueta flotante, contador de caracteres y estados error/éxito.

Usarlo para los textos largos de las solicitudes (glosa, justificación, motivo de observación),
donde `[minlength]` exige el mínimo de 3 caracteres y solo lo reclama tras salir del campo.

## Importar

```ts
import { TextAreaControlComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<text-area-control />
```

### Cuándo usarlo

- Para la «Justificación del requerimiento solicitado» de las solicitudes (cuenta contable, carga masiva, clase de
  ajuste, tipo de asiento, asiento de ajuste, evento, evento contable y apertura contable), con `maxlength` 500.
- Para los textos largos de un registro: glosa del asiento de ajuste, descripción del evento o dinámica contable de
  la cuenta (se debita por, se acredita por, objeto, saldos).
- Para el motivo que pide `siaf-modal` con `requiresReason`.
- Con `title` cuando el campo lleva un encabezado propio en mayúsculas encima (Glosa).

### Cuándo no

- Para textos de una línea (nombre, código, correo): usar `siaf-input`.
- Para mostrar el texto ya grabado en modo lectura: usar `readonly-field`, como hacen las solicitudes.
- Marcar el obligatorio con un `*` al final de `placeholder`: el componente lo quita; usar `[required]`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `disabled` | `boolean` | `false` |  |
| `error` | `string` | `''` |  |
| `maxlength` | `number` | `500` |  |
| `minlength` | `number` | `0` | Mínimo de caracteres (sin contar espacios al inicio/fin). 0 = sin mínimo. |
| `placeholder` | `string` | `''` |  |
| `required` | `boolean` | `false` |  |
| `state` | `'success' \| 'error' \| 'enabled'` | `'enabled'` |  |
| `title` | `string` | `''` |  |
| `value` | `string` | `''` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(valueChange)` | `string` |  |

## Accesibilidad

Roles y atributos del código: `aria-invalid`, `aria-required`.

### Teclado

- **Tab**: entra y sale del campo (en un `textarea` nativo, Tab no escribe tabulaciones).
- **Enter**: agrega un salto de línea; al llegar a `maxlength` no deja escribir más.

### Notas

- **Pendiente · 1.3.1 Información y relaciones (A)**: el `<label>` envuelve el `textarea`, pero la etiqueta flotante
  solo existe con foco o valor, y el error y el contador («0/500») están dentro del mismo `<label>`: se suman al
  nombre en vez de ir por `aria-describedby`. Sin foco ni valor, un campo sin `title` ni `required` queda nombrado
  por el contador y no por su `placeholder`.
- **3.3.1 Identificación de errores (A)**: con error publica `aria-invalid="true"`, borde rojo de 2 px y el texto (el
  `error` del padre o «Mínimo N caracteres», que aparece al salir del campo). Con `state="error"` y sin texto, el
  aviso es solo el borde.
- **3.3.2 Etiquetas o instrucciones (A)**: la etiqueta siempre se ve (dentro del campo o flotante), el obligatorio
  lleva asterisco y `aria-required`, y el contador muestra el máximo.
- **4.1.2 Nombre, función y valor (A)**: `textarea` nativo con `aria-required`, `aria-invalid`, `maxlength` y
  `disabled`.
- **2.4.7 Foco visible (AA)**: el `textarea` usa `outline-none` y el foco pinta el borde de 2 px
  `border-states-focus` (5.35:1); con un `error` del padre el borde sigue rojo y solo queda el cursor de texto.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: el borde del campo vacío es `border-states-enabled` (2.44:1
  claro, 2.59:1 oscuro).
- **1.4.3 Contraste mínimo (AA)**: texto `text-neutral-medium` 14.53:1, etiqueta y contador `text-neutral-low`
  5.01:1, título `text-neutral-high` 16.29:1 y error `text-feedback-danger` 9.84:1.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/text-area-control
