import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

import {
  ButtonComponent,
  ConsultasFiltrosChipsComponent,
  CustomFilterComponent,
  DataTableColumn,
  DataTableComponent,
  DataTableRow,
  DocumentsRecordsTableComponent,
  DragHandleComponent,
  FilterPillComponent,
  FilterPillOption,
  FilterRow,
  FiltroChip,
  FormTableSearchComponent,
  IconDropdownMenuComponent,
  IconDropdownMenuItem,
  ListComponent,
  ListItem,
  PaginationComponent,
  ParametroAplicado,
  ParametrosAplicadosComponent,
  RecordsSearchToolbarComponent,
  ReordenableDirective,
  ReordenableItemDirective,
  type Reordenamiento,
  ReportTableComponent,
  TableComponent,
  TableControlsComponent,
  TableSkeletonComponent,
  TextFieldComponent,
  TextFieldOption,
  TreeViewComponent,
  TreeViewNode,
  reordenar,
} from '@kennedy122112/siaf-rp-ui-angular';
import { DocumentsRecordsColumn, DocumentsRecordsRow } from '../../../shared/types/documents-records.types';
import { COLUMNAS_REPORTE_DE_MUESTRA, FILAS_REPORTE_DE_MUESTRA } from './reporte-de-muestra';

/** Ejemplos en vivo de la categoría Datos y tablas. */
@Component({
  selector: 'ui-kit-ejemplos-datos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent, ConsultasFiltrosChipsComponent, CustomFilterComponent, DataTableComponent, DragHandleComponent, NgTemplateOutlet,
    ReordenableDirective, ReordenableItemDirective, TextFieldComponent,
    DocumentsRecordsTableComponent, FilterPillComponent, FormTableSearchComponent, IconDropdownMenuComponent, ListComponent, PaginationComponent,
    ParametrosAplicadosComponent, RecordsSearchToolbarComponent, ReportTableComponent, TableComponent, TableControlsComponent, TableSkeletonComponent, TreeViewComponent,
  ],
  template: `
    @switch (selector) {
      @case ('siaf-table') {
        <siaf-table [columns]="columnas" [rows]="filas" />
      }
      @case ('siaf-data-table') {
        <siaf-data-table [columns]="columnas" [rows]="filas" />
      }
      @case ('[siafReordenable]') {
        <ng-container [ngTemplateOutlet]="listaCampos" />
      }
      @case ('[siafReordenableItem]') {
        <ng-container [ngTemplateOutlet]="listaCampos" />
      }
      @case ('siaf-drag-handle') {
        <div class="grid gap-6 sm:grid-cols-2">
          <div class="min-w-0">
            <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">Vertical · lista de arriba abajo</p>
            <div class="flex items-center gap-2">
              <siaf-drag-handle etiqueta="Mover Entidad" />
              <siaf-drag-handle etiqueta="Mover Entidad (sm)" size="sm" />
              <siaf-drag-handle etiqueta="Mover Entidad (xs)" size="xs" />
            </div>
          </div>
          <div class="min-w-0">
            <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">Horizontal · lista de izquierda a derecha</p>
            <div class="flex items-center gap-2">
              <siaf-drag-handle etiqueta="Mover Año" orientacion="horizontal" />
              <siaf-drag-handle etiqueta="Mover Año (sm)" orientacion="horizontal" size="sm" />
              <siaf-drag-handle etiqueta="Mover Año (xs)" orientacion="horizontal" size="xs" />
            </div>
          </div>
          <div class="min-w-0 sm:col-span-2">
            <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">En una lista horizontal · ← → con el elemento tomado</p>
            <div class="flex flex-wrap gap-2" siafReordenable orientacion="horizontal" (reordenado)="columnasOrden.update((c) => reordenar(c, $event))">
              @for (columna of columnasOrden(); track columna) {
                <div siafReordenableItem class="flex items-center gap-1 rounded-siaf-md border border-divider-default bg-bg-surfaces-surface py-1 pl-1 pr-3 text-sm text-text-neutral-high">
                  <siaf-drag-handle size="sm" orientacion="horizontal" [etiqueta]="'Mover ' + columna" />
                  {{ columna }}
                </div>
              }
            </div>
          </div>
          <div class="min-w-0 sm:col-span-2">
            <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">En una tabla · siaf-data-table con reordenable (celda «Drag &amp; drop» de 24 px)</p>
            <siaf-data-table [columns]="columnas" [rows]="filasReordenables()" [reordenable]="true" (reordenado)="filasReordenables.update((f) => reordenar(f, $event))" />
            <p class="mt-2 text-xs text-text-muted" aria-live="polite">Orden: {{ ordenDeFilas() }}</p>
          </div>
        </div>
      }
      @case ('siaf-report-table') {
        <siaf-report-table
          [columns]="columnasReporte"
          [rows]="filasReporte"
          rowKey="secuencia"
          ariaLabel="Movimientos de las libretas"
          (linkClicked)="documentoReporte.set($event.row['documento'])"
        />
        <p class="mt-2 text-xs text-text-muted" aria-live="polite">
          Desplaza la tabla: «Saldo final» queda fija a la derecha.@if (documentoReporte()) { Emitió «linkClicked» con el documento {{ documentoReporte() }}. }
        </p>
      }
      @case ('siaf-documents-records-table') {
        <siaf-documents-records-table activeTab="documents" [columns]="columnasDocumentos" [rows]="documentos" [documentRoute]="rutaDocumento" />
      }
      @case ('siaf-table-controls') {
        <siaf-table-controls
          [checked]="seleccionados() > 0"
          [indeterminate]="seleccionados() === 1"
          [selectedCount]="seleccionados()"
          [showEditAction]="true"
          [showDeleteAction]="true"
          [page]="1"
          [pageSize]="25"
          [totalItems]="187"
          [totalPages]="8"
          (selectionChange)="seleccionados.set($event ? 2 : 0)"
        />
      }
      @case ('siaf-pagination') {
        <div class="flex flex-col gap-4">
          <siaf-pagination navigation="Activate" position="Top" [page]="2" [pageSize]="25" [totalItems]="187" [totalPages]="8" />
          <siaf-pagination navigation="Activate" position="Bottom" [rowPage]="true" [page]="1" [pageSize]="25" [totalItems]="187" [totalPages]="8" />
        </div>
      }
      @case ('siaf-table-skeleton') {
        <siaf-table-skeleton [rows]="3" [columns]="4" />
      }
      @case ('siaf-custom-filter') {
        <siaf-custom-filter [campoOptions]="campos" [condicionOptions]="condiciones" [valorOptions]="valores" [initialRows]="filtroInicial" />
      }
      @case ('siaf-form-table-search') {
        <div class="flex flex-col gap-6">
          <div class="min-w-0">
            <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">Por defecto · tablas de las solicitudes: Filtrar y Más opciones</p>
            <siaf-form-table-search placeholder="Buscar cuenta contable" (filter)="accionBuscador.set('filter')" (more)="accionBuscador.set('more')" />
          </div>
          <div class="min-w-0">
            <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">variant="reports" · Consultas y reportes: Filtrar y Columnas</p>
            <siaf-form-table-search variant="reports" placeholder="Buscar" (filter)="accionBuscador.set('filter')" (columns)="accionBuscador.set('columns')" />
          </div>
          <p class="text-xs text-text-muted" aria-live="polite">Último evento: {{ accionBuscador() ?? 'ninguno' }}</p>
        </div>
      }
      @case ('siaf-records-search-toolbar') {
        <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">Documentos y registros · menús Campos, Favorito y Más opciones</p>
        <siaf-records-search-toolbar placeholder="Buscar" (searchSubmit)="busquedaRegistros.set($event)">
          <ng-container actions>
            <siaf-icon-dropdown-menu icon="layers" ariaLabel="Campos" [items]="menuCampos" />
            <siaf-icon-dropdown-menu icon="star_border" ariaLabel="Favorito" [items]="menuFavorito" />
            <siaf-icon-dropdown-menu icon="more_vert" ariaLabel="Más opciones" [items]="menuMasOpciones" [menuWidth]="280" />
          </ng-container>
        </siaf-records-search-toolbar>
        <p class="mt-2 text-xs text-text-muted" aria-live="polite">Búsqueda confirmada: {{ busquedaRegistros() || 'ninguna (Enter o la lupa)' }}</p>
      }
      @case ('siaf-filter-pill') {
        <div class="flex min-h-[180px] flex-wrap items-start gap-3">
          <siaf-filter-pill label="Estado" [options]="estados" [selectedValue]="estado()" (selectedValueChange)="estado.set($event)" />
        </div>
      }
      @case ('siaf-consultas-filtros-chips') {
        <siaf-consultas-filtros-chips [chips]="chips" />
      }
      @case ('siaf-parametros-aplicados') {
        <siaf-parametros-aplicados [parametros]="parametrosAplicados" />
      }
      @case ('siaf-tree-view') {
        <siaf-tree-view [nodes]="arbol" />
      }
      @case ('siaf-list') {
        <div class="grid gap-6 lg:grid-cols-2">
          <div class="min-w-0">
            <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">Standard · 1, 2 y 3+ líneas</p>
            <siaf-list [items]="listaTipos" [wrapDescription]="true" [dividers]="true" />
          </div>
          <div class="min-w-0">
            <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">Compact</p>
            <siaf-list size="compact" [items]="listaTipos" />
          </div>
          <div class="min-w-0">
            <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">Seleccionable · hover, foco (Tab) y seleccionado</p>
            <siaf-list
              ariaLabel="Documentos del expediente"
              [items]="listaSeleccionable"
              [selectable]="true"
              [(selectedId)]="itemLista"
              (switchChange)="cambioSwitchLista.set($event.id + ' → ' + ($event.checked ? 'activo' : 'inactivo'))"
            />
            <p class="mt-2 text-xs text-text-muted" aria-live="polite">
              Seleccionado: {{ itemLista() ?? 'ninguno' }}@if (cambioSwitchLista()) { · switch {{ cambioSwitchLista() }} }
            </p>
          </div>
          <div class="min-w-0">
            <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">Thumbnail con overline</p>
            <siaf-list [items]="listaThumbnails" [wrapDescription]="true" />
          </div>
          <div class="min-w-0 lg:col-span-2">
            <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">Horizontal con borde · tarjetas de 230 px</p>
            <div class="overflow-x-auto">
              <siaf-list orientation="horizontal" [outlined]="true" [items]="listaHorizontal" />
            </div>
          </div>
        </div>
      }
    }

    <ng-template #listaCampos>
      <div class="max-w-[388px]">
        <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">Campos del resultado agregado · arrastra o usa Espacio y ↑ ↓</p>
        <div class="flex flex-col gap-4" siafReordenable (reordenado)="alReordenarCampos($event)">
          @for (campo of camposAgregado(); track campo.id) {
            <div siafReordenableItem class="flex items-center gap-2">
              <siaf-drag-handle [etiqueta]="'Mover ' + nombreDeCampo(campo.valor)" />
              <siaf-input class="min-w-0 flex-1" label="Campo" type="select" [options]="opcionesCampo" [value]="campo.valor" [autoSuccess]="false" />
              <siaf-button variant="text" icon="delete" [iconOnly]="true" [ariaLabel]="'Quitar ' + nombreDeCampo(campo.valor)" (click)="quitarCampo(campo.id)" />
            </div>
          }
        </div>
        <p class="mt-2 text-xs text-text-muted" aria-live="polite">Último cambio: {{ ultimoCambio() || 'ninguno' }}</p>
      </div>
    </ng-template>
  `,
})
export class EjemplosDatosComponent {
  static readonly selectores = [
    'siaf-table', 'siaf-data-table', 'siaf-report-table', 'siaf-documents-records-table', 'siaf-table-controls', 'siaf-pagination', 'siaf-table-skeleton',
    'siaf-custom-filter', 'siaf-form-table-search', 'siaf-records-search-toolbar', 'siaf-filter-pill', 'siaf-consultas-filtros-chips', 'siaf-parametros-aplicados',
    'siaf-tree-view', 'siaf-list', '[siafReordenable]', '[siafReordenableItem]', 'siaf-drag-handle',
  ];
  @Input({ required: true }) selector!: string;

