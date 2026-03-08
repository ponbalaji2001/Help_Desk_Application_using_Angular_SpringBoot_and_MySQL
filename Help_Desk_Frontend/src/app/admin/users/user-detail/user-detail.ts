import { Component, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserStore } from '../../../store/user.store';
import { UserModel } from '../../../model/user.model';
import { Loader } from "../../../shared/loader/loader";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [
    MatButtonModule,
    RouterLink,
    Loader,
    DatePipe
],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})

export class UserDetail {
  loading!: Signal<boolean>;
  user!: Signal<UserModel | null>;

  constructor(private store: UserStore, private route: ActivatedRoute) {
    this.loading = this.store.loading;
    this.user = this.store.user;
  }

  ngOnInit(): void {
    this.store.getGenders();
    this.store.getDesignations();
    this.store.getDepartments();
    this.store.getRoles();
    this.store.getStatuses();

    const id = this.route.snapshot.paramMap.get('id');
    const numId = Number(id);

    if (id !== null && !isNaN(numId)) {
      this.store.getUser(numId);
    } else {
      this.store.user.set(null);
    }
  }

  getMapValue = (column: string, value: any) =>{
    switch(column) {
      case 'gender':
        return this.store.genders().get(value) ?? value;
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
}
