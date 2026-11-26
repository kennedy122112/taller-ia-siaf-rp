# Desk card

> `siaf-desk-card` · Componente de Superficies

Tarjeta del Panel de inicio (escritorio virtual): ícono, título y un número opcional, en las tres formas de esa
pantalla. `featured` es la grande, con el ícono en un recuadro y el número bajo el título (Bandeja de Documentos, o
Procesos sin número); `counter`, un contador con el título y el número a la izquierda y el ícono de color a la
derecha, sin recuadro (Recibidos, Enviados, Borradores, Notificaciones); `shortcut`, un acceso con el ícono en
recuadro y el título, que no muestra número (Consulta y Reportes, Crear documento). El número va con dos dígitos
como mínimo («04»).

Con `interactive` toda la tarjeta es un `button` que emite `activated`; sin él es un `article` que no recibe foco.

## Importar

```ts
import { DeskCardComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-desk-card [icon]="…" [title]="…" />
```

### Cuándo usarlo

- En el Panel de inicio (`siaf-virtual-desk`): Bandeja de Documentos y Procesos arriba (`featured`), los contadores
  de la bandeja (`counter`) y los accesos (`shortcut`) debajo.
- Con `interactive` cuando pulsarla abre algo, como «Procesos», que abre el menú de procesos del shell.
- `tone` para el color del ícono, que acompaña al título: Enviados y Crear documento en `accent`, Recibidos en
  `success`, Borradores en `warning`.

### Cuándo no

- Para un monto con su avance respecto de una meta, en un tablero: usar `siaf-kpi-card`.
- Para agrupar contenido de una pantalla: usar `siaf-card`.
- `interactive` en una tarjeta que no hace nada al pulsarla: parece un acceso roto.
- Con enlaces o botones adentro: la tarjeta interactiva ya es un `button` y no admite otros controles.
- Para decir algo solo con el color del ícono: el título tiene que decirlo.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `icon` (obligatoria) | `string` | — | Ícono de Material Icons. |
| `interactive` | `boolean` | `false` | Toda la tarjeta pasa a ser un `button` que emite `activated`. |
| `title` (obligatoria) | `string` | — | Qué es la tarjeta («Bandeja de Documentos»); también nombra el `article`. |
| `tone` | `'success' \| 'warning' \| 'neutral' \| 'primary' \| 'accent'` | `'neutral'` | Color del ícono. |
| `value` | `number \| null` | `null` | Número de `featured` y `counter`; con `null` no se muestra. `shortcut` nunca lo muestra. |
| `variant` | `'featured' \| 'counter' \| 'shortcut'` | `'shortcut'` | `featured` (grande, número opcional), `counter` (contador) o `shortcut` (acceso, sin número). |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(activated)` | `void` |  |

## Accesibilidad

Roles y atributos del código: `aria-hidden`, `aria-label`.

### Teclado

- **Tab**: enfoca la tarjeta si es `interactive`; si no, no recibe foco.
- **Enter / Espacio**: en la interactiva, emiten `activated`.

### Notas

- **4.1.2 Nombre, función y valor (A)**: la interactiva es un `button` nativo nombrado con su texto; la otra es un
  `article` nombrado con el título.
- **1.1.1 Contenido no textual (A)**: el ícono es decorativo (`aria-hidden`): el título dice qué es.
- **1.3.1 Información y relaciones (A)**: el número visible, con ceros a la izquierda, se oculta al lector de
  pantalla, que lee el valor sin relleno («4» y no «cero cuatro»).
- **1.4.1 Uso del color (A)**: el tono del ícono no dice nada por sí solo.
- **1.4.3 Contraste mínimo (AA)**: título y número `text-brand-secondary` sobre la superficie (8.70:1 claro /
  12.87:1 oscuro), y 8.06:1 / 8.66:1 sobre el fondo de hover de la interactiva.
- **1.4.11 Contraste no textual (AA)**: los íconos quedan sobre 3:1 aunque son decorativos (`accent` 4.14:1 /
  4.29:1 es el más bajo).
- **2.4.7 Foco visible (AA)**: contorno de 2 px `border-states-focus` separado 2 px (5.35:1 claro / 10.15:1 oscuro).
- **2.5.8 Tamaño del objetivo (AA)**: toda la tarjeta es el objetivo, de al menos 120 px de alto.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-desk-card
