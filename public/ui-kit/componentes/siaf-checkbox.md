# Checkbox

> `siaf-checkbox` · Componente de Formularios · Sin uso en la app

Checkbox con etiqueta, descripción y marca de requerido, integrado a formularios vía ControlValueAccessor.

Tiene 0 consumidores: no usarlo. Las grillas y paneles de la app usan `<input type="checkbox">`
nativo con clases `accent-*` (el color de un check nativo se pinta con `accent-*`, nunca `text-*`).

## Importar

```ts
import { CheckboxComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-checkbox />
```

### Cuándo usarlo

- Para una casilla suelta de formulario que se graba con el resto, con etiqueta y ayuda debajo: por ejemplo
  «Habilitar verificación en dos pasos» del usuario en Admin, hoy hecha con un checkbox nativo.
- Para una aceptación obligatoria antes de grabar: `[required]` pinta el asterisco y publica `aria-required`.
- Con `formControlName`, `ngModel` o `[(checked)]`.

### Cuándo no

- Para la selección de filas en grillas y paneles: checkbox nativo, como en `siaf-table-controls` y
  `siaf-selection-side-nav`.
- Para encender o apagar algo con efecto inmediato: usar `siaf-switch`.
- Para una sola opción entre varias o un Sí/No: usar `siaf-radio-group` con `[inline]`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `checked` | `boolean` | `false` | Marcado; con `[(checked)]` avisa cada cambio por `checkedChange`. |
| `description` | `string` | `''` |  |
| `disabled` | `boolean` | `false` |  |
| `label` | `string` | `''` |  |
| `required` | `boolean` | `false` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(checkedChange)` | `boolean` | Marcado; con `[(checked)]` avisa cada cambio por `checkedChange`. |

## Accesibilidad

Patrón WAI-ARIA: Casilla (https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/).

Roles y atributos del código: `aria-required`.

### Teclado

- **Tab**: enfoca la casilla.
- **Espacio**: la marca o la desmarca (checkbox nativo).

### Notas

- **1.3.1 Información y relaciones (A)**: el `<input type="checkbox">` va dentro de su `<label>`; la descripción
  también, así que se suma al nombre en vez de ir por `aria-describedby`.
- **4.1.2 Nombre, función y valor (A)**: checkbox nativo: el navegador publica el rol, el marcado y `disabled`.
- **3.3.2 Etiquetas o instrucciones (A)**: etiqueta visible; el obligatorio lleva asterisco y `aria-required`.
- **Pendiente · 3.3.1 Identificación de errores (A)**: no tiene entrada de error ni `aria-invalid`; si falta marcar
  una casilla obligatoria, el aviso lo tiene que pintar y asociar el padre.
- **2.4.7 Foco visible (AA)**: no define estilo propio (`focus:ring-brand-primary` fija el color del anillo, no su
  ancho); queda el anillo de foco nativo del navegador.
- **1.4.11 Contraste no textual (AA)**: la casilla la dibuja el estilo global de `styles.css`: borde de 2 px
  `icon-states-enabled` (8.70:1 claro, 12.87:1 oscuro) y, marcada, relleno `icon-states-active` (8.79:1 / 10.15:1).
- **1.4.3 Contraste mínimo (AA)**: etiqueta `text-neutral-high` 16.29:1, descripción `text-neutral-low` 5.01:1 y
  asterisco `text-feedback-danger` 9.84:1.
- **2.5.8 Tamaño del objetivo (AA)**: la casilla mide 16 px, pero toda la `label` es clicable; sin descripción mide
  20 px de alto, así que el padre debe separar las casillas.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-checkbox
