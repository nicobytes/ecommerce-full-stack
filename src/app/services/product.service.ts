import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { Product } from '@models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  constructor() { }

  getAllProducts() {
    const url = `${environment.API_URL}/v1/products`;
    return this.http.get<Product[]>(url);
  }
}
