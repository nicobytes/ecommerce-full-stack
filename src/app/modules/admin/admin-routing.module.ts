import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./../dashboard/dashboard.module').then(m => m.DashboardModule),
        title: 'App - Dashboard'
      },
      {
        path: 'products',
        loadChildren: () => import('./../products/products.module').then(m => m.ProductsModule),
        title: 'App - Products'
      },
      {
        path: 'categories',
        loadChildren: () => import('./../categories/categories.module').then(m => m.CategoriesModule),
        title: 'App - Categories'
      },
      {
        path: 'users',
        loadChildren: () => import('./../users/users.module').then(m => m.UsersModule),
        title: 'App - Users'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
