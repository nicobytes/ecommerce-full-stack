import { inject } from '@angular/core';
import { createTool } from '@hashbrownai/angular';
import { ProductService } from '@store/data-access';
import { Product } from '@store/types';
import { lastValueFrom } from 'rxjs';

export const getProductsTool = createTool({
  name: 'getProducts',
  description: 'Get all products from the store catalog',
  handler: async (abortSignal?: AbortSignal): Promise<Product[]> => {
    if (abortSignal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }
    const productService = inject(ProductService);
    return await lastValueFrom(productService.getAll());
  },
});
