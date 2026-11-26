import { PRIMEROS_PASOS, filtrarPrimerosPasos } from './primeros-pasos/primeros-pasos';
import { buscarEnCatalogo } from './ui-kit.busqueda';

describe('Búsqueda global del catálogo (Ctrl+K)', () => {
  it('sin consulta ofrece las páginas de «Primeros pasos» y los fundamentos', () => {
    const resultados = buscarEnCatalogo('');
    expect(resultados.slice(0, PRIMEROS_PASOS.length).map((r) => r.titulo)).toEqual(['Instalación', 'Uso', 'Convenciones', 'Versiones']);
    expect(resultados.some((r) => r.tipo === 'fundamento' && r.titulo === 'Color')).toBeTrue();
    expect(resultados.some((r) => r.tipo === 'componente')).toBeFalse();
  });

  it('una propiedad lleva a la sección API de su componente', () => {
    const [primero] = buscarEnCatalogo('iconOnly');
    expect(primero).toEqual({ tipo: 'entrada', titulo: 'iconOnly', detalle: 'Entrada de siaf-button', ruta: '/ui-kit/componentes/siaf-button', fragmento: 'siaf-button-api' });
  });

  it('un evento se busca sin paréntesis y se muestra con ellos', () => {
    const evento = buscarEnCatalogo('activeIdChange').find((r) => r.tipo === 'evento');
    expect(evento?.titulo).toBe('(activeIdChange)');
    expect(evento?.fragmento).toBe('siaf-tabs-api');
  });

  it('un componente se encuentra por su nombre o su selector, y primero lo que empieza con la consulta', () => {
    expect(buscarEnCatalogo('button')[0]).toEqual(jasmine.objectContaining({ tipo: 'componente', titulo: 'Button', ruta: '/ui-kit/componentes/siaf-button' }));
    expect(buscarEnCatalogo('siaf-tabs')[0]).toEqual(jasmine.objectContaining({ tipo: 'componente', detalle: 'siaf-tabs' }));
  });

  it('las secciones de «Primeros pasos» llevan a su ancla, sin distinguir tildes ni mayúsculas', () => {
    const tailwind = buscarEnCatalogo('TAILWIND').find((r) => r.fragmento === 'tailwind');
    expect(tailwind).toEqual(jasmine.objectContaining({ tipo: 'pagina', ruta: '/ui-kit/primeros-pasos/instalacion', detalle: 'Primeros pasos › Instalación' }));
    expect(buscarEnCatalogo('instalacion')[0].titulo).toBe('Instalación');
  });

  it('corta en el máximo y sin coincidencias no devuelve nada', () => {
    expect(buscarEnCatalogo('a', 5).length).toBe(5);
    expect(buscarEnCatalogo('zzz-no-existe')).toEqual([]);
  });

  it('el menú lateral filtra «Primeros pasos» por título o palabra clave', () => {
    expect(filtrarPrimerosPasos('').length).toBe(4);
    expect(filtrarPrimerosPasos('npm').map((p) => p.id)).toEqual(['instalacion']);
    expect(filtrarPrimerosPasos('migrar').map((p) => p.id)).toEqual(['versiones']);
  });
});
