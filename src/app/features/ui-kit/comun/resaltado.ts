/**
 * Resaltado de sintaxis de los bloques de código del catálogo, sin librerías: un tokenizador chico para lo que muestran
 * las fichas y «Primeros pasos» (plantillas de Angular, TypeScript, CSS, JSON y la terminal). Devuelve las líneas con
 * sus trozos tipados; el editor pinta cada tipo con su token `--sys-color-code-*`.
 */

export type Lenguaje = 'html' | 'ts' | 'css' | 'json' | 'terminal' | 'texto';

export type TipoTrozo = 'texto' | 'comentario' | 'etiqueta' | 'atributo' | 'cadena' | 'clave' | 'tipo' | 'funcion' | 'numero' | 'puntuacion';

export interface Trozo {
  tipo: TipoTrozo;
  texto: string;
}

/** El lenguaje por el nombre del archivo: `ejemplo.component.html` → html; «terminal» → terminal. */
export function lenguajeDe(archivo: string): Lenguaje {
  const nombre = archivo.toLowerCase();
  if (nombre.startsWith('terminal')) return 'terminal';
  if (/\.html?$/.test(nombre)) return 'html';
  if (/\.(ts|js|mjs)$/.test(nombre)) return 'ts';
  if (/\.css$/.test(nombre)) return 'css';
  if (/\.json$/.test(nombre)) return 'json';
  return 'texto';
}

/** Un patrón con su tipo: el primero que coincide en la posición actual gana. */
type Regla = [RegExp, TipoTrozo | ((m: RegExpExecArray) => Trozo[])];

const PALABRAS_DE_CONTROL = new Set(['import', 'from', 'export', 'default', 'return', 'if', 'else', 'for', 'of', 'in', 'while', 'switch', 'case', 'break', 'await', 'async', 'new', 'throw', 'try', 'catch', 'as', 'type']);
const PALABRAS_DE_DECLARACION = new Set(['const', 'let', 'var', 'class', 'interface', 'extends', 'implements', 'function', 'readonly', 'private', 'protected', 'public', 'static', 'this', 'true', 'false', 'null', 'undefined', 'void', 'typeof', 'keyof']);
const TIPOS_PRIMITIVOS = new Set(['string', 'number', 'boolean', 'unknown', 'any', 'never', 'object']);

/** Un identificador de TypeScript, según qué es. */
function identificador(m: RegExpExecArray): Trozo[] {
  const palabra = m[1];
  const siguiente = m[2] ?? '';
  let tipo: TipoTrozo;
  if (PALABRAS_DE_CONTROL.has(palabra)) tipo = 'clave';
  else if (PALABRAS_DE_DECLARACION.has(palabra)) tipo = 'etiqueta';
  else if (TIPOS_PRIMITIVOS.has(palabra) || /^[A-Z]/.test(palabra)) tipo = 'tipo';
  else if (siguiente === '(') tipo = 'funcion';
  else tipo = 'atributo';
  return [{ tipo, texto: palabra }];
}

