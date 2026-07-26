import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';
import { exposeComponent } from '@hashbrownai/angular';

import { AiChatProductCardComponent } from '../chat-product-card/chat-product-card.component';
import { ChatProductListFallbackComponent } from './chat-product-list-fallback.component';

@Component({
  selector: 'app-chat-product-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  templateUrl: './chat-product-list.component.html',
})
export class ChatProductListComponent {
  private readonly scroller =
    viewChild<ElementRef<HTMLElement>>('scroller');

  scrollByPage(direction: -1 | 1): void {
    const el = this.scroller()?.nativeElement;
    if (!el) {
      return;
    }
    el.scrollBy({ left: direction * el.clientWidth, behavior: 'smooth' });
  }
}

export const AiChatProductListComponent = exposeComponent(
  ChatProductListComponent,
  {
    description:
      'Horizontal 3-column product carousel after getProducts (scroll sideways for more). Wrap one or more app-chat-product-card elements as children.',
    fallback: ChatProductListFallbackComponent,
    input: {},
    children: [AiChatProductCardComponent],
  },
);
