import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgOptimizedImage],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export default class GalleryComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.productsService.getProducts()
    .subscribe((products) => {
      this.products = products;
    })
  }
}
