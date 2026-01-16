import type { ReactNode, Ref } from 'react';

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}
