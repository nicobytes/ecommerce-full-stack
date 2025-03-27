import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  #http = inject(HttpClient);

  getProducts(params: { category_id?: string; category_slug?: string }) {
    const url = new URL(`${environment.apiUrl}/api/v1/products`);
    if (params.category_id) {
      url.searchParams.set('categoryId', params.category_id);
    }

    if (params.category_slug) {
      url.searchParams.set('categorySlug', params.category_slug);
    }
    return this.#http.get<Product[]>(url.toString());
  }

  getOne(id: string) {
    const url = `${environment.apiUrl}/api/v1/products/${id}`;
    return this.#http.get<Product>(url);
  }

  getOneBySlug(slug: string) {
    const url = `${environment.apiUrl}/api/v1/products/slug/${slug}`;
    return this.#http.get<Product>(url);
  }
}
