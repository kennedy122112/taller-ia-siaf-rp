import { Location } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { UiKitBuscadorComponent } from './ui-kit-buscador.component';
import { UiKitContenidoComponent } from './ui-kit-contenido.component';
import { UiKitTextoComponent } from './ui-kit-texto.component';
import { UiKitTituloComponent } from './ui-kit-titulo.component';

describe('Piezas comunes del catálogo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  describe('siaf-ui-kit-titulo', () => {
    let fixture: ComponentFixture<UiKitTituloComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(UiKitTituloComponent);
      fixture.componentRef.setInput('ancla', 'siaf-tabs-api');
      fixture.componentRef.setInput('texto', 'API');
      fixture.detectChanges();
    });

    it('es un h2 con su ancla y un botón que dice qué enlace copia', () => {
      const el: HTMLElement = fixture.nativeElement;
      expect(el.querySelector('h2#siaf-tabs-api')?.textContent?.trim()).toBe('API');
      expect(el.querySelector('[data-ui-kit-copiar-enlace]')?.getAttribute('aria-label')).toBe('Copiar el enlace a «API»');
    });

    it('copia la dirección completa de la sección y la deja en la barra', async () => {
      const escribir = spyOn(navigator.clipboard, 'writeText').and.resolveTo();
      const location = TestBed.inject(Location);
      spyOn(location, 'path').and.returnValue('/ui-kit/componentes/siaf-tabs#siaf-tabs-uso');
      const reemplazar = spyOn(location, 'replaceState');
      await fixture.componentInstance.copiarEnlace();
      expect(escribir).toHaveBeenCalledWith(`${document.location.origin}/ui-kit/componentes/siaf-tabs#siaf-tabs-api`);
      expect(reemplazar).toHaveBeenCalledWith('/ui-kit/componentes/siaf-tabs#siaf-tabs-api');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('[data-ui-kit-copiar-enlace]')?.getAttribute('aria-label')).toBe('Enlace copiado');
    });
  });

  describe('siaf-ui-kit-contenido', () => {
    @Component({
      standalone: true,
      imports: [UiKitContenidoComponent],
      template: `
        <siaf-ui-kit-contenido [secciones]="secciones" />
        <h2 id="uno" style="height: 50px">Uno</h2>
        <h2 id="dos" style="height: 50px">Dos</h2>
      `,
    })
    class Anfitrion {
      readonly secciones = [
        { id: 'uno', titulo: 'Uno' },
        { id: 'dos', titulo: 'Dos' },
      ];
    }

    it('lista las secciones, marca la primera arriba de todo y al pulsar una la marca y deja su ancla en la barra', async () => {
      const fixture = TestBed.createComponent(Anfitrion);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      const enlaces = Array.from(el.querySelectorAll<HTMLAnchorElement>('[data-contenido]'));
      expect(enlaces.map((a) => a.textContent?.trim())).toEqual(['Uno', 'Dos']);

      const contenido = fixture.debugElement.children[0].componentInstance as UiKitContenidoComponent;
      contenido.seguir();
      fixture.detectChanges();
      expect(el.querySelector('[aria-current="location"]')?.getAttribute('data-contenido')).toBeTruthy();

      const reemplazar = spyOn(TestBed.inject(Location), 'replaceState');
      spyOn(Element.prototype, 'scrollIntoView');
      enlaces[1].click();
      fixture.detectChanges();
      expect(contenido.activa()).toBe('dos');
      expect(reemplazar).toHaveBeenCalledWith(jasmine.stringMatching(/#dos$/));
    });
  });

  describe('siaf-ui-kit-texto', () => {
    it('pinta código y negrita, y un código que nombra un componente enlaza a su página', () => {
      const fixture = TestBed.createComponent(UiKitTextoComponent);
      fixture.componentRef.setInput('texto', 'Usa `siaf-button` con **cuidado** y `npm install`.');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.querySelector('a')?.getAttribute('href')).toBe('/ui-kit/componentes/siaf-button');
      expect(el.querySelector('strong')?.textContent).toBe('cuidado');
      expect(el.querySelectorAll('code').length).toBe(2);
      expect(el.textContent).toBe('Usa siaf-button con cuidado y npm install.');
    });
  });

  describe('siaf-ui-kit-buscador', () => {
    @Component({
      standalone: true,
      imports: [UiKitBuscadorComponent],
      template: `<siaf-ui-kit-buscador [abierto]="abierto()" (cerrar)="abierto.set(false)" />`,
    })
    class Anfitrion {
      readonly abierto = signal(true);
    }

    let fixture: ComponentFixture<Anfitrion>;
    const el = (): HTMLElement => fixture.nativeElement;
    const campo = (): HTMLInputElement => el().querySelector('input[role="combobox"]')!;
    const teclear = (key: string): void => {
      campo().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
      fixture.detectChanges();
    };

    beforeEach(async () => {
      fixture = TestBed.createComponent(Anfitrion);
      document.body.appendChild(fixture.nativeElement);
      fixture.detectChanges();
      await fixture.whenStable();
    });

    afterEach(() => fixture.nativeElement.remove());

    it('es un diálogo modal con un combobox y su lista', () => {
      const dialogo = el().querySelector('[role="dialog"]')!;
      expect(dialogo.getAttribute('aria-modal')).toBe('true');
      expect(campo().getAttribute('aria-controls')).toBe('ui-kit-buscador-resultados');
      expect(el().querySelectorAll('[role="option"]').length).toBeGreaterThan(0);
    });

    it('busca al escribir, recorre con las flechas y abre el elegido con Enter', () => {
      const navegar = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
      campo().value = 'iconOnly';
      campo().dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const opciones = el().querySelectorAll('[role="option"]');
      expect(opciones[0].textContent).toContain('Entrada de siaf-button');
      expect(campo().getAttribute('aria-activedescendant')).toBe('ui-kit-resultado-0');

      teclear('ArrowDown');
      expect(campo().getAttribute('aria-activedescendant')).toBe('ui-kit-resultado-1');
      teclear('ArrowUp');
      teclear('Enter');
      expect(navegar).toHaveBeenCalledWith(['/ui-kit/componentes/siaf-button'], { fragment: 'siaf-button-api' });
      expect(fixture.componentInstance.abierto()).toBeFalse();
    });

    it('sin coincidencias lo dice', () => {
      campo().value = 'zzz-no-existe';
      campo().dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(el().textContent).toContain('Nada coincide con «zzz-no-existe»');
    });
  });
});
