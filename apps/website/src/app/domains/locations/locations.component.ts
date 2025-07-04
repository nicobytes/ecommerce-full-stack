import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Location {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-locations',
  imports: [],
  templateUrl: './locations.component.html',
})
export default class LocationsComponent implements OnInit {
  locations: Location[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Location[]>('https://api.escuelajs.co/api/v1/locations')
      .subscribe(data => {
        this.locations = data;
      });
  }

  get name() {
    return 'name';
  }
}
