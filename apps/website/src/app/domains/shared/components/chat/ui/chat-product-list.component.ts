import { ChangeDetectionStrategy, Component } from '@angular/core';
import { exposeComponent } from '@hashbrownai/angular';

import { AiChatProductCardComponent } from './chat-product-card.component';
import { ChatProductListFallbackComponent } from './chat-product-list-fallback.component';

@Component({
  selector: 'app-chat-product-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  templateUrl: './chat-product-list.component.html',
})
export class ChatProductListComponent {}

export const AiChatProductListComponent = exposeComponent(
  ChatProductListComponent,
  {
    description:
      'Three-column grid for catalog products after getProducts (vertical scroll when many items). Wrap one or more app-chat-product-card elements as children.',
    fallback: ChatProductListFallbackComponent,
    input: {},
    children: [AiChatProductCardComponent],
  },
);
