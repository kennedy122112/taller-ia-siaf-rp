#!/usr/bin/env node
/**
 * Genera el manifiesto del catálogo de componentes (/ui-kit) leyendo el kit instalado y el armazón del taller.
 *
 * - **El kit** (`@kennedy122112/siaf-rp-ui-angular`, en node_modules): de su JavaScript compilado (`fesm2022`) saca el
 *   selector, las entradas y los eventos que declara cada componente (`ɵɵngDeclareComponent`/`ɵɵngDeclareDirective`),
 *   la plantilla, los valores por defecto y qué otros componentes pinta; de sus tipos (`types/*.d.ts`), la ficha
 *   (JSDoc de la clase con `@usar`, `@evitar`, `@teclado`…) y el tipo de cada entrada y evento, resuelto por el
 *   compilador de TypeScript.
 * - **El armazón propio** (src/app/layout: `siaf-app-shell` y `siaf-virtual-desk`): del código fuente, como siempre.
 *
 * Así el catálogo funciona sin el repositorio del SIAF-RP: basta con `npm install`.
 *
 * También escribe ui-kit.fundamentos.ts con los fundamentos visuales (color, tipografía, espaciado, radios, sombras e
 * íconos) leídos de los tokens del kit: ver scripts/ui-kit-fundamentos.mjs.
 *
 * Además escribe ui-kit.cargadores.ts (la carga diferida de cada componente para el playground y la versión del kit) y
 * la versión en Markdown del catálogo en public/ (llms.txt y una ficha .md por componente): ver scripts/ui-kit-markdown.mjs.
 *
 *   node scripts/generar-ui-kit.mjs           → escribe el manifiesto, los fundamentos, los cargadores y el Markdown
 *   node scripts/generar-ui-kit.mjs --check   → falla si alguno está desactualizado
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

import { generarFundamentos, utilidadesTailwind } from './ui-kit-fundamentos.mjs';
import { generarMarkdown } from './ui-kit-markdown.mjs';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SALIDA = join(RAIZ, 'src/app/features/ui-kit/ui-kit.manifest.ts');
const SALIDA_FUNDAMENTOS = join(RAIZ, 'src/app/features/ui-kit/ui-kit.fundamentos.ts');
const SALIDA_CARGADORES = join(RAIZ, 'src/app/features/ui-kit/ui-kit.cargadores.ts');

const PAQUETE = '@kennedy122112/siaf-rp-ui-angular';
const DIR_PAQUETE = join(RAIZ, 'node_modules', PAQUETE);
/** Entradas del paquete: la principal y la de gráficos (Chart.js). */
const ENTRADAS_DEL_PAQUETE = [
  { importacion: PAQUETE, mjs: 'fesm2022/kennedy122112-siaf-rp-ui-angular.mjs', dts: 'types/kennedy122112-siaf-rp-ui-angular.d.ts' },
  {
    importacion: `${PAQUETE}/graficos`,
    mjs: 'fesm2022/kennedy122112-siaf-rp-ui-angular-graficos.mjs',
    dts: 'types/kennedy122112-siaf-rp-ui-angular-graficos.d.ts',
  },
];

/** Código propio del taller que también entra al catálogo. */
const CARPETAS_LOCALES = [{ dir: 'src/app/layout', capa: 'layout', alias: '@siaf/layout' }];

/**
 * Capa de cada pieza del kit: el paquete no la trae. `ui` es el design system agnóstico, `components` lo transversal
 * con dominio (historiales, plantillas, armazones de pantalla) y `layout` el armazón de la app. Lo que no está aquí es
 * `ui`.
 */
const CAPA_DEL_KIT = {
  components: [
    'siaf-acciones-en-lote-section', 'siaf-account-history-panel', 'siaf-asiento-history-panel', 'siaf-breadcrumb',
    'siaf-consultas-filtros-chips', 'siaf-create-document', 'siaf-custom-filter', 'siaf-data-table',
    'siaf-detail-history-tabs', 'siaf-document-history-panel', 'siaf-documents-records-page', 'siaf-encabezado-section',
    'siaf-filter-pill', 'siaf-filtros-section', 'siaf-form-table-search', 'siaf-page-header', 'siaf-page-shell',
    'siaf-pagination', 'siaf-parametros-aplicados', 'siaf-query-parameters-panel', 'siaf-query-report-page',
    'siaf-records-search-toolbar', 'siaf-records-tabs', 'siaf-request-approval-modals', 'siaf-selection-side-nav',
    'siaf-solicitude-form-card', 'siaf-solicitude-header', 'siaf-solicitude-info-card', 'siaf-solicitude-page-layout',
    'siaf-table-controls', 'siaf-timeline', 'siaf-timeline-detail-panel',
  ],
  layout: [
    'siaf-mobile-navigation-menu', 'siaf-navbar', 'siaf-notifications-panel', 'siaf-process-menu-tree', 'siaf-sidebar',
    'siaf-tray-documents-view', 'siaf-tray-menu', 'siaf-tray-notifications-view',
  ],
};
/**
 * Secciones de un componente del kit: el paquete las exporta, pero son partes de esa pantalla (su carpeta `sections/`
 * en el SIAF-RP), no piezas sueltas. No tienen ficha: lo que pintan, sus roles y atributos ARIA y sus tokens cuentan
 * como del componente. El paquete no trae las carpetas, así que se declaran aquí.
 */
const SECCIONES_DEL_KIT = {
  'siaf-documents-records-page': ['siaf-encabezado-section', 'siaf-filtros-section', 'siaf-acciones-en-lote-section'],
};
const PADRE_DE_SECCION = new Map(Object.entries(SECCIONES_DEL_KIT).flatMap(([padre, hijas]) => hijas.map((h) => [h, padre])));

