import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { Product } from '@models/product.model';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  #http = inject(HttpClient);

  constructor() { }

  getAll(params?: Params) {
    const url = `${environment.API_URL}/api/v1/products`;
    return this.#http.get<Product[]>(url, {
      params
    });
  }

  getOne(id: string | number) {
    const url = `${environment.API_URL}/api/v1/products/${id}`;
    return this.#http.get<Product>(url);
  }

  updateOne(id: string | number, changes: Partial<Product>) {
    const url = `${environment.API_URL}/api/v1/products/${id}`;
    return this.#http.put<Product>(url, changes);
  }
}
