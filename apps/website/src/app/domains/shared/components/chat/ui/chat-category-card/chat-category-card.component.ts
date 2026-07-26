import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { exposeComponent } from '@hashbrownai/angular';
import { s } from '@hashbrownai/core';

import { ChatDrawerService } from '../../../../services/chat-drawer.service';
import { ChatCategoryCardFallbackComponent } from './chat-category-card-fallback.component';

@Component({
  selector: 'app-chat-category-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  templateUrl: './chat-category-card.component.html',
  host: {
    class: 'block w-full',
  },
})
export class ChatCategoryCardComponent {
  private readonly chatDrawer = inject(ChatDrawerService);

  readonly name = input.required<string>();
  readonly imageUrl = input<string>('');
  readonly slug = input<string>('');

  closeDrawer(): void {
    this.chatDrawer.close();
  }
}

export const AiChatCategoryCardComponent = exposeComponent(
  ChatCategoryCardComponent,
  {
    description:
      'Compact DaisyUI card for one catalog category — image, name, Browse link when slug exists.',
    fallback: ChatCategoryCardFallbackComponent,
    input: {
      name: s.string('Category display name from catalog'),
      imageUrl: s.string('Category image URL or empty string'),
      slug: s.string('URL slug for /category/{slug}; empty string if unknown'),
    },
  },
);
