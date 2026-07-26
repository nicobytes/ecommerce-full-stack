import { inject } from '@angular/core';
import { createTool } from '@hashbrownai/angular';
import { CategoryService } from '@store/data-access';
import { Category } from '@store/types';
import { lastValueFrom } from 'rxjs';

export const getCategoriesTool = createTool({
  name: 'getCategories',
  description: 'Get all product categories from the store catalog',
  handler: async (abortSignal?: AbortSignal): Promise<Category[]> => {
    if (abortSignal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }
    const categoryService = inject(CategoryService);
    return await lastValueFrom(categoryService.getAll());
  },
});
