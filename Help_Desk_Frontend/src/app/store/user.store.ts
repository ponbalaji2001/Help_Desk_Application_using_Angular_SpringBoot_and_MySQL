import { Injectable, signal } from '@angular/core';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/users.service';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../service/notification.service';
import { Router } from '@angular/router';
import { UserFilterModel } from '../model/userFilter.model';
import { AlertService } from '../service/alert.service';

@Injectable({ providedIn: 'root' })
export class UserStore {

  users = signal<UserModel[]>([]);
  user = signal<UserModel|null>(null);
  dataSize = signal<number>(0);
  loading = signal(false);

  departments = signal(new Map<string, string>());
  designations = signal(new Map<string, string>());
  roles = signal(new Map<string, string>());
  genders = signal(new Map<string, string>());
  statuses = signal(new Map<string, string>());

  filters = signal<UserFilterModel>({
    search: '',
    department: '',
    designation: '',
    role: '',
    status: '',
    page: 0,
    size: 10,
    sortBy: '',
    sortDir: ''
  });

  constructor(
    private userService: UserService, 
    private notification: NotificationService,
    private router: Router,
    private alert: AlertService
  ) {}

  getUsers(filters?: UserFilterModel){
    this.loading.set(true);
    this.userService.getUsers(filters)
    .pipe(
      finalize(() => this.loading.set(false))
    )
    .subscribe({
      next: (response) => {
        this.users.set(response.data ?? []);
        this.dataSize.set(response.data_size ?? 0);
        this.filters.update(current => ({
          ...current,
          ...filters
        }));
        // this.notification.notify('success', 'Users retrieved successfully');
      },
      error: (err) => {
        console.error(err);
        this.notification.notify('error', 'Failed to get users', 1000);
      }
    });
  }

  getUser(id: number): void {
    this.loading.set(true);

    this.userService.getUser(id)
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (user) => {
          this.user.set(user);
          this.notification.notify('success', 'User data retrieved successfully');
        },
        error: (err) => {
          console.error(err);
          this.notification.notify('error', 'Failed to get user');
        }
      });
  }

  createUser(user: UserModel, onSuccess?: () => void) {
    this.loading.set(true);

    this.userService.createUser(user)
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (newUser) => {
          this.users.update(users => [...users, newUser]);
          this.dataSize.set(this.dataSize() + 1);
          onSuccess?.();

          this.alert.open(
            'success',
            'User Created',
            'User created successfully!',
            'Back to Users',
            'Cancel',
            () => {
              this.router.navigate(['/users']);
            }
          );

        },
        error: (err) => {
          console.error(err);
          this.notification.notify('error', 'Failed to create user');
        }
      });
  }

  updateUser(user: UserModel) {
    if (!user.id) return;

    this.loading.set(true);

    this.userService.updateUser(user.id, user)
    .pipe(
      finalize(() => this.loading.set(false))
    )
    .subscribe({
      next: (updated) => {
        this.users.update(users =>
          users.map(u => (u.id === updated.id ? updated : u))
        );

        this.alert.open(
          'success',
          'User Updated',
          'User updated successfully!',
          'Back to Users',
          'Cancel',
          () => {
            this.router.navigate(['/users']);
          }
        );
        
      },
      error: (err) => {
        console.error(err);
        this.notification.notify('error', 'Failed to update user');
      }
    });
  }

  deleteUser(id: number) {
    this.loading.set(true);
    
    this.userService.deleteUser(id)
    .pipe(
      finalize(() => this.loading.set(false))
    )
    .subscribe({
      next: () => {
        this.getUsers(this.filters());
        this.notification.notify('success', 'User deleted successfully');
      },
      error: (err) => {
        console.error(err);
        this.notification.notify('error', 'Failed to delete user');
      }
    });
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
