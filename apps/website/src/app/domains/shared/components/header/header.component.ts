import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  ConnectedPosition,
  CdkOverlayOrigin,
  CdkConnectedOverlay,
} from '@angular/cdk/overlay';

import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ChatDrawerService } from '../../services/chat-drawer.service';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterLinkWithHref,
    RouterLinkActive,
    SearchComponent,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    CurrencyPipe,
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  cartOpen = signal(false);
  showMenu = signal(false);
  private cartService = inject(CartService);
  readonly chatDrawer = inject(ChatDrawerService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  cartPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
  ];

  toggleCart() {
    this.cartOpen.update((prevState) => !prevState);
  }

  closeCart() {
    this.cartOpen.set(false);
  }

  toggleMenu() {
    this.showMenu.update((prevState) => !prevState);
  }
}
