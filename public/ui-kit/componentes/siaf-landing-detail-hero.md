# Landing detail hero

> `siaf-landing-detail-hero` · Componente de Landing público · Sin uso en la app

Encabezado de las páginas de detalle del landing: título, bajada e imagen ancha.

Lo comparten noticia, servicio y sistema (Figma 40005100:93729), que antes repetían el mismo
markup con el ancho del texto como única diferencia. No es un componente del design system:
vive en el landing porque el producto no lo usa.

## Importar

```ts
import { LandingDetailHeroComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-landing-detail-hero [bajada]="…" [imagen]="…" [titulo]="…" />
```

### Cuándo usarlo

- Como primer bloque de una página de detalle del landing, después de la cabecera.
- Con `anchoTitulo` y `anchoBajada` en los valores del Figma de esa página, y `altoClase` si su
  sección mide distinto en escritorio.

### Cuándo no

- En la aplicación: ahí el encabezado de una pantalla es `siaf-page-header`.
- Para un hero con fondo de color y llamada a la acción: ese es el del inicio, que vive en su página.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `alt` | `string` | `''` | Texto alternativo de la imagen; por defecto, el título. |
| `altoClase` | `string` | `'sm:h-[589px]'` | Alto fijo de la sección en escritorio: 535 px en noticia, 589 px en servicio y sistema. |
| `anchoBajada` | `number` | `650` |  |
| `anchoTitulo` | `number` | `470` | Ancho máximo del título y de la bajada, que cambian según la página (Figma). |
| `bajada` (obligatoria) | `string` | — |  |
| `imagen` (obligatoria) | `string` | — |  |
| `titulo` (obligatoria) | `string` | — |  |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No tiene controles: es contenido. El foco pasa de la cabecera al contenido siguiente.

### Notas

- **1.3.1 Información y relaciones (A)**: el título es el `h1` de la página.
- **1.1.1 Contenido no textual (A)**: la imagen lleva `alt`; sin `alt` propio usa el título.
- **1.4.10 Reajuste del contenido (AA)**: en móvil la imagen baja a 240 px de alto y el texto ocupa
  todo el ancho.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-landing-detail-hero
