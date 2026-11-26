/**
 * Versión en Markdown del catálogo /ui-kit, para asistentes de IA y para leerla fuera de la app: un `llms.txt` con el
 * índice y una ficha `.md` por componente visible (`public/ui-kit/componentes/<id>.md`), con lo mismo que su página:
 * descripción, import, uso, cuándo usarlo y cuándo no, limitaciones, entradas, eventos, accesibilidad y composición.
 *
 * La usa `scripts/generar-ui-kit.mjs` (`npm run ui-kit:manifest`), que escribe los archivos en `public/` y los compara en
 * `--check`. La categoría y los componentes ocultos se leen de `ui-kit.catalogo.ts`, que es lo curado a mano.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const PAQUETE = '@kennedy122112/siaf-rp-ui-angular';

/** Como `idDeSelector` del catálogo: `[siafTooltip]` → `siafTooltip`. */
export const idDeSelector = (selector) => selector.replace(/[^a-zA-Z0-9-]/g, '');

/** Como `nombreDeUso`: el atributo de una directiva se escribe sin corchetes. */
const nombreDeUso = (selector) => (/^\[[^\]]+\]$/.test(selector) ? selector.slice(1, -1) : selector);

/** Como `tituloDeClase`: `IconDropdownMenuComponent` → «Icon dropdown menu». */
export function tituloDeClase(clase) {
  const palabras = clase
    .replace(/(Component|Directive)$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(' ');
  return palabras.map((p, i) => (i === 0 || /^[A-Z0-9]{2,}$/.test(p) ? p : p.toLowerCase())).join(' ');
}

/** Las categorías, su orden y los ocultos, leídos de `ui-kit.catalogo.ts`. */
function leerCatalogo(raiz) {
  const texto = readFileSync(join(raiz, 'src/app/features/ui-kit/ui-kit.catalogo.ts'), 'utf8');
  const categorias = [...texto.matchAll(/\{ id: '([\w-]+)', titulo: '([^']+)'/g)].map((m) => ({ id: m[1], titulo: m[2] }));
  const bloque = texto.slice(texto.indexOf('CATEGORIA_POR_SELECTOR'), texto.indexOf('SELECTORES_OCULTOS'));
  const porSelector = new Map([...bloque.matchAll(/^\s*'([^']+)': '([\w-]+)',/gm)].map((m) => [m[1], m[2]]));
  const ocultos = [...(texto.match(/SELECTORES_OCULTOS[^=]*=\s*\[([^\]]*)\]/)?.[1] ?? '').matchAll(/'([^']+)'/g)].map((m) => m[1]);
  return { categorias, porSelector, ocultos };
}

/** Una celda de tabla de Markdown: sin saltos de línea y con las barras escapadas. */
const celda = (texto) => (texto ?? '').replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim();

/** La primera oración de la descripción, para el índice. */
function resumen(descripcion) {
  const plano = (descripcion ?? '').replace(/\s+/g, ' ').trim();
  const fin = plano.search(/\.(\s|$)/);
  return fin > 0 ? plano.slice(0, fin + 1) : plano;
}

function etiquetaDeUso(f) {
  if (f.selector.startsWith('[')) return `<span ${f.selector.slice(1, -1)}="…"></span>`;
  const obligatorias = f.entradas.filter((e) => e.requerida).map((e) => `[${e.nombre}]="…"`);
  const atributos = obligatorias.length ? ` ${obligatorias.join(' ')}` : '';
  return f.proyectaContenido ? `<${f.selector}${atributos}>…</${f.selector}>` : `<${f.selector}${atributos} />`;
}

function fichaMarkdown(f, categoria, fichasVisibles) {
  const titulo = tituloDeClase(f.clase);
  const lineas = [`# ${titulo}`, '', `> \`${nombreDeUso(f.selector)}\` · ${f.tipo === 'directiva' ? 'Directiva' : 'Componente'} de ${categoria ?? 'Otros'}${f.sinUso ? ' · Sin uso en la app' : ''}`, ''];
  if (f.descripcion) lineas.push(f.descripcion, '');
  lineas.push(
    '## Importar',
    '',
    '```ts',
    `import { ${f.clase} } from '${f.importacion}';`,
    '```',
    '',
    f.importacion.startsWith(PAQUETE)
      ? `Desde el paquete del kit (\`${f.importacion}\`), instalado desde \`vendor/\`.`
      : `Propio del taller: \`${f.archivo}\`.`,
    '',
    '## Uso',
    '',
    '```html',
    etiquetaDeUso(f),
    '```',
    '',
  );
  const seccion = (nombre, texto) => {
    if (texto) lineas.push(`### ${nombre}`, '', texto, '');
  };
  seccion('Cuándo usarlo', f.usar);
  seccion('Cuándo no', f.evitar);
  seccion('Limitaciones', f.limitaciones);
  if (f.incorrecto && f.correcto) {
    lineas.push('### Así no / así sí', '', '```html', '<!-- ❌ Así no -->', f.incorrecto, '', '<!-- ✅ Así sí -->', f.correcto, '```', '');
  }
  lineas.push('## Entradas', '');
  if (f.entradas.length) {
    lineas.push('| Nombre | Tipo | Por defecto | Descripción |', '|---|---|---|---|');
    for (const e of f.entradas) lineas.push(`| \`${e.nombre}\`${e.requerida ? ' (obligatoria)' : ''} | \`${celda(e.tipo)}\` | ${e.porDefecto === null ? '—' : `\`${celda(e.porDefecto)}\``} | ${celda(e.descripcion)} |`);
  } else lineas.push('No recibe entradas.');
  lineas.push('', '## Eventos', '');
  if (f.eventos.length) {
    lineas.push('| Nombre | Valor | Descripción |', '|---|---|---|');
    for (const e of f.eventos) lineas.push(`| \`(${e.nombre})\` | \`${celda(e.tipo)}\` | ${celda(e.descripcion)} |`);
  } else lineas.push('No emite eventos.');
  lineas.push('', '## Accesibilidad', '');
  const aria = [...f.aria.roles.map((r) => `role="${r}"`), ...f.aria.atributos];
  if (f.waiAria) lineas.push(`Patrón WAI-ARIA: ${f.waiAria.nombre} (${f.waiAria.url}).`, '');
  lineas.push(aria.length ? `Roles y atributos del código: ${aria.map((a) => `\`${a}\``).join(', ')}.` : 'La plantilla no declara roles ni atributos ARIA.', '');
  seccion('Teclado', f.teclado);
  seccion('Notas', f.accesibilidad);
  const usa = f.usa.filter((s) => fichasVisibles.has(s));
  if (usa.length) lineas.push('## Composición', '', `Pinta por dentro: ${usa.map((s) => `[\`${nombreDeUso(s)}\`](${idDeSelector(s)}.md)`).join(', ')}.`, '');
  lineas.push('---', '', `Generado desde el código (\`${f.archivo}\`) con \`npm run ui-kit:manifest\`. Página: /ui-kit/componentes/${idDeSelector(f.selector)}`, '');
  return lineas.join('\n');
}

