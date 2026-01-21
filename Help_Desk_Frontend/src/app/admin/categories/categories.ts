import { Component, inject } from '@angular/core';
import { CategoryCreate } from './category-create/category-create';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categories',
  imports: [
    MatButtonModule 
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  readonly dialog = inject(MatDialog);
  
  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryCreate, {
      width: '800px',
      maxWidth: '800px',
      autoFocus: false,
      data: {id: '7'},
    });
  }
}
