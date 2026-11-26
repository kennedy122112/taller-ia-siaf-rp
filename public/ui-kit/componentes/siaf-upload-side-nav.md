# Upload side nav

> `siaf-upload-side-nav` · Componente de Overlays

Panel lateral animado de carga de archivos: envuelve `siaf-uploader` y confirma con Aceptar/Cancelar.

Es la puerta de entrada normal a la carga en las request-pages (adjuntar el sustento .pdf); la
variante `bulk-chart-accounts` agrega los selects y el enlace de plantilla de la carga masiva.

«Aceptar» confirma el archivo que terminó de cargar y sigue en su tarjeta: si se quita con su × o el panel se vuelve
a abrir (el uploader aparece vacío), queda deshabilitado hasta cargar otro.

## Importar

```ts
import { UploadSideNavComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-upload-side-nav />
```

### Cuándo usarlo

- Para adjuntar el documento de sustento (.pdf) desde la request-page: plan de cuentas, asiento de ajuste, catálogo de
  ajuste (tipo y clase), catálogo de eventos, eventos contables y apertura contable.
- Con `variant="bulk-chart-accounts"` en la carga masiva del plan de cuentas: tipo de plan, plan a reemplazar y
  enlace a la plantilla Excel (`templateHref`).
- Con `accept`, `acceptedLabel`, `title` y `description` propios para subir un Excel, como el archivo de eventos de
  la carga masiva (SCM).
- `confirmed` para adjuntar el archivo a la solicitud: `fileSelected` avisa apenas termina de cargar, antes de que
  el usuario acepte, y el archivo todavía se puede quitar o cancelar.

### Cuándo no

- Para una carga embebida en la página, sin panel: usar `siaf-uploader` directo.
- Para mostrar un archivo ya adjunto: usar `siaf-uploaded-file-card`.
- Para elegir registros de un catálogo: usar `siaf-selection-side-nav`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `accept` | `string` | `'.pdf'` |  |
| `acceptedLabel` | `string` | `'Solo admite archivos .pdf'` |  |
| `description` | `string` | `'Sube un archivo .PDF en el formato correcto.'` |  |
| `hint` | `string` | `'Se permiten archivos de 10 MB como máximo'` |  |
| `maxSizeMb` | `number` | `10` |  |
| `open` | `boolean` | `false` |  |
| `planTypeOptions` | `TextFieldOption[]` | `[]` |  |
| `planTypeValue` | `string` | `''` |  |
| `replacementPlanOptions` | `TextFieldOption[]` | `[]` |  |
| `replacementPlanRequired` | `boolean` | `false` |  |
| `replacementPlanValue` | `string` | `''` |  |
| `templateDownloadName` | `string` | `''` |  |
| `templateHref` | `string` | `''` |  |
| `title` | `string` | `'Cargar Documento de Sustento'` |  |
| `variant` | `'default' \| 'bulk-chart-accounts'` | `'default'` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(closed)` | `void` |  |
| `(confirmed)` | `File` |  |
| `(fileSelected)` | `File` |  |
| `(planTypeValueChange)` | `string` |  |
| `(replacementPlanValueChange)` | `string` |  |

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- **Tab**: al abrir, el foco entra en la X; recorre, en carga masiva, los dos selects y el enlace de plantilla, el
  «elige archivo» de `siaf-uploader` y Cancelar / Aceptar, y da la vuelta sin salir del panel. Los selects siguen
  `siaf-input`.
- **Escape**: cierra el panel (emite `closed`) y el foco vuelve al botón que lo abrió; con la lista de un select
  abierta, Escape cierra solo la lista.
- **Enter / Espacio** en «elige archivo»: abre el selector de archivos del sistema (input de archivo nativo);
  arrastrar y soltar es solo con mouse.
- **Enter** en el enlace de plantilla: la descarga.
- **Enter / Espacio**: activan la X y Cancelar (emiten `closed`) y Aceptar (emite `confirmed` con el archivo;
  habilitado cuando hay un archivo cargado en su tarjeta y, en carga masiva, los selects obligatorios tienen valor).

### Notas

- **4.1.2 Nombre, función y valor (A)**: `role="dialog"` con `aria-modal="true"` y `aria-labelledby` al título; la X
  se llama «Cerrar».
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir lleva el foco a la X y al cerrar lo devuelve al botón que lo
  abrió; Tab no sale a la página de atrás.
- **2.1.1 Teclado (A)**: Escape cierra el panel como la X; arrastrar y soltar tiene alternativa: el input de archivo.
- **2.4.7 Foco visible (AA)**: «elige archivo» de `siaf-uploader` (variante `extended`, la de este panel) y el enlace
  de plantilla muestran un contorno azul de 2 px (`border-states-focus`, 5.35:1 claro / 10.15:1 oscuro) con el foco;
  la X y Cancelar quedan con el anillo nativo.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: el enlace «descárgalo aquí» y el «elige archivo» del uploader usan la
  clase `text-brand-primary`, que toma el fondo de marca: 8.79:1 en claro, pero 2.66:1 sobre la superficie en oscuro
  (el token de texto `--sys-color-text-brand-primary` da 10.15:1).
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: el avance («Subiendo...») y el rechazo del archivo en
  `siaf-uploader` no se anuncian (sin `role="status"` ni `aria-live`).
- **3.3.2 Etiquetas o instrucciones (A)**: en carga masiva los selects de `siaf-input` tienen etiqueta y marcan el
  obligatorio; el tipo admitido y el tamaño máximo se dicen en texto (`acceptedLabel`, `hint`).
- **2.5.8 Tamaño del objetivo (AA)**: la X y Cancelar miden 40 px.

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-input`](siaf-input.md), [`siaf-side-nav`](siaf-side-nav.md), [`siaf-uploader`](siaf-uploader.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-upload-side-nav
