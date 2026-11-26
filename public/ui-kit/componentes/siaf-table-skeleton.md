# Table skeleton

> `siaf-table-skeleton` · Componente de Datos y tablas

Skeleton loader para tablas. Renderiza filas y columnas con animación de pulso
para indicar al usuario que el contenido está cargando.

## Importar

```ts
import { TableSkeletonComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-table-skeleton />
```

### Cuándo usarlo

- Mientras cargan las filas de una grilla: `siaf-documents-records-page` la pinta en lugar de la tabla, con las
  columnas visibles y las filas por página.
- Al abrir una solicitud de carga masiva de cuentas contables, mientras llega el detalle, con un `ariaLabel` que
  dice qué se carga.

### Cuándo no

- Para esperas que no son una tabla (procesar un archivo, grabar): `siaf-loader`, `siaf-loader-overlay` o
  `siaf-loading-progress`.
- Cuando la consulta ya respondió sin filas: `siaf-empty-state` o `empty-section`.
- Con columnas o ancho distintos de la tabla real: pasar los mismos `columns` y `minWidthClass` para que la
  pantalla no salte al terminar.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `ariaLabel` | `string` | `'Cargando contenido de la tabla'` |  |
| `columns` | `number` | `9` |  |
| `minWidthClass` | `string` | `''` |  |
| `rows` | `number` | `6` |  |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `role="status"`, `aria-label`, `aria-live`.

### Teclado

- No recibe foco: no es interactivo.

### Notas

- **4.1.3 Mensajes de estado (AA)**: el contenedor es `role="status"` con `aria-live="polite"` y repite `ariaLabel`
  en un texto `sr-only` («Cargando contenido de la tabla» por defecto); el padre debe pasar uno que diga qué se
  carga. El fin de la carga no se anuncia: le toca a la grilla.
- **Pendiente · 1.3.1 Información y relaciones (A)**: la tabla de barras no lleva `aria-hidden`: dentro del mensaje
  de carga el lector puede encontrar una tabla con cabeceras `<th>` vacías.

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-table-skeleton
