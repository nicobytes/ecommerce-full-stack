import { Component, inject, Input, OnInit, signal, OnChanges, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkWithHref, Router, Params } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '@services/product.service';
import { UIService } from '@services/ui.service';
import { Product } from '@models/product.model';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '@models/category.model';
import { CategoryService } from '@services/category.service';
import { TableComponent } from '@modules/products/components/table/table.component';
import { ListComponent } from '@modules/products/components/list/list.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatToolbarModule, MatIconModule, MatProgressBarModule, MatCardModule, MatSelectModule, RouterLinkWithHref, TableComponent, MatButtonModule, ListComponent]
})
export default class ProductsComponent implements OnInit, OnChanges {
  readonly #productService = inject(ProductService);
  #categoriesService = inject(CategoryService);
  #uiService = inject(UIService);
  #router = inject(Router);
  categorySelected = new FormControl();
  categories = signal<Category[]>([]);
  products = signal<Product[]>([]);
  counter = computed(() => this.products().length);
  showProgress = signal(false);
  @Input() categoryId?: string;

  private readonly breakpointObserver = inject(BreakpointObserver);
  private isMobile$ = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  isMobile = toSignal(this.isMobile$, {initialValue: false});

  constructor() {
    this.categorySelected.valueChanges.subscribe((value) => {
      const queryParams: Params = {};
      if (value !== 'all') {
        queryParams.categoryId = value;
      }
      this.#router.navigate(['/admin/products'], { queryParams });
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnChanges() {
    const params: Params = {};
    if (this.categoryId) {
      params.categoryId = this.categoryId;
    }
    this.getProducts(params);
  }

  toggleDrawer() {
    this.#uiService.toggleDrawer();
  }

  getProducts(params: Params) {
    this.showProgress.set(true);
    this.#productService.getAll(params).subscribe((data) => {
      this.products.set(data);
      this.showProgress.set(false);
    });
  }

  getCategories() {
    this.#categoriesService.getAll().subscribe((data) => {
      this.categories.set(data);
    });
  }
}
