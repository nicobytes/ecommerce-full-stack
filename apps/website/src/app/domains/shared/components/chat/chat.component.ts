import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';

import { ChatDrawerService } from '../../services/chat-drawer.service';
import { CHAT_MOCK_MESSAGES } from './chat.mock';
import { ChatMessage } from './chat.types';

function nextMessageId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `msg-${Date.now()}`;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'min-h-full w-full max-w-sm bg-base-200 border-l border-base-content/10 flex flex-col shadow-xl',
    role: 'complementary',
    'aria-labelledby': 'chat-drawer-title',
  },
})
export class ChatComponent {
  private readonly chatDrawer = inject(ChatDrawerService);

  readonly draft = signal('');
  readonly messages = signal<ChatMessage[]>([...CHAT_MOCK_MESSAGES]);

  close(): void {
    this.chatDrawer.close();
  }

  chatBubbleClasses(message: ChatMessage): string {
    const tone = message.bubbleTone;
    return tone ? `chat-bubble chat-bubble-${tone}` : 'chat-bubble';
  }

  send(): void {
    const text = this.draft().trim();
    if (!text) {
      return;
    }

    const userMsg: ChatMessage = {
      id: nextMessageId(),
      placement: 'end',
      authorName: 'You',
      timeLabel: 'Just now',
      text,
      footer: 'Sent',
      avatarInitials: 'YO',
      bubbleTone: 'info',
    };

    this.messages.update((list) => [...list, userMsg]);
    this.draft.set('');

    const replyId = nextMessageId();
    globalThis.setTimeout(() => {
      this.messages.update((list) => [
        ...list,
        {
          id: replyId,
          placement: 'start',
          authorName: 'NgStore',
          timeLabel: 'Just now',
          text:
            'Thanks for your message — a teammate will follow up shortly. This is a demo reply.',
          footer: 'Delivered',
          avatarInitials: 'NG',
          bubbleTone: 'neutral',
        },
      ]);
    }, 500);
  }

  onComposerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }
}
