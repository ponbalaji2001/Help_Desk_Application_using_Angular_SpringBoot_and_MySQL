import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlertDialogData } from '../../model/alertDialog.model';

@Component({
  selector: 'app-alert',
  imports: [
    MatDialogModule, 
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})

export class Alert {
  readonly data: AlertDialogData = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<Alert>);

  onConfirm() {
    if (this.data.onConfirm) {
      this.data.onConfirm();  
    }

    this.dialogRef.close();
  }

  onCancel() {
    if (this.data.onCancel) {
      this.data.onCancel();  
    }

    this.dialogRef.close();
  }
}