  readonly columnasReporte = COLUMNAS_REPORTE_DE_MUESTRA;
  /** Los seis movimientos del 28/06, los de la tabla del Figma. */
  readonly filasReporte = FILAS_REPORTE_DE_MUESTRA.filter((fila) => fila['fecha'].startsWith('28/06/'));
  readonly documentoReporte = signal('');

  readonly columnas: DataTableColumn[] = [
    { key: 'numero', label: 'Número' },
    { key: 'documento', label: 'Documento' },
    { key: 'estado', label: 'Estado' },
  ];
  readonly filas: DataTableRow[] = [
    { id: '1', numero: '00001', documento: 'Solicitud de cuenta contable', estado: 'Aprobado' },
    { id: '2', numero: '00002', documento: 'Registro de asiento de ajuste', estado: 'Verificado' },
    { id: '3', numero: '00003', documento: 'Catálogo de eventos', estado: 'Elaborado' },
  ];

  readonly columnasDocumentos: DocumentsRecordsColumn[] = [
    { key: 'number', label: 'N° documento', visibility: 'visible', group: 'default', kind: 'document-link' },
    { key: 'type', label: 'Documento', visibility: 'visible', group: 'default' },
    { key: 'status', label: 'Estado', visibility: 'visible', group: 'default', kind: 'flow-status' },
    { key: 'date', label: 'Fecha', visibility: 'visible', group: 'default' },
  ];
  readonly documentos: DocumentsRecordsRow[] = [
    { number: 'PCC-SCC-00001-2026-MEF-DGCP', type: 'Solicitud de cuenta contable', status: 'Elaborado', date: '15/01/2026' },
    { number: 'PAA-SRAA-00002-2026-MEF-DGCP', type: 'Registro de asiento de ajuste', status: 'Verificado', date: '18/01/2026' },
  ];
  /** Ejemplo sin navegación real: el enlace se queda en el catálogo. */
  readonly rutaDocumento = (): string => '/ui-kit';

