import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductComponent } from '@products/components/product/product.component';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-related',
  imports: [ProductComponent],
  templateUrl: './related.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedComponent {
  productService = inject(ProductService);
  $slug = input.required<string>({ alias: 'slug' });

  relatedProducts = rxResource({
    request: () => ({
      slug: this.$slug(),
    }),
    loader: ({ request }) =>
      this.productService.getRelatedProducts(request.slug),
  });
}
