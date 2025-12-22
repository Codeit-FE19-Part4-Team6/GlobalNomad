/**
 * TimeSelectButton 컴포넌트
 *
 * 시간을 선택할 때 사용하는 버튼 컴포넌트입니다.
 *
 * ## 특징
 * - `selected` 상태에 따라 스타일이 변경됩니다.
 * - 버튼 내부 텍스트는 `children`을 통해 자유롭게 전달할 수 있습니다.
 * - 기본 폰트는 14px medium으로 고정되어 있습니다.
 *
 * @example
 * ```tsx
 * <TimeSelectButton>14:00~15:00</TimeSelectButton>
 * <TimeSelectButton selected>15:00~16:00</TimeSelectButton>
 * ```
 */

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface TimeSelectButtonProps extends BaseButtonProps {
  selected?: boolean;
}

export const TimeSelectButton = ({
  children,
  selected = false,
  className = '',
  ...props
}: TimeSelectButtonProps) => {
  // 공통 스타일
  const baseClasses =
    'inline-flex items-center justify-center ' +
    'rounded-[11px] px-5 py-3.5 h-[52px] ' +
    'cursor-pointer transition-all duration-200 ease-in-out ' +
    'disabled:cursor-not-allowed';

  // Selected 상태별 스타일 (폰트 포함)
  const stateClasses = selected
    ? 'bg-primary-100 text-primary-500 border-2 border-primary-500 font-md-semibold'
    : 'bg-white text-gray-950 border border-gray-300 hover:border-gray-600 font-md-medium';

  const classes = `${baseClasses} ${stateClasses} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
