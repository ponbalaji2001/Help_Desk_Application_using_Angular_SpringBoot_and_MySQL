import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notification } from '../shared/notification/notification';

export type SnackType = 'success' | 'error' | 'warning' | 'info';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  private getIcon(type: SnackType): string {
    const icons = {
      success: 'check_circle_outline',
      error: 'error_outline',
      warning: 'warning_amber',
      info: 'info_outline'
    };
    return icons[type];
  }

  notify(type: SnackType, message: string, duration: number = 3000) {
    this.snackBar.openFromComponent(Notification,{
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: [`snackbar-${type}`, 'snackbar-spacing'],
      data: { 
        message: message, 
        icon: this.getIcon(type) 
      },
    });
  }
}