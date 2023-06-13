import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

import { MaterialModule } from '@material/material.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductTableComponent } from './pages/product-table/product-table.component';


@NgModule({
  declarations: [
    ProductFormComponent,
    ProductTableComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    NgOptimizedImage
  ]
})
export class ProductsModule { }
