import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { RouterModule, RouterLinkWithHref } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { HeaderComponent } from '../header/header.component';
import { ChatDrawerService } from '../../services/chat-drawer.service';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, ChatComponent, RouterModule, RouterLinkWithHref],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  readonly chatDrawer = inject(ChatDrawerService);
}
