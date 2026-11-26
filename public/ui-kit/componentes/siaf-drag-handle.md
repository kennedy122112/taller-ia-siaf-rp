# Drag handle

> `siaf-drag-handle` · Componente de Datos y tablas

Manija para arrastrar: el botón de ícono con los seis puntos (`drag_indicator`) que dice que el elemento se puede
mover. Va dentro de un `siafReordenableItem`, a la izquierda del contenido, como en «Filtros avanzados» de la Guía
de Estructura de Pantallas (Figma 22402:16163): botón de 40 px, puntos en gris en reposo y oscuros al pasar el
puntero, al tomarlo o al arrastrar.

Con `orientacion="vertical"` (por defecto) los puntos van en dos columnas de tres, para una lista donde los
elementos van uno debajo de otro; con `horizontal`, en tres columnas de dos, para una lista donde van uno al lado de
otro. Con `size="sm"` mide 32 px y con `xs`, 24 px: es la celda «Drag & drop» de las tablas del Figma (solo el
ícono), la que pinta `siaf-data-table` con `reordenable`.

## Importar

```ts
import { DragHandleComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-drag-handle />
```

### Cuándo usarlo

- En cada elemento que se reordena, siempre visible: el usuario reconoce por los puntos que lo puede mover.
- Con `etiqueta` que nombre lo que mueve («Mover Entidad»): el lector de pantalla la dice al llegar con Tab.
- Con la misma `orientacion` que su lista (`siafReordenable`).

### Cuándo no

- Como decoración en algo que no se arrastra: promete una acción que no existe.
- Fuera de un `siafReordenableItem`: no tendría qué mover.

### Limitaciones

- Sin `siafReordenable` alrededor, Espacio y las flechas no hacen nada: el teclado lo maneja la lista.

### Así no / así sí

```html
<!-- ❌ Así no -->
<siaf-drag-handle />

<!-- ✅ Así sí -->
<siaf-drag-handle [etiqueta]="'Mover ' + campo.nombre" />
```

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `etiqueta` | `string` | `'Mover'` | El nombre que lee el lector de pantalla: qué se mueve. |
| `orientacion` | `'horizontal' \| 'vertical'` | `'vertical'` | `vertical`: dos columnas de tres puntos (lista de arriba abajo); `horizontal`: tres columnas de dos. |
| `size` | `'sm' \| 'md' \| 'xs'` | `'md'` | `md` 40 px (listas y paneles), `sm` 32 px o `xs` 24 px (la celda de las tablas). |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `aria-label`, `aria-pressed`.

### Teclado

- **Tab**: llega a la manija.
- **Espacio / Enter**: toma o suelta el elemento; con él tomado, las flechas lo mueven y **Escape** lo devuelve (ver
  `siafReordenable`).

### Notas

- **4.1.2 Nombre, función y valor (A)**: es un `<button>` con `aria-label` (`etiqueta`) y `aria-pressed`, que la
  lista pone en `true` mientras el elemento está tomado.
- **1.4.11 Contraste no textual (AA)**: los puntos en reposo van en `text-neutral-low` (5.01:1 / 8.86:1) y, al pasar o
  tomarlo, en `text-neutral-high` (16.29:1 / 16.53:1).
- **2.4.7 Foco visible (AA)**: anillo de 2 px `border-states-focus` por dentro, como los demás botones de ícono.
- **2.5.8 Tamaño del objetivo (AA)**: 40 × 40 px (32 × 32 con `sm` y 24 × 24 con `xs`, el mínimo del criterio).

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-drag-handle
