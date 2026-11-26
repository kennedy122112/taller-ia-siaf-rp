# Stepper card

> `siaf-stepper-card` · Componente de Superficies

Card seleccionable en forma de paso, con lista de campos etiqueta/valor e indicador lateral.

Sin elegir lleva borde y ninguna sombra; elegida (`selected`), sombra y una barra azul de 80 px arriba a la
izquierda. Mide 200 px de ancho dentro de `siaf-steps` con `variant="cards"`, que la pinta una por versión con su
punto a la derecha. No es la card de "ítem seleccionado" — esa es `siaf-summary-card`.

## Importar

```ts
import { StepperCardComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-stepper-card />
```

### Cuándo usarlo

- Para elegir una entre varias solicitudes o versiones de un mismo registro mostradas como tarjetas (N° de
  documento, tipo de acción y fecha) y ver su detalle al lado.
- Como columna de navegación de un historial, dentro de `siaf-steps` con `variant="cards"`: la tarjeta elegida queda
  marcada y el padre pinta su detalle. Así la usan `siaf-account-history-panel` y `siaf-asiento-history-panel`.

### Cuándo no

- Para el ítem elegido desde un panel lateral: usar `siaf-summary-card`, que no es seleccionable.
- Para pasos numerados de un flujo: usar `siaf-steps`; para los responsables de una solicitud,
  `siaf-action-tracker`.
- Con enlaces o botones adentro: toda la tarjeta ya es un `button` y no admite otros controles.
- Para elegir entre opciones de un formulario: usar `siaf-radio-group` o `siaf-buttons-group`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `fields` | `StepperCardField[]` | `[]` |  |
| `selected` | `boolean` | `false` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(selectedChange)` | `boolean` |  |

## Accesibilidad

Roles y atributos del código: `aria-hidden`, `aria-pressed`.

### Teclado

- **Tab**: enfoca la tarjeta completa (es un `button`).
- **Enter / Espacio**: emiten `selectedChange` con el valor contrario a `selected`; el padre actualiza la selección.

### Notas

- **4.1.2 Nombre, función y valor (A)**: es un `button` nativo con `aria-pressed` según `selected`; su nombre es el
  texto de todas sus etiquetas y valores.
- **1.4.1 Uso del color (A)**: la elegida no depende del color: suma la barra lateral y la sombra.
- **1.4.3 Contraste mínimo (AA)**: etiquetas `text-neutral-low` 5.01:1 (oscuro 8.86:1) y valores
  `text-neutral-medium` 14.53:1 (12.87:1) sobre la superficie.
- **2.4.7 Foco visible (AA)**: contorno de 2 px `border-states-focus` separado 2 px (5.35:1 claro / 10.15:1 oscuro).
- **Pendiente · 1.4.11 Contraste no textual (AA)**: en oscuro la barra de la elegida usa `bg-brand-primary`, 2.66:1
  sobre la superficie, y el borde de las demás (`divider-strong`) no llega a 3:1 en ningún tema.
- **1.4.13 Contenido en hover o foco (AA)**: desde `sm` los valores truncados se completan con `siafTooltip`, que
  también aparece al enfocar la tarjeta, se cierra con Escape y se puede recorrer con el puntero. Si se cortan la
  etiqueta y el valor, con el foco solo se ve el primero (el lector de pantalla lee los dos).
- **2.5.8 Tamaño del objetivo (AA)**: toda la tarjeta es el objetivo, de al menos 180 px de ancho.

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-stepper-card
