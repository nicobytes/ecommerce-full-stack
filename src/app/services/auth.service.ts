import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { LoginRta, User } from './../models/auth.model';
import { TokenService } from './../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new BehaviorSubject<User | null>(null);
  authState$ = this.authState.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.getProfile().subscribe(user => {
      this.authState.next(user)
    });
  }



  login(email: string, password: string) {
    const url = `${environment.API_URL}/auth/login`;
    return this.http.post<LoginRta>(url, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token)),
      switchMap(_ => this.getProfile()),
      tap(user => this.authState.next(user))
    )
  }

  setAuthState(user: User | null) {
    this.authState.next(user);
  }

  getProfile() {
    const url = `${environment.API_URL}/auth/profile`;
    return this.http.get<User>(url);
  }


  logout() {
    this.tokenService.clearToken();
  }
}
