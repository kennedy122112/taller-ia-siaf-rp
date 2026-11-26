# Consultas filtros chips

> `siaf-consultas-filtros-chips` · Componente de Datos y tablas · Sin uso en la app

Filtros aplicados (Figma UI KIT «Applied filters MFD»): una línea de etiquetas «Etiqueta: valores» con scroll
horizontal invisible (sin barra; se desplaza con rueda o arrastre) y, fija a la derecha con 16 px de separación, la
etiqueta de acción «Borrar filtros» con papelera, que emite `cleared`. Las etiquetas que no caben se cortan en ese
borde. Con `removable`, cada etiqueta lleva su × y emite `removed` con su filtro, para quitar uno solo.

Con `title` (por defecto «Filtros aplicados de búsqueda») va en la tarjeta con título de Consultas y reportes; con
`title` vacío es solo la fila, para ponerla debajo de un buscador.

## Importar

```ts
import { ConsultasFiltrosChipsComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-consultas-filtros-chips />
```

### Cuándo usarlo

- Arriba de los resultados de Consultas y reportes (plan de cuentas, asiento de ajuste, catálogo de tipos de
  asiento y libros contables) para mostrar con qué criterios se buscó.
- Sin título y con `removable`, debajo del buscador de un panel con filtros: el panel de cuentas de la configuración
  de asiento de cierre anual (`filtrosAplicados` de `siaf-selection-side-nav`).
- Con varios criterios o varios valores por criterio: cada etiqueta lee «Etiqueta: valor, valor» en una sola línea.
- Para volver al inicio con una sola acción: «Borrar filtros» emite `cleared`.

### Cuándo no

- Para elegir o cambiar un filtro: las etiquetas no se editan; usar `siaf-filter-pill` (opciones cerradas) o
  `siaf-custom-filter` (condiciones).
- `removable` si la pantalla no escucha `removed`: la × se pintaría y no haría nada.
- Rehacer la sección con `siaf-tag` sueltos en cada módulo: ya estuvo clonada en tres.
- Para el bloque «Parámetros aplicados» de la Guía de Estructura de Pantallas (tarjetas con ícono, nombre y valor):
  es otro componente, `siaf-parametros-aplicados`. Las consultas de hoy siguen con estas etiquetas.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `chips` | `FiltroChip[]` | `[]` |  |
| `removable` | `boolean` | `false` | Cada etiqueta lleva su × y emite `removed`. |
| `title` | `string` | `'Filtros aplicados de búsqueda'` | Título de la tarjeta; vacío, solo la fila de etiquetas. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(cleared)` | `void` | «Borrar filtros». |
| `(removed)` | `FiltroChip` | La × de una etiqueta, con su filtro. |

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- **Tab**: con `removable` recorre la × de cada etiqueta; después, «Borrar filtros». Sin `removable`, las etiquetas no
  reciben foco.
- **Enter / Espacio**: en una ×, quitan ese filtro (emite `removed`) y el foco pasa a «Borrar filtros»; en «Borrar
  filtros», quitan todos (emite `cleared`).

### Notas

- **1.3.1 Información y relaciones (A)**: con título, `<section>` con `<h3>`; cada etiqueta se lee como texto
  «Etiqueta: valores».
- **4.1.2 Nombre, función y valor (A)**: la × es un `<button>` «Quitar el filtro …» con el nombre de la etiqueta, y
  «Borrar filtros» es un `<button>` nombrado por su texto (`siaf-tag` `action`).
- **2.4.3 Orden del foco (A)**: al quitar una etiqueta, su × desaparece y el foco pasa a «Borrar filtros».
- **Pendiente · 2.4.3 Orden del foco (A)**: con `cleared` el bloque suele desaparecer con el foco adentro; el padre
  debe llevarlo (el panel de cuentas lo deja en el embudo; en las cuatro Consultas, todavía no).
- **1.4.3 Contraste mínimo (AA)**: el título y las etiquetas van en `text-neutral-medium` (14.53:1 / 12.87:1).
- **Pendiente · 2.1.1 Teclado (A)**: el carril se desplaza sin barra; sin `removable`, las etiquetas que no caben
  quedan cortadas y, con teclado, dependen de que el navegador enfoque el contenedor (el lector las lee todas).
- **Pendiente · 2.5.8 Tamaño del objetivo (AA)**: la × mide 20 × 20 px (sigue `siaf-tag`).

## Composición

Pinta por dentro: [`siaf-tag`](siaf-tag.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-consultas-filtros-chips
