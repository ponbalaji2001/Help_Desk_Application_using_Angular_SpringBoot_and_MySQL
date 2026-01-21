import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs';
import { TableResponseModel } from '../model/tableResponse.model';
import { ItemModel } from '../model/Item.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {

  private apiUrl = `${environment.baseUrl}/user`

  constructor(private http: HttpClient) {}

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
  }): Observable<TableResponseModel<UserModel>> {

    const paramsObj: Record<string, string> = {};
    if (filters) {
        Object.keys(filters).forEach(key => {
            const value = filters[key as keyof typeof filters];
            if (value !== undefined && value !== null) {
                paramsObj[key] = value.toString();
            }
        });
    }

    const httpParams = new HttpParams({ fromObject: paramsObj });

    return this.http.get<TableResponseModel<UserModel>>(`${this.apiUrl}/list`, { params: httpParams });
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl, user);
  }

  updateUser(id: number, user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDesignations(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(`${this.apiUrl}/designations`);
  }

  getDepartments(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(`${this.apiUrl}/departments`);
  }

  getRoles(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(`${this.apiUrl}/roles`);
  }

  getStatus(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(`${this.apiUrl}/statuses`);
  }

  getGenders(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(`${this.apiUrl}/genders`);
  }

}
