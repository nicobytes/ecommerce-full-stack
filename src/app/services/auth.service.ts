import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { LoginRta, User } from './../models/auth.model';
import { TokenService } from './../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }


  login(email: string, password: string) {
    const url = `${environment.API_URL}/auth/login`;
    return this.http.post<LoginRta>(url, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  getProfile() {
    const url = `${environment.API_URL}/auth/profile`;
    return this.http.get<User>(url);
  }


  logout() {
    this.tokenService.clearToken();
  }
}
