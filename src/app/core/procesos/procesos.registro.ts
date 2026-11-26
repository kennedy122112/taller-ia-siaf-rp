import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import type { CreateDocumentProcessOption } from '@kennedy122112/siaf-rp-ui-angular';

/**
 * Registro de procesos: lo que el armazón y las fuentes del kit necesitan saber de cada proceso, sin importar su módulo.
 *
 * `core` y `layout` no conocen los procesos: cada módulo describe el suyo con un `ProcesoRegistrado` (en su `config/`)
 * y `main.ts` los registra con `provideProcesos(...)`. Así, sumar un proceso no obliga a tocar el armazón ni `core`.
 */
export interface ProcesoRegistrado {
  /** Código del proceso en `/tipos-documento` (`proceso.codigo`): agrupa sus tipos de documento en «Crear documento». */
  codigo: string;
  /** Ruta de la solicitud de cada tipo de documento del proceso, por su código (SRCB → `/procesos/…/solicitud`). */
  rutasPorDocumento: Readonly<Record<string, string>>;
  /** Ruta de la solicitud por defecto del proceso (la de un tipo de documento sin ruta propia). */
  rutaSolicitud: string;
  /** Opciones de «Crear documento» si `/tipos-documento` no responde. */
  opcionesCrear: readonly CreateDocumentProcessOption[];
}

/** Los procesos registrados por `provideProcesos`. */
export const PROCESOS = new InjectionToken<readonly ProcesoRegistrado[]>('PROCESOS', { factory: () => [] });

/** Registra los procesos de la app. Va en los providers de `bootstrapApplication`. */
export function provideProcesos(...procesos: ProcesoRegistrado[]): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: PROCESOS, useValue: procesos }]);
}

/** Ruta de la solicitud de un tipo de documento, buscándolo en todos los procesos; `null` si ninguno lo tiene. */
export function rutaDeDocumento(procesos: readonly ProcesoRegistrado[], codigoDocumento: string): string | null {
  const codigo = codigoDocumento.toUpperCase();
  for (const p of procesos) {
    const ruta = p.rutasPorDocumento[codigo];
    if (ruta) return ruta;
  }
  return null;
}
