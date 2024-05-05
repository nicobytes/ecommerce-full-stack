import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgOptimizedImage, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, NgOptimizedImage, CurrencyPipe, MatButtonModule, RouterLink],
  templateUrl: './list.component.html'
})
export class ListComponent {
  @Input({required: true }) products: Product[] = [];

}
