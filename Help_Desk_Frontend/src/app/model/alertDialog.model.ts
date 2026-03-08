export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertDialogData {
  type: AlertType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  icon: string;
}