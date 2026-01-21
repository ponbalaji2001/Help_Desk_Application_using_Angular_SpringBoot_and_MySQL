import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sub-category-create',
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule
  ],
  templateUrl: './sub-category-create.html',
  styleUrl: './sub-category-create.scss',
})
export class SubCategoryCreate {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  readonly dialogRef = inject(MatDialogRef<SubCategoryCreate>);
 
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  filteredOptions: string[];

  constructor() {
    this.filteredOptions = this.options.slice();
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }

  closeDialog(): void{
    this.dialogRef.close();
  }
}
