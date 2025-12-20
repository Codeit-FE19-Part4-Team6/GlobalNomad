import { useDropdown } from '@/hooks/useDropdown';
import clsx from 'clsx';
import { useCallback } from 'react';

type DropdownTriggerProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

/**
 * 드롭다운을 열고 닫는 트리거 역할의 컴포넌트입니다.
 * 버튼 클릭 시 드롭다운의 열림 상태를 토글합니다.
 */
export default function DropdownTrigger({ children, className, onClick }: DropdownTriggerProps) {
  const { toggle, isOpen } = useDropdown();

  const handleClick = useCallback(() => {
    toggle();
    onClick?.();
  }, [toggle, onClick]);

  return (
    <button
      type='button'
      onClick={handleClick}
      aria-haspopup='menu'
      aria-expanded={isOpen}
      className={clsx(className)}>
      {children}
    </button>
  );
}
