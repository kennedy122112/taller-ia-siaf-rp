# Reordenable

> `siafReordenable` · Directiva de Datos y tablas

Lista cuyos elementos se reordenan arrastrándolos con su manija o con el teclado. Va en el contenedor (un `div`, una
`ul` o el `tbody` de una tabla); cada hijo que se mueve lleva `siafReordenableItem` y, dentro, su `siaf-drag-handle`.
Usa el arrastre de `@angular/cdk/drag-drop`.

**No mueve nada por sí sola**: emite `(reordenado)` con el índice anterior y el actual, y la pantalla cambia su
arreglo, con `reordenar` de `shared/ui/reordenar/reordenar.ts`: `filas.update((f) => reordenar(f, $event))`.
El orden vive en la pantalla; si se graba, lo hace ella.

Con `orientacion="horizontal"` los elementos van uno al lado del otro y se mueven con ← y →; la manija de esa lista
lleva la misma orientación, con los puntos acostados. El arrastre queda fijo en el eje de la lista.

## Importar

```ts
import { ReordenableDirective } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<span siafReordenable="…"></span>
```

### Cuándo usarlo

- Para que el usuario elija el orden de unos pocos elementos que ya ve: los campos de agrupación de «Filtros
  avanzados» en Consultas y reportes (Figma de la Guía de Estructura de Pantallas 22402:16163), el orden de las
  columnas o de las filas de una tabla corta.
- En una tabla, con `reordenable` de `siaf-data-table` o `siaf-table`, que ya ponen la columna de la manija.

### Cuándo no

- Para ordenar por una columna (alfabético, por fecha): eso es un orden de la consulta, no un arrastre.
- Para listas paginadas: el arrastre solo ve la página actual y movería un elemento a otra posición de la que el
  usuario cree.
- Para mover elementos entre dos listas: esta directiva reordena dentro de una sola.

### Limitaciones

- No cambia el arreglo: sin `(reordenado)` que actualice la lista, el elemento vuelve a su sitio al soltarlo.
- Cada elemento necesita su `siaf-drag-handle`: sin manija no se puede tomar con el teclado (con el ratón, el CDK
  deja arrastrar desde todo el elemento).
- Las filas de una tabla se arrastran dentro de la tabla (`contenedorDeVistaPrevia="parent"`, que pone
  `siaf-data-table`): fuera de ella la fila perdía el ancho de sus columnas.

### Así no / así sí

```html
<!-- ❌ Así no -->
<div siafReordenable>

<!-- ✅ Así sí -->
<div siafReordenable (reordenado)="campos.update((c) => reordenar(c, $event))">
```

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `orientacion` | `'horizontal' \| 'vertical'` | `'vertical'` | Uno debajo de otro (↑ ↓) o uno al lado de otro (← →). |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(reordenado)` | `Reordenamiento` | Emite el índice que tenía el elemento y el que tiene ahora; la pantalla mueve su arreglo. |

## Accesibilidad

Roles y atributos del código: `aria-pressed`.

### Teclado

- **Tab**: llega a la manija de cada elemento.
- **Espacio / Enter** en la manija: toma el elemento; otra vez, lo suelta donde está.
- **↑ / ↓** (o **← / →** en una lista horizontal): con el elemento tomado, lo mueve una posición; el foco sigue en
  su manija.
- **Escape**: con el elemento tomado, lo devuelve a la posición en que se tomó.

### Notas

- **2.1.1 Teclado (A)**: todo lo que se hace arrastrando se hace también con el teclado desde la manija.
- **2.5.7 Movimientos de arrastre (AA)**: hay una alternativa sin arrastre, la del teclado, que también funciona con
  un lector de pantalla en un móvil (doble toque para tomar y soltar no basta: ahí la pantalla puede ofrecer además
  botones de subir y bajar).
- **4.1.3 Mensajes de estado (AA)**: tomar, mover, soltar y cancelar se anuncian con el `LiveAnnouncer` del CDK
  («Movido a la posición 2 de 3»), sin mover el foco.
- La manija tomada lleva `aria-pressed="true"`: el lector dice que está presionada mientras se mueve.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siafReordenable
