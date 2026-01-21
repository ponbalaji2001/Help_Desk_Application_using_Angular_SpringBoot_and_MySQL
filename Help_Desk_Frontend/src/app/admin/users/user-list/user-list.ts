import { Component, computed, ElementRef, signal, Signal, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { CustomTable } from '../../../shared/custom-table/custom-table';
import { UserStore } from '../../../store/user.store';
import { UserModel } from '../../../model/user.model';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Field, form } from '@angular/forms/signals'
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

interface FilterModel{
  search: string,
  department: string,
  designation: string,
  role: string,
  status: string
}

@Component({
  selector: 'app-user-list',
  imports: [
    CustomTable,
    MatCardModule,
    MatButtonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonToggleModule,
    Field
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})

export class UserList {
  users!: Signal<UserModel[]>;
  totalUsers!: Signal<number>;
  pageIndex!: Signal<number>;
  pageSize!: Signal<number>;
  loading!: Signal<boolean>;
  colNames: string[] = ['index', 'code', 'name', 'email', 'department', 'designation', 'role', 'status', 'action'];
  mapColNames: string[] = ['department', 'designation', 'role', 'status'];
  departments = signal(new Map<string, string>());
  designations = signal(new Map<string, string>());
  roles = signal(new Map<string, string>());
  statuses = signal(new Map<string, string>());

  formControls = signal<FilterModel>({
    search: '',
    department: '',
    designation: '',
    role: '',
    status: ''
  })

  filterForm = form(this.formControls);
  
  constructor(private store: UserStore){
    this.users = this.store.users;
    this.totalUsers = this.store.dataSize
    this.pageIndex = this.store.pageIndex;
    this.pageSize = this.store.pageSize;
    this.loading = this.store.loading;
    this.departments = this.store.departments;
    this.designations = this.store.designations;
    this.roles = this.store.roles;
    this.statuses = this.store.statuses;
  }

  ngOnInit(): void {
    this.store.getUsers({page:0, size:10});
    this.store.getDesignations();
    this.store.getDepartments();
    this.store.getRoles();
    this.store.getStatuses();
  }

  onSortChange(sort: Sort) {
    console.log(sort.active);   
    console.log(sort.direction); 
  }

  onPageChange(event: PageEvent) {
    this.store.setPage(event);
  }

  onView(id: string){
    console.log(id);
  }

  onEdit(id: string){
    console.log(id);
  }

  onDelete(id: string){
    console.log(id);
  }

  getMapValue = (column: string, value: any) =>{
    switch(column) {
      case 'department':
        return this.store.departments().get(value) ?? value;
      case 'designation':
        return this.store.designations().get(value) ?? value;
      case 'role':
        return this.store.roles().get(value) ?? value;
      case 'status':
        return this.store.statuses().get(value) ?? value;
      default:
        return value;
    }
  }

  filteredDepartments = computed(() => {
    // const search = (this.departmentCtrl.value ?? '').toString().trim().toLowerCase();

    return Array.from(this.departments().entries()).filter(
      ([key]) => key.toLowerCase().includes('')
    );
  });

  filteredDesignations = computed(() => {
    // const search = (this.designationCtrl.value ?? '').toString().trim().toLowerCase();

    return Array.from(this.designations().entries()).filter(
      ([key, value]) => value.toLowerCase().includes('')
    );
  });
}
