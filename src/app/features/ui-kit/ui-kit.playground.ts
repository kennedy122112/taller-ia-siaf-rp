import { CARGADORES_UI_KIT } from './ui-kit.cargadores';
import { EntradaComponente } from './ui-kit.model';
import { CONFIG_PLAYGROUND, ConfigPlayground, ValorControl } from './ui-kit.playground-config';
import { FichaVista } from './ui-kit.vista';

export type { ValorControl } from './ui-kit.playground-config';

/**
 * Reglas puras del playground de cada ficha: qué componentes lo tienen (los de `CONFIG_PLAYGROUND`), qué controles
 * muestran, con qué valor empiezan y el código que resulta, listo para pegar en una pantalla del proyecto: un componente
 * standalone con sus imports, sus datos tipados y su plantilla.
 */

export interface ControlPlayground {
  /** Nombre de la entrada (con su alias, si tiene) o `contenido` para lo que se proyecta. */
  nombre: string;
  etiqueta: string;
  tipo: 'texto' | 'booleano' | 'numero' | 'opciones';
  opciones: string[];
  /** Con qué valor empieza en el playground. */
  inicial: ValorControl;
  /** El valor por defecto del código: lo que sea distinto va en el código que resulta. */
  defecto: ValorControl;
  /** Obligatoria: se fija siempre, aunque no cambie. */
  requerida: boolean;
  /** El texto que el componente proyecta entre sus etiquetas, no una entrada. */
  contenido: boolean;
}

export function configDe(f: FichaVista): ConfigPlayground | null {
  return CONFIG_PLAYGROUND[f.selector] ?? null;
}

/** Tiene playground: está en la configuración y se puede cargar (sin la sesión y no es una directiva). */
export function tienePlayground(f: FichaVista): boolean {
  return !!configDe(f) && f.tipo === 'componente' && !!CARGADORES_UI_KIT[f.selector];
}

