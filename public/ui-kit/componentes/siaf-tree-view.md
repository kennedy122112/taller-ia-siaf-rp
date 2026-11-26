# Tree view

> `siaf-tree-view` · Componente de Datos y tablas · Sin uso en la app

Árbol genérico de solo lectura que pinta nodos anidados con ícono y estado `expanded` recursivo.

Hoy no tiene consumidores: el árbol real de la app es `siaf-process-menu-tree` (en `layout/`, con
búsqueda tipo paleta de comandos), que pinta tanto el menú de procesos como el de Ajustes
(`ADMIN_MENU_TREE`); es una implementación propia que nunca se unificó con este genérico.

## Importar

```ts
import { TreeViewComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-tree-view />
```

### Cuándo usarlo

- Para mostrar de solo lectura una jerarquía corta ya resuelta en los datos (p. ej. una entidad y sus unidades), con
  cada nodo abierto o cerrado según `expanded`.
- Como resumen estático de una rama (del plan de cuentas o de un clasificador) en un panel de detalle, donde no se
  navega ni se elige. Hoy no tiene consumidores.

### Cuándo no

- Para el menú de Procesos o de Ajustes: `siaf-process-menu-tree`, el árbol real de la app, con búsqueda.
- Si el usuario debe abrir o cerrar ramas o elegir un nodo: no tiene clic, teclado ni roles de árbol; para secciones
  plegables, `siaf-accordion` o `siaf-expansion-panel`.
- Para una lista plana de ítems: `siaf-list`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `nodes` | `TreeViewNode[]` | `[]` |  |

## Eventos

No emite eventos.

## Accesibilidad

La plantilla no declara roles ni atributos ARIA.

### Teclado

- No recibe foco: no es interactivo. Los nodos no se abren ni se cierran: lo decide `expanded` en los datos.

### Notas

- **1.3.1 Información y relaciones (A)**: la jerarquía va en listas `<ul>` y `<li>` anidadas.
- **Pendiente · 1.1.1 Contenido no textual (A)**: el chevron (`chevron_right` / `expand_more`) y el punto de hoja
  dicen si el nodo tiene hijos y si está abierto, pero son `siaf-icon` decorativos (`aria-hidden`) y no hay
  `aria-expanded`: un nodo cerrado no anuncia que tiene hijos ocultos.
- **1.4.3 Contraste mínimo (AA)**: etiquetas en `text-neutral-high` (16.29:1 / 16.53:1) sobre la superficie; los
  íconos, en `text-neutral-low` (5.01:1 / 8.86:1), superan el 3:1 no textual.

## Composición

Pinta por dentro: [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-tree-view
