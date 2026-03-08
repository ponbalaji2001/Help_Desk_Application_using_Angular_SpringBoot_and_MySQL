import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alert } from '../shared/alert/alert';
import { AlertType } from '../model/alertDialog.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor( private dialog: MatDialog) {}

  private getIcon(type: AlertType): string {
    const icons = {
      success: 'check_circle_outline',
      error: 'error_outline',
      warning: 'warning_amber',
      info: 'info_outline'
    };
    return icons[type];
  }

  open(
    type: AlertType, 
    title: string,
    message: string, 
    confirmText: string = 'Ok',
    cancelText: string = 'Cancel',
    onConfirm?: () => void,
    onCancel?: () => void
    ) {
     this.dialog.open(Alert, {
        data: {
            type: type,
            title: title,
            message: message,
            confirmText: confirmText,
            cancelText: cancelText,
            onConfirm: onConfirm,
            onCancel: onCancel,
            icon: this.getIcon(type)
        },
        width: '400px',
        autoFocus: false
    });
  }
}