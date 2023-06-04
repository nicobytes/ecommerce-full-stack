import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { User } from '@models/auth.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  user: User | null = null;
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(AuthService);
  private router = inject(Router);

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
  }

  change() {
    this.authService.setAuthState({
      ...this.user as User,
      name: `Nico ${this.getRandomInt(10, 90)}`
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

}
