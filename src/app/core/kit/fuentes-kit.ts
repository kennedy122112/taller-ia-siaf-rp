import { EnvironmentProviders, Injectable, Provider, computed, inject, makeEnvironmentProviders } from '@angular/core';
import {
  FuenteBandeja,
  FuenteDocumentosRegistros,
  FuenteHistorialAsiento,
  FuenteHistorialCuenta,
  FuenteHistorialDocumento,
  FuenteNotificaciones,
  FuenteSesion,
  type ConteosDeBandeja,
  type DocumentHistoryRow,
  type DocumentoDeBandeja,
  type EstadoDeBandeja,
  type ModoDeRol,
  type NotificacionDelKit,
  type PerfilDeSesion,
  type RolDeBandeja,
} from '@kennedy122112/siaf-rp-ui-angular';
import { Observable, map, throwError } from 'rxjs';

import { NotificacionesApiService, type NotificacionResponse } from '../api/notificaciones-api.service';
import { SolicitudesApiService } from '../api/solicitudes-api.service';
import { AuthService } from '../auth/auth.service';
import { PermissionService } from '../auth/permission.service';
import { PROCESOS, type ProcesoRegistrado, rutaDeDocumento } from '../procesos/procesos.registro';
import { NotificationsStateService } from '../realtime/notifications-state.service';
import { SolicitudesFacadeService } from '../state/solicitudes-facade.service';
import { SolicitudesStateService } from '../state/solicitudes-state.service';

/**
 * Fuentes de datos del kit (`@kennedy122112/siaf-rp-ui-angular`). El kit no llama a ninguna API: la navbar, la bandeja,
 * los paneles de historial y «Documentos y registros» piden sus datos a estas clases, que aquí se apoyan en los
 * servicios del taller (y, por debajo, en el backend simulado).
 */

/**
 * Ruta del router para el documento de una notificación: la solicitud de su tipo de documento en el registro de
 * procesos (o la del primer proceso, si el tipo no viene). `null` si no apunta a ningún documento o proceso.
 */
export function rutaDeNotificacion(n: NotificacionResponse, procesos: readonly ProcesoRegistrado[]): unknown[] | null {
  const documento = n.documento;
  if (!documento?.id) return null;
  const ruta = rutaDeDocumento(procesos, documento.catDocumento?.codigo ?? '') ?? procesos[0]?.rutaSolicitud;
  return ruta ? [ruta, documento.id] : null;
}

function aNotificacionDelKit(n: NotificacionResponse, procesos: readonly ProcesoRegistrado[]): NotificacionDelKit {
  return {
    id: n.id,
    titulo: n.titulo,
    mensaje: n.mensaje,
    leida: n.leida,
    createdAt: n.createdAt,
    tipoDocumento: n.documento?.catDocumento?.codigo ?? null,
    numero: n.documento?.numero ?? null,
    ruta: rutaDeNotificacion(n, procesos),
  };
}

@Injectable({ providedIn: 'root' })
export class TallerFuenteSesion extends FuenteSesion {
  private readonly auth = inject(AuthService);

  readonly perfiles = computed<PerfilDeSesion[]>(() =>
    this.auth.perfilesDisponibles().map((p) => ({ id: p.id, rol: p.rol, entidad: p.entidad })),
  );

  cambiarPerfil(perfilId: string): Observable<unknown> {
    return this.auth.cambiarPerfil(perfilId);
  }

  cerrarSesion(): Observable<unknown> {
    return this.auth.logout();
  }
}

@Injectable({ providedIn: 'root' })
export class TallerFuenteNotificaciones extends FuenteNotificaciones {
  private readonly estado = inject(NotificationsStateService);
  private readonly api = inject(NotificacionesApiService);
  private readonly procesos = inject(PROCESOS);

  readonly notificaciones = computed(() => this.estado.notifications().map((n) => aNotificacionDelKit(n, this.procesos)));
  readonly cargando = this.estado.loading;
  readonly sinLeer = this.estado.unreadCount;

  refrescar(): Promise<void> {
    return this.estado.refresh();
  }

  marcarLeidas(): Promise<void> {
    return this.estado.marcarLeidas();
  }

  historial(): Observable<NotificacionDelKit[]> {
    return this.api.obtenerHistorial().pipe(map((lista) => lista.map((n) => aNotificacionDelKit(n, this.procesos))));
  }
}

@Injectable({ providedIn: 'root' })
export class TallerFuenteBandeja extends FuenteBandeja {
  private readonly permisos = inject(PermissionService);
  private readonly estado = inject(SolicitudesStateService);
  private readonly fachada = inject(SolicitudesFacadeService);

  readonly rol = computed<RolDeBandeja>(() => (this.permisos.currentRole() === 'approver' ? 'aprobador' : 'creador'));

  readonly documentos = computed<DocumentoDeBandeja[]>(() => {
    const solicitudes = this.rol() === 'aprobador' ? this.estado.bandejaAprobador() : this.estado.bandejaCreador();
    return solicitudes.map((s) => ({
      document: s.tipoDocumento,
      number: s.numero || '-',
      actionType: s.tipoAccion,
      status: s.estado as EstadoDeBandeja,
      system: 'Sistema Nacional de Tesorería',
      date: s.fecha,
      institutionalScope: s.cuentas[0]?.institutionalScopes || '-',
      entity: s.entidad,
    }));
  });

