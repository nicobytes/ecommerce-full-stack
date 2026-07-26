import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { exposeComponent } from '@hashbrownai/angular';
import { s } from '@hashbrownai/core';

import { ChatDrawerService } from '../../../../services/chat-drawer.service';
import { ChatBagItemFallbackComponent } from './chat-bag-item-fallback.component';

@Component({
  selector: 'app-chat-bag-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './chat-bag-item.component.html',
  host: {
    class: 'block w-full',
  },
})
export class ChatBagItemComponent {
  private readonly chatDrawer = inject(ChatDrawerService);

  readonly title = input.required<string>();
  readonly price = input.required<number>();
  readonly imageUrl = input<string>('');
  readonly slug = input<string>('');

  closeDrawer(): void {
    this.chatDrawer.close();
  }
}

export const AiChatBagItemComponent = exposeComponent(ChatBagItemComponent, {
  description:
    'One row in the shopper’s bag — thumbnail, title, price, optional product link when slug exists.',
  fallback: ChatBagItemFallbackComponent,
  input: {
    title: s.string('Product title from bag item'),
    price: s.number('Unit price number from bag item'),
    imageUrl: s.string(
      'Primary image URL: first entry of images[] or empty string',
    ),
    slug: s.string('URL slug for /product/{slug}; empty string if unknown'),
  },
});
