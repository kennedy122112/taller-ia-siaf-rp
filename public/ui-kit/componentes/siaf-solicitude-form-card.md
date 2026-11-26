# Solicitude form card

> `siaf-solicitude-form-card` · Componente de Superficies

Tarjeta de sección de las pantallas de solicitud y de los formularios de Admin: cabecera con el título en
mayúsculas (`h2`), un ícono (i) opcional con `titleInfo` y las acciones proyectadas con el atributo `card-actions`,
y debajo el cuerpo proyectado.

Con `loading` la cabecera muestra una barra gris animada en lugar del título. Sin `title` ni `loading` no se pinta
la cabecera, así que tampoco aparecen las `card-actions`.

## Importar

```ts
import { SolicitudeFormCardComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-solicitude-form-card>…</siaf-solicitude-form-card>
```

### Cuándo usarlo

- Para cada sección de una solicitud: «Tipo de modificación», «Lista de cuentas contables», «Registro de asiento de
  ajuste», «Registros de eventos», «Justificación del sustento».
- Para los bloques de los formularios de Admin: datos de la entidad, de la UE, del usuario o del correlativo.
- Cuando la sección lleva acciones en la cabecera (buscar, Cancelar / Aceptar) con `card-actions`, o `loading`
  mientras llega el detalle (carga masiva de cuentas contables).

### Cuándo no

- Para el N° y el estado del documento o para los datos generales de la solicitud: usar
  `siaf-document-summary-card` o `siaf-solicitude-info-card`.
- Para un contenedor genérico fuera de las solicitudes: usar `siaf-card`.
- Sin `title` cuando hacen falta acciones: no se pinta la cabecera y las `card-actions` no aparecen.
- Para secciones que el usuario pliega: usar `siaf-expansion-panel` dentro de la tarjeta.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `loading` | `boolean` | `false` |  |
| `title` | `string` | `''` |  |
| `titleInfo` | `string` | `''` | Tooltip del ícono (i) junto al título; si está vacío no se muestra el ícono. |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No recibe foco: es un contenedor. Las `card-actions` y el contenido siguen el teclado de su componente; el ícono
  (i) de `titleInfo` no es enfocable.

### Notas

- **1.3.1 Información y relaciones (A)**: el título es un `h2` dentro de un `section`, así cada sección de la
  solicitud aparece en la lista de encabezados.
- **1.4.3 Contraste mínimo (AA)**: título `text-neutral-high` sobre la superficie, 16.29:1 (oscuro 16.53:1).
- **Pendiente · 1.1.1 Contenido no textual (A)**: el ícono (i) de `titleInfo` recibe `label` pero sigue
  `decorative` (`aria-hidden`), así que su texto no llega al lector de pantalla; hoy ningún consumidor lo usa.
- **Pendiente · 2.1.1 Teclado (A)**: ese texto solo se ve en el atributo `title` al pasar el puntero; el ícono no
  recibe foco.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: con `loading` la cabecera pinta una barra animada sin texto ni
  `aria-busy`, así que la carga no se anuncia.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-solicitude-form-card
