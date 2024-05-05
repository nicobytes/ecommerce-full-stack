import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '@models/category.model';
import { environment } from '@envs/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  constructor() {}

  getAll() {
    return this.http.get<Category[]>(
      `${environment.API_URL}/api/v1/categories`,
    );
  }
}
