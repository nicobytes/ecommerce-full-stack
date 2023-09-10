import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  private drawerState = new BehaviorSubject<boolean>(true);
  drawerState$ = this.drawerState.asObservable();

  toggleDrawer() {
    const state = this.drawerState.getValue();
    if (state !== null) {
      this.drawerState.next(!state);
    }
  }
}
