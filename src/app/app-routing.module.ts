import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { FormComponent } from './pages/form/form.component';
import { AboutComponent } from './pages/about/about.component';
import { PicturesComponent } from './pages/pictures/pictures.component';

import { AuthGuard } from './guards/auth.guard';
import { authGuardFn } from './guards/auth-fn.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    canActivate: [authGuardFn],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'App - Dashboard'
      },
      {
        path: 'form',
        component: FormComponent,
        title: 'App - Form'
      },
      {
        path: 'gallery',
        loadComponent: () => import('./pages/gallery/gallery.component'), // standalone: true
        title: 'App - Gallery'
      },
      {
        path: 'pictures',
        component: PicturesComponent,
        title: 'App - Pictures'
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'App - About'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'App - Login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
