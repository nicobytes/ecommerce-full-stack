import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
