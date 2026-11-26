# Card

> `siaf-card` · Componente de Superficies · Sin uso en la app

Contenedor con borde, cabecera opcional (título y descripción) y cuerpo proyectado.

Usarlo para agrupar contenido genérico de una pantalla. Para mostrar el ítem elegido desde un side
panel el canónico es `siaf-summary-card`, y para el estado vacío, `empty-section`.

## Importar

```ts
import { CardComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-card>…</siaf-card>
```

### Cuándo usarlo

- Para agrupar contenido libre con un título y una descripción corta fuera de las solicitudes: un bloque
  informativo de un tablero, de una consulta o de una pantalla de Admin.
- Cuando el bloque necesita su propio encabezado (`h2`) y el cuerpo lo arma el padre.
- Hoy no tiene consumidores en la app: revisar antes si una tarjeta específica del kit ya lo resuelve.

### Cuándo no

- En las pantallas de solicitud: usar `siaf-solicitude-form-card` (título en mayúsculas, `card-actions` y `loading`).
- Para el ítem elegido desde un panel lateral: usar `siaf-summary-card`; para el estado vacío, `empty-section`.
- Para el N° y el estado del documento abierto: usar `siaf-document-summary-card`.
- Anidar una `siaf-card` dentro de otra: se duplican borde y sombra; separar con encabezados.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `description` | `string` | `''` |  |
| `title` | `string` | `''` |  |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No recibe foco: no es interactivo; lo que se proyecta en el cuerpo sigue el teclado de su componente.

### Notas

- **1.3.1 Información y relaciones (A)**: el título es un `h2` y la descripción un párrafo dentro de un `section`;
  el padre debe ubicar la tarjeta donde un `h2` respete la jerarquía de encabezados.
- **1.4.3 Contraste mínimo (AA)**: título `text-neutral-high` 16.29:1 (oscuro 16.53:1) y descripción
  `text-neutral-low` 5.01:1 (8.86:1) sobre la superficie.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-card
