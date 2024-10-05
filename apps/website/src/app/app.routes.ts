import type { Routes } from '@angular/router';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent } from '@shared/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./domains/products/pages/list/list.component'),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import(
            './domains/products/pages/product-detail/product-detail.component'
          ),
      },
      {
        path: 'locations',
        loadComponent: () =>
          import(
            './domains/locations/locations.component'
          ),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
