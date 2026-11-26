# Create document

> `siaf-create-document` · Componente de Layouts de página

Formulario «Crear documento»: pide proceso, documento y tipo de acción y emite `accepted` con esa selección y la ruta
de la solicitud a abrir. La variante `sidepanel` (panel del shell) busca el proceso entre `processOptions`, que
por defecto salen del árbol `DEFAULT_PROCESS_TREE`; `dropdown` (popover) solo pide documento y tipo de acción.
Con `fields` el padre controla los campos y recibe cada cambio por `fieldValueChange`.

## Importar

```ts
import { CreateDocumentComponent } from '@kennedy122112/siaf-rp-ui-angular';
```

Desde el paquete del kit (`@kennedy122112/siaf-rp-ui-angular`), instalado desde `vendor/`.

## Uso

```html
<siaf-create-document />
```

### Cuándo usarlo

- Desde «Crear» del sidebar o del menú móvil: el shell lo abre como `sidepanel` con las opciones que arma de los tipos
  de documento del API.
- En la bandeja, como popover del botón «Crear documento» de `siaf-documents-records-page` (`dropdown` con `fields`
  controlados para Documento y Tipo de acción).

### Cuándo no

- Pintar otro `sidepanel` en una página: pedir el del shell con `ShellNavigationService.openCreateDocument()`.
- Para los campos de la solicitud misma: usar `siaf-input` dentro de `siaf-solicitude-page-layout`.
- Para elegir un registro de un catálogo con columnas: usar `siaf-selection-side-nav`.
- Copiar a mano la lista de procesos: sale de `DEFAULT_PROCESS_TREE` o de `processOptions`.

## Entradas

| Nombre | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `acceptDisabled` | `boolean` | `false` |  |
| `fields` | `CreateDocumentField[]` | `[]` |  |
| `processOptions` | `CreateDocumentProcessOption[]` | `CREATE_DOCUMENT_PROCESSES` |  |
| `title` | `string` | `'Crear documento'` |  |
| `variant` | `'sidepanel' \| 'dropdown'` | `'sidepanel'` |  |

## Eventos

| Nombre | Valor | Descripción |
|---|---|---|
| `(accepted)` | `CreateDocumentAccepted` |  |
| `(canceled)` | `void` |  |
| `(fieldSelected)` | `string` |  |
| `(fieldValueChange)` | `CreateDocumentSelection` |  |

## Accesibilidad

Roles y atributos del código: `role="combobox"`, `role="listbox"`, `role="option"`, `aria-autocomplete`, `aria-controls`, `aria-expanded`, `aria-haspopup`, `aria-hidden`, `aria-label`, `aria-selected`.

### Teclado

- **Tab**: recorre el buscador de procesos (en `sidepanel`), Documento, Tipo de acción y Cancelar / Aceptar;
  Documento y Tipo de acción siguen deshabilitados hasta elegir el campo anterior.
- **Enter / Espacio** en Documento o Tipo de acción: abre o cierra sus opciones; al abrir, el foco entra en la
  opción elegida, que sigue `siaf-select-options` (flechas, Inicio, Fin, Enter o Espacio). Escape o salir con Tab
  las cierra y el foco vuelve al campo.
- **Flecha abajo** en el buscador de procesos: entra a la lista (si estaba cerrada, primero la abre);
  **flechas arriba / abajo** la recorren y **Enter** elige el proceso (el foco vuelve al buscador).
- **Escape**: en el buscador cierra la lista; en un proceso, cierra la lista y vuelve al buscador.
- **Enter / Espacio** en Cancelar y Aceptar: emiten `canceled` y `accepted`.

### Notas

- **2.1.1 Teclado (A)**: el buscador es un `combobox` con `aria-expanded`: flecha abajo entra a la lista de procesos,
  las flechas la recorren y Enter elige; la lista ya no se cierra al pasar del buscador a ella.
- **2.4.7 Foco visible (AA)**: Documento, Tipo de acción y el buscador muestran el borde azul de 2 px
  (`border-states-focus`, 5.35:1 claro / 10.15:1 oscuro) al recibir el foco, también si ya tienen valor.
- **2.4.3 Orden del foco (A)**: con `siafFoco`, las opciones de Documento y Tipo de acción reciben el foco al abrir y
  al elegir, cerrar con Escape o salir con Tab vuelve al campo; al elegir un proceso el foco vuelve al buscador.
- **4.1.2 Nombre, función y valor (A)**: el buscador es un `combobox` con `aria-expanded` y `aria-controls` hacia
  la lista `role="listbox"` «Procesos», y el proceso elegido lleva `aria-selected`. Documento y Tipo de acción
  publican `aria-expanded` y `aria-haspopup="listbox"`.
- **Pendiente · 1.4.11 Contraste no textual (AA)**: el borde de los campos en reposo es `border-states-enabled`
  (2.44:1 / 2.59:1); el de foco, `border-states-focus` (5.35:1 / 10.15:1), sí cumple.
- **3.3.2 Etiquetas o instrucciones (A)**: cada campo muestra su nombre (en el placeholder o como etiqueta flotante)
  con asterisco en los obligatorios; no llevan `aria-required`.
- **1.3.1 Información y relaciones (A)**: sección con `aria-label="Crear documento"` (fijo aunque cambie `title`) y
  título `h2`; cada campo va dentro de su `<label>`.
- **1.4.3 Contraste mínimo (AA)**: texto `text-neutral-medium` (14.53:1 / 12.87:1) y placeholder `text-neutral-low`
  (5.01:1 / 8.86:1) sobre el `bg-surface` de los campos.

## Composición

Pinta por dentro: [`siafFoco`](siafFoco.md), [`siafTooltip`](siafTooltip.md), [`siaf-button`](siaf-button.md), [`siaf-icon`](siaf-icon.md), [`siaf-select-options`](siaf-select-options.md).

---

Generado desde el código (`node_modules/@kennedy122112/siaf-rp-ui-angular/types/kennedy122112-siaf-rp-ui-angular.d.ts`) con `npm run ui-kit:manifest`. Página: /ui-kit/componentes/siaf-create-document
