# Process menu tree

> `siaf-process-menu-tree` · Componente de Armazón de la aplicación

Árbol canónico de procesos del shell (Figma UI KIT, «Sidenav with tree view»): el menú jerárquico que abre la opción
"Procesos" del sidebar.

Sus datos por defecto son `DEFAULT_PROCESS_TREE` de `shared/utils/process-tree.util` (este archivo solo
re-exporta el tipo y las utilidades). Es el único menú en árbol: el shell también lo usa para "Ajustes" con
`ADMIN_MENU_TREE` y otros textos, así que un árbol nuevo es solo otro arreglo de nodos. El panel ocupa el alto de su
contenedor (en el shell, el panel fijo bajo el navbar) y queda acoplado al riel con el mismo contorno que Bandeja y
Crear: borde derecho, sombra de elevación 1 y esquinas rectas (el Figma pedía elevación 16; el usuario prefirió la
consistencia entre los paneles del riel, 2026-09-24). El buscador, fijo arriba, funciona como paleta de comandos: filtra la navegación en vivo,
sin ir al servidor, abre las ramas con coincidencias y, si no encuentra nada, muestra «Sin resultados». Al abrir no
hay ningún nodo marcado: se marca el que se pulsa. Los nodos `comingSoon` solo expanden — nunca emiten
`nodeSelected`.

## Importar

```ts
import { ProcessMenuTreeComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-process-menu-tree />
```

### Cuándo usarlo

- Para el panel Procesos del armazón: `siaf-app-shell` lo abre desde el rail y navega a la `moduleRoute` o
  `createRoute` del nodo emitido (plan de cuentas contables, catálogo de eventos, asientos de ajuste, apertura
  contable…).
- Para el menú Ajustes: el mismo componente con `ADMIN_MENU_TREE` y sus textos (`title`, `subtitle` y
  `placeholder`), con gestión de usuarios, entidades y auditoría.
- Para cualquier menú jerárquico nuevo del armazón: basta otro arreglo de `ProcessMenuNode`.

### Cuándo no

- Para envolverlo o copiarlo en otro componente de menú: por eso se retiró `siaf-admin-menu`; basta pasarle otros
  `nodes` y textos.
- Para mostrar datos jerárquicos de solo lectura dentro de una pantalla: usar `siaf-tree-view`.
- Para buscar registros en el servidor: usar `siaf-form-table-search` (en Documentos y registros y la bandeja, su
  variante `siaf-records-search-toolbar`); este buscador solo filtra la navegación en memoria.
- Para dejar marcado de entrada un nodo del árbol por defecto: la vista inicial no marca nada; `selected` en los
  datos queda para un árbol que lo necesite.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `nodes` | `ProcessMenuNode[]` | `DEFAULT_PROCESS_TREE` | Solo las raíces respetan `expanded`. `selected` marca un nodo de entrada y abre el camino hasta él; el árbol por defecto no marca ninguno. |
| `placeholder` | `string` | `'Buscar proceso o procedimiento'` | Etiqueta del buscador: se lee dentro del campo vacío y sube al borde al escribir. |
| `subtitle` | `string` | `'Seleccionar proceso o procedimiento'` | Texto sobre el árbol; no se pinta cuando la búsqueda no encuentra nada. |
| `title` | `string` | `'Procesos'` | Título del panel, en mayúsculas; también da nombre al `<aside>`. |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(nodeSelected)` | `ProcessMenuNode` | El nodo pulsado; los `comingSoon` no se emiten. |

## Accesibilidad

Roles y atributos del código: `role="status"`, `aria-current`, `aria-expanded`, `aria-hidden`, `aria-labelledby`.

### Teclado

- **Tab**: pasa por el buscador, por «Limpiar búsqueda» cuando hay texto y luego por los nodos visibles en orden.
- **Escribir en el buscador**: filtra el árbol en vivo, sin distinguir tildes ni mayúsculas, y abre las ramas con
  coincidencias.
- **Enter / Espacio** en «Limpiar búsqueda»: vacía el buscador, vuelve a mostrar el árbol completo y devuelve el
  foco al campo.
- **Enter / Espacio** en un nodo: lo marca y emite `nodeSelected`; si tiene hijos, además los muestra u oculta. Los
  nodos `comingSoon` solo expanden.

### Notas

- **1.3.1 Información y relaciones (A)**: el `<aside>` toma su nombre del título (`h2`), así que en Ajustes se
  anuncia «Ajustes»; el subtítulo es un `h3` y los nodos van en listas anidadas (`ul`/`li`), por lo que el lector
  anuncia cuántos hay en cada nivel y su anidación. No es un `role="tree"`: sigue el patrón de navegación con
  botones que muestran u ocultan su rama.
- **1.4.1 Uso del color (A)**: el nodo marcado no se distingue solo por el color: además del fondo
  `bg-states-light-activated` y el texto `text-neutral-activated`, pasa a negrita.
- **1.4.3 Contraste mínimo (AA)**: título `text-neutral-high` 16.29:1 claro / 12.83:1 oscuro; subtítulo y nodos
  `text-neutral-medium` 14.53:1 / 9.99:1; nodo marcado 7.18:1 / 13.28:1 sobre su fondo.
- **1.4.11 Contraste no textual (AA)**: las flechas `icon-states-enabled` 8.70:1 claro / 9.99:1 oscuro; el contorno
  de foco es el azul del kit (`border-states-focus`, 5.35:1 claro / 10.15:1 oscuro sobre la superficie).
- **Pendiente · 2.4.3 Orden del foco (A)**: no toma el foco al abrirse ni cierra con Escape. El armazón lo pinta
  después del rail: desde Procesos el Tab pasa antes por Ayuda y Ajustes, y si lo pide una página
  (`ShellNavigationService`) queda antes que el botón que lo abrió.
- **2.4.7 Foco visible (AA)**: cada nodo muestra por dentro un contorno azul de 2 px con `focus-visible`.
- **4.1.2 Nombre, función y valor (A)**: los nodos con hijos publican `aria-expanded` y el marcado,
  `aria-current="true"`; «Limpiar búsqueda» tiene nombre propio.
- **4.1.3 Mensajes de estado (AA)**: una región `role="status"` anuncia al filtrar cuántas coincidencias quedan o
  que no hay ninguna.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md), [`siaf-input`](siaf-input.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-process-menu-tree
