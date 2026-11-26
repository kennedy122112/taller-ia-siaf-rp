import { SECCIONES_FUNDAMENTOS, SeccionFundamento } from './fundamentos/secciones';
import { MANIFIESTO_UI_KIT } from './ui-kit.manifest';
import { FichaVista, GrupoUiKit, agrupar } from './ui-kit.vista';

/** Las fichas visibles agrupadas por categoría, en el orden del catálogo: se calculan una sola vez para todas las páginas. */
export const GRUPOS_UI_KIT: readonly GrupoUiKit[] = agrupar(MANIFIESTO_UI_KIT);

/** Todas las fichas visibles en el orden del menú lateral. */
export const FICHAS_UI_KIT: readonly FichaVista[] = GRUPOS_UI_KIT.flatMap((g) => g.fichas);

export function fichaPorId(id: string): FichaVista | null {
  return FICHAS_UI_KIT.find((f) => f.id === id) ?? null;
}

export function fundamentoPorId(id: string): SeccionFundamento | null {
  return SECCIONES_FUNDAMENTOS.find((s) => s.id === id) ?? null;
}

/** El kit en números, para la portada. */
export const RESUMEN_UI_KIT = [
  { valor: FICHAS_UI_KIT.length, etiqueta: 'componentes' },
  { valor: FICHAS_UI_KIT.filter((f) => f.ejemplo).length, etiqueta: 'con ejemplo en vivo' },
  { valor: FICHAS_UI_KIT.reduce((n, f) => n + f.entradas.length, 0), etiqueta: 'entradas documentadas' },
  { valor: FICHAS_UI_KIT.reduce((n, f) => n + f.eventos.length, 0), etiqueta: 'eventos documentados' },
  { valor: FICHAS_UI_KIT.filter((f) => f.sinUso).length, etiqueta: 'sin uso en la app' },
];