const capaDelKit = (selector) =>
  CAPA_DEL_KIT.components.includes(selector) ? 'components' : CAPA_DEL_KIT.layout.includes(selector) ? 'layout' : 'ui';

/** En el código local, importar de aquí vuelve al componente dependiente de sesión: sin ejemplo en una ruta pública. */
const DEPENDENCIA_DE_SESION = /core\/(api|state|auth)\b|@angular\/common\/http/;
const MAX_TIPO = 180;

const check = process.argv.includes('--check');

if (!existsSync(DIR_PAQUETE)) {
  console.error(`✖ No está instalado ${PAQUETE}. Corre: npm install`);
  process.exit(1);
}

function archivos(dir) {
  const out = [];
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) out.push(...archivos(ruta));
    else if (/\.(component|directive)\.ts$/.test(nombre)) out.push(ruta);
  }
  return out;
}

const raices = CARPETAS_LOCALES.flatMap((c) => archivos(join(RAIZ, c.dir)).map((f) => ({ f, ...c })));
const dtsDelPaquete = ENTRADAS_DEL_PAQUETE.map((e) => join(DIR_PAQUETE, e.dts));

const config = ts.getParsedCommandLineOfConfigFile(join(RAIZ, 'tsconfig.app.json'), {}, {
  ...ts.sys,
  onUnRecoverableConfigFileDiagnostic: (d) => { throw new Error(ts.flattenDiagnosticMessageText(d.messageText, '\n')); },
});
const programa = ts.createProgram([...raices.map((r) => r.f), ...dtsDelPaquete], { ...config.options, noEmit: true });
const checker = programa.getTypeChecker();

const limpiar = (s) => (s ?? '').replace(/\s+/g, ' ').trim();
const recortar = (s, n) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const aPosix = (ruta) => ruta.replace(/\\/g, '/');

function textoJsDoc(nodo) {
  const docs = ts.getJSDocCommentsAndTags(nodo).filter(ts.isJSDoc);
  // Sin \r: el manifiesto debe salir idéntico con checkout CRLF (Windows) y LF (CI en Linux).
  return docs.map((d) => ts.getTextOfJSDocComment(d.comment) ?? '').join('\n\n').replace(/\r\n?/g, '\n').trim();
}

/** Etiquetas del JSDoc de la clase (`@usar`, `@figma`…) → { nombre: [textos] }. */
function etiquetasJsDoc(nodo) {
  const etiquetas = {};
  for (const d of ts.getJSDocCommentsAndTags(nodo).filter(ts.isJSDoc)) {
    for (const t of d.tags ?? []) {
      const texto = (ts.getTextOfJSDocComment(t.comment) ?? '').replace(/\r\n?/g, '\n').trim();
      (etiquetas[t.tagName.text] ??= []).push(texto);
    }
  }
  return etiquetas;
}

/** `@waiAria tabs Pestañas` → el patrón de la guía de prácticas de ARIA (APG) con su enlace. */
function patronWaiAria(etiquetas) {
  const texto = etiquetas.waiAria?.[0];
  const m = texto && /^([\w-]+)\s*(.*)$/s.exec(texto);
  return m ? { nombre: limpiar(m[2]) || m[1], url: `https://www.w3.org/WAI/ARIA/apg/patterns/${m[1]}/` } : null;
}

const unir = (textos) => (textos?.filter(Boolean).length ? textos.filter(Boolean).join('\n\n') : null);

/** Nodos del Figma: `@figma 2588:135 Nombre` y los «nodo 1264:580» que ya cita la descripción. */
function nodosFigma(etiquetas, descripcion) {
  const nodos = new Map();
  for (const texto of etiquetas.figma ?? []) {
    const m = /^(\d+[:-]\d+)\s*(.*)$/s.exec(texto);
    if (m) nodos.set(m[1].replace('-', ':'), { nodo: m[1].replace('-', ':'), nombre: limpiar(m[2]) || null });
  }
  for (const m of descripcion.matchAll(/\bnodos?\s+(\d+[:-]\d+)/gi)) {
    const nodo = m[1].replace('-', ':');
    if (!nodos.has(nodo)) nodos.set(nodo, { nodo, nombre: null });
  }
  return [...nodos.values()];
}

