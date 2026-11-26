import type { CreateDocumentProcessOption } from '@kennedy122112/siaf-rp-ui-angular';

import type { ProcesoRegistrado } from '../../../../core/procesos/procesos.registro';
import { CODIGO_DOCUMENTO, NOMBRE_DOCUMENTO } from '../models/cuenta-bancaria.model';

/** Rutas e ids del proceso de ejemplo. Los ids existen en `DEFAULT_PROCESS_TREE` (shared/utils/process-tree.util.ts). */
export const PROCESS_ROUTE = '/procesos/registro-cuentas-bancarias';
export const REQUEST_SEGMENT = 'solicitud';
export const REQUEST_ROUTE = `${PROCESS_ROUTE}/${REQUEST_SEGMENT}`;
export const CONSULTAS_ROUTE = `${PROCESS_ROUTE}/consultas`;

/** Hoja «Documentos y registros» del árbol de procesos: arma las migas de pan. */
export const PROCESS_ID = 'registro-cuentas-bancarias-documentos';
/** Hoja «Consultas y reportes» del árbol de procesos. */
export const CONSULTAS_PROCESS_ID = 'registro-cuentas-bancarias-consultas';

/** Opción del panel «Crear documento» (shell y pestaña Documentos). */
export const CREATE_DOCUMENT_OPTIONS: CreateDocumentProcessOption[] = [
  {
    id: 'registro-cuentas-bancarias',
    label: 'Registro de cuentas bancarias',
    route: REQUEST_ROUTE,
    documents: [NOMBRE_DOCUMENTO],
    documentOptions: [{ label: NOMBRE_DOCUMENTO, route: REQUEST_ROUTE, actionTypes: ['Creación'] }],
    actionTypes: ['Creación'],
  },
];

/** El proceso en el registro de la app (`provideProcesos` en `main.ts`): «Crear documento» y las notificaciones. */
export const PROCESO_CUENTAS_BANCARIAS: ProcesoRegistrado = {
  codigo: 'registro-cuentas-bancarias',
  rutasPorDocumento: { [CODIGO_DOCUMENTO]: REQUEST_ROUTE },
  rutaSolicitud: REQUEST_ROUTE,
  opcionesCrear: CREATE_DOCUMENT_OPTIONS,
};