  readonly seleccionados = signal(0);

  /** Los menús de la barra de Documentos y registros (`siaf-documents-records-page`), con sus mismas opciones. */
  readonly menuCampos: IconDropdownMenuItem[] = [
    { label: 'Documento' },
    { label: 'Estado' },
    { label: 'Fecha de registro', hasChildren: true },
  ];
  readonly menuFavorito: IconDropdownMenuItem[] = [
    { label: 'Solicitudes observadas', value: 'observed', divider: true },
    { label: 'Guardar búsqueda actual', value: 'save-search' },
  ];
  readonly menuMasOpciones: IconDropdownMenuItem[] = [{ label: 'Ocultar o mostrar columnas', value: 'open-columns' }];
  readonly busquedaRegistros = signal('');
  /** Evento que emitió el último botón de `siaf-form-table-search` en el ejemplo. */
  readonly accionBuscador = signal<'filter' | 'more' | 'columns' | null>(null);

  readonly campos: TextFieldOption[] = [
    { label: 'Estado', value: 'estado' },
    { label: 'Entidad', value: 'entidad' },
  ];
  readonly condiciones: TextFieldOption[] = [
    { label: 'Es igual a', value: 'igual' },
    { label: 'Contiene', value: 'contiene' },
  ];
  readonly valores: TextFieldOption[] = [
    { label: 'Aprobado', value: 'aprobado' },
    { label: 'Observado', value: 'observado' },
  ];
  readonly filtroInicial: FilterRow[] = [{ campo: 'estado', condicion: 'igual', valor: 'aprobado' }];

