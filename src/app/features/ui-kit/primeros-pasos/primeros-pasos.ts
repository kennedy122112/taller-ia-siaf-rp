import { VERSION_KIT } from '../ui-kit.cargadores';

/**
 * Las páginas de «Primeros pasos» del catálogo: instalación, uso, convenciones y versiones del kit. El texto admite
 * `código` entre backticks y **negrita**, como el JSDoc de las fichas; un código que nombra un componente enlaza a su
 * página. La instalación y las versiones siguen la guía del paquete (su README en
 * `node_modules/@kennedy122112/siaf-rp-ui-angular/`).
 */

export type BloquePaso =
  | { tipo: 'parrafo'; texto: string }
  | { tipo: 'lista'; items: string[] }
  | { tipo: 'codigo'; archivo: string; codigo: string }
  | { tipo: 'tabla'; cabeceras: string[]; filas: string[][] }
  | { tipo: 'aviso'; texto: string }
  /** «Así no / así sí»: un uso incorrecto y su forma correcta. */
  | { tipo: 'comparacion'; incorrecto: string; correcto: string }
  /** Un cambio de código: las líneas con `-` se quitan y las con `+` se agregan. */
  | { tipo: 'diff'; archivo: string; codigo: string };

export interface SeccionPaso {
  id: string;
  titulo: string;
  bloques: BloquePaso[];
}

export interface PaginaPrimerosPasos {
  id: string;
  titulo: string;
  descripcion: string;
  /** Palabras que también la encuentran en los buscadores del catálogo. */
  claves: string[];
  secciones: SeccionPaso[];
}

const PAQUETE = '@kennedy122112/siaf-rp-ui-angular';
const TGZ = `kennedy122112-siaf-rp-ui-angular-${VERSION_KIT}.tgz`;

