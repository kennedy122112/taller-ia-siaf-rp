# Message box

> `message-box` · Componente de Estado y feedback

Recuadro informativo de una línea: fondo de superficie baja y un texto secundario.

Úsalo para avisos o notas breves dentro de un formulario o sección. Ya existe en el kit y se
reinventó a mano alguna vez: no vuelvas a maquetar este bloque. Para el estado vacío con título y
lupa, el componente canónico es `empty-section`.

## Importar

```ts
import { MessageBoxComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<message-box />
```

### Cuándo usarlo

- Como marcador gris de una sección que aún no tiene contenido: «No se han adjuntado archivos…» en el
  documento de sustento de la carga masiva del Plan de Cuentas.
- Para una nota breve y fija dentro de un formulario, sin tono de éxito, advertencia ni error.
- Ya va dentro de `empty-section`, donde muestra el mensaje inicial o el valor elegido.

### Cuándo no

- Para el patrón título + lupa + recuadro: usar `empty-section`.
- Para avisos con tono (información, advertencia, error) o que deben anunciarse: usar `siaf-alert`.
- Para confirmar una acción que acaba de terminar: usar `siaf-snackbar`.
- Para una pantalla de consulta sin resultados: usar `siaf-empty-state`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `text` | `string` | `''` |  |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No recibe foco: no es interactivo.

### Notas

- **1.3.1 Información y relaciones (A)**: es un párrafo dentro de un recuadro, sin rol ni encabezado propio:
  el título lo pone la sección que lo contiene.
- **1.4.3 Contraste mínimo (AA)**: `text-neutral-medium` sobre `bg-surfaces-surface-low`, 13.46:1 en claro y
  12.09:1 en oscuro.
- **4.1.3 Mensajes de estado (AA)**: no es región viva: si el texto cambia tras una acción, no se anuncia.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/message-box