  readonly estados: FilterPillOption[] = [
    { label: 'Todos', value: '' },
    { label: 'Elaborado', value: 'elaborado' },
    { label: 'Aprobado', value: 'aprobado' },
  ];
  readonly estado = signal('');

  readonly chips: FiltroChip[] = [
    { label: 'Estado', values: ['Aprobado', 'Verificado'] },
    { label: 'Año', values: ['2026'] },
  ];

  /** Parámetros de una consulta con los íconos del Figma («Guía de Estructura de Pantallas», nodo 22402:16429). */
  readonly parametrosAplicados: ParametroAplicado[] = [
    { icon: 'calendar_today', label: 'Periodo', value: 'Enero a marzo de 2026' },
    { icon: 'calculate', label: 'Plan contable', value: 'PCGU 2026 · Plan Contable Gubernamental' },
    { icon: 'account_balance_wallet', label: 'Fuente de financiamiento', value: 'Recursos ordinarios' },
    { icon: 'account_balance', label: 'Entidad', value: '0001 · Ministerio de Economía y Finanzas' },
    { icon: 'apartment', label: 'Unidad ejecutora', value: 'Dirección General de Contabilidad Pública' },
    { icon: 'groups_3', label: 'Pliego', value: '009 · Ministerio de Economía y Finanzas' },
  ];

  readonly listaHorizontal: ListItem[] = [
    { id: 'h1', title: 'Periodo', description: 'Enero a marzo de 2026', icon: 'calendar_today' },
    { id: 'h2', title: 'Entidad', description: '0001 · Ministerio de Economía y Finanzas', icon: 'account_balance' },
    { id: 'h3', title: 'Unidad ejecutora', description: 'Dirección General de Contabilidad Pública', icon: 'apartment' },
  ];

