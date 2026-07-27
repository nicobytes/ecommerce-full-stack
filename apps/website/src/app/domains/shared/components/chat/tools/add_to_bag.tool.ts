import { inject } from '@angular/core';
import { createTool } from '@hashbrownai/angular';
import { s } from '@hashbrownai/core';
import { ProductService } from '@store/data-access';
import { Product } from '@store/types';
import { lastValueFrom } from 'rxjs';

import { CartService } from '../../../services/cart.service';
import type { BagSnapshot } from './get_bag.tool';

export type AddToBagResult = BagSnapshot & {
  added: Product[];
  failedIds: number[];
};

export const addToBagTool = createTool({
  name: 'addToBag',
  description:
    'Add one or more catalog products to the shopper bag by product id. Use ids from a prior getProducts result. Prefer this when the shopper asks to add items, fill the bag, or build a set within a budget.',
  schema: s.object('Products to add to the bag', {
    productIds: s.array(
      'Catalog product ids from a prior getProducts result',
      s.number('Product id'),
    ),
  }),
  handler: async (
    input: { productIds: number[] },
    abortSignal?: AbortSignal,
  ): Promise<AddToBagResult> => {
    if (abortSignal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    const productService = inject(ProductService);
    const cartService = inject(CartService);
    const added: Product[] = [];
    const failedIds: number[] = [];

    for (const id of input.productIds) {
      if (abortSignal?.aborted) {
        throw new DOMException('Aborted', 'AbortError');
      }
      try {
        const product = await lastValueFrom(productService.getOne(id));
        cartService.addToCart(product);
        added.push(product);
      } catch {
        failedIds.push(id);
      }
    }

    return {
      added,
      failedIds,
      items: cartService.cart(),
      total: cartService.total(),
    };
  },
});
