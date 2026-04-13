import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@store/types';
import { API_URL } from './api-url.token';
import { Params } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  getAll(params?: Params) {
    return this.http.get<Product[]>(`${this.apiUrl}/api/v1/products`, {
      params,
    });
  }

  getOne(id: string | number) {
    return this.http.get<Product>(`${this.apiUrl}/api/v1/products/${id}`);
  }

  getOneBySlug(slug: string) {
    return this.http.get<Product>(
      `${this.apiUrl}/api/v1/products/slug/${slug}`,
    );
  }

  getRelatedProducts(slug: string) {
    return this.http.get<Product[]>(
      `${this.apiUrl}/api/v1/products/slug/${slug}/related`,
    );
  }

  updateOne(id: string | number, changes: Partial<Product>) {
    return this.http.put<Product>(
      `${this.apiUrl}/api/v1/products/${id}`,
      changes,
    );
  }
}
