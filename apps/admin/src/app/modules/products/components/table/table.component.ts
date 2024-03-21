import { Component, Input, OnChanges } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgOptimizedImage, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '@models/product.model';
import { TableDataSource } from '@utils/data-source';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, NgOptimizedImage, CurrencyPipe, MatButtonModule, RouterLink],
  templateUrl: './table.component.html'
})
export class TableComponent implements OnChanges {
  @Input({required: true }) products: Product[] = [];
  dataSource = new TableDataSource<Product>();
  displayedColumns: string[] = ['id', 'title', 'price', 'images', 'category', 'actions'];

  ngOnChanges() {
    this.dataSource.init(this.products);
  }

}
