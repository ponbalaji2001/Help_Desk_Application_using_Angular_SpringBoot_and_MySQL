import { Component, inject } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-create',
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './category-create.html',
  styleUrl: './category-create.scss',
})
export class CategoryCreate {
  readonly dialogRef = inject(MatDialogRef<CategoryCreate>);

  closeDialog(): void{
    this.dialogRef.close();
  }

}