  readonly arbol: TreeViewNode[] = [
    {
      id: 'mef', label: 'Ministerio de Economía y Finanzas', icon: 'account_balance', expanded: true,
      children: [
        { id: 'ag', label: 'Administración General', icon: 'apartment' },
        { id: 'dgcp', label: 'Dirección General de Contabilidad Pública', icon: 'apartment' },
      ],
    },
  ];

  /** Una fila por combinación del Figma: leading icon / avatar / switch y trailing icon / badge / switch. */
  readonly listaTipos: ListItem[] = [
    { id: 't1', title: 'List item title', leading: { type: 'icon', icon: 'account_circle' }, trailing: { type: 'icon', icon: 'info' } },
    { id: 't2', title: 'List item title', description: 'Supporting line text lorem ipsum dolor sit amet, consectetur.', leading: { type: 'avatar', initials: 'AB' }, trailing: { type: 'badge', label: 88 } },
    {
      id: 't3',
      title: 'List item title',
      description: 'Supporting line text lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      leading: { type: 'switch', checked: true },
      trailing: { type: 'icon', icon: 'info' },
    },
    { id: 't4', title: 'List item title', description: 'Supporting line text lorem ipsum dolor sit amet.', leading: { type: 'icon', icon: 'account_circle' }, trailing: { type: 'switch', checked: false } },
  ];
  readonly listaSeleccionable: ListItem[] = [
    { id: 'acta', title: 'Acta de inventario', description: 'Firmada el 20/01/2026', icon: 'description', trailing: { type: 'badge', label: 3, ariaLabel: '3 observaciones' } },
    { id: 'plan', title: 'Plan de trabajo', description: 'En elaboración', icon: 'event_note', trailing: { type: 'icon', icon: 'info' } },
    { id: 'aviso', title: 'Avisar al aprobador', description: 'Correo al pasar a Verificado', icon: 'notifications', trailing: { type: 'switch', checked: true } },
  ];
  readonly listaThumbnails: ListItem[] = [
    {
      id: 'th1',
      overline: 'Capacitación',
      title: 'Cierre contable 2025',
      description: 'Sesión virtual para las unidades ejecutoras sobre el registro de ajustes de cierre.',
      leading: { type: 'thumbnail', src: 'assets/landing/capacitacion-1.webp', alt: '' },
      trailing: { type: 'icon', icon: 'info' },
    },
    {
      id: 'th2',
      overline: 'Noticia',
      title: 'Actualizaciones del SIAF-RP',
      description: 'Nuevas funciones en el catálogo de eventos contables.',
      leading: { type: 'thumbnail', src: 'assets/landing/noticia-actualizaciones.webp', alt: '' },
      trailing: { type: 'icon', icon: 'info' },
    },
  ];
  readonly itemLista = signal<string | null>('plan');
  readonly cambioSwitchLista = signal('');

  // ── Reordenar ──
  protected readonly reordenar = reordenar;
  readonly filasReordenables = signal<DataTableRow[]>(this.filas);
  readonly ordenDeFilas = (): string => this.filasReordenables().map((f) => f['numero']).join(', ');
  readonly columnasOrden = signal(['Año', 'Mes', 'Pliego', 'Entidad']);
  readonly opcionesCampo: TextFieldOption[] = [
    { label: 'Pliego', value: 'pliego' },
    { label: 'Entidad', value: 'entidad' },
    { label: 'Cuenta contable', value: 'cuenta' },
  ];
  readonly camposAgregado = signal([
    { id: 1, valor: 'pliego' },
    { id: 2, valor: 'entidad' },
    { id: 3, valor: 'cuenta' },
  ]);
  readonly ultimoCambio = signal('');

  nombreDeCampo(valor: string): string {
    return this.opcionesCampo.find((o) => o.value === valor)?.label ?? valor;
  }

  alReordenarCampos(cambio: Reordenamiento): void {
    this.camposAgregado.update((c) => reordenar(c, cambio));
    this.ultimoCambio.set(`de la posición ${cambio.anterior + 1} a la ${cambio.actual + 1}`);
  }

  quitarCampo(id: number): void {
    this.camposAgregado.update((c) => (c.length > 1 ? c.filter((x) => x.id !== id) : c));
  }
}
