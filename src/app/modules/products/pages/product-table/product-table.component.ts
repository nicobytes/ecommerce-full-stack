import { Component, inject, OnInit } from '@angular/core';

import { DataSourceProduct } from './data-source';
import { ProductService } from '@services/product.service';
import { UIService } from '@services/ui.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html'
})
export class ProductTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'price', 'images', 'category', 'actions'];
  dataSource = new DataSourceProduct();
  private productService = inject(ProductService);
  private uiService = inject(UIService);

  counterProducts: null | number = null;
  showProgress = false;

  ngOnInit(): void {
    this.showProgress = true;
    this.productService.getAllProducts().subscribe((data) => {
      this.dataSource.init(data);
      this.counterProducts = this.dataSource.getTotal();
      this.showProgress = false;
    });
  }

  toggleDrawer() {
    this.uiService.toggleDrawer();
  }
}
