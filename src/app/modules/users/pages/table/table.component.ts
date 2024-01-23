import { Component, inject, OnInit } from '@angular/core';

import { TableDataSource } from '@utils/data-source';
import { UserService } from '@services/user.service';
import { UIService } from '@services/ui.service';
import { User } from '@models/user.model';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatCardModule, MatTableModule, NgOptimizedImage]
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'name', 'role', 'avatar', 'actions'];
  dataSource = new TableDataSource<User>();
  private service = inject(UserService);
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
