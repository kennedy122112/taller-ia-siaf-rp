# Landing header

> `siaf-landing-header` · Componente de Landing público · Sin uso en la app

Cabecera del sitio público: el logo del SIAF-RP a la izquierda y el acceso a Entidades y
proveedores (que lleva al login) a la derecha.

Es la primera pieza de todas las páginas del landing y no tiene estado: el visitante no ha
iniciado sesión todavía.

## Importar

```ts
import { LandingHeaderComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-landing-header />
```

### Cuándo usarlo

- En todas las páginas del landing, como primer elemento dentro del contenedor de la página.

### Cuándo no

- Dentro de la aplicación autenticada: ahí la cabecera es `siaf-navbar`, con menús y perfil.
- Para navegar entre secciones del landing: eso lo hace `siaf-landing-systems-bar`.

## Entradas

No recibe entradas.

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `aria-label`.

### Teclado

- **Tab**: enfoca el logo (vuelve al inicio del landing) y el botón de acceso.
- **Enter**: activa el enlace enfocado.

### Notas

- **1.1.1 Contenido no textual (A)**: el logo lleva texto alternativo con el nombre del sistema.
- **2.4.4 Propósito del enlace (A)**: «Entidades o proveedores» dice a dónde lleva.
- **1.4.3 Contraste mínimo (AA)**: texto sobre blanco con los tokens de marca del producto.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-landing-header
