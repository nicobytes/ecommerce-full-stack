import { Component, inject, signal, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgOptimizedImage, CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  imports: [ReactiveFormsModule, MatToolbarModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatCardModule, MatTableModule, NgOptimizedImage, CurrencyPipe, MatSelectModule, MatInputModule]
})
export default class FormComponent implements OnInit {
  private productService = inject(ProductService);
  private location = inject(Location);
  private fb = inject(FormBuilder);
  showProgress = signal(false);
  product = signal<Product | null>(null);
  form = this.fb.nonNullable.group({
    title: [''],
    description: [''],
    price: [0],
  });
  @Input() id?: string;

  ngOnInit() {
    if (this.id) {
      this.getProduct(this.id);
    }
  }

  goToBack() {
    this.location.back();
  }

  getProduct(productId: string) {
    this.showProgress.set(true);
    this.productService.getOne(productId).subscribe((data) => {
      this.showProgress.set(false);
      this.product.set(data);
      this.form.patchValue(data);
    });
  }

  onSubmit() {
    const product = this.product();
    if (this.form.valid && product) {
      const formData = this.form.value;
      this.productService.updateOne(product.id, formData).subscribe((data) => {
        this.location.back();
      });
    }
  }

}
