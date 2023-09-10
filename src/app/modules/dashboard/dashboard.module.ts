import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './pages/dashboard.component';

import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
    imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardComponent
]
})
export class DashboardModule { }
