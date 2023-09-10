import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
    imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutComponent
]
})
export class AdminModule { }
