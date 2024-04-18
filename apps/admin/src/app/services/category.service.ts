import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { Category } from '@models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  constructor() { }

  getAll() {
    const url = `${environment.API_URL}/api/v1/categories`;
    return this.http.get<Category[]>(url);
  }
}
