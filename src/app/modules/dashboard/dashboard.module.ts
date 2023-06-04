import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './pages/dashboard.component';
import { MaterialModule } from '@material/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
