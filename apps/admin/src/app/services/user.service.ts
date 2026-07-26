import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '@store/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getAll() {
    const url = `${environment.API_URL}/api/v1/users`;
    return this.http.get<User[]>(url);
  }
}
