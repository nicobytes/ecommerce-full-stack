import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core"
import { ActivatedRoute } from "@angular/router";

import { environment } from './../../environments/environment';

export const getProductWithParam = () => {
  const http = inject(HttpClient);
  const route = inject(ActivatedRoute);
  const { id } = route.snapshot.params;
  return http.get<any>(`${environment.API_URL}/products/${id}`);
}
