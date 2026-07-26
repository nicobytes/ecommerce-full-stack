import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { JsonResolvedValue } from '@hashbrownai/core';

@Component({
  selector: 'app-chat-category-list-fallback',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <div class="w-full max-w-full p-1" aria-hidden="true">
      <div class="grid grid-cols-3 gap-3 pt-1 pb-2">
        @for (_ of skeletons; track $index) {
          <div
            class="card card-compact bg-base-100 border border-base-content/10 shadow-sm animate-pulse"
          >
            <figure class="relative px-3 pt-3">
              <div class="aspect-square w-full rounded-xl bg-base-300"></div>
            </figure>
            <div class="card-body gap-2 pt-2 pb-3 px-3">
              <div class="h-3 w-3/4 rounded bg-base-300"></div>
              <div class="h-6 w-full rounded bg-base-300 mt-2"></div>
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
