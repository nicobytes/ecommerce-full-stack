import { Component, signal } from '@angular/core';
import type { Location } from '@models/location.model';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export default class LocationsComponent {

  $locations = signal<Location[]>([]);

}
