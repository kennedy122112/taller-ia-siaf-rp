import { ChangeDetectionStrategy, Component, computed, signal, input } from '@angular/core';

import { AnnulmentModalComponent, AnnulmentRequest, ButtonComponent, ColumnVisibilityPanelComponent, DocumentsRecordsColumn, FocoDirective, ModalComponent, QueryParametersPanelComponent, type QueryReportParameters, RequestApprovalModalsComponent, SelectionColumn, SelectionSideNavComponent, SideNavComponent, SidePanelComponent, TextFieldComponent, TextFieldOption, TimelineDetailPanelComponent, TimelineItem, UploadSideNavComponent } from '@kennedy122112/siaf-rp-ui-angular';
import { CAMPOS_PARAMETROS_DE_MUESTRA } from './reporte-de-muestra';

interface CuentaEjemplo {
  id: string;
  codigo: string;
  nombre: string;
}

/** Ejemplos en vivo de la categoría Overlays: cada uno se abre con un botón para no tapar el catálogo. */
@Component({
  selector: 'ui-kit-ejemplos-overlays',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AnnulmentModalComponent, ButtonComponent, ColumnVisibilityPanelComponent, FocoDirective, ModalComponent, QueryParametersPanelComponent,
    RequestApprovalModalsComponent, SelectionSideNavComponent, SideNavComponent, SidePanelComponent, TextFieldComponent, TimelineDetailPanelComponent,
    UploadSideNavComponent,
  ],
  template: `
    @switch (selector()) {
      @case ('siaf-modal') {
        <div class="flex flex-wrap gap-3">
          <siaf-button variant="secondary" (click)="modal.set('save')">Grabar</siaf-button>
          <siaf-button variant="filled" (click)="modal.set('delete-request')">Eliminar</siaf-button>
        </div>
        <siaf-modal
          [open]="modal() !== null"
          [variant]="modal() ?? 'save'"
          (confirmed)="modal.set(null)"
          (canceled)="modal.set(null)"
          (closed)="modal.set(null)"
        />
      }
      @case ('siaf-request-approval-modals') {
        <div class="flex flex-wrap gap-3">
          <siaf-button variant="secondary" (click)="verificar.set(true)">Verificar</siaf-button>
          <siaf-button (click)="aprobar.set(true)">Aprobar</siaf-button>
        </div>
        <siaf-request-approval-modals
          requestType="Solicitud de cuenta contable"
          requestNumber="0001"
          [verifyOpen]="verificar()"
          [approveOpen]="aprobar()"
          (verifyClosed)="verificar.set(false)"
          (verifyConfirmed)="verificar.set(false)"
          (approvalClosed)="aprobar.set(false)"
          (approveConfirmed)="aprobar.set(false)"
        />
      }
      @case ('siaf-annulment-modal') {
        <siaf-button variant="filled" (click)="anulacion.set(true)">Anular documento</siaf-button>
        <siaf-annulment-modal [open]="anulacion()" (closed)="anulacion.set(false)" (accepted)="anular($event)" />
        <p class="mt-2 text-xs text-text-muted" aria-live="polite">
          Escribe el detalle y carga un .pdf para habilitar «Aceptar».@if (anulacionEnviada()) { {{ anulacionEnviada() }} }
        </p>
      }
      @case ('[siafFoco]') {
        <siaf-button variant="secondary" icon="keyboard" (click)="dialogoFoco.set(true)">Abrir diálogo de prueba</siaf-button>
        <p class="mt-2 text-xs text-text-muted">Con teclado: el foco entra al campo, Tab da la vuelta entre los controles y Escape cierra y devuelve el foco a este botón.</p>
        @if (dialogoFoco()) {
          <div class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-siaf-md" role="presentation" (click)="dialogoFoco.set(false)">
            <section
              class="flex w-full max-w-[420px] flex-col gap-siaf-md rounded-siaf-md bg-surface p-siaf-lg shadow-siaf-lg"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ejemplo-foco-titulo"
              siafFoco
              (siafFocoEscape)="dialogoFoco.set(false)"
              (click)="$event.stopPropagation()"
            >
              <h2 id="ejemplo-foco-titulo" class="m-0 text-base font-bold text-text">Renombrar documento</h2>
              <siaf-input label="Nombre" data-foco-inicial value="Solicitud de cuenta contable" />
              <div class="flex justify-end gap-siaf-xs">
                <siaf-button variant="secondary" (click)="dialogoFoco.set(false)">Cancelar</siaf-button>
                <siaf-button (click)="dialogoFoco.set(false)">Guardar</siaf-button>
              </div>
            </section>
          </div>
        }
      }
      @case ('siaf-side-nav') {
        <siaf-button variant="secondary" (click)="panel.set(true)">Abrir side nav</siaf-button>
        <siaf-side-nav title="Detalle del registro" [open]="panel()" (closed)="panel.set(false)" (confirmed)="panel.set(false)">
          <p class="m-0 text-sm text-text-neutral-medium">Contenido proyectado en el side nav: un detalle breve o un formulario corto.</p>
        </siaf-side-nav>
      }
      @case ('siaf-side-panel') {
        <div class="flex flex-wrap gap-3">
          <siaf-button variant="secondary" (click)="abrirSidePanel(false)">Abrir side panel</siaf-button>
          <siaf-button variant="secondary" icon="filter_list" (click)="abrirSidePanel(true)">Con panel de filtros</siaf-button>
        </div>
        <siaf-side-panel
          title="Movimientos de la cuenta"
          [open]="sidePanel()"
          [showNav]="sidePanelFiltros()"
          (closed)="sidePanel.set(false)"
          (confirmed)="sidePanel.set(false)"
          (navCanceled)="eventoSidePanel.set('Emitió «navCanceled».')"
          (navConfirmed)="eventoSidePanel.set('Emitió «navConfirmed»: la pantalla filtra el contenido.')"
        >
          <p class="m-0 text-sm text-text-neutral-medium">
            Contenido a todo el ancho: una tabla grande, la vista previa de un documento o un detalle con muchas columnas.
          </p>
          <div class="flex flex-col gap-siaf-lg" sidePanelNav>
            <siaf-input label="Tipo de operación" type="select" [options]="operacionesFiltro" />
            <siaf-input label="Documento" />
          </div>
        </siaf-side-panel>
        <p class="mt-2 text-xs text-text-muted" aria-live="polite">{{ eventoSidePanel() }}</p>
      }
      @case ('siaf-selection-side-nav') {
        <siaf-button variant="secondary" icon="search" (click)="seleccion.set(true)">Seleccionar cuenta contable</siaf-button>
        <siaf-selection-side-nav
          title="Seleccionar cuenta contable"
          mode="single"
          idKey="id"
          [open]="seleccion()"
          [columns]="columnasCuenta"
          [rows]="cuentas"
          [selectedIds]="cuentasElegidas()"
          (selectionChange)="cuentasElegidas.set($event)"
          (accepted)="seleccion.set(false)"
          (closed)="seleccion.set(false)"
        />
        <siaf-button class="ml-siaf-xs" variant="secondary" icon="checklist" (click)="abrirSeleccionPaginada()">
          Seleccionar varias (paginado)
        </siaf-button>
        <siaf-selection-side-nav
          title="Seleccionar cuentas contables"
          mode="multiple"
          idKey="id"
          [open]="seleccionPaginada()"
          [columns]="columnasCuenta"
          [rows]="filasPaginaCuentas()"
          [selectedIds]="cuentasPaginadasElegidas()"
          [requireSelection]="false"
          [paginated]="true"
          [showSelectAll]="true"
          selectAllLabel="Seleccionar las cuentas de la página"
          [selectAllChecked]="paginaCuentasMarcada()"
          [selectAllIndeterminate]="paginaCuentasParcial()"
          [page]="paginaCuentas()"
          [pageSize]="filasCuentas()"
          [totalItems]="cuentasPaginadas.length"
          [totalPages]="totalPaginasCuentas()"
          [rowsPerPage]="filasCuentas()"
          (selectionChange)="cuentasPaginadasElegidas.set($event)"
          (selectAllChange)="marcarPaginaCuentas($event)"
          (previousPage)="irAPaginaCuentas(paginaCuentas() - 1)"
          (nextPage)="irAPaginaCuentas(paginaCuentas() + 1)"
          (rowsPerPageChange)="cambiarFilasCuentas($event)"
          (accepted)="seleccionPaginada.set(false)"
          (closed)="seleccionPaginada.set(false)"
        />
      }
      @case ('siaf-timeline-detail-panel') {
        <siaf-button variant="secondary" icon="timeline" (click)="detalleSeguimiento.set(true)">Ver detalle del seguimiento</siaf-button>
        <siaf-timeline-detail-panel
          [open]="detalleSeguimiento()"
          processName="Proceso de cierre contable 2025"
          itemLabel="etapa"
          itemsLabel="etapas"
          [items]="etapasCierre"
          [current]="2"
          (closed)="detalleSeguimiento.set(false)"
        />
        <p class="mt-2 text-xs text-text-muted">También lo abre «Ver detalle» de <code class="font-mono">siaf-timeline</code>.</p>
      }
      @case ('siaf-upload-side-nav') {
        <siaf-button variant="secondary" icon="upload_file" (click)="cargaAbierta.set(true)">Cargar documento</siaf-button>
        <siaf-upload-side-nav
          [open]="cargaAbierta()"
          title="Cargar documento de sustento"
          description="Sube un archivo .PDF en el formato correcto."
          acceptedLabel="Solo admite archivos .pdf"
          hint="Archivos de hasta 10 MB"
          (closed)="cargaAbierta.set(false)"
          (confirmed)="cargaAbierta.set(false)"
        />
      }
      @case ('siaf-column-visibility-panel') {
        <siaf-button variant="secondary" icon="view_column" (click)="columnasAbierto.set(true)">Configurar columnas</siaf-button>
        <siaf-column-visibility-panel
          [open]="columnasAbierto()"
          [defaultColumns]="columnasBase"
          [moreColumns]="columnasExtra"
          [isColumnVisible]="columnaVisible"
          (closed)="columnasAbierto.set(false)"
          (applied)="columnasAbierto.set(false)"
        />
      }
      @case ('siaf-query-parameters-panel') {
        <siaf-button variant="secondary" icon="manage_search" (click)="parametrosAbierto.set(true)">Parámetros de consulta</siaf-button>
        <siaf-query-parameters-panel
          [open]="parametrosAbierto()"
          [fields]="camposParametros"
          [values]="parametrosAplicados()"
          (closed)="parametrosAbierto.set(false)"
          (applied)="parametrosAplicados.set($event); parametrosAbierto.set(false)"
        />
        <p class="mt-2 text-xs text-text-muted" aria-live="polite">
          Las dos fechas son obligatorias.@if (parametrosAplicados()) { Emitió «applied» con {{ resumenParametros() }}. }
        </p>
      }
    }
  `,
})
export class EjemplosOverlaysComponent {
  static readonly selectores = [
    'siaf-modal', 'siaf-request-approval-modals', 'siaf-annulment-modal', 'siaf-side-nav', 'siaf-side-panel',
    'siaf-selection-side-nav', 'siaf-upload-side-nav', 'siaf-timeline-detail-panel', 'siaf-column-visibility-panel',
    'siaf-query-parameters-panel', '[siafFoco]',
  ];

