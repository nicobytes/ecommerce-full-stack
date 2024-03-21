import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

export class TableDataSource<T> extends DataSource<T> {

  data = new BehaviorSubject<T[]>([]);

  connect(): Observable<T[]> {
    return this.data;
  }

  init(data: T[]) {
    this.data.next(data);
  }

  getTotal() {
    const total = this.data.getValue();
    return total.length;
  }

  disconnect() { }

}
