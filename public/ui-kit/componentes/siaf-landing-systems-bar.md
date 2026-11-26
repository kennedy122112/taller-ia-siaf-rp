# Landing systems bar

> `siaf-landing-systems-bar` · Componente de Landing público · Sin uso en la app

Barra de los sistemas gubernamentales: una fila de accesos con ícono y nombre, bajo el hero.

Pinta los `sistemas` que recibe, cada uno con un enlace a `rutaBase` más su `slug`. `activo` marca
el sistema de la página que se está viendo, para que el visitante sepa dónde está.

## Importar

```ts
import { LandingSystemsBarComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-landing-systems-bar />
```

### Cuándo usarlo

- Bajo el hero del inicio y en el detalle de un sistema, con `activo` en el que se muestra.

### Cuándo no

- Como navegación de la aplicación: el menú de procesos es `siaf-process-menu-tree`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `activo` | `string \| null` | `null` | Slug del sistema activo (para resaltarlo). |
| `rutaBase` | `string` | `'/landing/sistemas'` | Ruta del detalle de cada sistema, sin el slug. |
| `sistemas` | `SistemaLanding[]` | `[]` | Sistemas de la fila, en orden. |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `aria-label`.

### Teclado

- **Tab**: recorre los sistemas en el orden de la fila.
- **Enter**: abre el detalle del sistema enfocado.

### Notas

- **4.1.2 Nombre, función y valor (A)**: es un `nav` con nombre y cada acceso es un enlace con texto.
- **1.4.10 Reajuste del contenido (AA)**: en pantallas angostas la fila se desplaza en horizontal
  sin desplazar la página.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-landing-systems-bar