  readonly conteos = computed<ConteosDeBandeja>(() =>
    this.rol() === 'aprobador'
      ? {
          recibidos: this.estado.aprobadorRecibidosCount(),
          enviados: this.estado.aprobadorEnviadosCount(),
          borradores: 0,
          papelera: 0,
        }
      : {
          recibidos: this.estado.creadorRecibidosCount(),
          enviados: this.estado.creadorEnviadosCount(),
          borradores: this.estado.creadorBorradoresCount(),
          papelera: this.estado.creadorPapeleraCount(),
        },
  );

  cargar(): void {
    if (this.rol() === 'aprobador') this.fachada.cargarBandejaAprobador();
    else this.fachada.cargarBandejaCreador();
  }
}

@Injectable({ providedIn: 'root' })
export class TallerFuenteDocumentosRegistros extends FuenteDocumentosRegistros {
  private readonly permisos = inject(PermissionService);
  private readonly api = inject(SolicitudesApiService);
  private readonly fachada = inject(SolicitudesFacadeService);
  private readonly notificaciones = inject(NotificationsStateService);

  readonly rol = computed<ModoDeRol>(() => {
    const rol = this.permisos.currentRole();
    return rol === 'creator' || rol === 'approver' ? rol : 'readOnly';
  });

  cambiarEstado(documentoId: string, estadoNuevo: 'VERIFICADO' | 'APROBADO'): Observable<unknown> {
    return this.api.cambiarEstado(documentoId, { estadoNuevo });
  }

  recargarBandeja(): void {
    this.fachada.recargarBandeja();
  }

  marcarNotificacionesLeidas(documentoId: string): void {
    void this.notificaciones.marcarLeidaPorDocumento(documentoId);
  }
}

@Injectable({ providedIn: 'root' })
export class TallerFuenteHistorialDocumento extends FuenteHistorialDocumento {
  private readonly api = inject(SolicitudesApiService);

  obtenerHistorial(solicitudId: string): Observable<DocumentHistoryRow[]> {
    return this.api.obtenerDetalle(solicitudId).pipe(
      map((solicitud) =>
        [...(solicitud.historialEstados ?? [])]
          // NUEVO es un estado interno: no se muestra.
          .filter((h) => (h.estadoNuevo ?? '').toUpperCase() !== 'NUEVO')
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          .map((h) => {
            const fecha = new Date(h.createdAt);
            const c = h.creador;
            return {
              usuario: c ? `${c.nombres} ${c.apellidoPaterno} ${c.apellidoMaterno ?? ''}`.trim() : '',
              rol: h.perfil?.cfgPerfil?.rol?.nombre ?? '',
              fecha: fecha.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
              hora: fecha.toLocaleTimeString('es-PE', { hour12: false }),
              estado: (h.estadoNuevo ?? '').toUpperCase(),
              comentario: h.comentario ?? '',
            };
          }),
      ),
    );
  }
}

/** El taller no tiene plan de cuentas: el panel de historial de cuenta contable no se usa. */
@Injectable({ providedIn: 'root' })
export class TallerFuenteHistorialCuenta extends FuenteHistorialCuenta {
  obtenerCuenta(): Observable<never> {
    return throwError(() => new Error('El taller no tiene plan de cuentas.'));
  }

  obtenerSolicitudes(): Observable<never> {
    return throwError(() => new Error('El taller no tiene plan de cuentas.'));
  }
}

/** El taller no tiene asientos de ajuste: el panel de historial del asiento no se usa. */
@Injectable({ providedIn: 'root' })
export class TallerFuenteHistorialAsiento extends FuenteHistorialAsiento {
  obtenerSolicitud(): Observable<never> {
    return throwError(() => new Error('El taller no tiene asientos de ajuste.'));
  }

  obtenerPeriodo(): Observable<null> {
    return throwError(() => new Error('El taller no tiene asientos de ajuste.'));
  }

  ambitoDelUsuario(): null {
    return null;
  }
}

/** Registra las fuentes del kit. Va en los providers de `bootstrapApplication`. */
export function provideFuentesDelKit(): EnvironmentProviders {
  const fuentes: Provider[] = [
    { provide: FuenteSesion, useExisting: TallerFuenteSesion },
    { provide: FuenteNotificaciones, useExisting: TallerFuenteNotificaciones },
    { provide: FuenteBandeja, useExisting: TallerFuenteBandeja },
    { provide: FuenteDocumentosRegistros, useExisting: TallerFuenteDocumentosRegistros },
    { provide: FuenteHistorialDocumento, useExisting: TallerFuenteHistorialDocumento },
    { provide: FuenteHistorialCuenta, useExisting: TallerFuenteHistorialCuenta },
    { provide: FuenteHistorialAsiento, useExisting: TallerFuenteHistorialAsiento },
  ];
  return makeEnvironmentProviders(fuentes);
}

