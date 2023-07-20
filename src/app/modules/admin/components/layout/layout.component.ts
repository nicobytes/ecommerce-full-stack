import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { UIService } from '@services/ui.service';
import { User } from '@models/user.model';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  user: User | null = null;
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(AuthService);
  private router = inject(Router);
  private uiService = inject(UIService);
  @ViewChild('drawer') drawer!: MatDrawer;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
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
