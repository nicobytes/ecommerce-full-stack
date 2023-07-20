import { Component, inject, OnInit } from '@angular/core';

import { TableDataSource } from '@utils/data-source';
import { ProductService } from '@services/product.service';
import { UIService } from '@services/ui.service';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'price', 'images', 'category', 'actions'];
  dataSource = new TableDataSource<Product>();
  private productService = inject(ProductService);
  private uiService = inject(UIService);

  counter: null | number = null;
  showProgress = false;

  ngOnInit(): void {
    this.showProgress = true;
    this.productService.getAll().subscribe((data) => {
      this.dataSource.init(data);
      this.counter = this.dataSource.getTotal();
      this.showProgress = false;
    });
  }

  toggleDrawer() {
    this.uiService.toggleDrawer();
  }
}
