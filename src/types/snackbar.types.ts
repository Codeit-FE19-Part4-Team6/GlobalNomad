export type SnackBarType = 'success' | 'error';

export interface SnackBarOptions {
  duration?: number;
  onClose?: () => void;
}

export interface Snack {
  id: number;
  message: string;
  type: SnackBarType;
  duration?: number;
  onClose?: () => void;
}
