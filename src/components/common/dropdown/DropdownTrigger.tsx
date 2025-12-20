import { useDropdown } from '@/hooks/useDropdown';
import clsx from 'clsx';

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

  return (
    <button
      type='button'
      onClick={() => {
        toggle(); // 내부 toggle
        onClick?.(); // 외부 이벤트 호출 (있으면)
      }}
      aria-haspopup='menu'
      aria-expanded={isOpen}
      className={clsx(className)}>
      {children}
    </button>
  );
}
