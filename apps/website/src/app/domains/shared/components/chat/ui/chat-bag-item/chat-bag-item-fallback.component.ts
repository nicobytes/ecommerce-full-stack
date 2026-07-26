import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { JsonResolvedValue } from '@hashbrownai/core';

@Component({
  selector: 'app-chat-bag-item-fallback',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <div
      class="flex items-center gap-3 py-3 animate-pulse"
      aria-hidden="true"
    >
      <div class="h-14 w-14 shrink-0 rounded-xl bg-base-300"></div>
      <div class="flex-1 min-w-0 space-y-2">
        <div class="h-3 w-2/3 rounded bg-base-300"></div>
        <div class="h-3 w-1/4 rounded bg-base-300"></div>
      </div>
    </div>
  `,
  host: {
    class: 'block w-full',
  },
})
export class ChatBagItemFallbackComponent {
  readonly partialProps = input.required<Record<string, JsonResolvedValue>>();
}
