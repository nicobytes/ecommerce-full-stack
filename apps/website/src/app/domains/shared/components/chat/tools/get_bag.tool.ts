import { inject } from '@angular/core';
import { createTool } from '@hashbrownai/angular';
import { Product } from '@store/types';

import { CartService } from '../../../services/cart.service';

export type BagSnapshot = {
  items: Product[];
  total: number;
};

export const getBagTool = createTool({
  name: 'getBag',
  description:
    'Get the shopper’s current bag (cart) contents and total from the storefront session',
  handler: async (abortSignal?: AbortSignal): Promise<BagSnapshot> => {
    if (abortSignal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }
    const cartService = inject(CartService);
    return {
      items: cartService.cart(),
      total: cartService.total(),
    };
  },
});
