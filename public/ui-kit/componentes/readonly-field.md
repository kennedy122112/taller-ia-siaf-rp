# Readonly field

> `readonly-field` · Componente de Formularios

Campo de solo lectura con caption flotante que muestra el valor o `--` cuando está vacío.

Úsalo para mostrar datos ya grabados en las pantallas de consulta o en el modo lectura de una
solicitud. No confundir con `siaf-readonly`, que es otro componente distinto y sin consumidores.

Con `variant="monto"` es el importe de los «Readonly Forms» del Figma (Débito y Crédito de la conciliación diaria de
la DGTP): fondo `bg-surfaces-highlight`, valor en negrita y alineado a la derecha. Lo que se proyecta reemplaza al
valor, como la etiqueta de estado de «Estado de conciliación».

## Importar

```ts
import { ReadonlyFieldComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<readonly-field>…</readonly-field>
```

### Cuándo usarlo

- En el modo lectura de una solicitud, en lugar del campo editable y con el mismo caption: cuenta contable, carga
  masiva del plan de cuentas, clase de ajuste, tipo de asiento y asiento de ajuste.
- Para los criterios de búsqueda sobre los resultados de las consultas (plan de cuentas, asiento de ajuste, tipos de
  asiento, contabilización) y la cabecera de un detalle o reporte (pedido de contabilización, apertura contable,
  libros contables).
- Para leer un dato con contraste completo: un campo `[disabled]` pinta el texto tenue (exento de contraste) y aquí
  el valor va en `text-neutral-high`.
- `[required]` solo para repetir el asterisco del campo editable, así la lectura se ve igual que la edición.
- `variant="monto"` para un importe que se lee aparte, como el Débito y el Crédito del libro banco y de la operación
  bancaria en el simulador de la conciliación diaria de la DGTP.
- Proyectar una `siaf-status-tag` (`size="small"`) cuando el dato es un estado, como «Conciliado» en «Estado de
  conciliación».

### Cuándo no

- Para un dato que el usuario puede cambiar: usar `siaf-input`, `text-area-control` o `siaf-date-time-picker`.
- Para el ítem elegido desde un panel lateral: usar `siaf-summary-card`; para un aviso breve, `message-box`.
- Confundirlo con `siaf-readonly`, el recuadro gris con etiqueta en mayúsculas que ninguna pantalla usa.
- `monto` para los importes de una tabla: van en sus columnas, alineados a la derecha.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `caption` | `string` | `''` |  |
| `required` | `boolean` | `false` |  |
| `value` | `string` | `''` |  |
| `variant` | `'default' \| 'monto'` | `'default'` | `monto`: importe en negrita, a la derecha y sobre `bg-surfaces-highlight`. |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No recibe foco: no es interactivo.

### Notas

- **1.3.1 Información y relaciones (A)**: es texto estático, no un campo: el caption va antes del valor en el DOM,
  así que se leen juntos y en orden; no usa `dt`/`dd` ni `aria-labelledby`.
- **1.4.3 Contraste mínimo (AA)**: caption `text-neutral-low` 5.01:1 (8.86:1 oscuro), valor `text-neutral-high`
  16.29:1 y asterisco `text-feedback-danger` 9.84:1 sobre `bg-surfaces-surface`. En `monto`, el valor sobre
  `bg-surfaces-highlight` da 14.2:1 (11.0:1 oscuro).
- **1.4.1 Uso del color (A)**: el obligatorio se marca con un asterisco, no solo con el color; el fondo de `monto`
  solo resalta el importe, que va escrito.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/readonly-field
