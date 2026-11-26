/**
 * Tipos de la plantilla «Consultas y reportes» (`siaf-query-report-page`). Vienen del kit: se reexportan aquí para que
 * los procesos los importen desde un solo lugar.
 */
import type { ReportTableColumn } from '@kennedy122112/siaf-rp-ui-angular';

export type {
  QueryReportAggregate,
  QueryReportChart,
  QueryReportChartType,
  QueryReportConfig,
  QueryReportExportFormat,
  QueryReportKpi,
  QueryReportParameterField,
  QueryReportParameters,
  QueryReportResult,
  QueryReportRow,
  QueryReportRowFilter,
} from '@kennedy122112/siaf-rp-ui-angular';

/** Columna del resultado: la misma de `siaf-report-table`. */
export type QueryReportColumn = ReportTableColumn;