const quitarComentarios = (texto) => texto.replace(/\/\*[\s\S]*?\*\//g, '').replace(/<!--[\s\S]*?-->/g, '').replace(/^\s*\/\/.*$/gm, '');

/** Roles y atributos ARIA que declara el componente (plantilla, host o código). */
function ariaDe(codigo) {
  const roles = new Set();
  for (const m of codigo.matchAll(/\brole\s*=\s*"([a-z]+)"/g)) roles.add(m[1]);
  for (const m of codigo.matchAll(/\[attr\.role\]\s*=\s*"([^"]*)"/g)) for (const r of m[1].matchAll(/'([a-z]+)'/g)) roles.add(r[1]);
  for (const m of codigo.matchAll(/setAttribute\(\s*'role'\s*,\s*'([a-z]+)'/g)) roles.add(m[1]);
  for (const m of codigo.matchAll(/['"]?role['"]?\s*:\s*['"]([a-z]+)['"]/g)) roles.add(m[1]);
  const atributos = new Set([...codigo.matchAll(/\baria-[a-z]+(?:-[a-z]+)*/g)].map((m) => m[0]));
  return { roles: [...roles].sort(), atributos: [...atributos].sort() };
}

const escaparRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const UTILIDADES = utilidadesTailwind(RAIZ);
const alternativas = (mapa, filtro = () => true) => [...mapa.keys()].filter(filtro).sort((a, b) => b.length - a.length).map(escaparRegex).join('|');
const PATRONES_TOKEN = [
  { mapa: UTILIDADES.color, re: new RegExp(`(?<![\\w-])(bg|text|border(?:-[trblxyse])?|ring|fill|stroke|outline|divide|accent|decoration|placeholder|caret|from|via|to)-(${alternativas(UTILIDADES.color)})(?:/[\\d.]+)?(?![\\w-])`, 'g') },
  { mapa: UTILIDADES.espaciado, re: new RegExp(`(?<![\\w-])-?(p[xytrblse]?|m[xytrblse]?|gap(?:-[xy])?|space-[xy]|w|h|size|min-w|min-h|max-w|max-h|inset(?:-[xy])?|top|right|bottom|left|translate-[xy]|scroll-[mp][xytrblse]?)-(${alternativas(UTILIDADES.espaciado, (k) => k.startsWith('siaf-'))})(?![\\w-])`, 'g') },
  { mapa: UTILIDADES.radio, re: new RegExp(`(?<![\\w-])(rounded(?:-(?:tl|tr|bl|br|ss|se|es|ee|[trblse]))?)-(${alternativas(UTILIDADES.radio)})(?![\\w-])`, 'g') },
  { mapa: UTILIDADES.sombra, re: new RegExp(`(?<![\\w-])(shadow)-(${alternativas(UTILIDADES.sombra)})(?![\\w-])`, 'g') },
];

/** Tokens `--sys-*` que usa el componente: con `var()` directo o vía una utilidad de Tailwind conectada a un token. */
function tokensDe(codigo) {
  const tokens = new Map();
  const anotar = (token, via) => (tokens.get(token) ?? tokens.set(token, new Set()).get(token)).add(via);
  for (const m of codigo.matchAll(/var\(\s*(--sys-[\w-]+)/g)) anotar(m[1], 'var()');
  for (const { mapa, re } of PATRONES_TOKEN) {
    for (const m of codigo.matchAll(re)) anotar(mapa.get(m[2]), `${m[1]}-${m[2]}`);
  }
  return [...tokens.entries()].map(([token, via]) => ({ token, via: [...via].sort() })).sort((a, b) => a.token.localeCompare(b.token));
}

function decorador(nodo, nombres) {
  for (const d of ts.getDecorators(nodo) ?? []) {
    const e = d.expression;
    if (ts.isCallExpression(e) && ts.isIdentifier(e.expression) && nombres.includes(e.expression.text)) return e;
  }
  return null;
}

function propiedad(obj, nombre) {
  const p = obj?.properties.find((x) => ts.isPropertyAssignment(x) && x.name.getText() === nombre);
  return p ? p.initializer : undefined;
}

/** Texto de un literal de cadena o de plantilla sin sustituciones; null si es otra cosa. */
function textoLiteral(nodo) {
  if (!nodo) return null;
  if (ts.isStringLiteral(nodo) || ts.isNoSubstitutionTemplateLiteral(nodo)) return nodo.text;
  if (ts.isTemplateExpression(nodo)) return nodo.getText();
  return null;
}

const FORMATO = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType;

/** Tipo legible. Un alias de unión de literales (`ButtonSize`) se expande a sus valores, que es lo que el consumidor necesita. */
function tipoTexto(tipo) {
  const base = limpiar(checker.typeToString(tipo, undefined, FORMATO));
  if (tipo.aliasSymbol && tipo.isUnion() && tipo.types.every((t) => t.isLiteral() || t.flags & ts.TypeFlags.BooleanLiteral || t.flags & ts.TypeFlags.Undefined || t.flags & ts.TypeFlags.Null)) {
    const expandido = limpiar(checker.typeToString(tipo, undefined, FORMATO | ts.TypeFormatFlags.InTypeAlias));
    if (expandido !== base && expandido.length <= MAX_TIPO) return expandido;
  }
  return recortar(base, MAX_TIPO);
}

/** Argumentos de tipo de `EventEmitter<T>`, `OutputEmitterRef<T>`, `InputSignal<T>`… */
function argumentosDeTipo(tipo) {
  return checker.getTypeArguments?.(tipo)?.length ? checker.getTypeArguments(tipo) : (tipo.aliasTypeArguments ?? []);
}

/** Tipo `T` de `EventEmitter<T>`, `OutputEmitterRef<T>`, `InputSignal<T>`… */
function argumentoDeTipo(tipo) {
  const args = argumentosDeTipo(tipo);
  return args.length ? tipoTexto(args[0]) : tipoTexto(tipo);
}

/** Lo que recibe una entrada en señal: `T` de `InputSignal<T>` y `ModelSignal<T>`; lo que se escribe en `InputSignalWithTransform<T, W>`. */
function tipoDeEntradaEnSenal(tipo) {
  const args = argumentosDeTipo(tipo);
  const nombre = tipo.aliasSymbol?.name ?? tipo.getSymbol()?.name;
  if (nombre === 'InputSignalWithTransform' && args.length > 1) return tipoTexto(args[1]);
  return args.length ? tipoTexto(args[0]) : tipoTexto(tipo);
}

/**
 * Qué control le sirve a la entrada en el playground del catálogo: texto, booleano, número u opciones (una unión de
 * literales de texto, también detrás de un alias como `SnackbarVariant`). Vacío si su tipo no cabe en un control.
 */
function controlDe(tipo) {
  const partes = (tipo.isUnion() ? tipo.types : [tipo]).filter((t) => !(t.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)));
  if (!partes.length) return {};
  if (partes.every((t) => t.flags & (ts.TypeFlags.Boolean | ts.TypeFlags.BooleanLiteral))) return { control: 'booleano' };
  if (partes.length === 1 && partes[0].flags & ts.TypeFlags.String) return { control: 'texto' };
  if (partes.length === 1 && partes[0].flags & ts.TypeFlags.Number) return { control: 'numero' };
  if (partes.every((t) => t.isStringLiteral())) return { control: 'opciones', opciones: ordenDelAlias(tipo, partes.map((t) => t.value)) };
  return {};
}

/** Los valores de una unión en el orden en que los escribe su alias (`'neutral' | 'info' | …`): el compilador los reordena. */
function ordenDelAlias(tipo, valores) {
  const nodo = tipo.aliasSymbol?.declarations?.find(ts.isTypeAliasDeclaration)?.type;
  if (!nodo || !ts.isUnionTypeNode(nodo)) return valores;
  const escritos = nodo.types.filter((t) => ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal)).map((t) => t.literal.text);
  return [...escritos.filter((v) => valores.includes(v)), ...valores.filter((v) => !escritos.includes(v))];
}

/** El tipo que recibe una entrada en señal (como `tipoDeEntradaEnSenal`), como objeto del compilador. */
function tipoRecibidoEnSenal(tipo) {
  const args = argumentosDeTipo(tipo);
  const nombre = tipo.aliasSymbol?.name ?? tipo.getSymbol()?.name;
  if (nombre === 'InputSignalWithTransform' && args.length > 1) return args[1];
  return args.length ? args[0] : tipo;
}

function valorPorDefecto(init) {
  if (!init) return null;
  if (ts.isNewExpression(init) || ts.isCallExpression(init)) return null;
  return recortar(limpiar(init.getText()), 60);
}

/** `input()`, `input.required()`, `model()`, `output()` → { fn, required, init }. */
function funcionDeSenal(init) {
  if (!init || !ts.isCallExpression(init)) return null;
  const e = init.expression;
  if (ts.isIdentifier(e) && ['input', 'model', 'output', 'outputFromObservable'].includes(e.text)) return { fn: e.text, required: false, call: init };
  if (ts.isPropertyAccessExpression(e) && ts.isIdentifier(e.expression) && ['input', 'model'].includes(e.expression.text) && e.name.text === 'required') {
    return { fn: e.expression.text, required: true, call: init };
  }
  return null;
}

function aliasDeOpciones(opciones) {
  const a = opciones && ts.isObjectLiteralExpression(opciones) ? propiedad(opciones, 'alias') : undefined;
  return a && ts.isStringLiteral(a) ? a.text : null;
}

const porNombre = (a, b) => a.nombre.localeCompare(b.nombre);

// ── Código local (src/app/layout): decoradores en el código fuente ──────────────────────────────────────────────────

/** Código propio de la clase: su decorador (plantilla y estilos en línea), la plantilla y estilos externos y el cuerpo. */
function codigoDe(nodo, meta, archivo) {
  const externos = [];
  const url = propiedad(meta, 'templateUrl');
  if (url && ts.isStringLiteral(url)) externos.push(readFileSync(join(dirname(archivo), url.text), 'utf8'));
  const estilo = propiedad(meta, 'styleUrl');
  if (estilo && ts.isStringLiteral(estilo)) externos.push(readFileSync(join(dirname(archivo), estilo.text), 'utf8'));
  return quitarComentarios([nodo.getText(), ...externos].join('\n'));
}

function miembrosLocales(clase) {
  const entradas = [];
  const eventos = [];
  for (const m of clase.members) {
    if (!(ts.isPropertyDeclaration(m) || ts.isSetAccessorDeclaration(m) || ts.isGetAccessorDeclaration(m))) continue;
    if (!m.name || !ts.isIdentifier(m.name)) continue;
    const nombre = m.name.text;
    const descripcion = limpiar(textoJsDoc(m)) || null;

    const dIn = decorador(m, ['Input']);
    if (dIn) {
      if (ts.isGetAccessorDeclaration(m)) continue; // el setter lleva el decorador
      const arg = dIn.arguments[0];
      let alias = null;
      let requerida = false;
      if (arg && ts.isStringLiteral(arg)) alias = arg.text;
      if (arg && ts.isObjectLiteralExpression(arg)) {
        alias = aliasDeOpciones(arg);
        requerida = propiedad(arg, 'required')?.kind === ts.SyntaxKind.TrueKeyword;
      }
      const nodoTipo = ts.isSetAccessorDeclaration(m) ? m.parameters[0] : m;
      const tipoIn = checker.getTypeAtLocation(nodoTipo);
      entradas.push({
        nombre: alias ?? nombre,
        tipo: tipoTexto(tipoIn),
        porDefecto: ts.isPropertyDeclaration(m) ? valorPorDefecto(m.initializer) : null,
        requerida,
        descripcion,
        ...controlDe(tipoIn),
      });
      continue;
    }

    const dOut = decorador(m, ['Output']);
    if (dOut) {
      const arg = dOut.arguments[0];
      eventos.push({
        nombre: arg && ts.isStringLiteral(arg) ? arg.text : nombre,
        tipo: argumentoDeTipo(checker.getTypeAtLocation(m)),
        descripcion,
      });
      continue;
    }

    if (ts.isPropertyDeclaration(m)) {
      const senal = funcionDeSenal(m.initializer);
      if (!senal) continue;
      const tipoT = tipoRecibidoEnSenal(checker.getTypeAtLocation(m));
      const tipo = tipoTexto(tipoT);
      if (senal.fn === 'output' || senal.fn === 'outputFromObservable') {
        eventos.push({ nombre: aliasDeOpciones(senal.call.arguments[0]) ?? nombre, tipo, descripcion });
      } else {
        const opciones = senal.required ? senal.call.arguments[0] : senal.call.arguments[1];
        const inicial = senal.required ? null : valorPorDefecto(senal.call.arguments[0]);
        entradas.push({ nombre: aliasDeOpciones(opciones) ?? nombre, tipo, porDefecto: inicial, requerida: senal.required, descripcion, ...controlDe(tipoT) });
        if (senal.fn === 'model') eventos.push({ nombre: `${aliasDeOpciones(opciones) ?? nombre}Change`, tipo, descripcion });
      }
    }
  }
  return { entradas: entradas.sort(porNombre), eventos: eventos.sort(porNombre) };
}

/** Plantilla del componente, en línea o desde `templateUrl`. */
function plantillaDe(meta, archivo) {
  const url = propiedad(meta, 'templateUrl');
  if (url && ts.isStringLiteral(url)) return readFileSync(join(dirname(archivo), url.text), 'utf8');
  return propiedad(meta, 'template')?.getText() ?? '';
}

const fichas = [];
/** Código de cada componente (sin comentarios), para calcular después qué otros componentes pinta. */
const codigoPorSelector = new Map();
/** Selectores de los que depende cada uno (los que importa o declara): para la sesión transitiva y `usa`. */
const dependenciasPorSelector = new Map();
/** Si el componente pide datos de la sesión por sí mismo. */
const sesionDirecta = new Map();

const fichaBase = (datos, etiquetas, codigo) => ({
  ...datos,
  usar: unir(etiquetas.usar),
  evitar: unir(etiquetas.evitar),
  teclado: unir(etiquetas.teclado),
  accesibilidad: unir(etiquetas.accesibilidad),
  limitaciones: unir(etiquetas.limitaciones),
  incorrecto: unir(etiquetas.incorrecto),
  correcto: unir(etiquetas.correcto),
  waiAria: patronWaiAria(etiquetas),
  figma: nodosFigma(etiquetas, datos.descripcion),
  aria: ariaDe(codigo),
  tokens: tokensDe(codigo),
  usa: [],
});

for (const { f, capa, alias, dir } of raices) {
  const fuente = programa.getSourceFile(f);
  if (!fuente) continue;
  const usaSesion = DEPENDENCIA_DE_SESION.test(fuente.text);
  ts.forEachChild(fuente, (nodo) => {
    if (!ts.isClassDeclaration(nodo) || !nodo.name) return;
    const dec = decorador(nodo, ['Component', 'Directive']);
    if (!dec) return;
    const meta = dec.arguments[0];
    const sel = meta && ts.isObjectLiteralExpression(meta) ? propiedad(meta, 'selector') : undefined;
    if (!sel || !(ts.isStringLiteral(sel) || ts.isNoSubstitutionTemplateLiteral(sel))) return;
    const rel = aPosix(relative(join(RAIZ, dir), f)).replace(/\.ts$/, '');
    const codigo = codigoDe(nodo, meta, f);
    codigoPorSelector.set(sel.text, codigo);
    sesionDirecta.set(sel.text, usaSesion);
    // Lo que importa el archivo y pinta: se resuelve después, cuando ya están todas las fichas.
    dependenciasPorSelector.set(sel.text, null);
    fichas.push(
      fichaBase(
        {
          selector: sel.text,
          clase: nodo.name.text,
          tipo: dec.expression.text === 'Directive' ? 'directiva' : 'componente',
          capa,
          importacion: `${alias}/${rel}`,
          archivo: aPosix(relative(RAIZ, f)),
          descripcion: textoJsDoc(nodo),
          usaSesion,
          proyectaContenido: /<ng-content\b/.test(plantillaDe(meta, f)),
          ...miembrosLocales(nodo),
        },
        etiquetasJsDoc(nodo),
        codigo,
      ),
    );
  });
}

// ── El kit: JavaScript compilado (declaraciones parciales de Angular) + tipos ───────────────────────────────────────

/** `static ɵcmp = i0.ɵɵngDeclareComponent({...})` o `static ɵdir = i0.ɵɵngDeclareDirective({...})` de la clase. */
function declaracionAngular(clase) {
  for (const m of clase.members) {
    if (!ts.isPropertyDeclaration(m) || !m.initializer || !ts.isCallExpression(m.initializer)) continue;
    const e = m.initializer.expression;
    const nombre = ts.isPropertyAccessExpression(e) ? e.name.text : ts.isIdentifier(e) ? e.text : '';
    if (nombre !== 'ɵɵngDeclareComponent' && nombre !== 'ɵɵngDeclareDirective') continue;
    const obj = m.initializer.arguments[0];
    if (obj && ts.isObjectLiteralExpression(obj)) return { tipo: nombre === 'ɵɵngDeclareDirective' ? 'directiva' : 'componente', obj };
  }
  return null;
}

/** Entradas declaradas: `{ prop: { classPropertyName, publicName, isSignal, isRequired } }` (o el formato corto `prop: 'alias'`). */
function entradasDeclaradas(obj) {
  const out = [];
  const inputs = propiedad(obj, 'inputs');
  if (!inputs || !ts.isObjectLiteralExpression(inputs)) return out;
  for (const p of inputs.properties) {
    if (!ts.isPropertyAssignment(p)) continue;
    const clave = textoLiteral(p.name) ?? p.name.getText();
    const v = p.initializer;
    if (ts.isObjectLiteralExpression(v)) {
      out.push({
        propiedad: textoLiteral(propiedad(v, 'classPropertyName')) ?? clave,
        publico: textoLiteral(propiedad(v, 'publicName')) ?? clave,
        senal: propiedad(v, 'isSignal')?.kind === ts.SyntaxKind.TrueKeyword,
        requerida: propiedad(v, 'isRequired')?.kind === ts.SyntaxKind.TrueKeyword,
      });
    } else if (ts.isArrayLiteralExpression(v)) {
      out.push({ propiedad: textoLiteral(v.elements[1]) ?? clave, publico: textoLiteral(v.elements[0]) ?? clave, senal: false, requerida: false });
    } else {
      out.push({ propiedad: clave, publico: textoLiteral(v) ?? clave, senal: false, requerida: false });
    }
  }
  return out;
}

/** Eventos declarados: `{ prop: 'publicName' }`. */
function eventosDeclarados(obj) {
  const outputs = propiedad(obj, 'outputs');
  if (!outputs || !ts.isObjectLiteralExpression(outputs)) return [];
  return outputs.properties
    .filter(ts.isPropertyAssignment)
    .map((p) => ({ propiedad: textoLiteral(p.name) ?? p.name.getText(), publico: textoLiteral(p.initializer) ?? p.name.getText() }));
}

/** Selectores que el componente declara como dependencias de su plantilla. */
function dependenciasDeclaradas(obj) {
  const deps = propiedad(obj, 'dependencies');
  if (!deps || !ts.isArrayLiteralExpression(deps)) return [];
  return deps.elements
    .filter(ts.isObjectLiteralExpression)
    .map((d) => textoLiteral(propiedad(d, 'selector')))
    .filter(Boolean)
    .flatMap((s) => s.split(',').map((x) => x.trim()));
}

/** Valor inicial de cada propiedad en el JavaScript compilado: `input('md', …)`, `model(false)` o `label = 'x'`. */
function valoresIniciales(clase) {
  const out = new Map();
  for (const m of clase.members) {
    if (!ts.isPropertyDeclaration(m) || !m.name || !ts.isIdentifier(m.name)) continue;
    const senal = funcionDeSenal(m.initializer);
    if (senal) out.set(m.name.text, senal.required ? null : valorPorDefecto(senal.call.arguments[0]));
    else out.set(m.name.text, valorPorDefecto(m.initializer));
  }
  return out;
}

/** Clases declaradas en un `.d.ts` del paquete, por nombre. */
function clasesDeTipos(archivo) {
  const fuente = programa.getSourceFile(archivo);
  const out = new Map();
  if (!fuente) return out;
  ts.forEachChild(fuente, (n) => {
    if (ts.isClassDeclaration(n) && n.name) out.set(n.name.text, n);
  });
  return out;
}

/** Miembro de la clase de tipos (propiedad, o el `set` de una entrada con setter). */
function miembroDeTipos(clase, nombre) {
  const candidatos = clase?.members.filter((m) => m.name && ts.isIdentifier(m.name) && m.name.text === nombre) ?? [];
  return candidatos.find(ts.isSetAccessorDeclaration) ?? candidatos.find(ts.isPropertyDeclaration) ?? candidatos[0] ?? null;
}

for (const entrada of ENTRADAS_DEL_PAQUETE) {
  const rutaMjs = join(DIR_PAQUETE, entrada.mjs);
  const js = ts.createSourceFile(rutaMjs, readFileSync(rutaMjs, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const tipos = clasesDeTipos(join(DIR_PAQUETE, entrada.dts));
  const archivo = aPosix(relative(RAIZ, join(DIR_PAQUETE, entrada.dts)));

  ts.forEachChild(js, (nodo) => {
    if (!ts.isClassDeclaration(nodo) || !nodo.name) return;
    const decl = declaracionAngular(nodo);
    if (!decl) return;
    const selector = textoLiteral(propiedad(decl.obj, 'selector'));
    if (!selector) return;
    const clase = nodo.name.text;
    const claseDeTipos = tipos.get(clase);
    const plantilla = textoLiteral(propiedad(decl.obj, 'template')) ?? '';
    const host = propiedad(decl.obj, 'host')?.getText() ?? '';
    const codigo = quitarComentarios([nodo.getText(), plantilla, host].join('\n'));
    const iniciales = valoresIniciales(nodo);

    const entradas = entradasDeclaradas(decl.obj).map((e) => {
      const miembro = miembroDeTipos(claseDeTipos, e.propiedad);
      let tipo = 'unknown';
      let control = {};
      if (miembro) {
        const t = checker.getTypeAtLocation(ts.isSetAccessorDeclaration(miembro) ? miembro.parameters[0] : miembro);
        tipo = e.senal ? tipoDeEntradaEnSenal(t) : tipoTexto(t);
        control = controlDe(e.senal ? tipoRecibidoEnSenal(t) : t);
      }
      return {
        nombre: e.publico,
        tipo,
        porDefecto: e.requerida ? null : (iniciales.get(e.propiedad) ?? null),
        requerida: e.requerida,
        descripcion: (miembro && limpiar(textoJsDoc(miembro))) || null,
        ...control,
      };
    });
    const eventos = eventosDeclarados(decl.obj).map((e) => {
      const miembro = miembroDeTipos(claseDeTipos, e.propiedad);
      return {
        nombre: e.publico,
        tipo: miembro ? argumentoDeTipo(checker.getTypeAtLocation(miembro)) : 'unknown',
        descripcion: (miembro && limpiar(textoJsDoc(miembro))) || null,
      };
    });

    // El kit no llama a ninguna API: lo de la app lo pide a sus fuentes (`FuenteSesion`, `FuenteBandeja`…), que la app
    // registra. Así se puede pintar sin sesión, con fuentes de muestra.
    const usaSesion = false;
    codigoPorSelector.set(selector, codigo);
    sesionDirecta.set(selector, usaSesion);
    dependenciasPorSelector.set(selector, dependenciasDeclaradas(decl.obj));
    const fuenteDoc = claseDeTipos ?? nodo;
    fichas.push(
      fichaBase(
        {
          selector,
          clase,
          tipo: decl.tipo,
          capa: capaDelKit(selector),
          importacion: entrada.importacion,
          archivo,
          descripcion: textoJsDoc(fuenteDoc),
          usaSesion,
          proyectaContenido: /<ng-content\b/.test(plantilla),
          entradas: entradas.sort(porNombre),
          eventos: eventos.sort(porNombre),
        },
        etiquetasJsDoc(fuenteDoc),
        codigo,
      ),
    );
  });
}

// ── Secciones: su código, sus dependencias y su ARIA pasan a su componente, y su ficha se quita ───────────────────────

for (const [seccion, padre] of PADRE_DE_SECCION) {
  const ficha = fichas.find((x) => x.selector === padre);
  if (!ficha || !codigoPorSelector.has(seccion)) throw new Error(`Sección del kit desconocida: ${seccion} (de ${padre})`);
  const codigo = `${codigoPorSelector.get(padre)}\n${codigoPorSelector.get(seccion)}`;
  codigoPorSelector.set(padre, codigo);
  dependenciasPorSelector.set(padre, [...new Set([...(dependenciasPorSelector.get(padre) ?? []), ...(dependenciasPorSelector.get(seccion) ?? [])])]);
  ficha.aria = ariaDe(codigo);
  ficha.tokens = tokensDe(codigo);
  codigoPorSelector.delete(seccion);
  dependenciasPorSelector.delete(seccion);
  sesionDirecta.delete(seccion);
  fichas.splice(fichas.findIndex((x) => x.selector === seccion), 1);
}
for (const [selector, deps] of dependenciasPorSelector) {
  dependenciasPorSelector.set(selector, (deps ?? []).filter((d) => !PADRE_DE_SECCION.has(d)));
}

// ── Relaciones entre fichas ──────────────────────────────────────────────────────────────────────────────────────────

const selectores = new Set(fichas.map((x) => x.selector));
const pintaSelector = (codigo, selector) =>
  selector.startsWith('[')
    ? new RegExp(`[\\s(\\[]${escaparRegex(selector.slice(1, -1))}\\b`).test(codigo)
    : new RegExp(`<${escaparRegex(selector)}(?=[\\s>/])`).test(codigo);

// Además de las dependencias declaradas, los componentes del catálogo que pinta: el código local no las declara y en el
// kit las de un bloque `@defer` (los gráficos de «Consultas y reportes») se cargan aparte y no figuran en la lista.
for (const [selector, deps] of dependenciasPorSelector) {
  const codigo = codigoPorSelector.get(selector) ?? '';
  const pintados = [...selectores].filter((s) => s !== selector && pintaSelector(codigo, s));
  dependenciasPorSelector.set(selector, [...new Set([...(deps ?? []), ...pintados])]);
}

// Sesión transitiva: un componente que pinta a otro que pide datos de la sesión también la necesita.
function requiereSesion(selector, vistos = new Set()) {
  if (vistos.has(selector)) return false;
  vistos.add(selector);
  if (sesionDirecta.get(selector)) return true;
  return (dependenciasPorSelector.get(selector) ?? []).some((d) => requiereSesion(d, vistos));
}
for (const x of fichas) x.usaSesion = requiereSesion(x.selector);

// Composición: los componentes del catálogo de los que depende y de verdad pinta en su plantilla.
for (const x of fichas) {
  const codigo = codigoPorSelector.get(x.selector) ?? '';
  const deps = dependenciasPorSelector.get(x.selector) ?? [];
  x.usa = [...new Set(deps.filter((s) => s !== x.selector && selectores.has(s) && pintaSelector(codigo, s)))].sort();
}

// Uso real: alguna plantilla de la app lo pinta o una ruta lo carga, o lo pinta otro componente del catálogo.
// Se ignoran el catálogo, los specs, los barriles index.ts y los comentarios (los JSDoc traen ejemplos con etiquetas).
function fuentesDeLaApp(dir) {
  const out = [];
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) {
      if (!aPosix(ruta).endsWith('src/app/features/ui-kit')) out.push(...fuentesDeLaApp(ruta));
    } else if (/\.(ts|html)$/.test(nombre) && !nombre.endsWith('.spec.ts') && nombre !== 'index.ts') {
      out.push(resolve(ruta));
    }
  }
  return out;
}
const sinComentarios = (texto) => texto.replace(/\/\*[\s\S]*?\*\//g, '').replace(/<!--[\s\S]*?-->/g, '');
const fuentes = fuentesDeLaApp(join(RAIZ, 'src/app')).map((f) => ({ f, texto: sinComentarios(readFileSync(f, 'utf8')) }));
const pintadosPorOtros = new Set(fichas.flatMap((x) => x.usa));
for (const x of fichas) {
  const propio = resolve(join(RAIZ, x.archivo));
  const propioHtml = propio.replace(/\.ts$/, '.html');
  const enPlantilla = x.selector.startsWith('[')
    ? new RegExp(`[\\s(\\[]${escaparRegex(x.selector.slice(1, -1))}\\b`)
    : new RegExp(`<${escaparRegex(x.selector)}(?=[\\s>/])`);
  const enRuta = new RegExp(`(\\bm\\.|component:\\s*)${escaparRegex(x.clase)}\\b`);
  const enLaApp = fuentes.some(({ f, texto }) => f !== propio && f !== propioHtml && (enPlantilla.test(texto) || enRuta.test(texto)));
  x.sinUso = !enLaApp && !pintadosPorOtros.has(x.selector);
}

fichas.sort((a, b) => a.selector.localeCompare(b.selector));

const version = JSON.parse(readFileSync(join(DIR_PAQUETE, 'package.json'), 'utf8')).version;

const contenido = `// GENERADO por scripts/generar-ui-kit.mjs — no editar a mano.
// Sale de ${PAQUETE} ${version} y de src/app/layout: regenerar con \`npm run ui-kit:manifest\` después de actualizar el kit.
import type { FichaComponente } from './ui-kit.model';

export const MANIFIESTO_UI_KIT: readonly FichaComponente[] = ${JSON.stringify(fichas, null, 2)};
`;

// Fundamentos visuales: los íconos van en una sola línea para no inflar el archivo con 2000 líneas de nombres.
const { iconos, ...fundamentos } = generarFundamentos(RAIZ);
const contenidoFundamentos = `// GENERADO por scripts/generar-ui-kit.mjs (scripts/ui-kit-fundamentos.mjs) — no editar a mano.
// Sale de los tokens del kit (estilos/tema.css): regenerar con \`npm run ui-kit:manifest\` después de actualizarlo.
import type { FundamentosUiKit } from './ui-kit.model';

export const FUNDAMENTOS_UI_KIT: FundamentosUiKit = {${JSON.stringify(fundamentos, null, 2).slice(1, -1).trimEnd()},
  iconos: {
    tamanos: ${JSON.stringify(iconos.tamanos)},
    nombres: ${JSON.stringify(iconos.nombres)},
  },
};
`;

// Playground del catálogo: carga diferida de cada componente que se puede pintar sin la sesión (las directivas no). Los
// del kit salen del paquete; los propios, de su archivo.
const DIR_UI_KIT = join(RAIZ, 'src/app/features/ui-kit');
const rutaDeCarga = (x) => {
  if (x.importacion.startsWith(PAQUETE)) return x.importacion;
  const r = aPosix(relative(DIR_UI_KIT, join(RAIZ, x.archivo))).replace(/\.ts$/, '');
  return r.startsWith('.') ? r : `./${r}`;
};
const contenidoCargadores = `// GENERADO por scripts/generar-ui-kit.mjs — no editar a mano.
// Regenerar con \`npm run ui-kit:manifest\` después de actualizar el kit.
import type { Type } from '@angular/core';

/** Versión del paquete del kit instalado (su package.json). */
export const VERSION_KIT = '${version}';

/** Carga diferida de cada componente para el playground del catálogo: sin las directivas ni lo que usa la sesión. */
export const CARGADORES_UI_KIT: Readonly<Record<string, () => Promise<Type<unknown>>>> = {
${fichas
  .filter((x) => x.tipo === 'componente' && !x.usaSesion)
  .map((x) => `  '${x.selector}': () => import('${rutaDeCarga(x)}').then((m) => m.${x.clase}),`)
  .join('\n')}
};
`;

// Versión en Markdown del catálogo (llms.txt y una ficha .md por componente), en public/.
const DIR_PUBLICO = join(RAIZ, 'public');
const DIR_FICHAS_MD = join(DIR_PUBLICO, 'ui-kit/componentes');
const archivosMarkdown = generarMarkdown(RAIZ, fichas, version);
const sobrantesMarkdown = existsSync(DIR_FICHAS_MD)
  ? readdirSync(DIR_FICHAS_MD).filter((n) => n.endsWith('.md') && !archivosMarkdown.has(`ui-kit/componentes/${n}`))
  : [];

const leer = (ruta) => (existsSync(ruta) ? readFileSync(ruta, 'utf8').replace(/\r\n/g, '\n') : '');
const actual = leer(SALIDA);
const actualFundamentos = leer(SALIDA_FUNDAMENTOS);
const actualCargadores = leer(SALIDA_CARGADORES);
if (check) {
  const markdownDesactualizado =
    sobrantesMarkdown.length > 0 || [...archivosMarkdown].some(([ruta, texto]) => leer(join(DIR_PUBLICO, ruta)) !== texto);
  if (actual !== contenido || actualFundamentos !== contenidoFundamentos || actualCargadores !== contenidoCargadores || markdownDesactualizado) {
    console.error('✖ El manifiesto del ui-kit está desactualizado. Corre: npm run ui-kit:manifest');
    process.exit(1);
  }
  console.log(`✔ Manifiesto del ui-kit al día (${fichas.length} componentes)`);
} else {
  if (actual !== contenido) writeFileSync(SALIDA, contenido, 'utf8');
  if (actualFundamentos !== contenidoFundamentos) writeFileSync(SALIDA_FUNDAMENTOS, contenidoFundamentos, 'utf8');
  if (actualCargadores !== contenidoCargadores) writeFileSync(SALIDA_CARGADORES, contenidoCargadores, 'utf8');
  mkdirSync(DIR_FICHAS_MD, { recursive: true });
  for (const [ruta, texto] of archivosMarkdown) if (leer(join(DIR_PUBLICO, ruta)) !== texto) writeFileSync(join(DIR_PUBLICO, ruta), texto, 'utf8');
  for (const n of sobrantesMarkdown) rmSync(join(DIR_FICHAS_MD, n));
  console.log(`✔ Markdown: llms.txt y ${archivosMarkdown.size - 1} fichas → public/`);
  const sinDoc = fichas.filter((x) => !x.descripcion).map((x) => x.selector);
  const sinTipo = fichas.flatMap((x) => [...x.entradas, ...x.eventos].filter((m) => m.tipo === 'unknown').map((m) => `${x.selector}.${m.nombre}`));
  console.log(`✔ ${fichas.length} componentes · ${fichas.reduce((n, x) => n + x.entradas.length, 0)} entradas · ${fichas.reduce((n, x) => n + x.eventos.length, 0)} eventos → ${relative(RAIZ, SALIDA)}`);
  if (sinDoc.length) console.log(`  Sin descripción (${sinDoc.length}): ${sinDoc.join(', ')}`);
  if (sinTipo.length) console.log(`  Sin tipo resuelto (${sinTipo.length}): ${sinTipo.join(', ')}`);
  const colores = fundamentos.colores.reduce((n, g) => n + g.tokens.length, 0);
  console.log(`✔ Fundamentos: ${colores} colores · ${fundamentos.paleta.length} familias de paleta · ${iconos.nombres.length} íconos → ${relative(RAIZ, SALIDA_FUNDAMENTOS)}`);
  if (fundamentos.sinDefinir.length) console.log(`  Variables usadas sin definir (${fundamentos.sinDefinir.length}): ${fundamentos.sinDefinir.map((v) => v.nombre).join(', ')}`);
}
