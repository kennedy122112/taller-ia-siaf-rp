# Accordion

> `siaf-accordion` · Componente de Superficies · Sin uso en la app

Lista de secciones colapsables (details/summary) a partir de un arreglo de ítems.

Usarlo para preguntas frecuentes o bloques de contenido plegable. Variante `default` para
pantallas internas y `landing` para la portada pública. Un ítem con `disabled` no se abre.

## Importar

```ts
import { AccordionComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-accordion />
```

### Cuándo usarlo

- Preguntas frecuentes de la portada pública con la variante `landing` (pantalla de Preguntas frecuentes).
- Ayudas o notas de solo texto en pantallas internas que el usuario abre a demanda (variante `default`).
- Cuando cada sección es un título y un párrafo: `openId` elige cuál empieza abierta y el resto lo maneja el
  `details` nativo (pueden quedar varias abiertas).

### Cuándo no

- Para contenido rico (formularios, grillas, botones): el ítem solo acepta texto; usar `siaf-expansion-panel`.
- Para ítems de una selección que se quitan con X: usar `siaf-collapsible-card`.
- Para secciones obligatorias de una solicitud: dejarlas visibles en `siaf-solicitude-form-card`.
- Marcar `disabled` para esconder un ítem: sigue enfocable y se despliega vacío; mejor no incluirlo.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `items` | `AccordionItem[]` | `[]` |  |
| `openId` | `string` | `''` |  |
| `variant` | `'default' \| 'landing'` | `'default'` |  |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- **Tab**: pasa de un título a otro (cada título es un `summary` nativo).
- **Enter / Espacio**: abren o cierran la sección enfocada (comportamiento nativo de `details`).

### Notas

- **Pendiente · 4.1.2 Nombre, función y valor (A)**: `details` y `summary` nativos anuncian cada título como
  desplegable con su estado, sin ARIA extra; pero un ítem `disabled` solo se atenúa (`opacity-50`): su `summary`
  sigue recibiendo foco, se despliega vacío al pulsarlo y no publica `aria-disabled`.
- **1.1.1 Contenido no textual (A)**: la flecha y los íconos más / menos de `landing` son `siaf-icon` decorativos
  (`aria-hidden`).
- **1.4.1 Uso del color (A)**: abierto o cerrado se ve en la flecha que gira o en el cambio de más a menos, no solo
  en el fondo.
- **1.4.3 Contraste mínimo (AA)**: en `default`, título `text-neutral-high` 16.29:1 (oscuro 16.53:1) y contenido
  `text-neutral-low` 5.01:1 (8.86:1) sobre la superficie; `landing` usa la paleta propia del sitio público (`--sys-color-landing-*`) fuera de
  los tokens, así que su contraste depende del fondo de la portada.
- **2.4.7 Foco visible (AA)**: no define estilo de foco ni lo quita: el `summary` muestra el contorno por defecto
  del navegador.
- **2.5.8 Tamaño del objetivo (AA)**: cada título ocupa todo el ancho y mide al menos 48 px de alto (72 px en
  `landing`).

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-accordion
