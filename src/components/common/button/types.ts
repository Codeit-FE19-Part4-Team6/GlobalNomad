export type ButtonSize = 'lg' | 'md' | 'sm';
export type ButtonVariant = 'primary' | 'secondary';
export type CircleButtonType = 'plus' | 'minus' | 'close-dark' | 'close-light';
export type ActionButtonType = 'neutral' | 'muted';

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}
