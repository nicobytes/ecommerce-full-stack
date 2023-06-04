import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuardFn } from '@guards/auth-fn.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    canActivate: [authGuardFn],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
