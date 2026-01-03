export type SnackBarType = 'success' | 'error';

export interface SnackBarOptions {
  duration?: number;
  onClose?: () => void;
}

export interface Snack extends SnackBarOptions {
  id: number;
  message: string;
  type: SnackBarType;
}
