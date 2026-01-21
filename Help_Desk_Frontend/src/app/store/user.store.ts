import { Injectable, signal } from '@angular/core';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/users.service';
import { PageEvent } from '@angular/material/paginator';

@Injectable({ providedIn: 'root' })
export class UserStore {

  users = signal<UserModel[]>([]);
  dataSize = signal<number>(0);
  pageIndex = signal<number>(0);
  pageSize = signal<number>(10);
  loading = signal(false);
  error = signal<string | null>(null);

  departments = signal(new Map<string, string>());
  designations = signal(new Map<string, string>());
  roles = signal(new Map<string, string>());
  genders = signal(new Map<string, string>());
  statuses = signal(new Map<string, string>());

  constructor(private userService: UserService) {}

  getUsers(filters?: {
    search?: string;
    department?: string;
    designation?: string;
    role?: string;
    status?: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: string;
  }) {
    this.loading.set(true);

    this.userService.getUsers(filters).subscribe({
      next: (response) => {
        this.users.set(response.data ?? []);
        this.dataSize.set(response.data_size ?? 0);
        this.pageIndex.set(response.page_index ?? 0);
        this.pageSize.set(response.page_size ?? 10);

        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to get users', err);
        this.error.set('Failed to get users');
        this.loading.set(false);
      }
    });
  }

  createUser(user: UserModel) {
    this.userService.createUser(user).subscribe(newUser => {
      this.users.update(users => [...users, newUser]);
      this.dataSize.set(this.dataSize()+1);
    });
  }

  updateUser(user: UserModel) {
    if (!user.id) return;

    this.userService.updateUser(user.id, user).subscribe(updated => {
      this.users.update(users =>
        users.map(u => (u.id === updated.id ? updated : u))
      );
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users.update(users => users.filter(u => u.id !== id));
       this.dataSize.set(this.dataSize()-1);
    });
  }

  setPage(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getUsers({page:event.pageIndex, size:event.pageSize});
  }

  getDepartments(){
    this.userService.getDepartments().subscribe(items => {
      const map = new Map<string, string>();
      items.forEach(i => map.set(i.value, i.label));
      this.departments.set(map);
    });
  }

  getDesignations(){
    this.userService.getDesignations().subscribe(items => {
      const map = new Map<string, string>();
      items.forEach(i => map.set(i.value, i.label));
      this.designations.set(map);
    });
  }

  getRoles(){
    this.userService.getRoles().subscribe(items => {
      const map = new Map<string, string>();
      items.forEach(i => map.set(i.value, i.label));
      this.roles.set(map);
    });
  }

  getStatuses(){
    this.userService.getStatus().subscribe(items => {
      const map = new Map<string, string>();
      items.forEach(i => map.set(i.value, i.label));
      this.statuses.set(map);
    });
  }

  getGenders(){
    this.userService.getGenders().subscribe(items => {
      const map = new Map<string, string>();
      items.forEach(i => map.set(i.value, i.label));
      this.genders.set(map);
    });
  }
  
}
