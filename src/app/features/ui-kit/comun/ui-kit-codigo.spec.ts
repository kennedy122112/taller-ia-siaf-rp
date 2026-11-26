import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiKitCodigoComponent } from '../ui-kit-codigo.component';

describe('siaf-ui-kit-codigo (el editor del catálogo)', () => {
  let fixture: ComponentFixture<UiKitCodigoComponent>;
  const el = (): HTMLElement => fixture.nativeElement;

  const montar = (entradas: Record<string, unknown>): void => {
    fixture = TestBed.createComponent(UiKitCodigoComponent);
    for (const [nombre, valor] of Object.entries(entradas)) fixture.componentRef.setInput(nombre, valor);
    fixture.detectChanges();
  };

  it('pinta la pestaña con el archivo, una línea numerada por línea y cada trozo con su color', () => {
    montar({ archivo: 'ejemplo.component.html', codigo: '<siaf-button\n  variant="outline"\n/>' });
    expect(el().querySelector('[data-ui-kit-editor]')?.getAttribute('data-ui-kit-editor')).toBe('html');
    expect(el().textContent).toContain('ejemplo.component.html');
    const lineas = Array.from(el().querySelectorAll<HTMLElement>('[data-n]'));
    expect(lineas.map((l) => l.dataset['n'])).toEqual(['1', '2', '3']);
    const codigo = el().querySelector('[data-ui-kit-codigo]')!;
    expect(codigo.querySelector('.text-code-tag')?.textContent).toBe('siaf-button');
    expect(codigo.querySelector('.text-code-string')?.textContent).toBe('"outline"');
    // Los números van en un ::before: el texto del bloque es solo el código.
    expect(el().querySelector('[data-ui-kit-codigo]')?.textContent).toBe('<siaf-button  variant="outline"/>');
  });

  it('en un diff marca lo que se quita y lo que se agrega, y copia la versión nueva', async () => {
    montar({ archivo: 'pantalla.ts', modo: 'diff', codigo: '- const a = tabs.activeId;\n+ const a = tabs.activeId();\n  usar(a);' });
    const lineas = Array.from(el().querySelectorAll<HTMLElement>('[data-linea]'));
    expect(lineas.map((l) => [l.dataset['linea'], l.dataset['n']])).toEqual([
      ['quita', '−'],
      ['agrega', '+'],
      ['igual', ' '],
    ]);
    expect(lineas[0].classList).toContain('bg-code-diff-removed');
    expect(lineas[1].textContent).toBe('const a = tabs.activeId();');
    const escribir = spyOn(navigator.clipboard, 'writeText').and.resolveTo();
    await fixture.componentInstance.copiar();
    expect(escribir).toHaveBeenCalledWith('const a = tabs.activeId();\nusar(a);');
  });

  it('con estado, la pestaña dice «Así no» o «Así sí»', () => {
    montar({ archivo: 'Así no', estado: 'incorrecto', lenguajeDelCodigo: 'html', codigo: '<siaf-tag>x</siaf-tag>' });
    expect(el().querySelector('[data-ui-kit-estado]')?.textContent).toBe('Así no');
    expect(el().querySelector('[data-ui-kit-codigo] .text-code-tag')?.textContent).toBe('siaf-tag');
  });
});
