import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '@store/types';
import { API_URL } from './api-url.token';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  getAll() {
    return this.http.get<Category[]>(`${this.apiUrl}/api/v1/categories`);
  }

  async getAllPromise(): Promise<Category[]> {
    const response = await fetch(`${this.apiUrl}/api/v1/categories`);
    return response.json();
  }
}
