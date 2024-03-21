import { Component, inject, OnInit } from '@angular/core';

import { TableDataSource } from '@utils/data-source';
import { CategoryService } from '@services/category.service';
import { UIService } from '@services/ui.service';
import { Category } from '@models/category.model';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-categories-table',
    templateUrl: './table.component.html',
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatCardModule, MatTableModule, NgOptimizedImage]
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','image','actions'];
  dataSource = new TableDataSource<Category>();
  private service = inject(CategoryService);
  private uiService = inject(UIService);

  counter: null | number = null;
  showProgress = false;

  ngOnInit(): void {
    this.showProgress = true;
    this.service.getAll().subscribe((data) => {
      this.dataSource.init(data);
      this.counter = this.dataSource.getTotal();
      this.showProgress = false;
    });
  }

  toggleDrawer() {
    this.uiService.toggleDrawer();
  }
}
