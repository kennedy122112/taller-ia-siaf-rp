# Solicitude page layout

> `siaf-solicitude-page-layout` · Componente de Layouts de página

Armazón de las pantallas de solicitud: breadcrumb y `siaf-solicitude-header` en una cabecera que queda fija bajo el
navbar en escritorio, y debajo el contenido proyectado (las tarjetas del formulario).
Reenvía al header `role`, `state`, los textos, `loading` y los deshabilitados de Grabar y Verificar, y re-emite sus
eventos (`saved`, `verified`, `approved`…); con `customActions`, lo proyectado en `[actions]` pasa al header.

## Importar

```ts
import { SolicitudePageLayoutComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-solicitude-page-layout>…</siaf-solicitude-page-layout>
```

### Cuándo usarlo

- En toda request-page con ciclo de documento: plan de cuentas (solicitud y carga masiva), asiento de ajuste,
  catálogo de ajuste (tipo y clase), catálogo de eventos (SCE y SCM), eventos contables y apertura contable.
- En los formularios de Admin (usuarios, entidades, unidades ejecutoras, dependencias, perfiles, procedimientos,
  sistemas funcionales, correlativos) con `role="creator"` y `state` en `new` o `edit`.
- Con `customActions` en detalles con acciones propias («Reprocesar» en contabilización) y con `showButtonGroup` en
  false cuando los botones van en la tarjeta.

### Cuándo no

- Para consultas, reportes y listados sin ciclo de documento: usar `siaf-page-shell` con `siaf-page-header`.
- Para la pantalla Documentos / Registros de un proceso: usar `siaf-documents-records-page`.
- Rearmar a mano el breadcrumb y `siaf-solicitude-header` en la página: se pierden la cabecera fija y el reenvío de
  eventos.
- Repetir Grabar o Verificar dentro del contenido cuando la matriz de `role` y `state` ya los resuelve en el header.

### Limitaciones

Sus breakpoints miran el ancho de la ventana, no el del contenedor: dentro de una columna angosta se ve con el diseño de escritorio.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `breadcrumbs` | `BreadcrumbItem[]` | `[]` |  |
| `customActions` | `boolean` | `false` | Reemplaza los botones estándar del header por el slot proyectado `[actions]`. |
| `floatingPanelOpen` | `boolean` | `false` |  |
| `heading` | `string` | `''` |  |
| `loading` | `boolean` | `false` |  |
| `role` | `'' \| SolicitudeHeaderRole` | `'creator'` | Rol del encabezado; vacío (el visualizador) no muestra el grupo de botones estándar. |
| `saveDisabled` | `boolean` | `false` |  |
| `secondaryText` | `string` | `''` |  |
| `showButtonGroup` | `boolean` | `true` | Apaga el grupo de botones estándar del header (para páginas con botones a nivel de card). |
| `showReturn` | `boolean` | `true` |  |
| `showTag` | `boolean` | `true` |  |
| `state` | `SolicitudeHeaderState` | `'new'` |  |
| `trayMenuOpen` | `boolean` | `false` |  |
| `verifyDisabled` | `boolean` | `false` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(approved)` | `void` |  |
| `(canceled)` | `void` |  |
| `(deleted)` | `void` |  |
| `(edited)` | `void` |  |
| `(observed)` | `void` |  |
| `(rejected)` | `void` |  |
| `(returned)` | `void` |  |
| `(saved)` | `void` |  |
| `(verified)` | `void` |  |

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No agrega teclado propio: Tab recorre el breadcrumb, Regresar y los botones de `siaf-solicitude-header` y después
  el contenido proyectado; cada control sigue su componente.

### Notas

- **1.3.1 Información y relaciones (A)**: breadcrumb (`nav` con `aria-label="Ruta de navegación"`) y el `h1` del
  header arriba; las tarjetas proyectadas siguen con `h2` (`siaf-solicitude-form-card`). No agrega landmarks: vive
  dentro del `main` del shell.
- **2.4.3 Orden del foco (A)**: el DOM sigue el orden visual: breadcrumb, Regresar, acciones del header y contenido.
- **Pendiente · 2.4.11 Foco no oculto (AA)**: en escritorio la cabecera es `sticky` bajo el navbar y no hay
  `scroll-padding`: al volver con Shift + Tab, un campo puede quedar tapado. En móvil, `pb-24` solo evita que la
  barra fija del header tape el final del contenido.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: con `loading` el esqueleto del header no se anuncia (hereda de
  `siaf-solicitude-header`).

## Composición

Pinta por dentro: [`siaf-breadcrumb`](siaf-breadcrumb.md), [`siaf-solicitude-header`](siaf-solicitude-header.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-solicitude-page-layout