  readonly camposParametros = CAMPOS_PARAMETROS_DE_MUESTRA;
  readonly parametrosAbierto = signal(false);
  readonly parametrosAplicados = signal<QueryReportParameters | null>(null);
  readonly resumenParametros = computed(() =>
    Object.entries(this.parametrosAplicados() ?? {})
      .map(([clave, valor]) => `${clave}: ${Array.isArray(valor) ? valor.join(', ') : valor}`)
      .join(' · '),
  );

  readonly detalleSeguimiento = signal(false);
  readonly etapasCierre: TimelineItem[] = [
    { label: 'Registro de operaciones del periodo', date: '05/01/26', dateInfo: 'Aprobado', description: '1,240 asientos registrados.' },
    { label: 'Asientos de ajuste', date: '12/01/26', dateInfo: 'Aprobado', description: '36 asientos de ajuste aprobados.' },
    { label: 'Conciliación de cuentas' },
    { label: 'Estados financieros' },
  ];
  readonly selector = input.required<string>();

  readonly modal = signal<'save' | 'delete-request' | null>(null);
  readonly anulacion = signal(false);
  readonly anulacionEnviada = signal('');
  readonly verificar = signal(false);
  readonly aprobar = signal(false);
  readonly panel = signal(false);
  readonly sidePanel = signal(false);
  readonly sidePanelFiltros = signal(false);
  readonly eventoSidePanel = signal('');
  readonly operacionesFiltro: TextFieldOption[] = [
    { label: '1 - Saldos Iniciales', value: '1' },
    { label: '2 - Reporte de Recaudación SUNAT', value: '2' },
  ];

