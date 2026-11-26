# Status tag

> `siaf-status-tag` · Componente de Estado y feedback

Etiqueta de estado del kit (Figma UI KIT, sección «Semántica»): cinco tonos (`default`, `info`, `success`, `warning`
y `danger`) en tres estilos, que son los de las familias de etiquetas del Figma: `solid` («flow tags», fondo oscuro y
texto blanco), `soft` («Period», «Expediente» y «Conciliación tags», fondo claro con borde) y `outline` («status items
tags», solo borde y el ícono del tono). Texto de 12 px, esquinas de 4 px, 32 px de alto en `standard` y 24 px en
`small`, y un ícono relleno de 20 px opcional antes del texto.

Es la base de `siaf-flow-status-tag` y `siaf-record-status-tag`, que guardan el mapa de cada estado a su tono y su
estilo. Usarla directo para un estado que no es del flujo de un documento ni de un registro.

El fondo de `solid` sale de `--sys-color-bg-status-solid-*`: en claro son los de feedback oscuro del Figma; en
oscuro, los tonos oscuros del flujo, porque en ese tema los de feedback oscuro pasan a tintes claros y el texto
blanco no se leería.

## Importar

```ts
import { StatusTagComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-status-tag>…</siaf-status-tag>
```

### Cuándo usarlo

- Para el estado de algo que no es un documento ni un registro, con los tonos del Figma: el de un expediente (Creado,
  En trámite, Archivado) o una conciliación (No conciliado, Pendiente de conciliación, Conciliado), con `soft`.
- `outline` con `icon` para estados de ítems que se leen en una lista (Enviado `send`, Completado `check_circle`,
  Pendiente `pending`, Observado `warning`).
- Para una marca informativa con color junto a un título, como las de cada ficha de `/ui-kit` («Requiere sesión»,
  «Sin uso en la app»), con `soft` y un ícono si ayuda.
- `small` (24 px) dentro de tablas y resúmenes; `standard` (32 px) sola, junto a un título.

### Cuándo no

- Para el estado del flujo de una solicitud: usar `siaf-flow-status-tag`, que ya sabe el tono de cada estado.
- Para el estado de un registro (Activo, Abierto, Cerrado…): usar `siaf-record-status-tag`.
- Para filtros aplicados, opciones que se eligen o valores que se pueden quitar: usar `siaf-tag`; para contadores,
  `siaf-badge`.
- Como única señal del estado: el tono es solo color, el estado tiene que ir escrito.

### Así no / así sí

```html
<!-- ❌ Así no -->
<!-- Un estado no es un tag de filtro ni de acción -->
<siaf-tag>Aprobado</siaf-tag>

<!-- ✅ Así sí -->
<siaf-status-tag tone="success">Aprobado</siaf-status-tag>
```

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `appearance` | `'solid' \| 'soft' \| 'outline'` | `'soft'` |  |
| `icon` | `string` | `''` | Ícono de Material Icons (relleno, 20 px) antes del texto. |
| `size` | `'standard' \| 'small'` | `'standard'` |  |
| `tone` | `'default' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'default'` |  |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No recibe foco: no es interactiva.

### Notas

- **1.4.1 Uso del color (A)**: el estado va escrito; el tono y el ícono solo lo refuerzan.
- **1.1.1 Contenido no textual (A)**: el ícono es decorativo (`siaf-icon` con `aria-hidden`); el estado se lee del
  texto.
- **1.3.1 Información y relaciones (A)**: es un `<span>`; el contexto lo da quien la contiene (la cabecera de la
  columna o la etiqueta del dato).
- **1.4.3 Contraste mínimo (AA)**: en claro, `solid` con texto blanco da 12.24:1 en `default`, 5.82:1 en `info`,
  4.71:1 en `success` y 7.13:1 en `danger`; `soft`, 11.46:1, 5.81:1, 5.31:1 y 6.21:1 en esos tonos; y `outline`,
  sobre la superficie, de 5.25:1 (`warning`) a 14.53:1 (`default`). En oscuro cumplen los 15: `solid` de 5.31:1
  (`warning`) a 7.97:1 (`default`), `soft` de 8.24:1 a 11.45:1 y `outline` de 10.59:1 a 16.53:1.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: en claro, `warning` no llega a 4.5:1 con texto de 12 px ni en `solid`
  (blanco sobre `bg-status-solid-warning`, 3.39:1) ni en `soft` (4.43:1); son los colores del Figma, a revisar con
  diseño.
- **4.1.3 Mensajes de estado (AA)**: no es región viva: un cambio de estado no se anuncia desde la etiqueta.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-status-tag
