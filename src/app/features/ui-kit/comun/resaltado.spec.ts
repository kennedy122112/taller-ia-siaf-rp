import { Lenguaje, lenguajeDe, resaltar, tokenizar } from './resaltado';

const tipos = (codigo: string, lenguaje: Lenguaje): string[][] =>
  tokenizar(codigo, lenguaje)
    .filter((t) => t.texto.trim())
    .map((t) => [t.tipo, t.texto.trim()]);

describe('Resaltado de sintaxis del editor del catálogo', () => {
  it('elige el lenguaje por el nombre del archivo', () => {
    expect(lenguajeDe('ejemplo.component.html')).toBe('html');
    expect(lenguajeDe('ejemplo.component.ts')).toBe('ts');
    expect(lenguajeDe('src/styles.css')).toBe('css');
    expect(lenguajeDe('angular.json')).toBe('json');
    expect(lenguajeDe('terminal (repo del SIAF-RP)')).toBe('terminal');
    expect(lenguajeDe('Así no')).toBe('texto');
  });

  it('HTML de Angular: etiqueta, atributos con sus enlaces, valores y comentarios', () => {
    expect(tipos('<!-- nota -->\n<siaf-tabs [tabs]="tabs" (activeIdChange)="pestana.set($event)" ariaLabel="Bandeja" />', 'html')).toEqual([
      ['comentario', '<!-- nota -->'],
      ['puntuacion', '<'],
      ['etiqueta', 'siaf-tabs'],
      ['atributo', '[tabs]'],
      ['puntuacion', '='],
      ['cadena', '"tabs"'],
      ['atributo', '(activeIdChange)'],
      ['puntuacion', '='],
      ['cadena', '"pestana.set($event)"'],
      ['atributo', 'ariaLabel'],
      ['puntuacion', '='],
      ['cadena', '"Bandeja"'],
      ['puntuacion', '/>'],
    ]);
  });

  it('HTML: el texto entre etiquetas queda como texto y la etiqueta de cierre también se pinta', () => {
    expect(tipos('<siaf-button>Guardar</siaf-button>', 'html')).toEqual([
      ['puntuacion', '<'],
      ['etiqueta', 'siaf-button'],
      ['puntuacion', '>'],
      ['texto', 'Guardar'],
      ['puntuacion', '</'],
      ['etiqueta', 'siaf-button'],
      ['puntuacion', '>'],
    ]);
  });

  it('TypeScript: palabras de módulo y de declaración, tipos, decoradores, funciones, cadenas y comentarios', () => {
    const t = tipos("import { Component, signal } from '@angular/core';\n@Component({})\nexport class Ejemplo {\n  readonly n = signal(2); // dos\n}", 'ts');
    expect(t).toContain(['clave', 'import']);
    expect(t).toContain(['tipo', 'Component']);
    expect(t).toContain(['cadena', "'@angular/core'"]);
    expect(t).toContain(['funcion', '@Component']);
    expect(t).toContain(['etiqueta', 'class']);
    expect(t).toContain(['etiqueta', 'readonly']);
    expect(t).toContain(['funcion', 'signal']);
    expect(t).toContain(['numero', '2']);
    expect(t).toContain(['comentario', '// dos']);
  });

  it('JSON, CSS y terminal', () => {
    expect(tipos('{ "glob": "**/*", "n": 2 }', 'json')).toEqual([
      ['puntuacion', '{'],
      ['atributo', '"glob"'],
      ['puntuacion', ':'],
      ['cadena', '"**/*"'],
      ['puntuacion', ','],
      ['atributo', '"n"'],
      ['puntuacion', ':'],
      ['numero', '2'],
      ['puntuacion', '}'],
    ]);
    expect(tipos('@import "tailwindcss";', 'css')).toEqual([
      ['clave', '@import'],
      ['cadena', '"tailwindcss"'],
      ['puntuacion', ';'],
    ]);
    expect(tipos('npm install ./vendor/kit.tgz --save', 'terminal')).toEqual([
      ['funcion', 'npm'],
      ['texto', 'install ./vendor/kit.tgz'],
      ['atributo', '--save'],
    ]);
  });

  it('parte el resultado en líneas, también un comentario de varias líneas', () => {
    const lineas = resaltar('/* uno\ndos */\nconst x = 1;', 'ts');
    expect(lineas.length).toBe(3);
    expect(lineas[0]).toEqual([{ tipo: 'comentario', texto: '/* uno' }]);
    expect(lineas[1]).toEqual([{ tipo: 'comentario', texto: 'dos */' }]);
  });

  it('sin lenguaje conocido, todo es texto', () => {
    expect(tokenizar('<p>hola</p>', 'texto')).toEqual([{ tipo: 'texto', texto: '<p>hola</p>' }]);
  });
});