/**
 * Los archivos de la versión en Markdown: ruta relativa a `public/` → contenido. Sin los componentes ocultos del catálogo.
 * `version` es la del paquete del kit.
 */
export function generarMarkdown(raiz, fichas, version) {
  const { categorias, porSelector, ocultos } = leerCatalogo(raiz);
  const visibles = fichas.filter((f) => !ocultos.includes(f.selector));
  const visiblesSet = new Set(visibles.map((f) => f.selector));
  const tituloCategoria = (selector) => categorias.find((c) => c.id === porSelector.get(selector))?.titulo ?? null;
  const archivos = new Map();
  for (const f of visibles) archivos.set(`ui-kit/componentes/${idDeSelector(f.selector)}.md`, fichaMarkdown(f, tituloCategoria(f.selector), visiblesSet));

  const indice = [
    '# SIAF-RP UI Kit',
    '',
    `> Design system del SIAF-RP para Angular 21 (kit ${version}): componentes standalone con OnPush y signals, y los tokens del Figma en claro y oscuro. Cada componente tiene su ficha en Markdown con la API real, generada desde el código.`,
    '',
    'Reglas del proyecto: colores solo con tokens (`text-…`, `bg-…`, nunca hex), íconos de Material Icons con `siaf-icon`, entradas con `input()` y estado con `signal()`. Antes de escribir markup, buscar el componente en este índice.',
    '',
    '## Primeros pasos',
    '',
    '- [Instalación](/ui-kit/primeros-pasos/instalacion): el paquete .tgz, los estilos con o sin Tailwind y la fuente.',
    '- [Uso](/ui-kit/primeros-pasos/uso): importar, entradas y eventos, gráficos, fuentes de datos y tema oscuro.',
    '- [Convenciones](/ui-kit/primeros-pasos/convenciones): colores, íconos, foco, formularios.',
    '- [Versiones](/ui-kit/primeros-pasos/versiones): política, soporte y migraciones.',
    '',
  ];
  for (const c of categorias) {
    const deCategoria = visibles.filter((f) => porSelector.get(f.selector) === c.id);
    if (!deCategoria.length) continue;
    // En el orden curado de CATEGORIA_POR_SELECTOR, como el menú del catálogo.
    const orden = [...porSelector.keys()];
    deCategoria.sort((a, b) => orden.indexOf(a.selector) - orden.indexOf(b.selector));
    indice.push(`## ${c.titulo}`, '');
    for (const f of deCategoria) indice.push(`- [${tituloDeClase(f.clase)} (\`${nombreDeUso(f.selector)}\`)](/ui-kit/componentes/${idDeSelector(f.selector)}.md): ${celda(resumen(f.descripcion))}`);
    indice.push('');
  }
  archivos.set('llms.txt', indice.join('\n'));
  return archivos;
}
