import { Component, inject, OnInit } from '@angular/core';

import { TableDataSource } from '@utils/data-source';
import { UserService } from '@services/user.service';
import { UIService } from '@services/ui.service';
import { User } from '@models/user.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
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
