import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
  OnChanges,
  computed,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '@store/data-access';
import { UIService } from '../../../../services/ui.service';
import { Product } from '@store/types';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '@store/types';
import { CategoryService } from '@store/data-access';
import { TableComponent } from '../../components/table/table.component';
import { ListComponent } from '../../components/list/list.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    TableComponent,
    MatButtonModule,
    ListComponent,
  ],
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
    .pipe(map((result) => result.matches));
  isMobile = toSignal(this.isMobile$, { initialValue: false });

  constructor() {
    this.categorySelected.valueChanges.subscribe((value) => {
      const queryParams: Params = {};
      if (value !== 'all') {
        queryParams['categoryId'] = value;
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
      params['categoryId'] = this.categoryId;
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
