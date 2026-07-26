import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { exposeComponent } from '@hashbrownai/angular';
import { s } from '@hashbrownai/core';

import { AiChatBagItemComponent } from '../chat-bag-item/chat-bag-item.component';
import { ChatBagFallbackComponent } from './chat-bag-fallback.component';

@Component({
  selector: 'app-chat-bag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './chat-bag.component.html',
})
export class ChatBagComponent {
  readonly total = input.required<number>();
}

export const AiChatBagComponent = exposeComponent(ChatBagComponent, {
  description:
    'Shopper bag summary after getBag — vertical list of app-chat-bag-item children plus a Total footer. Pass total from the tool snapshot.',
  fallback: ChatBagFallbackComponent,
  input: {
    total: s.number('Bag total price from getBag snapshot'),
  },
  children: [AiChatBagItemComponent],
});
