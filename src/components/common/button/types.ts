export type ButtonSize = 'lg' | 'md' | 'sm';
export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  size?: ButtonSize;
  icon?: React.ReactNode;
  active?: boolean;
  selected?: boolean;
}
