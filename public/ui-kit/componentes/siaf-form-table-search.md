# Form table search

> `siaf-form-table-search` · Componente de Datos y tablas

Buscador de tabla: un `siaf-input` con lupa a todo el ancho y, a la derecha, dos botones de ícono: Filtrar y Más
opciones, que emiten `filter` y `more`.

Con `variant="reports"` es el buscador de Consultas y reportes (Figma «Guía de Estructura de Pantallas», nodo
22402:16457 «Search for table»): el segundo botón pasa a ser Columnas (`view_column`), que emite `columns`.

Escribir solo registra el texto: la búsqueda sale por `valueChange` al pulsar Enter o la lupa, y lo tecleado se
descarta si el padre reescribe `value`.

Si Filtrar abre un filtro propio de la pantalla, `filterExpanded` dice si está abierto: publica `aria-expanded` y el
botón queda con el fondo de seleccionado mientras tanto.

Tiene además otra variante, como componente aparte, para Documentos y registros y la Bandeja de Documentos:
`siaf-records-search-toolbar`, el mismo campo con las acciones de la derecha proyectadas (los menús Campos, Favorito
y Más opciones) en vez de estos dos botones fijos.

## Importar

```ts
import { FormTableSearchComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-form-table-search />
```

### Cuándo usarlo

- Sobre las tablas de las solicitudes (cuentas contables, tipos de asiento, clases de ajuste, asiento de ajuste,
  eventos contables) y en el panel lateral de selección (`siaf-selection-side-nav`).
- Con `variant="reports"` en Consultas y reportes: Plan de cuentas, Asiento de ajuste, Tipos de asiento, Pedidos de
  contabilización y Libros contables.
- En el detalle de Contabilización y en los listados de Admin (usuarios, entidades, unidades y correlativos).
- En Apertura contable: cuentas contables del detalle anual, aperturas mensuales de la configuración e historial de
  la configuración.
- Cuando la búsqueda debe confirmarse con Enter o la lupa y no a cada tecla (búsqueda en servidor o muchas filas).

### Cuándo no

- En las pestañas Documentos / Registros y en la Bandeja de Documentos, con menús a la derecha:
  `siaf-records-search-toolbar`, que los proyecta.
- Esperar que los botones hagan algo por sí solos: emiten `filter`, `more` y `columns`, y si la pantalla no los escucha
  se pintan y no hacen nada (hoy ninguna consulta escucha Filtrar ni Columnas; Filtrar solo lo escucha el panel de
  cuentas de la configuración de asiento de cierre anual, por `siaf-selection-side-nav`).
- Para filtrar por opciones cerradas o por condiciones: `siaf-filter-pill` o `siaf-custom-filter` junto al buscador.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ariaLabel` | `string` | `'Buscar'` |  |
| `columnsLabel` | `string` | `'Ocultar o mostrar columnas'` | Nombre accesible del botón Columnas de la variante `reports`. |
| `disabled` | `boolean` | `false` |  |
| `filterExpanded` | `boolean \| null` | `null` | Si Filtrar abre un filtro de la pantalla: si está abierto. Sin valor, el botón no publica `aria-expanded`. |
| `filterLabel` | `string` | `'Filtrar'` |  |
| `moreLabel` | `string` | `'Mas opciones'` |  |
| `placeholder` | `string` | `'Buscar'` |  |
| `value` | `string` | `''` |  |
| `variant` | `'default' \| 'reports'` | `'default'` | `default`: Filtrar y Más opciones. `reports`: el de Consultas y reportes, con Filtrar y Columnas. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(columns)` | `void` | Botón Columnas de la variante `reports`. |
| `(filter)` | `void` |  |
| `(more)` | `void` |  |
| `(valueChange)` | `string` |  |

## Accesibilidad

Roles y atributos del código: `aria-expanded`, `aria-label`.

### Teclado

- **Tab**: recorre el campo, la lupa, Filtrar y Más opciones (o Columnas); con `disabled` quedan todos fuera.
- **Enter**: en el campo, confirma la búsqueda y emite `valueChange` con lo escrito; escribir no busca.
- **Enter / Espacio**: en la lupa confirman igual; en Filtrar, Más opciones y Columnas emiten `filter`, `more` y
  `columns`.

### Notas

- **Pendiente · 4.1.2 Nombre, función y valor (A)**: el input `ariaLabel` no se usa en la plantilla; el nombre del
  campo sale de `placeholder` («Buscar» por defecto), así que «Buscar cuentas contables» o «Buscar en pedidos» no
  llegan al lector. Los botones sí llevan `filterLabel` («Filtrar»), `moreLabel` («Mas opciones», sin tilde) y
  `columnsLabel` («Ocultar o mostrar columnas»); con `filterExpanded`, Filtrar publica además `aria-expanded`.
- **Pendiente · 4.1.3 Mensajes de estado (AA)**: ni el buscador ni la grilla anuncian el resultado; la pantalla debe
  anunciar el total (p. ej. con `role="status"`).
- **Pendiente · 1.4.11 Contraste no textual (AA)**: el borde del campo sin foco es `border-states-enabled` (2.44:1 /
  2.59:1). El anillo de foco de la lupa y de los botones ya es el azul del kit (`border-states-focus`, 5.35:1 /
  10.15:1) y los íconos cumplen (`text-neutral-high`; la lupa, `text-neutral-medium`).
- **2.4.7 Foco visible (AA)**: el campo pasa a un borde de 2 px `border-states-focus` (5.35:1 / 10.15:1); la lupa y
  los botones muestran un anillo de 2 px separado 2 px.
- **2.5.8 Tamaño del objetivo (AA)**: Filtrar, Más opciones y Columnas miden 40 px; la lupa, 24 px.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md), [`siaf-input`](siaf-input.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-form-table-search
