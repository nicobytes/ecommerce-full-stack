import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { exposeComponent } from '@hashbrownai/angular';
import { s } from '@hashbrownai/core';

import { ChatDrawerService } from '../../../services/chat-drawer.service';

@Component({
  selector: 'app-chat-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  templateUrl: './chat-product-card.component.html',
  host: {
    class: 'block w-full',
  },
})
export class ChatProductCardComponent {
  private readonly chatDrawer = inject(ChatDrawerService);

  readonly title = input.required<string>();
  readonly price = input.required<number>();
  readonly description = input<string>('');
  readonly imageUrl = input<string>('');
  readonly categoryName = input<string>('');
  readonly slug = input<string>('');

  readonly descriptionSnippet = computed(() => this.description().trim());

  closeDrawer(): void {
    this.chatDrawer.close();
  }
}

export const AiChatProductCardComponent = exposeComponent(
  ChatProductCardComponent,
  {
    description:
      'Compact DaisyUI card for one catalog product — image, title, price, optional category/description, View link when slug exists.',
    input: {
      title: s.string('Product title from catalog'),
      price: s.number('Unit price number from catalog'),
      description: s.string(
        'Optional product description excerpt for the card',
      ),
      imageUrl: s.string(
        'Primary image URL: first entry of images[] or empty string',
      ),
      categoryName: s.string(
        'Category display name from product.category.name or empty',
      ),
      slug: s.string('URL slug for /product/{slug}; empty string if unknown'),
    },
  },
);
