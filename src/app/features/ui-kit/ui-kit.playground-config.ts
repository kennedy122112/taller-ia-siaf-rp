/**
 * Qué muestra el playground de cada componente (decisión del usuario, 2026-11-11): solo los componentes cuyas variantes
 * cambian lo que se ve, y de cada uno solo las propiedades que cambian el aspecto. Lo técnico (`idBase`, `name`,
 * `autocomplete`, anchos en px) y los nombres viejos de una variante no van.
 *
 * - `controles`: las entradas que se cambian (`contenido` es el texto entre las etiquetas), siempre en el mismo orden:
 *   1. el texto principal (contenido, label, title, message, text) y los textos de apoyo (description, placeholder,
 *      hint, actionLabel, amount…) o el valor (value, progress, totalItems);
 *   2. la apariencia: variant o appearance, después tone o color, después orientation o position;
 *   3. el tamaño (size) y los íconos (icon, iconPosition, iconOnly, leadingIcon, illustration);
 *   4. el comportamiento (clearable, inline, selected, removable, dismissible, showClose, interactive, border…);
 *   5. los estados: required, disabled y loading;
 *   6. la validación: state y error.
 * - `opciones`: las opciones que se ofrecen de una entrada, si no son todas las del código.
 * - `valores`: con qué valor empieza cada control; las entradas que no son controles quedan fijas con ese valor.
 * - `datos`: las listas y los objetos, con su tipo: en el código copiable son propiedades tipadas del componente.
 * - `enlace`: la entrada que el componente cambia y avisa con un evento; en el código va con una señal.
 * - `ariaSoloIcono`: con `iconOnly` el texto visible desaparece, así que el contenido pasa a `ariaLabel`.
 */

/** Valor de un control: texto, número o booleano; null mientras una entrada opcional sin valor inicial no se toca. */
export type ValorControl = string | number | boolean | null;

export interface DatoPlayground {
  valor: unknown;
  /** Tipo en el código copiable, p. ej. `TabItem[]`. */
  tipo: string;
}

export interface ConfigPlayground {
  controles: readonly string[];
  opciones?: Readonly<Record<string, readonly string[]>>;
  valores?: Readonly<Record<string, ValorControl>>;
  datos?: Readonly<Record<string, DatoPlayground>>;
  /** Tipos que importa el código copiable del mismo archivo del componente (`TabItem`). */
  tipos?: readonly string[];
  /** `tipo`: el de la señal, si no es el que se deduce del valor inicial (lo que emite `siaf-input`). */
  enlace?: { entrada: string; evento: string; senal: string; tipo?: string };
  ariaSoloIcono?: boolean;
  /** El control de una entrada cuyo tipo no cabe en uno solo (el `label` de `siaf-badge` acepta texto o número). */
  tiposDeControl?: Readonly<Record<string, 'texto' | 'numero'>>;
}

const ESTADOS_DE_CAMPO = ['enabled', 'success', 'error'];

