import { SECCIONES_FUNDAMENTOS } from './fundamentos/secciones';
import { PRIMEROS_PASOS } from './primeros-pasos/primeros-pasos';
import { FICHAS_UI_KIT } from './ui-kit.datos';
import { rutaDeFicha, rutaDeFundamento, rutaDePrimerosPasos } from './ui-kit.vista';

/**
 * Búsqueda global del catálogo (Ctrl+K): páginas de «Primeros pasos» y sus secciones, fundamentos, componentes y sus
 * propiedades y eventos. Una propiedad lleva a la sección API de su componente: «iconOnly» → `siaf-button`.
 */

export type TipoResultado = 'pagina' | 'fundamento' | 'componente' | 'entrada' | 'evento';

export interface ResultadoBusqueda {
  tipo: TipoResultado;
  titulo: string;
  /** Dónde está o qué es: «Primeros pasos», el selector, «Entrada de siaf-button». */
  detalle: string;
  ruta: string;
  /** La sección de la página, si va a una (el id de su título). */
  fragmento: string | null;
}

/** Cuántos resultados se muestran como máximo. */
export const MAXIMO_RESULTADOS = 30;

const normalizar = (s: string): string =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

interface Candidato extends ResultadoBusqueda {
  /** El texto principal: el que pesa más si empieza o contiene lo buscado. */
  nombre: string;
  /** El texto adicional donde también se busca. */
  extra: string;
  /** Desempata: las páginas antes que los componentes y estos antes que sus propiedades. */
  orden: number;
}

const CANDIDATOS: readonly Candidato[] = [
  ...PRIMEROS_PASOS.flatMap((p): Candidato[] => [
    { tipo: 'pagina', titulo: p.titulo, detalle: 'Primeros pasos', ruta: rutaDePrimerosPasos(p.id), fragmento: null, nombre: p.titulo, extra: `${p.descripcion} ${p.claves.join(' ')}`, orden: 0 },
    ...p.secciones.map(
      (s): Candidato => ({ tipo: 'pagina', titulo: s.titulo, detalle: `Primeros pasos › ${p.titulo}`, ruta: rutaDePrimerosPasos(p.id), fragmento: s.id, nombre: s.titulo, extra: '', orden: 1 }),
    ),
  ]),
  ...SECCIONES_FUNDAMENTOS.map(
    (s): Candidato => ({ tipo: 'fundamento', titulo: s.titulo, detalle: 'Fundamentos visuales', ruta: rutaDeFundamento(s.id), fragmento: null, nombre: s.titulo, extra: `${s.descripcion} ${s.claves.join(' ')}`, orden: 0 }),
  ),
  ...FICHAS_UI_KIT.flatMap((f): Candidato[] => [
    {
      tipo: 'componente',
      titulo: f.titulo,
      detalle: f.nombre,
      ruta: rutaDeFicha(f.id),
      fragmento: null,
      nombre: `${f.titulo} ${f.nombre}`,
      extra: `${f.clase} ${f.categoria?.titulo ?? ''} ${f.descripcion}`,
      orden: 2,
    },
    ...f.entradas.map(
      (e): Candidato => ({ tipo: 'entrada', titulo: e.nombre, detalle: `Entrada de ${f.nombre}`, ruta: rutaDeFicha(f.id), fragmento: `${f.id}-api`, nombre: e.nombre, extra: '', orden: 3 }),
    ),
    ...f.eventos.map(
      (e): Candidato => ({ tipo: 'evento', titulo: `(${e.nombre})`, detalle: `Evento de ${f.nombre}`, ruta: rutaDeFicha(f.id), fragmento: `${f.id}-api`, nombre: e.nombre, extra: '', orden: 3 }),
    ),
  ]),
].map((c) => ({ ...c, nombre: normalizar(c.nombre), extra: normalizar(c.extra) }));

/** Puntaje de un candidato: 0 si no coincide; más alto si el nombre empieza con lo buscado o lo contiene. */
function puntaje(c: Candidato, q: string): number {
  if (c.nombre === q) return 4;
  if (c.nombre.startsWith(q) || c.nombre.split(' ').some((p) => p.startsWith(q))) return 3;
  if (c.nombre.includes(q)) return 2;
  // En el texto adicional pesa menos, y no se buscan ahí las propiedades (su nombre es todo lo que tienen).
  return c.extra.includes(q) ? 1 : 0;
}

/**
 * Lo que coincide con la consulta, sin distinguir tildes ni mayúsculas: primero lo que empieza con ella, después lo que
 * la contiene y al final lo que la menciona en la descripción. Sin consulta, las páginas de inicio y los fundamentos.
 */
export function buscarEnCatalogo(consulta: string, maximo = MAXIMO_RESULTADOS): ResultadoBusqueda[] {
  const q = normalizar(consulta);
  const sinConsulta = CANDIDATOS.filter((c) => (c.tipo === 'pagina' && c.fragmento === null) || c.tipo === 'fundamento');
  const encontrados = q
    ? CANDIDATOS.map((c) => ({ c, p: puntaje(c, q) }))
        .filter((x) => x.p > 0)
        .sort((a, b) => b.p - a.p || a.c.orden - b.c.orden)
        .map((x) => x.c)
    : sinConsulta;
  return encontrados.slice(0, maximo).map(({ tipo, titulo, detalle, ruta, fragmento }) => ({ tipo, titulo, detalle, ruta, fragmento }));
}
