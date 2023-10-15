import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkWithHref, ActivatedRoute, Router, Params } from '@angular/router';

import { TableDataSource } from '@utils/data-source';
import { ProductService } from '@services/product.service';
import { UIService } from '@services/ui.service';
import { Product } from '@models/product.model';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf, NgFor, NgOptimizedImage, CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '@models/category.model';
import { CategoryService } from '@services/category.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatToolbarModule, MatButtonModule, MatIconModule, NgIf, MatProgressBarModule, MatCardModule, MatTableModule, NgFor, NgOptimizedImage, CurrencyPipe, MatSelectModule, RouterLinkWithHref]
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'price', 'images', 'category', 'actions'];
  dataSource = new TableDataSource<Product>();
  private productService = inject(ProductService);
  private categoriesService = inject(CategoryService);
  private uiService = inject(UIService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  categorySelected = new FormControl();
  categories = signal<Category[]>([]);

  counter: null | number = null;
  showProgress = false;


  constructor() {
    this.categorySelected.valueChanges.subscribe((value) => {
      const queryParams: Params = {};
      if (value !== 'all') {
        queryParams.categoryId = value;
      }
      this.router.navigate(['/admin/products'], { queryParams });
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.getProducts(params);
    });
    this.getCategories();
  }

  toggleDrawer() {
    this.uiService.toggleDrawer();
  }

  getProducts(params: Params) {
    this.showProgress = true;
    this.productService.getAll(params).subscribe((data) => {
      this.dataSource.init(data);
      this.counter = this.dataSource.getTotal();
      this.showProgress = false;
    });
  }

  getCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories.set(data);
    });
  }
}
