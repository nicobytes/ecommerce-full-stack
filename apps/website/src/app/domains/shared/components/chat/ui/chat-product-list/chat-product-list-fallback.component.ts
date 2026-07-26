import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { JsonResolvedValue } from '@hashbrownai/core';

@Component({
  selector: 'app-chat-product-list-fallback',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <div class="relative w-full max-w-full pt-0.5" aria-hidden="true">
      <div
        class="flex gap-3.5 overflow-hidden pb-1 *:w-[calc((100%-1.75rem)/3)] *:shrink-0"
      >
        @for (_ of skeletons; track $index) {
          <div
            class="card card-compact bg-base-100 border border-base-content/10 shadow-sm animate-pulse"
          >
            <figure class="relative px-3 pt-3">
              <div class="aspect-3/4 w-full rounded-xl bg-base-300"></div>
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
export class ChatProductListFallbackComponent {
  readonly partialProps = input.required<Record<string, JsonResolvedValue>>();
  readonly skeletons = [0, 1, 2];
}
