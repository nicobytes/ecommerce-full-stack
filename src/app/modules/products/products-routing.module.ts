import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductTableComponent } from './pages/product-table/product-table.component';

const routes: Routes = [
  {
    path: '',
    component: ProductTableComponent,
  },
  {
    path: 'new',
    component: ProductFormComponent,
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
