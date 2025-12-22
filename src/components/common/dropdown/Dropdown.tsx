import DropdownContext from '@/hooks/useDropdown';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import useOutsideClick from '@/hooks/useOutsideClick';

type DropdownProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Dropdown Root 컴포넌트
 *
 * 드롭다운의 열림/닫힘 상태를 관리하는 최상위 컴포넌트입니다.
 * DropdownTrigger, DropdownList, DropdownItem과 함께
 * Compound Pattern으로 사용됩니다.
 *
 * 주요 기능:
 * - 드롭다운 열림/닫힘 상태 관리 (isOpen)
 * - 외부 영역 클릭 시 자동 닫힘 처리
 * - Context를 통해 하위 컴포넌트에 상태와 제어 함수 제공
 *
 * 사용 예시:
 * ```tsx
 * <Dropdown>
 *   <DropdownTrigger>선택</DropdownTrigger>
 *   <DropdownList>
 *     <DropdownItem onClick={...}>아이템1</DropdownItem>
 *     <DropdownItem onClick={...}>아이템2</DropdownItem>
 *   </DropdownList>
 * </Dropdown>
 * ```
 *
 * 확장 사용:
 * - DatePicker, Calendar Popover 등
 *   "트리거 클릭 → 팝오버 노출 → 외부 클릭 시 닫힘" 구조에 재사용 가능
 *
 */
export default function Dropdown({ children, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  useOutsideClick({
    ref,
    onOutsideClick: close,
    enabled: isOpen,
  });

  return (
    <DropdownContext.Provider value={{ isOpen, open, close, toggle }}>
      <div ref={ref} className={clsx(className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}
