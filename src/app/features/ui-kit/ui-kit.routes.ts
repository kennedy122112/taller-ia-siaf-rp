import { Routes } from '@angular/router';

import { UiKitComponent } from './ui-kit.component';

/** Catálogo /ui-kit: el armazón con el menú lateral y una página por portada, fundamento y componente. */
export const UI_KIT_ROUTES: Routes = [
  {
    path: '',
    component: UiKitComponent,
    children: [
      { path: '', loadComponent: () => import('./paginas/ui-kit-inicio.component').then((m) => m.UiKitInicioComponent) },
      { path: 'primeros-pasos/:id', loadComponent: () => import('./paginas/ui-kit-primeros-pasos-pagina.component').then((m) => m.UiKitPrimerosPasosPaginaComponent) },
      { path: 'fundamentos/:id', loadComponent: () => import('./paginas/ui-kit-fundamento-pagina.component').then((m) => m.UiKitFundamentoPaginaComponent) },
      { path: 'componentes/:id', loadComponent: () => import('./paginas/ui-kit-componente-pagina.component').then((m) => m.UiKitComponentePaginaComponent) },
      { path: '**', redirectTo: '' },
    ],
  },
];