export const CONFIG_PLAYGROUND: Readonly<Record<string, ConfigPlayground>> = {
  // ── Acciones y campos ──
  'siaf-button': {
    controles: ['contenido', 'variant', 'size', 'icon', 'iconPosition', 'iconOnly', 'disabled', 'loading'],
    opciones: { variant: ['filled', 'outline', 'text'] },
    // Con ícono, para que se vean su posición y el modo de solo ícono.
    valores: { contenido: 'Guardar', icon: 'save' },
    ariaSoloIcono: true,
  },
  'siaf-buttons-group': {
    controles: ['iconOnly'],
    datos: {
      items: {
        tipo: 'ButtonGroupItem[]',
        valor: [
          { label: 'Día', value: 'dia', icon: 'calendar_view_day' },
          { label: 'Semana', value: 'semana', icon: 'calendar_view_week' },
          { label: 'Mes', value: 'mes', icon: 'calendar_month' },
        ],
      },
    },
    tipos: ['ButtonGroupItem'],
    valores: { value: 'semana', ariaLabel: 'Periodo' },
    enlace: { entrada: 'value', evento: 'valueChange', senal: 'periodo' },
  },
  'siaf-icon': {
    controles: ['name', 'variant', 'size'],
    valores: { name: 'favorite' },
  },
  'siaf-input': {
    // Sin placeholder (con label no se ve: el label hace de placeholder) ni clearable (es de los buscadores y solo se
    // ve con texto escrito, cuando el campo ya se pinta en éxito y «state» deja de notarse).
    controles: ['label', 'hint', 'type', 'leadingIcon', 'required', 'disabled', 'state', 'error'],
    opciones: { type: ['text', 'number', 'decimal', 'email', 'password'], state: ESTADOS_DE_CAMPO },
    valores: { label: 'Denominación', value: '' },
    enlace: { entrada: 'value', evento: 'valueChange', senal: 'denominacion', tipo: 'string | number | string[]' },
  },
  'text-area-control': {
    controles: ['title', 'placeholder', 'maxlength', 'required', 'disabled', 'state', 'error'],
    opciones: { state: ESTADOS_DE_CAMPO },
    valores: { title: 'Justificación', value: '' },
    enlace: { entrada: 'value', evento: 'valueChange', senal: 'justificacion' },
  },
  'siaf-checkbox': {
    controles: ['label', 'description', 'required', 'disabled'],
    valores: { label: 'Contraponer', checked: false },
    enlace: { entrada: 'checked', evento: 'checkedChange', senal: 'contraponer' },
  },
  'siaf-switch': {
    controles: ['label', 'disabled'],
    valores: { label: 'Mostrar inactivos', checked: false },
    enlace: { entrada: 'checked', evento: 'checkedChange', senal: 'mostrarInactivos' },
  },
  'siaf-radio-group': {
    controles: ['label', 'inline', 'required', 'disabled'],
    datos: {
      options: {
        tipo: 'RadioOption[]',
        valor: [
          { label: 'Sí', value: 'si' },
          { label: 'No', value: 'no' },
        ],
      },
    },
    tipos: ['RadioOption'],
    valores: { label: '¿Desea crear una copia de una configuración existente?', name: 'copia', value: 'si' },
    enlace: { entrada: 'value', evento: 'valueChange', senal: 'copia' },
  },
  'siaf-date-time-picker': {
    // Con la fecha de hoy, para que se vea el formato de «variant» (fecha o fecha y hora). Sin «state»: con fecha el
    // campo ya se pinta en éxito, y el error lo muestra «error».
    controles: ['label', 'hint', 'variant', 'required', 'disabled', 'error'],
    valores: { label: 'Fecha de inicio', value: '' },
    enlace: { entrada: 'value', evento: 'valueChange', senal: 'fechaInicio' },
  },

  // ── Estado y feedback ──
  'siaf-status-tag': {
    controles: ['contenido', 'appearance', 'tone', 'size', 'icon'],
    valores: { contenido: 'Aprobado', tone: 'success' },
  },
  'siaf-tag': {
    controles: ['contenido', 'variant', 'size', 'icon', 'selected', 'removable', 'disabled'],
    valores: { contenido: 'Elaborado' },
  },
  'siaf-badge': {
    controles: ['label', 'color', 'size', 'max'],
    tiposDeControl: { label: 'numero' },
    valores: { label: 8, ariaLabel: '8 notificaciones' },
  },
  'siaf-alert': {
    controles: ['title', 'description', 'tone', 'leadingIcon', 'showClose'],
    valores: { title: 'Documento registrado', description: 'La solicitud quedó en estado Elaborado.', tone: 'success' },
  },
  'siaf-snackbar': {
    controles: ['message', 'actionLabel', 'tone', 'dismissible'],
    valores: { message: 'Los cambios se guardaron correctamente.' },
  },
  'message-box': {
    controles: ['text'],
    valores: { text: 'No se ha seleccionado ninguna cuenta contable.' },
  },
  'siaf-empty-state': {
    controles: ['title', 'description', 'actionLabel', 'illustration', 'actionIcon'],
    // Con acción, para que se vea su ícono.
    valores: { title: 'Sin resultados', description: 'Ningún documento coincide con los filtros aplicados.', actionLabel: 'Limpiar filtros' },
  },
  'siaf-loader': {
    controles: ['label', 'tone', 'size'],
  },
  'siaf-loading-progress': {
    // Como barra: el avance solo se ve ahí. Sin label, que solo lee el lector de pantalla, ni el tamaño del spinner.
    controles: ['value', 'variant'],
    valores: { variant: 'bar' },
  },
  'siaf-progress-circular': {
    controles: ['label', 'value', 'size'],
    valores: { value: 65, label: 'Avance' },
  },

  // ── Superficies y navegación ──
  'siaf-card': {
    controles: ['title', 'description', 'contenido'],
    valores: { contenido: 'Contenido de la tarjeta.', title: 'Configuración del período', description: 'Apertura del ejercicio 2026' },
  },
  'siaf-kpi-card': {
    controles: ['title', 'amount', 'progressLabel', 'progress', 'tone', 'icon'],
    valores: { title: 'Recaudación', amount: 'S/ 1,250,000', tone: 'success', progress: 72, progressLabel: '72 % de la meta' },
  },
  'siaf-desk-card': {
    controles: ['title', 'value', 'variant', 'tone', 'icon', 'interactive'],
    valores: { title: 'Documentos por aprobar', icon: 'inbox', variant: 'counter', value: 12 },
  },
  'siaf-divider': {
    controles: ['variant', 'orientation'],
  },
  'siaf-tabs': {
    controles: ['border', 'fullWidth'],
    datos: {
      tabs: {
        tipo: 'TabItem[]',
        valor: [
          { id: 'documentos', label: 'Documentos', count: 12 },
          { id: 'registros', label: 'Registros', count: 4 },
          { id: 'borradores', label: 'Borradores' },
        ],
      },
    },
    tipos: ['TabItem'],
    valores: { activeId: 'documentos', ariaLabel: 'Bandeja' },
    enlace: { entrada: 'activeId', evento: 'activeIdChange', senal: 'pestana' },
  },
  'siaf-steps': {
    controles: ['variant', 'orientation', 'size'],
    datos: {
      steps: {
        tipo: 'StepItem[]',
        valor: [
          { label: 'Orden de compra', description: 'Aprobada' },
          { label: 'Nota de ingreso', description: 'En curso' },
          { label: 'Contabilización' },
        ],
      },
    },
    tipos: ['StepItem'],
    // En vertical: el tamaño solo cambia el círculo de ese modo.
    valores: { activeStep: 2, orientation: 'vertical' },
    enlace: { entrada: 'activeStep', evento: 'activeStepChange', senal: 'paso' },
  },
  'siaf-pagination': {
    // Abajo con «filas por página» (las dos van juntas) y con varias páginas, para que se note «navigation».
    controles: ['totalItems', 'position', 'navigation', 'rowPage'],
    valores: { position: 'Bottom', rowPage: true, totalPages: 80 },
  },
};
