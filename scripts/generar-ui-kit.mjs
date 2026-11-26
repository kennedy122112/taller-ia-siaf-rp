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
 *   node scripts/generar-ui-kit.mjs           → escribe el manifiesto y los fundamentos
 *   node scripts/generar-ui-kit.mjs --check   → falla si alguno de los dos está desactualizado
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

import { generarFundamentos, utilidadesTailwind } from './ui-kit-fundamentos.mjs';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SALIDA = join(RAIZ, 'src/app/features/ui-kit/ui-kit.manifest.ts');
const SALIDA_FUNDAMENTOS = join(RAIZ, 'src/app/features/ui-kit/ui-kit.fundamentos.ts');

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
const capaDelKit = (selector) =>
  CAPA_DEL_KIT.components.includes(selector) ? 'components' : CAPA_DEL_KIT.layout.includes(selector) ? 'layout' : 'ui';

/** En el código local, importar de aquí vuelve al componente dependiente de sesión: sin ejemplo en una ruta pública. */
const DEPENDENCIA_DE_SESION = /core\/(api|state|auth)\b|@angular\/common\/http/;
/** En el kit, un componente depende de la sesión si pide una de sus fuentes de datos (`FuenteSesion`, `FuenteBandeja`…). */
const PIDE_FUENTE = /\binject\(\s*Fuente[A-Z]\w*/;
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
      entradas.push({
        nombre: alias ?? nombre,
        tipo: tipoTexto(checker.getTypeAtLocation(nodoTipo)),
        porDefecto: ts.isPropertyDeclaration(m) ? valorPorDefecto(m.initializer) : null,
        requerida,
        descripcion,
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
      const tipo = argumentoDeTipo(checker.getTypeAtLocation(m));
      if (senal.fn === 'output' || senal.fn === 'outputFromObservable') {
        eventos.push({ nombre: aliasDeOpciones(senal.call.arguments[0]) ?? nombre, tipo, descripcion });
      } else {
        const opciones = senal.required ? senal.call.arguments[0] : senal.call.arguments[1];
        const inicial = senal.required ? null : valorPorDefecto(senal.call.arguments[0]);
        entradas.push({ nombre: aliasDeOpciones(opciones) ?? nombre, tipo, porDefecto: inicial, requerida: senal.required, descripcion });
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
      if (miembro) {
        const t = checker.getTypeAtLocation(ts.isSetAccessorDeclaration(miembro) ? miembro.parameters[0] : miembro);
        tipo = e.senal ? tipoDeEntradaEnSenal(t) : tipoTexto(t);
      }
      return {
        nombre: e.publico,
        tipo,
        porDefecto: e.requerida ? null : (iniciales.get(e.propiedad) ?? null),
        requerida: e.requerida,
        descripcion: (miembro && limpiar(textoJsDoc(miembro))) || null,
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

    const usaSesion = PIDE_FUENTE.test(codigo);
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

const leer = (ruta) => (existsSync(ruta) ? readFileSync(ruta, 'utf8').replace(/\r\n/g, '\n') : '');
const actual = leer(SALIDA);
const actualFundamentos = leer(SALIDA_FUNDAMENTOS);
if (check) {
  if (actual !== contenido || actualFundamentos !== contenidoFundamentos) {
    console.error('✖ El manifiesto del ui-kit está desactualizado. Corre: npm run ui-kit:manifest');
    process.exit(1);
  }
  console.log(`✔ Manifiesto del ui-kit al día (${fichas.length} componentes)`);
} else {
  if (actual !== contenido) writeFileSync(SALIDA, contenido, 'utf8');
  if (actualFundamentos !== contenidoFundamentos) writeFileSync(SALIDA_FUNDAMENTOS, contenidoFundamentos, 'utf8');
  const sinDoc = fichas.filter((x) => !x.descripcion).map((x) => x.selector);
  const sinTipo = fichas.flatMap((x) => [...x.entradas, ...x.eventos].filter((m) => m.tipo === 'unknown').map((m) => `${x.selector}.${m.nombre}`));
  console.log(`✔ ${fichas.length} componentes · ${fichas.reduce((n, x) => n + x.entradas.length, 0)} entradas · ${fichas.reduce((n, x) => n + x.eventos.length, 0)} eventos → ${relative(RAIZ, SALIDA)}`);
  if (sinDoc.length) console.log(`  Sin descripción (${sinDoc.length}): ${sinDoc.join(', ')}`);
  if (sinTipo.length) console.log(`  Sin tipo resuelto (${sinTipo.length}): ${sinTipo.join(', ')}`);
  const colores = fundamentos.colores.reduce((n, g) => n + g.tokens.length, 0);
  console.log(`✔ Fundamentos: ${colores} colores · ${fundamentos.paleta.length} familias de paleta · ${iconos.nombres.length} íconos → ${relative(RAIZ, SALIDA_FUNDAMENTOS)}`);
  if (fundamentos.sinDefinir.length) console.log(`  Variables usadas sin definir (${fundamentos.sinDefinir.length}): ${fundamentos.sinDefinir.map((v) => v.nombre).join(', ')}`);
}
