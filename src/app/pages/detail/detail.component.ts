import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getProductWithParam } from './../../services/product.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export default class DetailComponent {

  product$ = getProductWithParam();

}
