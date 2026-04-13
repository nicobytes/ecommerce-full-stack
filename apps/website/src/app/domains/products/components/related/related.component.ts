import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '@store/data-access';

@Component({
  selector: 'app-related',
  imports: [ProductComponent],
  templateUrl: './related.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedComponent {
  productService = inject(ProductService);
  slug = input.required<string>();

  relatedProducts = rxResource({
    params: () => ({
      slug: this.slug(),
    }),
    stream: ({ params }) => this.productService.getRelatedProducts(params.slug),
  });
}
