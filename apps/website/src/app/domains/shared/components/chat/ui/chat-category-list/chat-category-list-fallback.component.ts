import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { JsonResolvedValue } from '@hashbrownai/core';

@Component({
  selector: 'app-chat-category-list-fallback',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <div
      class="w-80 max-w-full px-3 py-2 rounded-xl border border-base-content/10 bg-base-100"
      aria-hidden="true"
    >
      <div class="flex flex-col divide-y divide-base-content/5">
        @for (_ of skeletons; track $index) {
          <div class="flex items-center gap-3.5 py-3.5 px-1.5 animate-pulse">
            <div class="h-14 w-14 shrink-0 rounded-xl bg-base-300"></div>
            <div class="flex-1 min-w-0 space-y-2">
              <div class="h-3 w-2/3 rounded bg-base-300"></div>
              <div class="h-3 w-1/4 rounded bg-base-300"></div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class ChatCategoryListFallbackComponent {
  readonly partialProps = input.required<Record<string, JsonResolvedValue>>();
  readonly skeletons = [0, 1, 2];
}
