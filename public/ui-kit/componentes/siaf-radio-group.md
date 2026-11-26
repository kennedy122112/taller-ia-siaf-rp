# Radio

> `siaf-radio-group` · Componente de Formularios

Grupo de radios (`siaf-radio-group`) con leyenda, marca de requerido y `ControlValueAccessor`.

Úsalo para toda selección excluyente; con `[inline]` las opciones van en una sola línea, que es
el formato de las preguntas Si/No. El color de la marca se pinta con `accent-*`, nunca con
`text-*` (eso exigiría el plugin de forms de Tailwind).

## Importar

```ts
import { RadioComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-radio-group />
```

### Cuándo usarlo

- Para las preguntas Sí/No en una línea con `[inline]`: «Cuenta Única del Tesoro (CUT)» y «¿Vigente?» en el catálogo
  de eventos, «¿Tiene vigencia?» en el de eventos contables.
- Para una sola opción entre pocas (2 a 5) que conviene ver todas a la vez; sin `inline` van apiladas.
- Con `label`, para que el grupo tenga `legend`, y con un `name` propio por grupo.

### Cuándo no

- Para listas largas o que vienen de un catálogo: usar `siaf-input` con `type="select"` o, si hay que buscar,
  `siaf-selection-side-nav`.
- Para marcar varias opciones o encender algo al instante: casillas o `siaf-switch`.
- Repetir a mano los `input type="radio"` con `accent-brand-primary`, como aún hacen las secciones de vigencia y de
  dinámica del formulario de cuenta contable.
- Dos grupos en la misma pantalla con el `name` por defecto: comparten `radio-group` y se desmarcan entre sí.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `disabled` | `boolean` | `false` |  |
| `inline` | `boolean` | `false` | Opciones en una sola línea (ej. Si/No), en vez de apiladas. |
| `label` | `string` | `''` |  |
| `name` | `string` | `'radio-group'` |  |
| `options` | `RadioOption<T>[]` | `[]` | Con valores de un tipo propio (`RadioOption<'si' \| 'no'>[]`), `valueChange` emite ese tipo. |
| `required` | `boolean` | `false` |  |
| `value` | `string` | `''` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(valueChange)` | `T` |  |

## Accesibilidad

Patrón WAI-ARIA: Grupo de radios (https://www.w3.org/WAI/ARIA/apg/patterns/radio/).

Roles y atributos del código: `aria-required`.

### Teclado

- **Tab**: entra al grupo por la opción marcada y sale de él.
- **Flechas**: pasan a la opción anterior o siguiente y la marcan (radio nativo).
- **Espacio**: marca la opción enfocada.

### Notas

- **1.3.1 Información y relaciones (A)**: `fieldset` con `legend` (el `label`) y cada radio dentro de su `<label>`.
  El padre debe dar `label`: sin él el grupo queda sin nombre, como hoy en los formularios de eventos, que ponen la
  pregunta fuera del componente.
- **4.1.2 Nombre, función y valor (A)**: radios nativos: el navegador publica el rol, el marcado y `disabled`. El
  padre debe dar un `name` único por grupo.
- **Pendiente · 3.3.2 Etiquetas o instrucciones (A)**: el asterisco solo existe en la `legend`, y `aria-required` va
  en cada radio, rol que no lo admite en ARIA 1.2 (sí `radiogroup`).
- **Pendiente · 3.3.1 Identificación de errores (A)**: no tiene entrada de error ni `aria-invalid`; el aviso de un
  grupo obligatorio sin respuesta lo tiene que pintar y asociar el padre.
- **2.4.7 Foco visible (AA)**: no define estilo propio; queda el anillo de foco nativo del navegador.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: el círculo lo dibuja el navegador y, marcado, lo pinta
  `accent-brand-primary`: 8.79:1 en claro, pero 2.66:1 en oscuro.
- **2.5.8 Tamaño del objetivo (AA)**: cada opción es una `label` de 40 px de alto, clicable entera.
- **1.4.3 Contraste mínimo (AA)**: opciones y `legend` en `text-neutral-high` 16.29:1; asterisco
  `text-feedback-danger` 9.84:1.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-radio-group
