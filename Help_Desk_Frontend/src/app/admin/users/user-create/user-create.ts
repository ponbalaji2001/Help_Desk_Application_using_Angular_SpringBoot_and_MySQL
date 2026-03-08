import { Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core';
import { MatFormField } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatAutocompleteModule, MatOption } from "@angular/material/autocomplete";
import { ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { email, form, required, Field, pattern, submit } from '@angular/forms/signals';
import { UserStore } from '../../../store/user.store';
import { Loader } from "../../../shared/loader/loader";
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

interface UserModel{
  name: string,
  email: string,
  mobile_no: string,
  dob: string,
  gender: string,
  designation: string,
  department: string,
  role: string,
  status: string,
  address: string,
}
@Component({
  selector: 'app-user-create',
  imports: [
    MatFormField,
    MatIcon,
    MatAutocompleteModule,
    MatOption,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    Field,
    Loader,
    RouterLink,
],
  templateUrl: './user-create.html',
  styleUrl: './user-create.scss',
})
export class UserCreate {
  genders = signal(new Map<string, string>());
  departments = signal(new Map<string, string>());
  designations = signal(new Map<string, string>());
  roles = signal(new Map<string, string>());
  statuses = signal(new Map<string, string>());
  pageLoading: boolean = true;
  loading!: Signal<boolean>;
  userId: WritableSignal<number> = signal(-1);
  user!: WritableSignal<UserModel>;
  submitted = signal(false);

  formFields: UserModel = {
    name: '',
    email: '',
    mobile_no: '',
    dob: '',
    gender: '',
    designation: '',
    department: '',
    role: '',
    status: '',
    address: ''
  }

  formControls = signal<UserModel>(this.formFields);

  userForm = form(this.formControls,
    (formValue) => {
      required(formValue.name, {message: 'Full Name is required'});
      required(formValue.email, {message: 'Email is required'});
      email(formValue.email, {message: 'Email is invalid'});
      required(formValue.mobile_no, {message: 'Mobile Number is required'});
      pattern(formValue.mobile_no, /^[0-9]{10}$/, { message: 'Mobile Number must be 10 digits' });
      required(formValue.dob, {message: 'Date of Birth is required'});
      required(formValue.gender, {message: 'Gender is required'});
      required(formValue.designation, {message: 'Designation is required'});
      required(formValue.department, {message: 'Department is required'});
      required(formValue.role, {message: 'Role is required'});
      required(formValue.status, {message: 'Status is required'});
      required(formValue.address, {message: 'Address is required'});
    }
  );

  constructor(private store: UserStore, private route: ActivatedRoute) {
    this.genders = this.store.genders;
    this.departments = this.store.departments;
    this.designations = this.store.designations;
    this.roles = this.store.roles;
    this.statuses = this.store.statuses;
    this.loading = this.store.loading;

    effect(() => {
      const user = this.store.user();
      if (user) {
        this.userForm().value.set({...user});
      }
    });
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
      this.userId.set(numId);
      this.store.getUser(numId);
    } else {
      this.userId.set(-1);
      this.store.user.set(null);
      this.userForm().reset(this.formFields);
    }
      
    this.pageLoading = false;
  }

  filteredDepartments = computed(() => {
    const search = this.userForm.department().value().trim().toLowerCase();
    const allDepartments = Array.from(this.departments().entries());

    if (!search) {
      return allDepartments;
    }

    return allDepartments.filter(([_, value]) => 
      value.toLowerCase().includes(search)
    );
  });

  filteredDesignations = computed(() => {
    const search = this.userForm.designation().value().trim().toLowerCase();
    const allDesignations = Array.from(this.designations().entries());

    if (!search) {
      return allDesignations;
    }

    return allDesignations.filter(([_, value]) => 
      value.toLowerCase().includes(search)
    );
  });

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

  onSubmit(event: Event){
    event.preventDefault();
  
    submit(this.userForm, async(form) => {
      if(form().invalid()){
        form().markAsTouched();
        return;
      }
    
      if(this.userId() > -1){
        this.store.updateUser(form().value());
      }else{
        this.store.createUser(form().value(), () => {
          form().reset(this.formFields);
        });
      }
    });
  }

}
