import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubCategoryCreate } from './sub-category-create/sub-category-create';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sub-categories',
  imports: [
    MatButtonModule
  ],
  templateUrl: './sub-categories.html',
  styleUrl: './sub-categories.scss',
})
export class SubCategories {
  readonly dialog = inject(MatDialog);
  
  openDialog(): void {
    const dialogRef = this.dialog.open(SubCategoryCreate, {
      width: '800px',
      maxWidth: '800px',
      autoFocus: false,
      data: {id: '7'},
    });
  }
}