const REGLAS_TS: Regla[] = [
  [/\/\/[^\n]*/y, 'comentario'],
  [/\/\*[\s\S]*?\*\//y, 'comentario'],
  [/`(?:\\[\s\S]|[^`\\])*`/y, 'cadena'],
  [/'(?:\\.|[^'\\\n])*'/y, 'cadena'],
  [/"(?:\\.|[^"\\\n])*"/y, 'cadena'],
  [/@[A-Za-z_$][\w$]*/y, 'funcion'],
  [/\b\d+(?:\.\d+)?\b/y, 'numero'],
  [/([A-Za-z_$][\w$]*)(?=(\s*\()?)/y, identificador],
  [/[{}()[\];,.:<>=+\-*/!?&|]+/y, 'puntuacion'],
];

/** Una etiqueta de apertura o cierre con sus atributos (`<siaf-button variant="outline" [disabled]="true">`). */
function etiquetaHtml(m: RegExpExecArray): Trozo[] {
  const trozos: Trozo[] = [
    { tipo: 'puntuacion', texto: m[1] },
    { tipo: 'etiqueta', texto: m[2] },
  ];
  const resto = m[3];
  const atributo = /(\s+)|([[(*#@]?[\w.:-]+[\])]*)(?:(=)("[^"]*"|'[^']*'))?|(\/?)/y;
  let i = 0;
  while (i < resto.length) {
    atributo.lastIndex = i;
    const a = atributo.exec(resto);
    if (!a || a[0] === '') {
      trozos.push({ tipo: 'texto', texto: resto.slice(i) });
      break;
    }
    if (a[1]) trozos.push({ tipo: 'texto', texto: a[1] });
    if (a[2]) trozos.push({ tipo: 'atributo', texto: a[2] });
    if (a[3]) trozos.push({ tipo: 'puntuacion', texto: a[3] }, { tipo: 'cadena', texto: a[4] });
    if (a[5]) trozos.push({ tipo: 'puntuacion', texto: a[5] });
    i = atributo.lastIndex;
  }
  trozos.push({ tipo: 'puntuacion', texto: m[4] });
  return trozos;
}

const REGLAS_HTML: Regla[] = [
  [/<!--[\s\S]*?-->/y, 'comentario'],
  [/(<\/?)([\w-]+)((?:\s+(?:[^>"']|"[^"]*"|'[^']*')*?)?)(\/?>)/y, etiquetaHtml],
  [/\{\{[\s\S]*?\}\}/y, 'funcion'],
  [/&[a-z]+;/y, 'clave'],
];

const REGLAS_CSS: Regla[] = [
  [/\/\*[\s\S]*?\*\//y, 'comentario'],
  [/"[^"\n]*"|'[^'\n]*'/y, 'cadena'],
  [/@[\w-]+/y, 'clave'],
  [/--[\w-]+/y, 'atributo'],
  [/[\w-]+(?=\s*:)/y, 'atributo'],
  [/#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|%|ms|s)?\b/y, 'numero'],
  [/[{}();:,]/y, 'puntuacion'],
];

const REGLAS_JSON: Regla[] = [
  [/"(?:\\.|[^"\\\n])*"(?=\s*:)/y, 'atributo'],
  [/"(?:\\.|[^"\\\n])*"/y, 'cadena'],
  [/\b(?:true|false|null)\b/y, 'etiqueta'],
  [/-?\b\d+(?:\.\d+)?\b/y, 'numero'],
  [/[{}[\]:,]/y, 'puntuacion'],
];

/** En la terminal, el comando al inicio de la línea, las opciones y los textos. */
const REGLAS_TERMINAL: Regla[] = [
  [/#[^\n]*/y, 'comentario'],
  [/(^|(?<=\n))[\w.-]+/y, 'funcion'],
  [/"[^"\n]*"|'[^'\n]*'/y, 'cadena'],
  [/(?<=\s)--?[\w-]+/y, 'atributo'],
];

const REGLAS: Record<Lenguaje, Regla[]> = {
  html: REGLAS_HTML,
  ts: REGLAS_TS,
  css: REGLAS_CSS,
  json: REGLAS_JSON,
  terminal: REGLAS_TERMINAL,
  texto: [],
};

/** Junta los trozos seguidos del mismo tipo: menos nodos en la plantilla. */
function juntar(trozos: Trozo[]): Trozo[] {
  const salida: Trozo[] = [];
  for (const t of trozos) {
    const ultimo = salida[salida.length - 1];
    if (ultimo && ultimo.tipo === t.tipo) ultimo.texto += t.texto;
    else salida.push({ ...t });
  }
  return salida;
}

/** Los trozos de todo el código, en orden: lo que ninguna regla reconoce queda como texto. */
export function tokenizar(codigo: string, lenguaje: Lenguaje): Trozo[] {
  const reglas = REGLAS[lenguaje];
  const trozos: Trozo[] = [];
  let i = 0;
  let texto = '';
  while (i < codigo.length) {
    let encontrado = false;
    for (const [patron, tipo] of reglas) {
      patron.lastIndex = i;
      const m = patron.exec(codigo);
      if (!m || m[0] === '') continue;
      if (texto) {
        trozos.push({ tipo: 'texto', texto });
        texto = '';
      }
      if (typeof tipo === 'function') trozos.push(...tipo(m));
      else trozos.push({ tipo, texto: m[0] });
      i += m[0].length;
      encontrado = true;
      break;
    }
    if (!encontrado) texto += codigo[i++];
  }
  if (texto) trozos.push({ tipo: 'texto', texto });
  return juntar(trozos);
}

/** El código resaltado, partido en líneas (un comentario o una cadena de varias líneas se reparte entre ellas). */
export function resaltar(codigo: string, lenguaje: Lenguaje): Trozo[][] {
  const lineas: Trozo[][] = [[]];
  for (const t of tokenizar(codigo, lenguaje)) {
    const partes = t.texto.split('\n');
    partes.forEach((parte, n) => {
      if (n > 0) lineas.push([]);
      if (parte) lineas[lineas.length - 1].push({ tipo: t.tipo, texto: parte });
    });
  }
  return lineas;
}
