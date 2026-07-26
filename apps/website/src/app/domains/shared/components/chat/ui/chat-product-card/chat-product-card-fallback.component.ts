import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { JsonResolvedValue } from '@hashbrownai/core';

@Component({
  selector: 'app-chat-product-card-fallback',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <div
      class="card card-compact bg-base-100 border border-base-content/10 shadow-sm h-full animate-pulse"
      aria-hidden="true"
    >
      <figure class="relative px-3 pt-3">
        <div class="aspect-3/4 w-full rounded-xl bg-base-300"></div>
      </figure>
      <div class="card-body gap-2 pt-2 pb-3 px-3 flex flex-col flex-1">
        <div class="h-3 w-3/4 rounded bg-base-300"></div>
        <div class="card-actions mt-auto">
          <div class="h-6 w-full rounded bg-base-300"></div>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'block w-full',
  },
})
export class ChatProductCardFallbackComponent {
  readonly partialProps = input.required<Record<string, JsonResolvedValue>>();
}
