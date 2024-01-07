import { Component, OnInit, inject, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { UIService } from '@services/ui.service';
import { User } from '@models/user.model';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    standalone: true,
    imports: [MatSidenavModule, MatListModule, MatIconModule, MatDividerModule, RouterLink, RouterOutlet, AsyncPipe]
})
export class LayoutComponent implements OnInit {

  user: User | null = null;
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(AuthService);
  private router = inject(Router);
  private uiService = inject(UIService);
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
      tap((result) => this.uiService.setDrawerState(result === false) )
    );

  ngOnInit() {
    this.authService.getProfile()
    .subscribe(user => {
      this.authService.setAuthState(user);
    });

    this.authService.authState$
    .subscribe(user => {
      this.user = user;
    });
    this.uiService.drawerState$.subscribe(state => {
      this.drawer.toggle(state);
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
