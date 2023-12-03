import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { FormComponent } from './pages/form/form.component';


export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: ':id',
    component: FormComponent
  }
];
