# Icon

> `siaf-icon` · Componente de Fundamentos

Icono de Material Icons por nombre, con tamaño en px, variante de familia y alias para
nombres que no existen en la fuente; decorativo por defecto (`aria-hidden`).

Es la única forma de pintar iconos en el design system: úsalo en vez de escribir a mano
un `<span class="material-icons">` o de incrustar SVG sueltos.

## Importar

```ts
import { IconComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-icon [name]="…" />
```

### Cuándo usarlo

- Para todo ícono de la app: dentro de `siaf-button` (`icon`), en las opciones de `siaf-menu`, la casa y las flechas
  de `siaf-breadcrumb` o el `info` de ayuda de las consultas.
- Decorativo (por defecto) cuando acompaña un texto que ya dice lo mismo, como el `add` de «Crear documento».
- Con `label` y `[decorative]="false"` solo si el ícono comunica algo que no dice ningún texto cercano, como el ícono
  de un campo de `siaf-summary-card` (`iconLabel`).
- `size` en px para igualar el Figma (24 en botones, 20 en menús compactos) y `variant` de la familia
  (`outlined` por defecto).

### Cuándo no

- Un `<span class="material-icons">` escrito a mano o un SVG suelto: usar siempre `siaf-icon`.
- Nombres que no existen en `material-icons` (inventados o solo de Material Symbols): se pintan como texto;
  `npm run icons:check` los detecta en CI.
- Como botón con clic propio: no recibe foco ni responde al teclado; usar `siaf-button` con `iconOnly` y `ariaLabel`.
- Para checkbox o radio: van con el `<input>` nativo del kit, no con íconos.

### Limitaciones

Un nombre que no existe no falla al compilar: se pinta como texto. `npm run icons:check` lo detecta en el CI.

### Así no / así sí

```html
<!-- ❌ Así no -->
<svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 19c0 1.1…" /></svg>

<!-- ✅ Así sí -->
<siaf-icon name="delete" [size]="20" />
```

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `decorative` | `boolean` | `true` |  |
| `label` | `string` | `''` |  |
| `name` (obligatoria) | `string` | — |  |
| `size` | `number` | `20` |  |
| `variant` | `'filled' \| 'outlined' \| 'round' \| 'sharp' \| 'two-tone'` | `'outlined'` |  |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `aria-hidden`, `aria-label`.

### Teclado

- No recibe foco: no es interactivo.

### Notas

- **Pendiente · 1.1.1 Contenido no textual (A)**: es decorativo por defecto (`aria-hidden="true"`), lo correcto
  junto a un texto. Con `[decorative]="false"` el `<span>` recibe `aria-label` con `label`, pero no `role="img"`, y
  ARIA no admite nombrar un elemento genérico: un lector puede ignorarlo y leer el nombre de la ligadura (p. ej.
  «close»). Sin `label`, ese nombre es lo único que hay.
- **1.4.1 Uso del color (A)**: toma el color del texto del padre; si marca un estado, el padre debe acompañarlo de
  texto o de otra forma, no solo del color.
- **1.4.11 Contraste no textual (AA)**: depende del color del padre; con `icon-states-enabled` (8.70:1 claro /
  12.87:1 oscuro) o `icon-states-active` (8.79:1 / 10.15:1) sobre la superficie cumple 3:1.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-icon
