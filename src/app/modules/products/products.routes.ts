import { Routes } from '@angular/router';
import { TableComponent } from './pages/table/table.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
  {
    path: '',
    component: TableComponent,
  },
  {
    path: ':id',
    component: FormComponent,
  }
];
