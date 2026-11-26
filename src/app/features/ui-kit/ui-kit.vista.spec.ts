import { FichaComponente } from './ui-kit.model';
import { MANIFIESTO_UI_KIT } from './ui-kit.manifest';
import {
  MOTIVO_SESION,
  agrupar,
  bloquesDeDescripcion,
  filtrar,
  idDeSelector,
  nombreDeUso,
  rutaDeFicha,
  rutaDeFundamento,
  segmentar,
  snippetUso,
  tituloDeClase,
  urlDeNodoFigma,
  usuariosDe,
  vecinas,
} from './ui-kit.vista';

const ficha = (extra: Partial<FichaComponente>): FichaComponente => ({
  selector: 'siaf-x',
  clase: 'XComponent',
  tipo: 'componente',
  capa: 'ui',
  importacion: '@siaf/ui/x/x.component',
  archivo: 'src/app/shared/ui/x/x.component.ts',
  descripcion: '',
  usaSesion: false,
  proyectaContenido: false,
  entradas: [],
  eventos: [],
  usar: null,
  evitar: null,
  teclado: null,
  accesibilidad: null,
  limitaciones: null,
  incorrecto: null,
  correcto: null,
  waiAria: null,
  figma: [],
  aria: { roles: [], atributos: [] },
  tokens: [],
  usa: [],
  ...extra,
});

