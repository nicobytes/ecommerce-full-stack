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
  type StructuredChatResourceRef,
  uiChatResource,
  type UiAssistantMessage,
  type UiChatResourceRef,
  type UiChatSchema,
} from '@hashbrownai/angular';

import { ChatDrawerService } from '../../services/chat-drawer.service';
import { NGSTORE_CHAT_SYSTEM_PROMPT } from './prompt';
import { getProductsTool } from './tools/get_products.tool';
import { AiMarkdown } from './ui/ai-markdown';
import { AiChatProductListComponent } from './ui/chat-product-list.component';

/** Actual runtime merges structured chat refs; typings omit loading helpers (see `@hashbrownai/angular`). */
type UiChatRuntimeRef = UiChatResourceRef<Chat.AnyTool> &
  Pick<
    StructuredChatResourceRef<UiChatSchema, Chat.AnyTool>,
    | 'isLoading'
    | 'isSending'
    | 'isGenerating'
    | 'isReceiving'
    | 'isRunningToolCalls'
    | 'isLoadingThread'
    | 'isSavingThread'
    | 'threadLoadError'
    | 'threadSaveError'
    | 'sendingError'
    | 'generatingError'
    | 'reload'
  >;

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MagicText, RenderMessageComponent],
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex min-h-0 h-dvh w-full max-w-2xl flex-col self-stretch bg-base-200 border-l border-base-content/10 overflow-hidden shadow-xl relative z-10',
    role: 'complementary',
    'aria-labelledby': 'chat-drawer-title',
  },
})
export class ChatComponent {
  private readonly chatDrawer = inject(ChatDrawerService);

  readonly draft = signal('');

  readonly chat = uiChatResource({
    model: 'gpt-5.5-2026-04-23',
    system: NGSTORE_CHAT_SYSTEM_PROMPT,
    tools: [getProductsTool],
    components: [AiMarkdown, AiChatProductListComponent],
  }) as UiChatRuntimeRef;

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

  stop(): void {
    this.chat.stop();
  }

  onComposerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!this.chat.isLoading()) {
        this.send();
      }
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
  isUiAssistantContent(message: UiAssistantMessage): boolean {
    const c = message.content;
    return (
      typeof c === 'object' &&
      c !== null &&
      'ui' in c &&
      Array.isArray((c as { ui: unknown }).ui)
    );
  }

  assistantMagicText(message: UiAssistantMessage): string {
    const c = message.content as unknown;
    if (c == null || c === '') {
      return '';
    }
    if (typeof c === 'string') {
      return c;
    }
    if (typeof c === 'object' && c !== null && 'ui' in c) {
      return '';
    }
    if (typeof c === 'object' && c !== null) {
      return JSON.stringify(c);
    }
    return '';
  }
}
