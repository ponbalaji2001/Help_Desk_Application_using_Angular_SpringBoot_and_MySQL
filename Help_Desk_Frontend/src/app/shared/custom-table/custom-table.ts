import { Component, EventEmitter, Input, Output, signal, Signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Sort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import { TitleCasePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Loader } from "../loader/loader";

@Component({
  selector: 'app-custom-table',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDividerModule,
    TitleCasePipe,
    MatIconModule,
    MatButtonModule,
    Loader
],
  templateUrl: './custom-table.html',
  styleUrl: './custom-table.scss',
})
export class CustomTable {
  @Input() colNames: string[] = [];
  @Input() mapColNames: string[] = [];
  @Input() data!: Signal<any[]>;
  @Input() loading!: Signal<boolean>;
  @Input() dataSize!: Signal<number>;
  @Input() pageSize!: Signal<number>;
  @Input() pageIndex!: Signal<number>;
  @Input() pageSizeOptions: number[] = [10, 20, 50];
  @Input() showIndex: boolean = false;
  @Output() sortChange = new EventEmitter<Sort>();
  @Input() sortBy!: string;
  @Input() sortDir!: string;
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() view = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Input() mapValueResolver?: (column: string, value: any) => string;

  constructor() {}

  ngOnInit() {}

  onSortChange(sort: Sort) {
    this.sortChange.emit(sort);
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

  onView(id: string){
    this.view.emit(id);
  }

  onEdit(id: string){
    this.edit.emit(id);
  }

  onDelete(id: string){
    this.delete.emit(id)
  }

  get matSortDir(): SortDirection {
    return this.sortDir as SortDirection;
  }

}
