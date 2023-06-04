import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@material/material.module';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
