import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';

import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
})
export default class ListComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  readonly slug = input<string>();

  categoriesResource = rxResource({
    loader: () => this.categoryService.getAll(),
  });

  productsResource = rxResource({
    request: () => ({ category_slug: this.slug() }),
    loader: ({ request }) => this.productService.getProducts(request),
  });

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  resetCategories() {
    this.categoriesResource.set([]);
  }

  reloadCategories() {
    this.categoriesResource.reload();
  }

  reloadProducts() {
    this.productsResource.reload();
  }
}
