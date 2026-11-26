# Record status tag

> `siaf-record-status-tag` · Componente de Estado y feedback

Etiqueta del estado de un registro (Activo, Anulado, Abierto, Cerrado, Procesado…), dibujada con `siaf-status-tag`.
Los estados que están en el Figma siguen su familia: Abierto y Cerrado, las «Period tags» (fondo suave azul y gris,
sin ícono); En Proceso y Validado, las «status items tags» (solo borde, azul, con `change_circle` y `fact_check`).
Activo, Inactivo, Anulado, Eliminado y Procesado, que el Figma no tiene, van con fondo suave, su ícono y su tono de
siempre.

Es la etiqueta del estado del registro, junto con `siaf-flow-status-tag` para el estado del flujo de la solicitud:
el mapa de estado a estilo vive aquí.

## Importar

```ts
import { RecordStatusTagComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-record-status-tag />
```

### Cuándo usarlo

- En la columna de estado de las grillas de Admin (usuarios, entidades, unidades, correlativos) y de las
  consultas del catálogo de tipos de asiento de ajuste.
- En Apertura contable, para el estado del ejercicio, de los periodos y de los pliegos (Abierto, Cerrado).
- En «Estado del registro» del historial (`siaf-account-history-panel`, `siaf-asiento-history-panel`) y en la
  columna de estado de `siaf-documents-records-table`.
- `small` (24 px, el valor por defecto) en tablas; `standard` (32 px) sola.

### Cuándo no

- Para el estado del flujo de una solicitud (Elaborado, Verificado, Observado): usar `siaf-flow-status-tag`.
- Para otros estados con los tonos del Figma: usar `siaf-status-tag` directo.
- Para etiquetas libres, categorías o filtros: usar `siaf-tag`; para contadores, `siaf-badge`.
- Como control por sí mismo: si el estado dispara una acción, envolverlo en un `<button>` con `aria-label` que
  diga la acción, como los periodos abiertos en la configuración de Apertura contable.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `size` | `'standard' \| 'small'` | `'small'` | `small` (24 px) o `standard` (32 px). |
| `status` | `'Activo' \| 'Inactivo' \| 'Anulado' \| 'En Proceso' \| 'Validado' \| 'Eliminado' \| 'Abierto' \| 'Cerrado' \| 'Procesado'` | `'Activo'` |  |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No recibe foco: no es interactivo.

### Notas

- **1.4.1 Uso del color (A)**: el estado va escrito; el tono y el ícono solo lo refuerzan.
- **1.1.1 Contenido no textual (A)**: el ícono es decorativo (`siaf-icon` con `aria-hidden`); el estado se lee del
  texto.
- **1.4.3 Contraste mínimo (AA)**, en claro: con fondo suave, 5.81:1 en azul, 11.46:1 en gris y 6.21:1 en rojo;
  con solo borde (En Proceso y Validado), 8.29:1 en azul sobre la superficie.
- **1.3.1 Información y relaciones (A)**: es un `<span>`; el contexto lo da el padre (cabecera de la columna o
  la etiqueta «Estado del registro»).
- **4.1.3 Mensajes de estado (AA)**: no es región viva: un cambio de estado no se anuncia desde la etiqueta.

## Composición

Pinta por dentro: [`siaf-status-tag`](siaf-status-tag.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-record-status-tag
