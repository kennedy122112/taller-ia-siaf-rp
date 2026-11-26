# Breadcrumb

> `siaf-breadcrumb` · Componente de Navegación

Ruta de navegación (migas de pan) de la página: enlace de inicio con ícono de casa y los niveles hasta la pantalla
actual, en un `<nav>` con lista ordenada. Con rutas largas colapsa los niveles intermedios detrás del botón «…»: en
escritorio, con más de tres niveles, quedan visibles los dos últimos; en móvil, solo el último. Si el primer ítem se
llama «Inicio», la casa usa su ruta en vez de `homeHref`.

## Importar

```ts
import { BreadcrumbComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-breadcrumb />
```

### Cuándo usarlo

- Arriba de toda pantalla del shell, sobre el título. Ya lo traen `siaf-documents-records-page` (bandejas),
  `siaf-solicitude-page-layout` (solicitudes) y `siaf-page-shell`; las listas de Admin (Gestor de Usuarios,
  Entidades, Perfiles funcionales) y la configuración de Apertura contable lo usan directo.
- Con los niveles armados por `buildProcessBreadcrumbs` (`shared/utils/breadcrumbs.util.ts`), que los toma del árbol
  de procesos y avisa en desarrollo si el proceso no existe.
- En las páginas públicas del landing (noticia, servicio, sistema), con `homeHref="/landing"`.

### Cuándo no

- En páginas que ya usan `siaf-documents-records-page`, `siaf-solicitude-page-layout` o `siaf-page-shell`: no agregar
  otro.
- Escribir los niveles a mano repitiendo el árbol del menú: usar `buildProcessBreadcrumbs`.
- Para alternar vistas de la misma pantalla: usar `siaf-tabs` o `siaf-records-tabs`; para las etapas de un flujo,
  `siaf-steps` o `siaf-action-tracker`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `homeHref` | `string` | `'#'` |  |
| `items` | `BreadcrumbItem[]` | `[]` |  |

## Eventos

No emite eventos.

## Accesibilidad

Patrón WAI-ARIA: Migas de pan (https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/).

Roles y atributos del código: `aria-controls`, `aria-expanded`, `aria-label`.

### Teclado

- **Tab**: recorre el enlace de inicio, el botón «…» (si hay niveles ocultos) y los niveles con enlace; el nivel
  actual es texto y no recibe foco.
- **Enter**: sigue el enlace enfocado.
- **Enter / Espacio** en «…»: abre o cierra la lista de niveles intermedios; al abrirla, el foco pasa al primer
  nivel con enlace.
- **Escape**: con la lista abierta, la cierra y el foco vuelve a «…». Salir de la lista con Tab o pulsar fuera
  también la cierra.

### Notas

- **1.3.1 Información y relaciones (A)**: `<nav aria-label="Ruta de navegación">` con lista ordenada (`<ol>` y
  `<li>`); las flechas separadoras son íconos decorativos y el enlace de inicio lleva `aria-label="Inicio"`.
- **Pendiente · 4.1.2 Nombre, función y valor (A)**: «…» es un `<button>` con `aria-label="Niveles intermedios"`,
  `aria-expanded` y `aria-controls` hacia una lista (`<ul>`) de enlaces, el patrón de revelación de una navegación;
  falta que el nivel actual marque `aria-current="page"`.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, al abrir la lista el foco entra en el primer nivel con enlace y al
  cerrarla con Escape vuelve a «…»; salir de la lista con Tab la cierra.
- **Pendiente · 2.1.1 Teclado (A)**: enlaces y «…» se alcanzan con Tab, pero el nivel actual y los niveles sin enlace
  no reciben foco: si su texto se corta, el completo (`siafTooltip`) solo aparece con el mouse.
- **2.4.7 Foco visible (AA)**: inicio y «…» tienen contorno de 2 px con separación (`border-states-focus`); los
  enlaces de texto usan el anillo del navegador.
- **1.4.11 Contraste no textual (AA)**: el contorno de foco de inicio y «…» es el azul del kit
  (`border-states-focus`, 5.35:1 claro / 10.15:1 oscuro sobre la superficie).
- **1.4.3 Contraste mínimo (AA)**: niveles con enlace `text-text` (16.29:1 claro / 16.53:1 oscuro) y nivel actual
  `text-text-muted` (5.01:1 / 8.86:1) sobre `bg-surface`.
- **2.5.8 Tamaño del objetivo (AA)**: inicio y «…» miden 32×32 px; los enlaces de texto son bajos (texto de 12 px),
  pero la flecha y los espacios los separan unos 20 px (excepción por espaciado).

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siafTooltip`](siafTooltip.md), [`siaf-icon`](siaf-icon.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-breadcrumb
