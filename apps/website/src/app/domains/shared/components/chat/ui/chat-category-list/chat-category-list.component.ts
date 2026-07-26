import { ChangeDetectionStrategy, Component } from '@angular/core';
import { exposeComponent } from '@hashbrownai/angular';

import { AiChatCategoryCardComponent } from '../chat-category-card/chat-category-card.component';
import { ChatCategoryListFallbackComponent } from './chat-category-list-fallback.component';

@Component({
  selector: 'app-chat-category-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  templateUrl: './chat-category-list.component.html',
})
export class ChatCategoryListComponent {}

export const AiChatCategoryListComponent = exposeComponent(
  ChatCategoryListComponent,
  {
    description:
      'Vertical list of catalog categories after getCategories. Wrap one or more app-chat-category-card elements as children.',
    fallback: ChatCategoryListFallbackComponent,
    input: {},
    children: [AiChatCategoryCardComponent],
  },
);
