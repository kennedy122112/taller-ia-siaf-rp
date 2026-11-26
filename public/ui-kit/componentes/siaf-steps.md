# Steps

> `siaf-steps` · Componente de Trazabilidad del documento

Pasos numerados de un flujo con el paso activo resaltado (Figma UI KIT: «Step colum», nodo 1264:580,
y «Steps Rows», nodo 2582:7222).

- `horizontal` (por defecto): un círculo de 32 px con el número por paso, unidos por una línea, y el
  nombre y la descripción debajo. Si no entra en el ancho, se desplaza en horizontal.
- `vertical`: un paso por fila con el nombre a la derecha. `size="default"` usa círculos de 40 px con
  número; `size="small"`, de 24 px sin número.
- `variant="cards"`: siempre vertical. Cada paso es un `siaf-stepper-card` con sus `fields` y, a la derecha, un
  punto de 24 px; los puntos van unidos por una línea. La tarjeta activa lleva sombra y barra azul y su punto va
  en azul; las demás, borde y punto gris. Al elegir otra tarjeta emite `activeStepChange`.

`activeStep` cuenta desde 1. Con círculos, el activo y los anteriores van en el color de marca y los siguientes, en
gris; con tarjetas, solo la activa va en azul. La variante `cards` es la columna de versiones de
`siaf-account-history-panel` y `siaf-asiento-history-panel`; el stepper e historial de las solicitudes es
`siaf-action-tracker`.

## Importar

```ts
import { StepsComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-steps />
```

### Cuándo usarlo

- Para mostrar en qué etapa va un flujo lineal corto (3 a 6 pasos), como un asistente por etapas de una carga
  masiva: plantilla, archivo, validación y envío.
- `vertical` en paneles laterales o columnas angostas; `size="small"` cuando el número no aporta.
- `variant="cards"` para las versiones de un registro (creación y modificaciones, con su número, tipo de acción y
  fecha): la tarjeta elegida queda marcada y el padre muestra su detalle al lado, como en los paneles de historial.

### Cuándo no

- Para el avance y los responsables de una solicitud (Elaborado, Verificado, Aprobado): usar `siaf-action-tracker`.
- Para hitos con fecha y detalle: usar `siaf-timeline`.
- Como navegación entre vistas: para cambiar de vista usar `siaf-tabs`.
- Muchos pasos en `horizontal`: la fila se desplaza; pasar a `vertical`.
- `variant="cards"` con valores largos: la tarjeta mide 200 px y los corta (el texto completo sale en el tooltip).

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `activeStep` | `number` | `1` | Paso activo, contando desde 1. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |  |
| `size` | `'default' \| 'small'` | `'default'` | Solo en vertical con círculos: `default` (40 px con número) o `small` (24 px sin número). |
| `steps` | `StepItem[]` | `[]` |  |
| `variant` | `'default' \| 'cards'` | `'default'` | `cards`: vertical, con un `siaf-stepper-card` por paso (sus `fields`) y el punto a la derecha. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(activeStepChange)` | `number` | Con `variant="cards"`: el número (desde 1) de la tarjeta elegida. Admite `[(activeStep)]`. |

## Accesibilidad

Roles y atributos del código: `aria-current`, `aria-hidden`.

### Teclado

- Con círculos no recibe foco: no es interactivo.
- Con `variant="cards"`, **Tab** recorre las tarjetas (cada una es un `button`) y **Enter / Espacio** elige la
  enfocada: emite `activeStepChange`.

### Notas

- **1.3.1 Información y relaciones (A)**: los pasos son una lista ordenada (`ol` y `li`); círculos, puntos y líneas
  van con `aria-hidden`.
- **4.1.2 Nombre, función y valor (A)**: con círculos, el paso actual lleva `aria-current="step"` y cada nombre suma
  en texto oculto «paso N de M» y su estado (completado, paso actual o pendiente). Con tarjetas, cada una es un
  `button` con `aria-pressed` (la activa en `true`) nombrado por sus etiquetas y valores.
- **Pendiente · 1.4.1 Uso del color (A)**: con círculos, a la vista, completado o pendiente solo se distingue por el
  relleno del círculo (azul o gris) y el actual se ve igual que los completados; el estado en texto solo llega al
  lector de pantalla. Con tarjetas no depende del color: la activa suma la barra y la sombra.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: nombres `text-neutral-high` 16.29:1 (oscuro 16.53:1) y número blanco
  sobre `bg-brand-primary` 8.79:1 (6.67:1) cumplen, pero el número de los pendientes (`text-neutral-low` sobre
  `surface-high`) no llega a 4.5:1 en claro.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: en oscuro el círculo o punto azul da 2.66:1 sobre la superficie
  (`bg-brand-primary`). El punto gris de las tarjetas usa `text-neutral-low` (5.01:1 claro / 8.86:1 oscuro).

## Composición

Pinta por dentro: [`siaf-stepper-card`](siaf-stepper-card.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-steps
