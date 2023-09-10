import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';


import { ProductsRoutingModule } from './products-routing.module';
import { TableComponent } from './pages/table/table.component';


@NgModule({
    imports: [
    CommonModule,
    ProductsRoutingModule,
    NgOptimizedImage,
    TableComponent
]
})
export class ProductsModule { }
