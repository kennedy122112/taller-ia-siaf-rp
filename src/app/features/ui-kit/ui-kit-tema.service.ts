import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

import { aplicarTema, leerTemaGuardado, TemaApp } from '@kennedy122112/siaf-rp-ui-angular';

/**
 * Tema del catálogo, compartido entre el armazón (que lo cambia) y las páginas: los marcos de escritorio y móvil de una
 * ficha cargan su iframe con él. Guarda la misma preferencia que la app.
 */
@Injectable({ providedIn: 'root' })
export class UiKitTemaService {
  private readonly documento = inject(DOCUMENT);
  private readonly actual = signal<TemaApp>(leerTemaGuardado());
  readonly tema = this.actual.asReadonly();

  aplicar(): void {
    aplicarTema(this.documento, this.actual());
  }

  alternar(): void {
    this.actual.set(this.actual() === 'dark' ? 'light' : 'dark');
    this.aplicar();
  }
}
