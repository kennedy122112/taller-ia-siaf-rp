# Page shell

> `siaf-page-shell` · Componente de Layouts de página

Esqueleto de pagina autenticada NO formulario.

Renderiza el breadcrumb, deja al consumidor inyectar el header
(slot `[pageHeader]`) y el cuerpo principal (slot default).
Pensado para las pantallas de "Consultas y reportes …", listados
simples y otras vistas que no necesitan el ciclo de un
`siaf-solicitude-page-layout` (estados de documento, acciones de
verificacion/aprobacion, etc.).

Ejemplo:

  <siaf-page-shell [breadcrumbs]="breadcrumbs">
    <siaf-page-header pageHeader title="..." />
    <siaf-empty-state ... />
  </siaf-page-shell>

## Importar

```ts
import { PageShellComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-page-shell>…</siaf-page-shell>
```

### Cuándo usarlo

- Para las pantallas «Consultas y reportes» de cada proceso (plan de cuentas, asiento de ajuste, catálogo de tipos de
  asiento, contabilización y libros contables): breadcrumb, `siaf-page-header` en `[pageHeader]` y el resultado o
  `siaf-empty-state` en el cuerpo.
- Para listados simples y vistas de solo lectura que no tienen el ciclo de una solicitud.

### Cuándo no

- Para solicitudes con estados y acciones del flujo: usar `siaf-solicitude-page-layout`.
- Para la pantalla Documentos / Registros de un proceso: usar `siaf-documents-records-page`, que ya trae breadcrumb,
  título y pestañas.
- Sin `siaf-page-header` en `[pageHeader]`: la página queda sin `h1`.
- Dentro de otro contenedor con alto propio: fija su alto a la ventana menos el navbar (`100vh - 56px`).

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `breadcrumbs` | `BreadcrumbItem[]` | `[]` |  |
| `homeHref` | `string` | `'/panel'` |  |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No recibe foco: no es interactivo. El breadcrumb y el contenido proyectado siguen su componente.

### Notas

- **1.3.1 Información y relaciones (A)**: pinta el breadcrumb (`siaf-breadcrumb`, un `nav` con
  `aria-label="Ruta de navegación"`) y no trae encabezado propio: el `h1` lo pone el `siaf-page-header` proyectado en
  `[pageHeader]`. No agrega landmarks: vive dentro del `main` del shell.
- **2.4.3 Orden del foco (A)**: el DOM sigue el orden visual: breadcrumb, encabezado con sus acciones y cuerpo.

## Composición

Pinta por dentro: [`siaf-breadcrumb`](siaf-breadcrumb.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-page-shell
