import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/products/products.component')
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/form/form.component')
  }
];
