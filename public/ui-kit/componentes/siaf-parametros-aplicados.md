# Parametros aplicados

> `siaf-parametros-aplicados` · Componente de Datos y tablas

«Parámetros aplicados» de Consultas y reportes (Figma «Guía de Estructura de Pantallas», nodo 22402:16429): una
fila de tarjetas con el ícono, el nombre y el valor de cada parámetro con que se hizo la consulta. Las tarjetas son
`siaf-list` horizontal con borde, dentro de un carril con desplazamiento; si no entran todas, a la derecha aparece
un botón con `chevron_right` sobre un desvanecido que avanza el carril y, cuando ya avanzó, a la izquierda otro con
`chevron_left` que retrocede. Cada botón aparece solo si hay tarjetas de su lado.

## Importar

```ts
import { ParametrosAplicadosComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-parametros-aplicados />
```

### Cuándo usarlo

- Arriba de los resultados de una consulta, para mostrar con qué parámetros se buscó, cada uno con su ícono.
- Con muchos parámetros o valores largos: el carril se desplaza y cada valor se corta con tooltip.

### Cuándo no

- Para elegir o cambiar un parámetro: las tarjetas no son interactivas; la búsqueda se cambia desde la cabecera de
  la consulta, con `siaf-filter-pill` o con `siaf-custom-filter`.
- Cuando la pantalla necesita «Quitar filtros»: este bloque no lo tiene (así está en el Figma); las consultas de hoy
  siguen con `siaf-consultas-filtros-chips`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `parametros` | `readonly ParametroAplicado[]` | `[]` |  |

## Eventos

No emite eventos.

## Accesibilidad

Roles y atributos del código: `role="region"`, `aria-hidden`, `aria-labelledby`.

### Teclado

- **Tab**: cuando las tarjetas no entran, el carril recibe el foco y las flechas izquierda y derecha lo desplazan;
  después llega a los botones que retroceden y avanzan (los que estén a la vista).
- **Enter / Espacio**: en un botón, retroceden o avanzan el carril.

### Notas

- **1.3.1 Información y relaciones (A)**: título `<h3>` y las tarjetas como `<ul>` / `<li>` de `siaf-list`; cada una se
  lee «Nombre, valor».
- **2.1.1 Teclado (A)**: el carril con desplazamiento es una `region` enfocable con nombre («Parámetros aplicados»),
  así las tarjetas que no entran se alcanzan sin mouse; los botones hacen lo mismo con un clic.
- **4.1.2 Nombre, función y valor (A)**: los botones se llaman «Ver parámetros anteriores» y «Ver más parámetros».
- **2.4.3 Orden del foco (A)**: al llegar a un extremo desaparece el botón de ese lado; si tenía el foco, este pasa al
  botón del otro lado (o al carril) en vez de perderse.
- **1.1.1 Contenido no textual (A)**: los íconos son decorativos; el nombre del parámetro va como texto.
- **2.4.7 Foco visible (AA)**: el carril y el botón muestran el anillo `border-states-focus` (5.35:1 / 10.15:1).
- **1.4.11 Contraste no textual (AA)**: el borde de las tarjetas es decorativo (`border-states-enabled`); cada tarjeta
  se distingue también por su espacio y su contenido.

## Composición

Pinta por dentro: [`siaf-button`](siaf-button.md), [`siaf-list`](siaf-list.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-parametros-aplicados
