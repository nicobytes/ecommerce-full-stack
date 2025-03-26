import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}
