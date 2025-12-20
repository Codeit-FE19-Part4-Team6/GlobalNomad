import DropdownContext from '@/hooks/useDropdown';
import { useState } from 'react';
import clsx from 'clsx';

type DropdownProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Dropdown 전체를 감싸는 루트 컴포넌트입니다.
 */
export default function Dropdown({ children, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <DropdownContext.Provider value={{ isOpen, open, close, toggle }}>
      <div className={clsx(className)}>{children}</div>
    </DropdownContext.Provider>
  );
}
