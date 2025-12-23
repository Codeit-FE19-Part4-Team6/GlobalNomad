import { useDropdown } from '@/hooks/useDropdown';

type DropdownItemProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  closeOnClick?: boolean;
};

/**
 * 드롭다운 메뉴 내의 개별 항목을 나타내는 아이템 컴포넌트입니다.
 * 클릭하면 전달받은 onClick을 실행하고 드롭다운을 닫습니다.
 */
export default function DropdownItem({
  children,
  onClick,
  className,
  closeOnClick = true,
}: DropdownItemProps) {
  const { close } = useDropdown();

  const handleClick = () => {
    onClick();
    if (closeOnClick) {
      close();
    }
  };

  return (
    <li role='menuitem' onClick={handleClick} className={className}>
      {children}
    </li>
  );
}
