import { Routes } from '@angular/router';
import { authGuardFn } from '@guards/auth-fn.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    canActivate: [authGuardFn],
    loadChildren: () => import('./modules/admin/admin.routes').then(m => m.routes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.routes),
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
