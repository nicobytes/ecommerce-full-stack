import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS   } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';

import { TokenInterceptor } from './interceptors/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
