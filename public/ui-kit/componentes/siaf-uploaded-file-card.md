# Uploaded file card

> `siaf-uploaded-file-card` · Componente de Formularios

Tarjeta de un archivo ya adjunto: ícono por formato, nombre truncado con tooltip, peso y
acciones de reemplazar/quitar.

Usarlo para mostrar el sustento PDF ya cargado de una solicitud; con `[readonly]` en modo consulta,
donde el adjunto se ve pero no se toca. Para elegir el archivo va `siaf-upload-side-nav`.

Con `[error]` pasa al estado fallido del Figma (UI KIT, nodo 2612:9065): borde, ícono, nombre y
acciones en el tono de error, y el mensaje en lugar del peso. Mismos tokens que la tarjeta fallida
de `siaf-uploader`, para que la carga y el archivo adjunto se vean iguales cuando algo sale mal.

## Importar

```ts
import { UploadedFileCardComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-uploaded-file-card />
```

### Cuándo usarlo

- Para el documento de sustento ya adjunto en las solicitudes: cuenta contable, carga masiva, clase de ajuste, tipo
  de asiento, asiento de ajuste, evento, evento contable y apertura contable.
- Con `[readonly]` en modo consulta o en un detalle, donde el adjunto se ve pero no se reemplaza ni se quita.
- Para el Excel ya cargado de la carga masiva de eventos, con `(replace)` que vuelve a abrir el panel de carga.
- Con `[error]` cuando el archivo adjunto no se pudo cargar.

### Cuándo no

- Para elegir o arrastrar el archivo: usar `siaf-upload-side-nav` (o `siaf-uploader` embebido); esta tarjeta solo
  muestra el que ya está adjunto.
- Para el aviso «No se han adjuntado archivos»: usar `message-box` en vez del bloque gris que hoy repiten a mano las
  solicitudes.
- Para el avance de una subida en curso: usar las tarjetas de progreso de `siaf-uploader`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `error` | `string` | `''` | Mensaje de error del archivo (ej. «No se pudo cargar el archivo»). Si trae texto, la tarjeta se muestra fallida. |
| `file` | `UploadedFileInfo \| null` | `null` |  |
| `readonly` | `boolean` | `false` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(removed)` | `void` |  |
| `(replace)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `role="alert"`, `aria-label`.

### Teclado

- **Tab**: recorre «Reemplazar archivo» y «Quitar archivo»; con `readonly` la tarjeta no recibe foco.
- **Enter / Espacio**: ejecutan la acción del botón enfocado.

### Notas

- **4.1.2 Nombre, función y valor (A)**: las acciones son `<button>` nativos con `aria-label` («Reemplazar archivo»,
  «Quitar archivo»); los íconos son decorativos.
- **4.1.3 Mensajes de estado (AA)**: el mensaje de error va con `role="alert"` y se anuncia al aparecer.
- **1.4.1 Uso del color (A)**: el estado fallido, además del rojo, muestra el mensaje en lugar del peso.
- **Pendiente · 2.1.1 Teclado (A)**: un nombre largo se corta y el completo solo aparece con el mouse o una pulsación
  larga: el `siafTooltip` está en un texto que no recibe foco.
- **2.4.7 Foco visible (AA)**: los botones no definen estilo de foco; queda el anillo nativo del navegador.
- **1.4.11 Contraste no textual (AA)**: los íconos de acción van en `text-neutral-low` 5.01:1 y, si falló, en
  `text-feedback-danger` 9.84:1.
- **1.4.3 Contraste mínimo (AA)**: nombre `text-neutral-high` 16.29:1, peso `text-neutral-low` 5.01:1 y error
  `text-feedback-danger` 9.84:1.
- **2.5.8 Tamaño del objetivo (AA)**: cada botón mide 24 × 24 px (`size-6`), justo el mínimo.

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-uploaded-file-card
