import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';


import { UsersRoutingModule } from './users-routing.module';

import { TableComponent } from './pages/table/table.component';

@NgModule({
    imports: [
    CommonModule,
    UsersRoutingModule,
    NgOptimizedImage,
    TableComponent
]
})
export class UsersModule { }
