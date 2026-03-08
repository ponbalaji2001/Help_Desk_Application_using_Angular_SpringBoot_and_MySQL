import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./admin/users/user-list/user-list').then(m => m.UserList) },
    { path: 'users', loadComponent: () => import('./admin/users/user-list/user-list').then(m => m.UserList) },
    { path: 'user/create', loadComponent: () => import('./admin/users/user-create/user-create').then(m => m.UserCreate) },
    { path: 'user/edit/:id', loadComponent: () => import('./admin/users/user-create/user-create').then(m => m.UserCreate) },
    { path: 'user/detail/:id', loadComponent: () => import('./admin/users/user-detail/user-detail').then(m => m.UserDetail) }
]