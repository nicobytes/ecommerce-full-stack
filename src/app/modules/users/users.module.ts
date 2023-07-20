import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

import { MaterialModule } from '@material/material.module';
import { UsersRoutingModule } from './users-routing.module';

import { TableComponent } from './pages/table/table.component';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    NgOptimizedImage
  ]
})
export class UsersModule { }
