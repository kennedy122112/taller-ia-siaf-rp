# Landing footer

> `siaf-landing-footer` · Componente de Landing público · Sin uso en la app

Pie del sitio público: redes sociales, identidad institucional del MEF y enlaces de ayuda,
sobre los azules de la paleta del landing.

`flush` lo pega al contenido de arriba, para las páginas que ya terminan en una sección con
fondo propio y no necesitan el margen superior.

## Importar

```ts
import { LandingFooterComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-landing-footer />
```

### Cuándo usarlo

- Al cierre de cada página del landing, después del contenido.
- Con `flush` cuando la sección anterior ya trae su propio fondo y el margen sobra.

### Cuándo no

- Dentro de la aplicación autenticada: las pantallas de trabajo no llevan pie institucional.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `flush` | `boolean` | `false` |  |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `aria-label`.

### Teclado

- **Tab**: recorre los enlaces de redes y los de ayuda, en el orden en que se leen.
- **Enter**: abre el enlace enfocado.

### Notas

- **1.1.1 Contenido no textual (A)**: cada ícono de red lleva su nombre accesible.
- **1.4.3 Contraste mínimo (AA)**: texto blanco sobre los azules del landing.
- **2.4.4 Propósito del enlace (A)**: los enlaces de ayuda dicen su destino.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-landing-footer
