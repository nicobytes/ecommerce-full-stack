import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Location } from '@models/location.model';
import { environment } from '@envs/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private http = inject(HttpClient);

  getAllLocations(center: { lat: number; lng: number }) {
    const url = `${environment.API_URL}/api/v1/locations`;
    return this.http.get<Location[]>(url, {
      params: {
        origin: `${center.lat},${center.lng}`,
      },
    });
  }

}
