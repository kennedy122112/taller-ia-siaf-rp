import { TestBed } from '@angular/core/testing';

import type { NotificacionResponse } from '../api/notificaciones-api.service';
import { rutaDeNotificacion } from '../kit/fuentes-kit';
import { PROCESOS, ProcesoRegistrado, provideProcesos, rutaDeDocumento } from './procesos.registro';

const CUENTAS: ProcesoRegistrado = {
  codigo: 'registro-cuentas-bancarias',
  rutasPorDocumento: { SRCB: '/procesos/registro-cuentas-bancarias/solicitud' },
  rutaSolicitud: '/procesos/registro-cuentas-bancarias/solicitud',
  opcionesCrear: [],
};
const PAGOS: ProcesoRegistrado = {
  codigo: 'programacion-pagos',
  rutasPorDocumento: { SPP: '/procesos/programacion-pagos/solicitud' },
  rutaSolicitud: '/procesos/programacion-pagos/solicitud',
  opcionesCrear: [],
};

const notificacion = (documento: NotificacionResponse['documento']): NotificacionResponse => ({
  id: 'n1',
  tipo: 'APROBACION',
  titulo: 'Solicitud aprobada',
  mensaje: '',
  leida: false,
  leidaEn: null,
  createdAt: '2026-01-01T00:00:00Z',
  documento,
});

describe('Registro de procesos', () => {
  it('sin procesos registrados, PROCESOS es una lista vacía', () => {
    expect(TestBed.inject(PROCESOS)).toEqual([]);
  });

  it('provideProcesos registra los procesos de la app', () => {
    TestBed.configureTestingModule({ providers: [provideProcesos(CUENTAS, PAGOS)] });
    expect(TestBed.inject(PROCESOS).map((p) => p.codigo)).toEqual(['registro-cuentas-bancarias', 'programacion-pagos']);
  });

  it('rutaDeDocumento busca el tipo de documento en todos los procesos, sin importar mayúsculas', () => {
    expect(rutaDeDocumento([CUENTAS, PAGOS], 'spp')).toBe('/procesos/programacion-pagos/solicitud');
    expect(rutaDeDocumento([CUENTAS, PAGOS], 'XYZ')).toBeNull();
  });

  it('una notificación lleva a la solicitud de su tipo de documento, con su id', () => {
    const n = notificacion({ id: 'doc-1', numero: 'N-1', catDocumento: { id: 'c', codigo: 'SPP', nombre: 'Pago' } });
    expect(rutaDeNotificacion(n, [CUENTAS, PAGOS])).toEqual(['/procesos/programacion-pagos/solicitud', 'doc-1']);
  });

  it('sin tipo conocido va a la solicitud del primer proceso; sin documento, a ninguna parte', () => {
    expect(rutaDeNotificacion(notificacion({ id: 'doc-2', numero: null }), [CUENTAS, PAGOS])).toEqual([
      '/procesos/registro-cuentas-bancarias/solicitud',
      'doc-2',
    ]);
    expect(rutaDeNotificacion(notificacion(null), [CUENTAS])).toBeNull();
    expect(rutaDeNotificacion(notificacion({ id: 'doc-3', numero: null }), [])).toBeNull();
  });
});
