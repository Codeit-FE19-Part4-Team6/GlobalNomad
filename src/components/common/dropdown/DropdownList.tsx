import { useDropdown } from '@/hooks/useDropdown';
import clsx from 'clsx';

type DropdownListProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * 드롭다운 메뉴의 목록 영역을 나타내는 리스트 컴포넌트입니다.
 * 드롭다운이 열려 있을 때만 렌더링되며,
 * 내부에 여러 개의 DropdownItem 컴포넌트를 포함합니다.
 */
export default function DropdownList({ children, className }: DropdownListProps) {
  const { isOpen } = useDropdown();

  if (!isOpen) {
    return null;
  }

  return (
    <ul role='menu' className={clsx(className)}>
      {children}
    </ul>
  );
}