  abrirSidePanel(conFiltros: boolean): void {
    this.sidePanelFiltros.set(conFiltros);
    this.eventoSidePanel.set('');
    this.sidePanel.set(true);
  }
  readonly dialogoFoco = signal(false);
  readonly seleccion = signal(false);
  readonly cuentasElegidas = signal<string[]>([]);
  readonly cargaAbierta = signal(false);
  readonly columnasAbierto = signal(false);

  readonly columnasCuenta: SelectionColumn<CuentaEjemplo>[] = [
    { key: 'codigo', label: 'Código', widthClass: 'w-[120px]', cellClass: 'font-mono' },
    { key: 'nombre', label: 'Denominación' },
  ];
  readonly cuentas: CuentaEjemplo[] = [
    { id: 'c1', codigo: '1101.01', nombre: 'Caja M/N' },
    { id: 'c2', codigo: '1101.02', nombre: 'Caja M/E' },
    { id: 'c3', codigo: '2101.01', nombre: 'Cuentas por pagar' },
  ];

  // Selección múltiple paginada: el padre pagina y decide qué cuenta como «todo seleccionado» (la página visible).
  readonly seleccionPaginada = signal(false);
  readonly cuentasPaginadasElegidas = signal<string[]>([]);
  readonly paginaCuentas = signal(1);
  readonly filasCuentas = signal(10);
  readonly cuentasPaginadas: CuentaEjemplo[] = [
    'Caja',
    'Fondos de caja chica',
    'Banco CUT - Tesoro',
    'Banco fondos recaudados',
    'Fideicomisos',
    'Fondos de terceros en garantía',
    'Depósitos a plazo',
    'Cuentas por cobrar al personal',
    'Anticipos a proveedores',
    'Préstamos por cobrar',
    'Impuestos por cobrar',
    'Multas por cobrar',
    'Venta de bienes por cobrar',
    'Venta de servicios por cobrar',
    'Depósitos en garantía',
    'Otras cuentas por cobrar',
  ].flatMap((nombre, i) =>
    ['M/N', 'M/E'].map((moneda, j) => ({
      id: `p${i * 2 + j + 1}`,
      codigo: `1.1.${i + 1}.${j + 1}`,
      nombre: `${nombre} en ${moneda}`,
    })),
  );
  readonly totalPaginasCuentas = computed(() => Math.max(1, Math.ceil(this.cuentasPaginadas.length / this.filasCuentas())));
  readonly filasPaginaCuentas = computed(() => {
    const desde = (this.paginaCuentas() - 1) * this.filasCuentas();
    return this.cuentasPaginadas.slice(desde, desde + this.filasCuentas());
  });
  readonly paginaCuentasMarcada = computed(() => {
    const elegidas = new Set(this.cuentasPaginadasElegidas());
    const filas = this.filasPaginaCuentas();
    return filas.length > 0 && filas.every((c) => elegidas.has(c.id));
  });
  readonly paginaCuentasParcial = computed(() => {
    const elegidas = new Set(this.cuentasPaginadasElegidas());
    return !this.paginaCuentasMarcada() && this.filasPaginaCuentas().some((c) => elegidas.has(c.id));
  });

