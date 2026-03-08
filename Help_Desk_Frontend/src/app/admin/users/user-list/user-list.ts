import { Component, computed, effect, inject, signal, Signal, untracked, ViewChild, WritableSignal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
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
import { Loader } from "../../../shared/loader/loader";
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../../service/alert.service';

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
    Field,
    Loader,
    RouterLink
],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})

export class UserList {
  users!: Signal<UserModel[]>;
  totalUsers!: Signal<number>;
  loading!: Signal<boolean>;
  colNames: string[] = ['index', 'code', 'name', 'email', 'department', 'designation', 'role', 'status', 'action'];
  mapColNames: string[] = ['department', 'designation', 'role', 'status'];
  departments = signal(new Map<string, string>());
  designations = signal(new Map<string, string>());
  roles = signal(new Map<string, string>());
  statuses = signal(new Map<string, string>());
  pageLoading: boolean = true;
  isShowFilter: WritableSignal<boolean> = signal(false);

  @ViewChild(MatSort) sort!: MatSort;

  private store = inject(UserStore);
  filterForm = form(this.store.filters);

  constructor(
    private router: Router, 
    private alert: AlertService,
  ) {
    this.users = this.store.users;
    this.totalUsers = this.store.dataSize
    this.loading = this.store.loading;
    this.departments = this.store.departments;
    this.designations = this.store.designations;
    this.roles = this.store.roles;
    this.statuses = this.store.statuses;

    effect(() => {
      if (this.pageLoading) return;

      const filters = untracked(() => this.filterForm().value());

      this.filterForm.search().value(); 
      this.filterForm.page().value();
      this.filterForm.size().value();
      this.filterForm.sortBy().value();
      this.filterForm.sortDir().value();
      this.filterForm.role().value();

      this.store.getUsers(filters);
    });

  }

  ngOnInit(): void {
    this.store.getDesignations();
    this.store.getDepartments();
    this.store.getRoles();
    this.store.getStatuses();
    this.pageLoading = false;
  }

  onSortChange(sort: Sort) {
    this.filterForm().value.update((prev) => ({
      ...prev,
      sortBy: sort.direction ? sort.active : '',
      sortDir: sort.direction || '',
      page: 0
    }));
  }

  onPageChange(event: PageEvent) {
    this.filterForm().value.update((prev) => ({
      ...prev,
      page: event.pageIndex,
      size: event.pageSize,
    }));
  }

  onView(id: string){
    this.router.navigate(['/user/detail', id]);
  }

  onEdit(id: string){
    this.router.navigate(['/user/edit', id]);
  }

  onDelete(id: string){
    this.alert.open(
      'warning',
      'Delete User',
      `Are you sure you want to delete user ${id} ?`,
      'Yes',
      'No',
      () => {
        this.store.deleteUser(Number(id));
      }
    );
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
    const search = this.filterForm.department().value().trim().toLowerCase();
    const allDepartments = Array.from(this.departments().entries());

    if (!search) {
      return allDepartments;
    }

    return allDepartments.filter(([_, value]) => 
      value.toLowerCase().includes(search)
    );
  });

  filteredDesignations = computed(() => {
    const search = this.filterForm.designation().value().trim().toLowerCase();
    const allDesignations = Array.from(this.designations().entries());

    if (!search) {
      return allDesignations;
    }

    return allDesignations.filter(([_, value]) => 
      value.toLowerCase().includes(search)
    );
  });

  activeFilterCount = computed(() => {  
    const filter = this.filterForm().value();

    return [
      filter.department,
      filter.designation,
      filter.status
    ].filter(v => !!v).length;
  });

  clearFilter(){
    this.filterForm().value.update((prev) => ({
      ...prev,
      department: '',
      designation: '',
      status: '',
      page: 0
    }));

    this.applyFilter();
  }

  applyFilter(){
    this.filterForm().value.update((prev) => ({
      ...prev,
      page: 0
    }));

    this.store.getUsers(this.filterForm().value());
  }

}
