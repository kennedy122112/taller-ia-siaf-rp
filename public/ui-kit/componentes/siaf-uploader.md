# Uploader

> `siaf-uploader` · Componente de Formularios

Zona de drag & drop con tarjetas de progreso, que valida cada archivo contra `accept` y `maxSizeMb`.

Dos variantes: `extended` (por defecto: ícono de nube, texto y `hint`) y `compact`, una sola fila
de 48 px con el botón «Elegir archivo» y «o soltar archivo», para formularios con poco alto.
Ambas aceptan soltar archivos y muestran las mismas tarjetas de progreso debajo.

Rara vez se usa suelto: vive dentro de `siaf-upload-side-nav`, que es el panel de carga que usan las
request-pages y la puerta de entrada normal. Ir directo a él solo para una carga embebida en página.

## Importar

```ts
import { UploaderComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-uploader />
```

### Cuándo usarlo

- Dentro de `siaf-upload-side-nav`, el panel que abren las solicitudes para adjuntar el sustento .pdf: es su uso
  normal.
- Suelto solo para una carga embebida en la página; `compact` (una fila de 48 px) cuando el formulario tiene poco alto,
  como el sustento de `siaf-annulment-modal`.
- `fileSelected` cuando un archivo termina de cargar y `fileRemoved` cuando se quita con su ×, para que el padre sepa
  si todavía tiene archivo.
- Con el `accept` y el `maxSizeMb` de cada caso (.pdf para el sustento, .xlsx para las cargas masivas): también
  valida lo que se suelta.

### Cuándo no

- Para mostrar un archivo ya adjunto o guardado: usar `siaf-uploaded-file-card`.
- Para el flujo de adjuntar en una solicitud: usar `siaf-upload-side-nav`, que ya trae título, Aceptar y Cancelar.
- Para mostrar el avance real de una subida al servidor: el progreso es simulado con un temporizador.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `accept` | `string` | `'.pdf'` |  |
| `hint` | `string` | `'Se permiten archivos de 10 MB como máximo'` |  |
| `maxSizeMb` | `number` | `10` |  |
| `multiple` | `boolean` | `false` |  |
| `variant` | `'extended' \| 'compact'` | `'extended'` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(allDone)` | `File[]` |  |
| `(fileRemoved)` | `File` | Archivo que se quitó con la × de su tarjeta: el padre deja de contar con él. |
| `(fileSelected)` | `File` |  |

## Accesibilidad

Roles y atributos del código: `aria-label`.

### Teclado

- **Tab**: enfoca el selector de archivos (el `input type="file"` oculto dentro de «elige archivo» o «Elegir
  archivo») y después los botones de cada tarjeta (Pausar, Reintentar, Cancelar).
- **Enter / Espacio**: en el selector abren el diálogo de archivos del sistema; en los botones, ejecutan la acción.

### Notas

- **2.1.1 Teclado (A)**: soltar archivos es opcional; el `input type="file"` nativo permite elegirlos con teclado.
- **2.4.7 Foco visible (AA)**: el `input type="file"` va oculto con `sr-only`, así que «elige archivo» (`extended`)
  y «Elegir archivo» (`compact`) pintan un contorno azul de 2 px (`border-states-focus`, 5.35:1 claro / 10.15:1
  oscuro) cuando el selector recibe el foco con teclado. Los botones de las tarjetas conservan el anillo nativo.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: ni el progreso, ni la carga terminada, ni el motivo de un rechazo se
  anuncian: no hay `role="status"`, `role="alert"` ni `aria-live`, y la barra es un `div` sin `role="progressbar"`.
- **3.3.1 Identificación de errores (A)**: un archivo de tipo o tamaño inválido queda en una tarjeta roja con el
  motivo en texto («Solo se admiten archivos .pdf»).
- **Pendiente · 3.3.2 Etiquetas o instrucciones (A)**: la ayuda (`hint`) no se asocia al selector y `compact` no la
  muestra.
- **4.1.2 Nombre, función y valor (A)**: el selector se nombra con el texto de su `label`; los botones de cada
  tarjeta tienen `aria-label` (Pausar, Reintentar, Cancelar) y los íconos son decorativos.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: «elige archivo» usa la clase `text-brand-primary`, que pinta con
  `bg-brand-primary`: 8.79:1 en claro, pero 2.66:1 en oscuro. El resto cumple: texto `text-neutral-high` 16.29:1,
  ayuda y peso `text-neutral-low` 5.01:1 y error `text-feedback-danger` 9.84:1.
- **2.5.8 Tamaño del objetivo (AA)**: los botones de las tarjetas miden 24 × 24 px (`size-6`).

## Composición

Pinta por dentro: [`siafTooltip`](siafTooltip.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-uploader
