import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketCreate } from "./ticket/ticket-create/ticket-create";
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { TicketList } from "./ticket/ticket-list/ticket-list";
import { TicketDetail } from "./ticket/ticket-detail/ticket-detail";
import { UserCreate } from "./admin/users/user-create/user-create";
import { UserDetail } from "./admin/users/user-detail/user-detail";
import { CustomTable } from "./shared/custom-table/custom-table";
import { Categories } from "./admin/categories/categories";
import { SubCategories } from "./admin/sub-categories/sub-categories";
import { UserList } from "./admin/users/user-list/user-list";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',       
  },
  display: {
    dateInput: 'DD/MM/YYYY',       
    monthYearLabel: 'MMM YYYY',   
    dateA11yLabel: 'DD/MM/YYYY',   
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TicketCreate,
    MatNativeDateModule,
    TicketList,
    TicketDetail,
    UserCreate,
    UserDetail,
    CustomTable,
    Categories,
    SubCategories,
    UserList
],
  templateUrl: './app.html',
  styleUrl: './app.scss',
   providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
})
export class App {
  protected readonly title = signal('Help_Desk');
}
