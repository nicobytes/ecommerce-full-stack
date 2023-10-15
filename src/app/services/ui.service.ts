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
    this.drawerState.next(!state);
  }

  setDrawerState(state: boolean) {
    this.drawerState.next(state);
  }
}