describe('ui-kit.vista', () => {
  describe('bloquesDeDescripcion', () => {
    it('separa párrafos, une las líneas y marca código y negrita', () => {
      const bloques = bloquesDeDescripcion('Primera línea\nsigue con `codigo` y **fuerte**.\n\nSegundo párrafo.');
      expect(bloques.length).toBe(2);
      expect(bloques[0]).toEqual({
        tipo: 'parrafo',
        segmentos: [
          { tipo: 'texto', texto: 'Primera línea sigue con ' },
          { tipo: 'codigo', texto: 'codigo' },
          { tipo: 'texto', texto: ' y ' },
          { tipo: 'negrita', texto: 'fuerte' },
          { tipo: 'texto', texto: '.' },
        ],
      });
    });

    it('reconoce listas numeradas y con viñetas, con líneas de continuación', () => {
      const [intro, lista] = bloquesDeDescripcion('Estados:\n1. **Idle** — chip neutro.\n2. **Selected** — al click\n   en la X limpia.');
      expect(intro.tipo).toBe('parrafo');
      expect(lista.tipo).toBe('lista');
      if (lista.tipo !== 'lista') return;
      expect(lista.ordenada).toBeTrue();
      expect(lista.items.length).toBe(2);
      expect(lista.items[1].map((s) => s.texto).join('')).toBe('Selected — al click en la X limpia.');
    });

    it('convierte en bloque de código tanto el triple backtick como un ejemplo con sangría', () => {
      const conFence = bloquesDeDescripcion('Uso:\n\n```html\n<td siafTooltip>\n\n<siaf-icon />\n```');
      expect(conFence[1]).toEqual({ tipo: 'codigo', texto: '<td siafTooltip>\n\n<siaf-icon />' });

      const conSangria = bloquesDeDescripcion('Ejemplo:\n\n  <siaf-page-shell>\n    <p>hola</p>\n  </siaf-page-shell>');
      expect(conSangria[1]).toEqual({ tipo: 'codigo', texto: '<siaf-page-shell>\n  <p>hola</p>\n</siaf-page-shell>' });
    });
  });

  it('segmentar ignora trozos vacíos', () => {
    expect(segmentar('`a`')).toEqual([{ tipo: 'codigo', texto: 'a' }]);
  });

  describe('snippetUso', () => {
    it('incluye solo las entradas obligatorias', () => {
      const f = ficha({ entradas: [
        { nombre: 'rows', tipo: 'T[]', porDefecto: null, requerida: true, descripcion: null },
        { nombre: 'dense', tipo: 'boolean', porDefecto: 'false', requerida: false, descripcion: null },
      ] });
      expect(snippetUso(f)).toBe('<siaf-x [rows]="…" />');
    });

    it('usa etiqueta de cierre si proyecta contenido y atributo si es directiva', () => {
      expect(snippetUso(ficha({ proyectaContenido: true }))).toBe('<siaf-x>…</siaf-x>');
      expect(snippetUso(ficha({ selector: '[siafTooltip]', tipo: 'directiva' }))).toBe('<span siafTooltip="…"></span>');
    });
  });

  it('nombreDeUso quita los corchetes de un selector de atributo y deja igual una etiqueta', () => {
    expect(nombreDeUso('[siafTooltip]')).toBe('siafTooltip');
    expect(nombreDeUso('siaf-button')).toBe('siaf-button');
    expect(agrupar(MANIFIESTO_UI_KIT)[0].fichas.find((f) => f.selector === '[siafTooltip]')?.nombre).toBe('siafTooltip');
  });

  it('idDeSelector deja un ancla válida para la URL', () => {
    expect(idDeSelector('[siafTooltip]')).toBe('siafTooltip');
    expect(idDeSelector('siaf-menu')).toBe('siaf-menu');
  });

  describe('usuariosDe («Lo usan»)', () => {
    const fichas = agrupar(MANIFIESTO_UI_KIT).flatMap((g) => g.fichas);
    const de = (selector: string) => fichas.find((f) => f.selector === selector)!;

    it('es la relación inversa de los componentes que pinta, ordenada por nombre', () => {
      expect(de('siaf-badge').usadoPor.map((u) => u.nombre)).toEqual(['siaf-list', 'siaf-navbar', 'siaf-tabs', 'siaf-tray-menu']);
      for (const f of fichas) {
        for (const usado of f.componentesUsados) {
          const hijo = fichas.find((x) => x.selector === usado.selector);
          if (hijo) expect(hijo.usadoPor.map((u) => u.selector)).withContext(`${f.selector} → ${usado.selector}`).toContain(f.selector);
        }
      }
    });

    it('incluye a los ocultos del catálogo sin ficha a la que enlazar', () => {
      expect(de('siaf-navbar').usadoPor).toEqual([{ selector: 'siaf-app-shell', nombre: 'siaf-app-shell', id: 'siaf-app-shell', enCatalogo: false }]);
      expect(de('siaf-badge').usadoPor.every((u) => u.enCatalogo)).toBeTrue();
    });

    it('un componente no se cuenta a sí mismo', () => {
      const propio = ficha({ selector: 'siaf-x', usa: ['siaf-x'] });
      expect(usuariosDe('siaf-x', [propio])).toEqual([]);
    });
  });

  describe('enlazarFichas', () => {
    const fichas = agrupar(MANIFIESTO_UI_KIT).flatMap((g) => g.fichas);
    const segmentosDe = (selector: string) => {
      const f = fichas.find((x) => x.selector === selector)!;
      return [f.bloques, f.bloquesUsar, f.bloquesEvitar, f.bloquesTeclado, f.bloquesAccesibilidad]
        .flat()
        .flatMap((b) => (b.tipo === 'parrafo' ? b.segmentos : b.tipo === 'lista' ? b.items.flat() : []));
    };

    it('el código que nombra otra ficha visible enlaza a ella: el buscador de tablas lleva a su variante', () => {
      const variante = segmentosDe('siaf-form-table-search').find((s) => s.texto === 'siaf-records-search-toolbar');
      expect(variante?.enlace).toBe('siaf-records-search-toolbar');
      const vuelta = segmentosDe('siaf-records-search-toolbar').find((s) => s.texto === 'siaf-form-table-search');
      expect(vuelta?.enlace).toBe('siaf-form-table-search');
    });

    it('una ficha no se enlaza consigo misma y el código que no es una ficha queda sin enlace', () => {
      const propios = segmentosDe('siaf-records-search-toolbar');
      expect(propios.filter((s) => s.enlace === 'siaf-records-search-toolbar')).toEqual([]);
      expect(propios.find((s) => s.texto === 'actions')?.enlace).toBeUndefined();
    });

    it('una directiva se enlaza por su nombre de uso, sin corchetes', () => {
      const directiva = fichas.find((f) => f.selector === '[siafTooltip]')!;
      const enlazados = fichas.flatMap((f) => segmentosDe(f.selector)).filter((s) => s.enlace === directiva.id);
      expect(enlazados.length).toBeGreaterThan(0);
    });
  });

  describe('páginas del catálogo', () => {
    it('el título sale de la clase, con las siglas intactas', () => {
      expect(tituloDeClase('ButtonComponent')).toBe('Button');
      expect(tituloDeClase('IconDropdownMenuComponent')).toBe('Icon dropdown menu');
      expect(tituloDeClase('TooltipDirective')).toBe('Tooltip');
      expect(tituloDeClase('KPICardComponent')).toBe('KPI card');
    });

    it('una ficha propia enlaza a su archivo en el repositorio del taller; todas, a su versión en Markdown', () => {
      const [grupo] = agrupar([ficha({ selector: 'siaf-x', archivo: 'src/app/layout/x/x.component.ts' })]);
      expect(grupo.fichas[0].enlaces).toEqual({
        codigoFuente: 'https://github.com/kennedy122112/taller-ia-siaf-rp/blob/main/src/app/layout/x/x.component.ts',
        editar: 'https://github.com/kennedy122112/taller-ia-siaf-rp/edit/main/src/app/layout/x/x.component.ts',
        markdown: '/ui-kit/componentes/siaf-x.md',
      });
    });

    it('una ficha del kit no enlaza a su código: viene del paquete instalado', () => {
      const [grupo] = agrupar([ficha({ selector: 'siaf-x', archivo: 'node_modules/@kennedy122112/siaf-rp-ui-angular/types/x.d.ts' })]);
      expect(grupo.fichas[0].enlaces).toEqual({ codigoFuente: null, editar: null, markdown: '/ui-kit/componentes/siaf-x.md' });
    });

    it('cada componente y cada fundamento tiene su ruta', () => {
      expect(rutaDeFicha('siaf-menu')).toBe('/ui-kit/componentes/siaf-menu');
      expect(rutaDeFundamento('color')).toBe('/ui-kit/fundamentos/color');
    });

    it('la anterior y la siguiente siguen el orden de la lista', () => {
      const lista = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
      expect(vecinas(lista, 'b')).toEqual({ anterior: { id: 'a' }, siguiente: { id: 'c' } });
      expect(vecinas(lista, 'a')).toEqual({ anterior: null, siguiente: { id: 'b' } });
      expect(vecinas(lista, 'z')).toEqual({ anterior: null, siguiente: null });
    });
  });

  describe('agrupar y filtrar', () => {
    const grupos = agrupar(MANIFIESTO_UI_KIT);

    it('respeta el orden de categorías y el curado dentro de cada una, sin las pantallas ocultas', () => {
      expect(grupos[0].categoria.titulo).toBe('Fundamentos');
      expect(grupos[0].fichas[0].categoria?.id).toBe('fundamentos');
      expect(grupos[0].fichas[0].titulo).toBe('Icon');
      expect(grupos[0].fichas[0].selector).toBe('siaf-icon');
      const todos = grupos.flatMap((g) => g.fichas.map((f) => f.selector));
      expect(todos).not.toContain('siaf-app-shell');
      expect(grupos.some((g) => g.categoria.titulo === 'Otros')).toBeFalse();
    });

    it('todas las fichas visibles tienen ejemplo y ninguna depende de la sesión: lo de la app llega por fuentes', () => {
      const fichas = grupos.flatMap((g) => g.fichas);
      expect(fichas.filter((f) => f.usaSesion).map((f) => f.selector)).toEqual([]);
      expect(fichas.filter((f) => !f.ejemplo).map((f) => f.selector)).toEqual([]);
    });

    it('sin ejemplo, un componente con sesión explica por qué', () => {
      const [grupo] = agrupar([{ ...MANIFIESTO_UI_KIT.find((f) => f.selector === 'siaf-app-shell')!, selector: 'siaf-armazon-futuro' }]);
      expect(grupo.fichas[0].motivoSinEjemplo).toBe(MOTIVO_SESION);
    });

    it('busca sin distinguir acentos ni mayúsculas, también en la descripción', () => {
      const porDescripcion = filtrar(grupos, 'BOTÓN BASE').flatMap((g) => g.fichas.map((f) => f.selector));
      expect(porDescripcion).toContain('siaf-button');
      expect(filtrar(grupos, 'icon dropdown').flatMap((g) => g.fichas.map((f) => f.selector))).toContain('siaf-icon-dropdown-menu');
      expect(filtrar(grupos, 'no-existe-nada')).toEqual([]);
      expect(filtrar(grupos, '   ').length).toBe(grupos.length);
    });
  });

  describe('secciones de la ficha', () => {
    const tabs = agrupar(MANIFIESTO_UI_KIT).flatMap((g) => g.fichas).find((f) => f.selector === 'siaf-tabs')!;

    it('Uso y Accesibilidad salen de @usar, @evitar, @teclado y @accesibilidad del JSDoc', () => {
      expect(tabs.bloquesUsar[0].tipo).toBe('lista');
      expect(tabs.bloquesEvitar.length).toBeGreaterThan(0);
      expect(tabs.bloquesTeclado.length).toBeGreaterThan(0);
      expect(tabs.bloquesAccesibilidad.length).toBeGreaterThan(0);
      // Las etiquetas no se mezclan con la descripción.
      expect(tabs.descripcion).not.toContain('@usar');
      expect(tabs.descripcion).not.toContain('Para alternar entre vistas');
    });

    it('Figma, composición y tokens: nodo del Figma con enlace, componentes que pinta y tokens con su valor', () => {
      expect(tabs.enlacesFigma).toEqual([{ nodo: '2588:135', nombre: 'Tabs content', url: urlDeNodoFigma('2588:135') }]);
      expect(urlDeNodoFigma('2588:135')).toBe('https://www.figma.com/design/mJrG11d0rWf7BjPuE2ApPZ/?node-id=2588-135');
      expect(tabs.componentesUsados.map((c) => c.selector)).toEqual(['siaf-badge']);

      const divider = tabs.tokensConValor.find((t) => t.token === '--sys-color-divider-strong')!;
      expect(divider.via).toEqual(['var()']);
      expect(divider.valor?.tipo).toBe('color');
      expect(divider.seccion).toBe('color');
      const espacio = tabs.tokensConValor.find((t) => t.token === '--sys-gap-base-md')!;
      expect(espacio.via).toContain('px-siaf-md');
      expect(espacio.valor).toEqual({ tipo: 'medida', claro: '16px', oscuro: null });
    });

    it('los «nodo 1234:567» de la descripción también cuentan como nodos del Figma', () => {
      const [grupo] = agrupar([ficha({ selector: 'siaf-tabs', figma: [{ nodo: '1264:580', nombre: null }] })]);
      expect(grupo.fichas[0].enlacesFigma[0].url).toContain('node-id=1264-580');
      const menu = MANIFIESTO_UI_KIT.find((f) => f.selector === 'siaf-menu')!;
      expect(menu.figma.map((n) => n.nodo)).toContain('7440:34249');
    });

    it('Accesibilidad lee roles y atributos ARIA del código', () => {
      expect(tabs.aria.roles).toEqual(['tab', 'tablist']);
      expect(tabs.aria.atributos).toContain('aria-selected');
    });
  });
});