export const PRIMEROS_PASOS: readonly PaginaPrimerosPasos[] = [
  {
    id: 'instalacion',
    titulo: 'Instalación',
    descripcion: `Agrega el kit del SIAF-RP (versión ${VERSION_KIT}) a un proyecto Angular 21 con unos pocos comandos.`,
    claves: ['instalar', 'npm', 'paquete', 'tgz', 'tailwind', 'estilos', 'inter', 'material icons'],
    secciones: [
      {
        id: 'paquete',
        titulo: 'El paquete',
        bloques: [
          {
            tipo: 'parrafo',
            texto: `\`${PAQUETE}\` trae los componentes y directivas de \`shared/ui\` (standalone, \`OnPush\` y signals), los tokens del Figma en claro y oscuro y sus estilos. **No está publicado en npm**: es un archivo \`.tgz\` que se arma en el repo del SIAF-RP.`,
          },
          { tipo: 'codigo', archivo: 'terminal (repo del SIAF-RP)', codigo: 'npm run kit:empaquetar' },
          { tipo: 'parrafo', texto: `Deja el archivo en \`dist/paquetes/${TGZ}\`. Copia ese archivo dentro del proyecto nuevo (por ejemplo en \`vendor/\`) para que no dependa de esta carpeta.` },
          { tipo: 'aviso', texto: `En el taller ya viene incluido: \`vendor/${TGZ}\`, que \`npm ci\` instala sin acceso al repo del SIAF-RP.` },
        ],
      },
      {
        id: 'instalar',
        titulo: 'Instalar',
        bloques: [
          { tipo: 'codigo', archivo: 'terminal', codigo: `npm install ./vendor/${TGZ} material-icons @angular/cdk@^21` },
          {
            tipo: 'parrafo',
            texto: 'Pide Angular 21 (`@angular/core`, `common`, `forms`, `platform-browser` y `router`), `@angular/cdk` 21 (el arrastre para reordenar y los avisos al lector de pantalla) y `material-icons`, que pinta los íconos. Para los gráficos, instala también `chart.js` 4.',
          },
        ],
      },
      {
        id: 'estilos',
        titulo: 'Estilos sin Tailwind',
        bloques: [
          { tipo: 'parrafo', texto: 'En `angular.json`, dentro de `build.options`:' },
          {
            tipo: 'codigo',
            archivo: 'angular.json',
            codigo: `"styles": [
  "node_modules/material-icons/iconfont/material-icons.css",
  "node_modules/material-icons/iconfont/outlined.css",
  "node_modules/${PAQUETE}/estilos/siaf-rp-ui.css",
  "src/styles.css"
],
"assets": [
  { "glob": "**/*", "input": "public" },
  { "glob": "**/*", "input": "node_modules/${PAQUETE}/assets", "output": "assets" }
]`,
          },
          {
            tipo: 'lista',
            items: [
              '`siaf-rp-ui.css` es la hoja completa, ya compilada: los tokens claro y oscuro, las clases de los componentes y las animaciones. No hace falta tener Tailwind.',
              'El asset copia las ilustraciones de `siaf-modal` a `assets/figma/modals` y `assets/figma/modals-dark`.',
            ],
          },
        ],
      },
      {
        id: 'tailwind',
        titulo: 'Estilos con Tailwind v4',
        bloques: [
          { tipo: 'parrafo', texto: 'En vez de poner `siaf-rp-ui.css` en `angular.json`, impórtalo en `src/styles.css` después de Tailwind:' },
          { tipo: 'codigo', archivo: 'src/styles.css', codigo: `@import "tailwindcss";\n@import "${PAQUETE}/estilos/tema.css";` },
          {
            tipo: 'parrafo',
            texto: '`tema.css` trae los tokens, el `@theme` del kit (`bg-brand-primary`, `rounded-siaf-md`, `gap-siaf-sm`…) y un `@source` hacia el paquete: tus pantallas también usan las clases del sistema.',
          },
        ],
      },
      {
        id: 'fuente',
        titulo: 'Fuente Inter',
        bloques: [
          { tipo: 'parrafo', texto: 'La fuente del kit es Inter. Agrégala en el `<head>` de `src/index.html`:' },
          {
            tipo: 'codigo',
            archivo: 'src/index.html',
            codigo: `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">`,
          },
        ],
      },
      {
        id: 'actualizar',
        titulo: 'Actualizar el paquete',
        bloques: [
          {
            tipo: 'parrafo',
            texto: 'Vuelve a correr `npm run kit:empaquetar` en el repo del SIAF-RP y repite el `npm install` con el `.tgz` nuevo. Si la versión no cambió, npm puede quedarse con el anterior: desinstálalo y vuelve a instalarlo.',
          },
          { tipo: 'codigo', archivo: 'terminal', codigo: `npm uninstall ${PAQUETE}\nnpm install ./vendor/${TGZ}` },
          { tipo: 'aviso', texto: 'Antes de actualizar entre versiones menores (0.2 → 0.3), revisa «Versiones»: dice qué hay que cambiar en el código.' },
        ],
      },
    ],
  },
  {
    id: 'uso',
    titulo: 'Uso',
    descripcion: 'Cómo importar los componentes, enlazar sus entradas y eventos, y conectar los que piden datos al proyecto.',
    claves: ['importar', 'import', 'standalone', 'signal', 'señal', 'entradas', 'eventos', 'gráficos', 'fuentes', 'tema oscuro'],
    secciones: [
      {
        id: 'importar',
        titulo: 'Importar un componente',
        bloques: [
          {
            tipo: 'parrafo',
            texto: `Cada componente es standalone: se importa en el componente que lo usa. Se importa desde \`${PAQUETE}\` (los gráficos, desde \`${PAQUETE}/graficos\`); el playground de cada ficha da el import exacto.`,
          },
          {
            tipo: 'codigo',
            archivo: 'ejemplo.component.ts',
            codigo: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonComponent, StatusTagComponent, TextFieldComponent } from '${PAQUETE}';

@Component({
  selector: 'app-ejemplo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, StatusTagComponent, TextFieldComponent],
  template: \`
    <siaf-input label="Descripción" [value]="descripcion()" (valueChange)="descripcion.set($event)" />
    <siaf-status-tag tone="success">Aprobado</siaf-status-tag>
    <siaf-button icon="save" (click)="grabar()">Grabar</siaf-button>
  \`,
})
export class EjemploComponent {
  readonly descripcion = signal<string | number | string[]>('');

  grabar(): void {}
}`,
          },
        ],
      },
      {
        id: 'entradas-y-eventos',
        titulo: 'Entradas y eventos',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Las entradas son señales (`input()`): en la plantilla se enlazan como siempre (`[activeId]="pestana()"`); desde TypeScript se leen como función (`tabs.activeId()`).',
              'Un valor que el componente también cambia (la pestaña, la opción elegida) va con una señal propia y su evento: `[activeId]="pestana()" (activeIdChange)="pestana.set($event)"`.',
              '`siaf-tabs`, `siaf-radio-group`, `siaf-buttons-group` y `siaf-icon-dropdown-menu` son genéricos: tipar las opciones (`TabItem<\'a\' | \'b\'>[]`) hace que el evento emita ese tipo.',
              'En una prueba, una entrada se fija con `fixture.componentRef.setInput(\'open\', true)` y después `fixture.detectChanges()`.',
            ],
          },
        ],
      },
      {
        id: 'graficos',
        titulo: 'Gráficos',
        bloques: [
          {
            tipo: 'parrafo',
            texto: 'Los cuatro gráficos (`siaf-bar-chart`, `siaf-line-chart`, `siaf-diverging-chart` y `siaf-donut-chart`) van en una entrada aparte, para que Chart.js entre al bundle solo si los usas.',
          },
          { tipo: 'codigo', archivo: 'ejemplo.component.ts', codigo: `import { BarChartComponent, type ChartSeries } from '${PAQUETE}/graficos';` },
        ],
      },
      {
        id: 'fuentes-de-datos',
        titulo: 'Componentes que piden datos',
        bloques: [
          {
            tipo: 'parrafo',
            texto: 'Los paneles de historial, la barra superior, la bandeja y Documentos y registros no llaman a ninguna API: piden sus datos a una clase abstracta del kit que el proyecto extiende con su backend y registra en sus providers.',
          },
          {
            tipo: 'codigo',
            archivo: 'mi-fuente-historial-documento.ts',
            codigo: `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FuenteHistorialDocumento, type DocumentHistoryRow } from '${PAQUETE}';

@Injectable({ providedIn: 'root' })
export class MiFuenteHistorialDocumento extends FuenteHistorialDocumento {
  private readonly http = inject(HttpClient);

  obtenerHistorial(solicitudId: string) {
    return this.http.get<DocumentHistoryRow[]>(\`/api/solicitudes/\${solicitudId}/historial\`);
  }
}

// En los providers de la app:
// { provide: FuenteHistorialDocumento, useExisting: MiFuenteHistorialDocumento }`,
          },
          {
            tipo: 'tabla',
            cabeceras: ['Componente', 'Fuente que pide'],
            filas: [
              ['`siaf-account-history-panel`', '`FuenteHistorialCuenta`'],
              ['`siaf-asiento-history-panel`', '`FuenteHistorialAsiento`'],
              ['`siaf-document-history-panel`', '`FuenteHistorialDocumento`'],
              ['`siaf-navbar`', '`FuenteSesion` y `FuenteNotificaciones`'],
              ['`siaf-tray-menu` y `siaf-tray-documents-view`', '`FuenteBandeja`'],
              ['`siaf-documents-records-page`', '`FuenteDocumentosRegistros`'],
            ],
          },
        ],
      },
      {
        id: 'tema-oscuro',
        titulo: 'Tema oscuro',
        bloques: [
          { tipo: 'parrafo', texto: 'Los tokens tienen su par oscuro. Se activa con un atributo en la raíz; con `light`, o sin el atributo, vuelve al claro.' },
          { tipo: 'codigo', archivo: 'tema.ts', codigo: "document.documentElement.setAttribute('data-theme', 'dark');" },
        ],
      },
    ],
  },
  {
    id: 'convenciones',
    titulo: 'Convenciones',
    descripcion: 'Las reglas del proyecto para que todas las pantallas se vean y se comporten igual.',
    claves: ['reglas', 'colores', 'tokens', 'hex', 'íconos', 'foco', 'accesibilidad', 'formularios', 'onpush'],
    secciones: [
      {
        id: 'componentes',
        titulo: 'Buscar el componente antes de escribir markup',
        bloques: [
          {
            tipo: 'parrafo',
            texto: 'Antes de armar un bloque a mano, búscalo en este catálogo: ya pasó reinventar `empty-section`, `message-box` y `siaf-menu`. Un componente compuesto usa los del kit por dentro, así un cambio de diseño se hace en un solo lugar.',
          },
        ],
      },
      {
        id: 'colores',
        titulo: 'Colores: siempre el token',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Nunca un hex crudo. En las clases, la utilidad del token: `--sys-color-text-neutral-medium` es `text-text-neutral-medium`, y `--sys-color-bg-surfaces-surface-low` es `bg-bg-surfaces-surface-low` (también `border-…`).',
              'En CSS, con `var()`: `var(--sys-color-text-neutral-medium)`. Antes de escribir un color, búscalo en Fundamentos › Color: suele existir con ese mismo valor.',
              'Los tokens tienen su par oscuro: usar el token hace que la pantalla funcione en los dos temas sin más trabajo.',
            ],
          },
          {
            tipo: 'comparacion',
            incorrecto: '<p class="text-[#4B4B4D]">Saldo inicial</p>',
            correcto: '<p class="text-text-neutral-medium">Saldo inicial</p>',
          },
        ],
      },
      {
        id: 'iconos',
        titulo: 'Íconos: Material Icons con siaf-icon',
        bloques: [
          {
            tipo: 'parrafo',
            texto: 'Solo íconos de Material Icons y siempre con `siaf-icon`: nada de SVG a mano. Un nombre que no existe no falla al compilar, se pinta como texto; `npm run icons:check` los valida en el CI.',
          },
          {
            tipo: 'comparacion',
            incorrecto: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 20h14v-2H5…" /></svg>',
            correcto: '<siaf-icon name="file_download" [size]="20" />',
          },
        ],
      },
      {
        id: 'angular',
        titulo: 'Componentes de Angular',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Standalone, `ChangeDetectionStrategy.OnPush` e `inject()`.',
              'Entradas con `input()` / `input.required()` y eventos con `output()`; el estado del componente en `signal()`, no en campos planos.',
              'Control de flujo con `@if` y `@for` en las plantillas.',
            ],
          },
        ],
      },
      {
        id: 'foco-y-teclado',
        titulo: 'Foco y teclado',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'El anillo de foco es un contorno de 2 px `border-states-focus`; en Tailwind v4 la variante necesita `outline-solid` o no se pinta.',
              'Modales, paneles y desplegables usan la directiva `siafFoco`: lleva el foco adentro al abrir, da la vuelta con Tab, avisa Escape y lo devuelve al cerrar.',
              'Las opciones de una lista son una sola parada de Tab y se recorren con las flechas.',
            ],
          },
          { tipo: 'codigo', archivo: 'plantilla.html', codigo: '<div [siafFoco]="abierto()" (siafFocoEscape)="cerrar()">…</div>' },
          {
            tipo: 'comparacion',
            incorrecto: '<!-- outline-none deja el estilo en none: outline-2 no pinta nada -->\n<a class="outline-none focus-visible:outline-2 focus-visible:outline-border-states-focus">…</a>',
            correcto: '<a class="focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-border-states-focus">…</a>',
          },
        ],
      },
      {
        id: 'formularios',
        titulo: 'Formularios',
        bloques: [
          {
            tipo: 'lista',
            items: [
              '`siaf-input` y `text-area-control` se ponen en verde al llenarse; `[autoSuccess]="false"` va solo en buscadores y filtros, donde el verde no valida nada.',
              'Lo que emite `siaf-input` (`string | number | string[]`) se lee con `textoDeCampo`, que exporta el kit.',
              'En una solicitud con «Editar», Grabar se habilita solo con cambios: en el taller, con la foto del formulario de `shared/utils/form-snapshot.util.ts`.',
            ],
          },
          {
            tipo: 'comparacion',
            incorrecto: '<!-- En un buscador, el verde de éxito no valida nada -->\n<siaf-input label="Buscar" leadingIcon="search" />',
            correcto: '<siaf-input label="Buscar" leadingIcon="search" [autoSuccess]="false" />',
          },
        ],
      },
    ],
  },
  {
    id: 'versiones',
    titulo: 'Versiones',
    descripcion: `El kit va en la ${VERSION_KIT}. Qué cambió entre versiones y qué hay que tocar en el código para actualizar.`,
    claves: ['versión', 'actualizar', 'migrar', 'cambios', '0.1', '0.2', '0.3', '0.4', 'input()', 'política', 'soporte', 'deprecated', 'retirar'],
    secciones: [
      {
        id: 'actual',
        titulo: 'Versión actual',
        bloques: [
          { tipo: 'parrafo', texto: `**${VERSION_KIT}**: el archivo es \`${TGZ}\`. Se arma con \`npm run kit:empaquetar\` (ver «Instalación»).` },
        ],
      },
      {
        id: 'politica',
        titulo: 'Política de versiones',
        bloques: [
          {
            tipo: 'parrafo',
            texto: 'El número es `0.menor.parche`. **El menor** (0.2 → 0.3) sube cuando el proyecto que usa el kit tiene que cambiar su código para actualizar; **el parche** (0.3.0 → 0.3.1), cuando no.',
          },
          { tipo: 'parrafo', texto: '**Cuenta como cambio incompatible** (sube el menor):' },
          {
            tipo: 'lista',
            items: [
              'Quitar o renombrar un componente, una entrada, un evento o un tipo exportado.',
              'Cambiar el tipo de una entrada o cómo se lee desde TypeScript (como el paso de `@Input()` a `input()`).',
              'Renombrar o quitar un token o una clase del `@theme` que las pantallas usan.',
              'Pedir una dependencia nueva o una versión mayor de Angular.',
              'Que un componente pase a pedir una fuente de datos que antes no pedía.',
            ],
          },
          {
            tipo: 'parrafo',
            texto: '**No cuenta** (va en un parche): componentes, entradas, eventos o tokens nuevos; arreglos que acercan un componente a su Figma; cambios internos que no se ven desde fuera.',
          },
        ],
      },
      {
        id: 'retirar',
        titulo: 'Cómo se retira algo',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Primero se marca con `@deprecated` en su JSDoc, diciendo qué usar en su lugar: el editor lo muestra tachado.',
              'Sigue funcionando al menos durante una versión menor más.',
              'Se quita en una versión menor, con los pasos para actualizar en esta página.',
            ],
          },
          {
            tipo: 'codigo',
            archivo: 'componente.ts',
            codigo: '/** @deprecated Usa `variant="filled"`: `accent` es el nombre anterior. */',
          },
        ],
      },
      {
        id: 'soporte',
        titulo: 'Soporte por versión',
        bloques: [
          {
            tipo: 'tabla',
            cabeceras: ['Versión', 'Estado', 'Qué recibe'],
            filas: [
              [`**${VERSION_KIT}**`, 'Estable (la actual)', 'Componentes nuevos, cambios y arreglos.'],
              ['0.3', 'Sin soporte', 'Nada: actualiza a la 0.4 instalando `@angular/cdk`.'],
              ['0.2', 'Sin soporte', 'Nada: actualiza con los pasos de abajo.'],
              ['0.1', 'Solo arreglos', 'Arreglos para el proyecto que la usa, en la rama `kit/0.1.x` (la 0.1.1 suma `tooltipPosition`); no vuelven a `develop`.'],
            ],
          },
        ],
      },
      {
        id: 'de-0-3-a-0-4',
        titulo: 'De la 0.3 a la 0.4',
        bloques: [
          {
            tipo: 'parrafo',
            texto: 'Lo que ya existe no cambia. Lo nuevo es **reordenar arrastrando**: `siafReordenable`, `siafReordenableItem`, la manija `siaf-drag-handle` y `reordenable` en `siaf-table` y `siaf-data-table`. Usan `@angular/cdk/drag-drop`: instálalo.',
          },
          { tipo: 'codigo', archivo: 'terminal', codigo: 'npm install @angular/cdk@^21' },
        ],
      },
      {
        id: 'de-0-2-a-0-3',
        titulo: 'De la 0.2 a la 0.3',
        bloques: [
          {
            tipo: 'parrafo',
            texto: 'Los nombres y los tipos de las entradas no cambian (lo único nuevo es `tooltipPosition` de `siafTooltip`). Cambia **cómo se leen** 87 entradas de 49 componentes, que pasaron de `@Input()` a `input()`.',
          },
          {
            tipo: 'diff',
            archivo: 'pantalla.component.ts',
            codigo: `  private readonly tabs = viewChild.required(TabsComponent);
- const activa = this.tabs().activeId;
+ const activa = this.tabs().activeId();`,
          },
          {
            tipo: 'diff',
            archivo: 'pantalla.component.spec.ts',
            codigo: `- fixture.componentInstance.open = true;
+ fixture.componentRef.setInput('open', true);
  fixture.detectChanges();`,
          },
          {
            tipo: 'tabla',
            cabeceras: ['Cómo usa el proyecto la entrada', 'Qué hacer'],
            filas: [
              ['En la plantilla: `[activeId]="pestana()"`', 'Nada: el enlace funciona igual'],
              ['La lee desde TypeScript: `tabs.activeId`', 'Llamarla como función: `tabs.activeId()`'],
              ['La asigna desde TypeScript: `paginacion.page = 3`', 'Pasarla por la plantilla con una señal propia'],
              ['En una prueba: `componente.open = true`', '`fixture.componentRef.setInput(\'open\', true)` y `fixture.detectChanges()`'],
            ],
          },
          { tipo: 'aviso', texto: 'Si el proyecto solo usa los componentes en sus plantillas, actualiza sin cambios.' },
        ],
      },
      {
        id: 'de-0-1-a-0-3',
        titulo: 'De la 0.1 a la 0.3',
        bloques: [
          { tipo: 'parrafo', texto: 'Además de lo anterior:' },
          {
            tipo: 'lista',
            items: [
              '**Más componentes**: de 68 a 113 (buscadores, paginación, armazones de solicitud, Consultas y reportes, paneles de historial, la navbar, la bandeja y Documentos y registros).',
              '**`@angular/router` y `rxjs` son dependencias**: los piden las migas de pan, los menús y los armazones.',
              '**Fuentes de datos**: los paneles de historial, la navbar, la bandeja y Documentos y registros piden sus datos a clases que el proyecto extiende (ver «Uso»). Sin ellas, fallan al crearse.',
              '**Opciones tipadas**: los componentes genéricos emiten el tipo de sus opciones, lo que puede pedir ajustar el tipo del manejador.',
            ],
          },
          {
            tipo: 'diff',
            archivo: 'app.config.ts',
            codigo: `  providers: [
    provideRouter(routes),
+   { provide: FuenteHistorialDocumento, useExisting: MiFuenteHistorialDocumento },
  ],`,
          },
        ],
      },
    ],
  },
];

export function primerPasoPorId(id: string): PaginaPrimerosPasos | null {
  return PRIMEROS_PASOS.find((p) => p.id === id) ?? null;
}

const normalizar = (s: string): string =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

/** Las páginas que coinciden con la búsqueda del menú (todas si está vacía), por título o palabra clave. */
export function filtrarPrimerosPasos(busqueda: string): PaginaPrimerosPasos[] {
  const q = normalizar(busqueda);
  if (!q) return [...PRIMEROS_PASOS];
  return PRIMEROS_PASOS.filter((p) => [p.titulo, ...p.claves].some((texto) => normalizar(texto).includes(q)));
}
