import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import type { Chat } from '@hashbrownai/core';
import {
  MagicText,
  RenderMessageComponent,
  chatResource,
} from '@hashbrownai/angular';

import { ChatDrawerService } from '../../services/chat-drawer.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MagicText, RenderMessageComponent],
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

  readonly chat = chatResource({
    debugName: 'website-chat',
    model: 'gemini-3-flash-preview',
    system:
      'You are NgStore customer support: concise, friendly, and accurate about products, shipping, and orders.',
  });

  close(): void {
    this.chatDrawer.close();
  }

  send(): void {
    const text = this.draft().trim();
    if (!text) {
      return;
    }
    this.chat.sendMessage({ role: 'user', content: text });
    this.draft.set('');
  }

  onComposerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  /** Plain string for user bubbles and `hb-magic-text`. */
  userDisplayText(message: Chat.UserMessage): string {
    const c = message.content;
    if (c == null) {
      return '';
    }
    return typeof c === 'string' ? c : JSON.stringify(c);
  }

  /** `hb-render-message` only when the model returned generative UI (`content.ui`). */
  isUiAssistantContent(
    message: Chat.AssistantMessage<string, Chat.AnyTool>,
  ): boolean {
    const c = message.content;
    return (
      typeof c === 'object' &&
      c !== null &&
      'ui' in c &&
      Array.isArray((c as { ui: unknown }).ui)
    );
  }

  assistantMagicText(
    message: Chat.AssistantMessage<string, Chat.AnyTool>,
  ): string {
    const c = message.content;
    if (c == null || c === '') {
      return '';
    }
    if (typeof c === 'string') {
      return c;
    }
    return JSON.stringify(c);
  }
}