/** `'md'` → `md`; `"x"` → `x`; null si el valor por defecto no es un texto literal. */
function textoLiteral(porDefecto: string | null): string | null {
  const m = porDefecto?.match(/^(['"`])(.*)\1$/);
  return m ? m[2] : null;
}

/** El valor por defecto del código, leído del texto que guarda el manifiesto. */
export function valorPorDefecto(e: EntradaComponente): ValorControl {
  switch (e.control) {
    case 'booleano':
      return e.porDefecto === 'true';
    case 'numero': {
      const n = Number(e.porDefecto);
      return e.porDefecto !== null && Number.isFinite(n) ? n : e.requerida ? 0 : null;
    }
    case 'opciones': {
      const texto = textoLiteral(e.porDefecto);
      return texto !== null && e.opciones?.includes(texto) ? texto : e.requerida ? (e.opciones?.[0] ?? null) : null;
    }
    default: {
      const texto = textoLiteral(e.porDefecto);
      return texto !== null ? texto : e.requerida ? '' : null;
    }
  }
}

/** Los controles de la ficha, en el orden de su configuración. */
export function controlesDe(f: FichaVista): ControlPlayground[] {
  const config = configDe(f);
  if (!config) return [];
  return config.controles.flatMap((nombre): ControlPlayground[] => {
    if (nombre === 'contenido') {
      const inicial = config.valores?.['contenido'] ?? f.titulo;
      return [{ nombre, etiqueta: 'Contenido', tipo: 'texto', opciones: [], inicial, defecto: inicial, requerida: true, contenido: true }];
    }
    const encontrada = f.entradas.find((x) => x.nombre === nombre);
    const forzado = config.tiposDeControl?.[nombre];
    const e = encontrada && forzado ? { ...encontrada, control: forzado } : encontrada;
    if (!e?.control) return [];
    const defecto = valorPorDefecto(e);
    const valor = config.valores?.[nombre];
    return [
      {
        nombre,
        etiqueta: nombre,
        tipo: e.control,
        opciones: [...(config.opciones?.[nombre] ?? e.opciones ?? [])],
        inicial: valor !== undefined ? valor : defecto,
        defecto,
        requerida: e.requerida,
        contenido: false,
      },
    ];
  });
}

/** Se pasa al componente y va en el código: es obligatoria o distinta del valor por defecto del código. */
export function seFija(c: ControlPlayground, valor: ValorControl): boolean {
  return !c.contenido && valor !== null && (c.requerida || valor !== c.defecto);
}

/** Los valores actuales de los controles: lo cambiado y, si no, el inicial. */
export function valoresActuales(controles: readonly ControlPlayground[], cambios: Readonly<Record<string, ValorControl>>): Record<string, ValorControl> {
  return Object.fromEntries(controles.map((c) => [c.nombre, c.nombre in cambios ? cambios[c.nombre] : c.inicial]));
}

/** Las entradas de valor fijo (las de `valores` que no son controles ni el enlace) y el `ariaLabel` de un solo ícono. */
export function fijasDe(f: FichaVista, valores: Readonly<Record<string, ValorControl>>): Record<string, ValorControl> {
  const config = configDe(f);
  if (!config) return {};
  const fijas: Record<string, ValorControl> = {};
  for (const [nombre, valor] of Object.entries(config.valores ?? {})) {
    if (nombre !== 'contenido' && !config.controles.includes(nombre) && nombre !== config.enlace?.entrada) fijas[nombre] = valor;
  }
  if (config.ariaSoloIcono && valores['iconOnly'] === true) fijas['ariaLabel'] = String(valores['contenido'] ?? config.valores?.['contenido'] ?? f.titulo);
  return fijas;
}

/** El valor con que empieza la entrada del enlace (la que el componente cambia y avisa). */
export function valorDelEnlace(f: FichaVista): ValorControl {
  const config = configDe(f);
  if (!config?.enlace) return null;
  const { entrada } = config.enlace;
  const valor = config.valores?.[entrada];
  if (valor !== undefined) return valor;
  const e = f.entradas.find((x) => x.nombre === entrada);
  return e ? valorPorDefecto(e) : null;
}

/** Un valor como literal de TypeScript, con comillas simples y en varias líneas si no cabe en una. */
export function literalTs(valor: unknown, sangria = ''): string {
  if (typeof valor === 'string') return `'${valor.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  if (typeof valor === 'number' || typeof valor === 'boolean' || valor === null) return String(valor);
  const interior = `${sangria}  `;
  if (Array.isArray(valor)) {
    const items = valor.map((v) => literalTs(v, interior));
    const enLinea = `[${items.join(', ')}]`;
    return enLinea.length <= 80 && !enLinea.includes('\n') ? enLinea : `[\n${items.map((i) => `${interior}${i},`).join('\n')}\n${sangria}]`;
  }
  if (typeof valor === 'object') {
    const pares = Object.entries(valor as Record<string, unknown>).map(([k, v]) => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : `'${k}'`}: ${literalTs(v, interior)}`);
    const enLinea = `{ ${pares.join(', ')} }`;
    return enLinea.length <= 80 && !enLinea.includes('\n') ? enLinea : `{\n${pares.map((p) => `${interior}${p},`).join('\n')}\n${sangria}}`;
  }
  return 'undefined';
}

/** Un atributo de la plantilla: los textos como atributo y lo demás con corchetes. */
function atributo(nombre: string, valor: ValorControl): string {
  return typeof valor === 'string' ? `${nombre}="${valor.replace(/"/g, '&quot;')}"` : `[${nombre}]="${valor}"`;
}

/** La plantilla que resulta de lo elegido, para `componente.html`. */
export function htmlDelPlayground(f: FichaVista, controles: readonly ControlPlayground[], cambios: Readonly<Record<string, ValorControl>>): string {
  const config = configDe(f);
  const valores = valoresActuales(controles, cambios);
  const atributos: string[] = [];
  for (const nombre of Object.keys(config?.datos ?? {})) atributos.push(`[${nombre}]="${nombre}"`);
  if (config?.enlace) {
    const { entrada, evento, senal } = config.enlace;
    atributos.push(`[${entrada}]="${senal}()"`, `(${evento})="${senal}.set($event)"`);
  }
  for (const [nombre, valor] of Object.entries(fijasDe(f, valores))) if (valor !== null) atributos.push(atributo(nombre, valor));
  for (const c of controles) if (seFija(c, valores[c.nombre])) atributos.push(atributo(c.nombre, valores[c.nombre]));

  // Con muchos atributos, uno por línea, como los escribe Prettier.
  const enLinea = [f.selector, ...atributos].join(' ');
  const enVarias = enLinea.length > 72;
  const apertura = enVarias ? `${[f.selector, ...atributos].join('\n  ')}\n` : enLinea;
  const contenido = controles.find((c) => c.contenido);
  if (!contenido) return `<${apertura}${enVarias ? '' : ' '}/>`;
  return `<${apertura}>${valores[contenido.nombre] ?? ''}</${f.selector}>`;
}

/** El componente standalone que la usa, para `componente.ts`: imports, datos tipados y la señal del valor que cambia. */
export function tsDelPlayground(f: FichaVista): string {
  const config = configDe(f);
  const enlace = config?.enlace;
  const angular = ['ChangeDetectionStrategy', 'Component', ...(enlace ? ['signal'] : [])];
  const delKit = [...(config?.tipos ?? []), f.clase].sort((a, b) => a.localeCompare(b));
  const miembros: string[] = [];
  for (const [nombre, dato] of Object.entries(config?.datos ?? {})) miembros.push(`  readonly ${nombre}: ${dato.tipo} = ${literalTs(dato.valor, '  ')};`);
  if (enlace) miembros.push(`  readonly ${enlace.senal} = signal${enlace.tipo ? `<${enlace.tipo}>` : ''}(${literalTs(valorDelEnlace(f))});`);
  return [
    `import { ${angular.join(', ')} } from '@angular/core';`,
    `import { ${delKit.join(', ')} } from '${f.importacion}';`,
    '',
    '@Component({',
    "  selector: 'app-ejemplo',",
    '  changeDetection: ChangeDetectionStrategy.OnPush,',
    `  imports: [${f.clase}],`,
    "  templateUrl: './ejemplo.component.html',",
    '})',
    miembros.length ? `export class EjemploComponent {\n${miembros.join('\n')}\n}` : 'export class EjemploComponent {}',
  ].join('\n');
}
