# Solicitude header

> `siaf-solicitude-header` · Componente de Layouts de página

Encabezado de una pantalla de solicitud: Regresar, título (`heading`) con etiqueta («Nuevo», «Edición»), texto
secundario y la botonera del flujo (Cancelar, Grabar, Verificar, Editar, Eliminar, Aprobar, Observar, Rechazar).
Qué botones se ven sale de una matriz por `role` (creador o aprobador) y `state` del documento; sin esa combinación
mandan los inputs sueltos, y `customActions` cambia la botonera por lo proyectado en `[actions]`.
En escritorio los botones van a la derecha. En móvil van en una barra fija inferior donde la última acción es la
principal (con ícono y el resto del ancho) y las demás van solo con texto. `loading` pinta un esqueleto.

## Importar

```ts
import { SolicitudeHeaderComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-solicitude-header>…</siaf-solicitude-header>
```

### Cuándo usarlo

- Dentro de `siaf-solicitude-page-layout`, que lo pinta con `role` y `state`: así lo usan las request-pages de
  Contabilidad y los formularios de Admin.
- Con `customActions` y botones en `[actions]` cuando el proceso tiene acciones fuera de la matriz, como «Reprocesar»
  en el detalle de contabilización.
- Con `saveDisabled` para dejar Grabar deshabilitado mientras no hay cambios (patrón «Grabar solo con cambios»).

### Cuándo no

- Suelto con su propio breadcrumb y contenedor: usar `siaf-solicitude-page-layout`, que lo fija bajo el navbar y
  reenvía los eventos (hoy solo la ruta `formulario` de asiento de ajuste lo arma a mano).
- Para pantallas sin ciclo de documento (consultas, listados): usar `siaf-page-header`.
- Para acciones de una tarjeta o sección: ponerlas en la tarjeta y apagar la botonera con `showButtonGroup` en false,
  como el Gestor de Usuarios.
- Para mostrar el estado del documento en el flujo: usar `siaf-flow-status-tag`; esta etiqueta solo marca «Nuevo» o
  «Edición».

### Limitaciones

Sus breakpoints miran el ancho de la ventana, no el del contenedor: dentro de una columna angosta se ve con el diseño de escritorio.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `approveLabel` | `string` | `'Aprobar'` |  |
| `customActions` | `boolean` | `false` | Reemplaza el grupo de botones estándar por contenido proyectado con el atributo `actions`: `<siaf-button actions ...>`. Para procesos con acciones fuera de la matriz rol/estado. |
| `deleteLabel` | `string` | `'Eliminar'` |  |
| `editLabel` | `string` | `'Editar'` |  |
| `heading` | `string` | `'Heading name'` |  |
| `loading` | `boolean` | `false` |  |
| `observeLabel` | `string` | `'Observar'` |  |
| `rejectLabel` | `string` | `'Rechazar'` |  |
| `role` | `'' \| SolicitudeHeaderRole` | `''` |  |
| `saveDisabled` | `boolean` | `false` |  |
| `saveVariant` | `'primary' \| 'accent' \| 'secondary'` | `'secondary'` |  |
| `secondaryText` | `string` | `'Creacion'` |  |
| `showButtonGroup` | `boolean` | `true` |  |
| `showDelete` | `boolean` | `false` |  |
| `showEdit` | `boolean` | `false` |  |
| `showReturn` | `boolean` | `false` |  |
| `showSecondaryText` | `boolean` | `true` |  |
| `showTag` | `boolean` | `true` |  |
| `showVerify` | `boolean` | `true` |  |
| `state` | `'' \| SolicitudeHeaderState` | `''` |  |
| `tagLabel` | `string` | `'Nuevo'` |  |
| `tagTone` | `'info' \| 'accent'` | `'accent'` |  |
| `type` | `'readonly' \| 'actions'` | `'readonly'` |  |
| `verifyDisabled` | `boolean` | `false` |  |
| `verifyLabel` | `string` | `'Verificar'` |  |

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

Roles y atributos del código: `aria-label`.

### Teclado

- **Tab**: recorre Regresar (si `showReturn`) y los botones visibles en su orden; en móvil, la barra fija inferior va
  en el DOM justo después del encabezado. Los deshabilitados no reciben foco.
- **Enter / Espacio**: activan cada botón y emiten su evento (`returned`, `canceled`, `saved`, `verified`, `edited`,
  `deleted`, `approved`, `observed` o `rejected`). Los botones siguen `siaf-button`.

### Notas

- **1.3.1 Información y relaciones (A)**: `heading` es el `h1` de la página; la etiqueta y el texto secundario van
  como texto junto a él.
- **4.1.2 Nombre, función y valor (A)**: Regresar lleva `aria-label="Regresar"`; en la barra móvil cada botón se
  nombra con su texto visible (el ícono de la principal es decorativo), y los deshabilitados (Grabar sin cambios,
  Eliminar en observado) exponen `disabled`.
- **2.5.8 Tamaño del objetivo (AA)**: los botones de la barra móvil miden 48 px de alto; en escritorio, 40.
- **2.4.3 Orden del foco (A)**: en escritorio los botones siguen al título; en móvil la barra fija inferior va en el
  DOM después del encabezado, así que Tab llega a las acciones antes que al formulario.
- **Pendiente · 2.4.11 Foco no oculto (AA)**: en móvil la barra de acciones es `fixed` abajo y no hay
  `scroll-padding`: al avanzar con Tab, un campo puede quedar tapado por ella.
- **1.4.11 Contraste no textual (AA)**: el anillo de foco de Regresar (2 px) es el azul del kit
  (`border-states-focus`, 5.35:1 claro / 10.15:1 oscuro sobre `bg-surface`). Los demás botones siguen `siaf-button`.
- **1.4.3 Contraste mínimo (AA)**: `h1` `text-text` (16.29:1 / 16.53:1), texto secundario `text-text-muted` (5.01:1 /
  8.86:1) y la etiqueta en blanco sobre `bg-brand-accent` (4.89:1 / 5.65:1) o `bg-brand-primary` (8.79:1 / 6.67:1).
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: con `loading` el título y los botones se cambian por un esqueleto
  sin `aria-busy` ni `role="status"`: la carga no se anuncia.
- **Pendiente · 2.1.1 Teclado (A)**: desde `sm` el `h1` se corta y el texto completo sale con `siafTooltip`, que se
  abre con el mouse o con el foco; como el `h1` no es enfocable, con teclado no se puede ver.

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-button`](siaf-button.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-solicitude-header
