# Reordenable item

> `siafReordenableItem` · Directiva de Datos y tablas

Un elemento de una lista `siafReordenable`: el que se arrastra. Lleva adentro su `siaf-drag-handle`, de donde se
toma con el ratón, el dedo o el teclado. Usa `CdkDrag` de `@angular/cdk/drag-drop`.

Mientras se arrastra, una copia con sombra (elevación 8) sigue al puntero y en su lugar queda el hueco con el fondo
del estado «dragged» (`bg-states-light-dragged`), sin su contenido: los demás se corren para hacerle sitio.

## Importar

```ts
import { ReordenableItemDirective } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<span siafReordenableItem="…"></span>
```

### Cuándo usarlo

- En cada hijo directo de un contenedor con `siafReordenable`: una fila de campos, una tarjeta, un `<tr>`.
- Con `contenedorDeVistaPrevia="parent"` cuando el elemento depende del contenedor para verse bien, como una fila de
  tabla (sus celdas toman el ancho de las columnas).

### Cuándo no

- Fuera de un `siafReordenable`: se podría arrastrar, pero nadie recibe el cambio.
- Sin `siaf-drag-handle` adentro: el elemento no se podría tomar con el teclado.

### Limitaciones

- La copia que sigue al puntero va al final del `body` salvo con `contenedorDeVistaPrevia="parent"`: allí no le llegan
  los estilos que dependen del contenedor.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `contenedorDeVistaPrevia` | `'global' \| 'parent'` | `'global'` | Dónde va la copia que sigue al puntero: `global` (al final del `body`, por defecto) o `parent` (dentro del mismo contenedor, para que conserve sus estilos; lo usa la fila de una tabla). |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No recibe foco: el teclado actúa sobre su manija (ver `siafReordenable`).

### Notas

- **2.1.1 Teclado (A)**: se mueve desde la manija con Espacio y las flechas; el elemento no necesita foco propio.
- **2.3.3 Animación por interacción (AAA)**: con `prefers-reduced-motion`, los demás elementos saltan a su sitio sin
  deslizarse.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siafReordenableItem
