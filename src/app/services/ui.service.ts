import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { LoginRta, User } from '@models/auth.model';
import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  private drawerState = new BehaviorSubject<boolean>(true);
  drawerState$ = this.drawerState.asObservable();

  toggleDrawer() {
    const state = this.drawerState.getValue();
    this.drawerState.next(!state);
  }
}
