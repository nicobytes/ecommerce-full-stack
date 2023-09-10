import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        MaterialModule,
        LayoutComponent
    ]
})
export class AdminModule { }
