# Readonly

> `siaf-readonly` · Componente de Formularios · Sin uso en la app

Bloque de solo lectura: etiqueta en mayúsculas sobre el valor, dentro de un recuadro gris.

Hoy no tiene consumidores: los datos de solo lectura se pintan con `siaf-text-field [disabled]`
o con `siaf-summary-card`. Ojo, `siaf-readonly-field` es un componente distinto: no lo confundas
con este.

## Importar

```ts
import { ReadonlyComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-readonly />
```

### Cuándo usarlo

- Solo si un diseño pide el bloque gris con la etiqueta en mayúsculas sobre el valor; hoy ninguna pantalla lo usa.
- Para un dato de contexto suelto dentro de un panel o modal (Entidad, Año fiscal) que debe verse como bloque.

### Cuándo no

- Para el modo lectura de una solicitud o los criterios de una consulta: usar `readonly-field`, que es el que usan
  las pantallas.
- Para el ítem elegido desde un panel lateral: usar `siaf-summary-card`; para un aviso breve, `message-box`.
- Para un dato que el usuario puede cambiar: usar `siaf-input`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `label` | `string` | `''` |  |
| `value` | `string` | `''` |  |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No recibe foco: no es interactivo.

### Notas

- **1.3.1 Información y relaciones (A)**: es texto estático: la etiqueta va antes del valor en el DOM, así que se
  leen juntos y en orden; no usa `dt`/`dd` ni `aria-labelledby`.
- **Pendiente · 1.4.3 Contraste mínimo (AA)**: la etiqueta de 12 px va en `text-neutral-low` sobre
  `bg-surfaces-surface-high` (`bg-surface-muted`), par que la tabla no mide: con los valores del tema claro no llega
  a 4.5:1 (sobre `surface-low`, un fondo más claro, ya baja a 4.64:1).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-readonly
