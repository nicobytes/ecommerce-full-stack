import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  resource,
} from '@angular/core';

import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { ProductComponent } from '../../components/product/product.component';

import { Product } from '@store/types';
import { CartService } from '../../../shared/services/cart.service';
import { ProductService, CategoryService } from '@store/data-access';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  imports: [ProductComponent, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  readonly slug = input<string>();

  categoriesResource = resource({
    loader: () => this.categoryService.getAllPromise(),
  });

  productsResource = rxResource({
    params: () => {
      const slug = this.slug();
      return slug ? { categorySlug: slug } : {};
    },
    stream: ({ params }) => this.productService.getAll(params),
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