  abrirSeleccionPaginada(): void {
    this.paginaCuentas.set(1);
    this.seleccionPaginada.set(true);
  }

  irAPaginaCuentas(pagina: number): void {
    this.paginaCuentas.set(Math.min(this.totalPaginasCuentas(), Math.max(1, pagina)));
  }

  cambiarFilasCuentas(filas: number): void {
    this.filasCuentas.set(filas);
    this.paginaCuentas.set(1);
  }

  marcarPaginaCuentas(marcar: boolean): void {
    const pagina = this.filasPaginaCuentas().map((c) => c.id);
    this.cuentasPaginadasElegidas.update((actuales) =>
      marcar ? [...new Set([...actuales, ...pagina])] : actuales.filter((id) => !pagina.includes(id)),
    );
  }

  readonly columnasBase: DocumentsRecordsColumn[] = [
    { key: 'number', label: 'N° documento', visibility: 'visible', group: 'default' },
    { key: 'status', label: 'Estado', visibility: 'visible', group: 'default' },
  ];
  readonly columnasExtra: DocumentsRecordsColumn[] = [
    { key: 'creator', label: 'Elaborado por', visibility: 'hidden', group: 'more' },
    { key: 'entity', label: 'Entidad', visibility: 'hidden', group: 'more' },
  ];
  readonly columnaVisible = (clave: string): boolean => clave === 'number' || clave === 'status';

  anular(solicitud: AnnulmentRequest): void {
    this.anulacion.set(false);
    this.anulacionEnviada.set(`Emitió «accepted» con el detalle «${solicitud.detail}» y ${solicitud.file.name}.`);
  }
}
