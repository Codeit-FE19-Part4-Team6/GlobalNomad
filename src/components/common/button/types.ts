import { type ReactNode } from 'react';

export type ButtonSize = 'lg' | 'md' | 'sm';
export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: ButtonSize;
}
