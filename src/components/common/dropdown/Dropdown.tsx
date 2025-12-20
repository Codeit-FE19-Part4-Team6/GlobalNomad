import DropdownContext from '@/hooks/useDropdown';
import { useState } from 'react';
import clsx from 'clsx';

type DropdownProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Dropdown 컴포넌트
 *
 * 전체 드롭다운 영역을 감싸는 루트 컴포넌트입니다.
 * 내부에 DropdownTrigger와 DropdownList를 포함하여 드롭다운 메뉴를 구성합니다.
 *
 * 사용 방법:
 * ```tsx
 * <Dropdown className="w-64">
 *   <DropdownTrigger>선택</DropdownTrigger>
 *   <DropdownList>
 *     <DropdownItem onClick={...}>아이템1</DropdownItem>
 *     <DropdownItem onClick={...}>아이템2</DropdownItem>
 *   </DropdownList>
 * </Dropdown>
 * ```
 *
 * Props:
 * - `children`: 드롭다운 안에 들어갈 JSX 요소 (Trigger, List 등)
 * - `className`: 드롭다운 전체 컨테이너에 적용할 선택적 CSS 클래스
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
