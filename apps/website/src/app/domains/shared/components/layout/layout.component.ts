import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterModule, RouterLinkWithHref } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, RouterModule, RouterLinkWithHref],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
