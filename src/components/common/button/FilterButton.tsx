/**
 * FilterButton 컴포넌트
 *
 * 카테고리나 필터를 선택할 때 사용하는 pill 형태의 버튼입니다.
 *
 * ## 특징
 * - 2가지 크기 지원 (sm, md)
 * - 아이콘 지원 (optional)
 * - 선택 상태(selected) 지원
 * - 선택 시 배경색 변경 및 bold 폰트 적용
 * - 둥근 모서리(border-radius: 100px) 디자인
 *
 * @example
 * ```tsx
 *
 * import Icons from '@/assets/icons';
 *
 * // 기본 사용
 * <Button.Filter>카테고리</Button.Filter>
 *
 * // 아이콘과 함께
 * <Button.Filter icon={<Icons.Art />}>With Icon</Button.Filter>
 *
 * // 선택 상태
 * <Button.Filter size='md' icon={<Icons.Food />} selected>
 *   Selected
 * </Button.Filter>
 *
 * // 작은 크기
 * <Button.Filter size='sm' icon={<Icons.Wellbeing />}>
 *   Small Size
 * </Button.Filter>
 *
 * // 아이콘 없이 선택 상태
 * <Button.Filter selected>No Icon Selected</Button.Filter>
 * ```
 */

import { type BaseButtonProps, type ButtonSize } from './types';

interface FilterButtonProps extends BaseButtonProps {
  icon?: React.ReactNode;
  selected?: boolean;
  size?: ButtonSize;
}

export const FilterButton = ({
  children,
  icon,
  size = 'md',
  selected = false,
  className = '',
  ...props
}: FilterButtonProps) => {
  // 선택 상태에 따른 스타일
  const stateClasses = selected
    ? 'bg-gray-900 text-white border-none'
    : 'bg-white text-gray-950 border border-gray-50';

  // 선택 상태에 따른 폰트 weight
  const fontWeight = selected ? 'font-bold' : 'font-medium';

  // 크기에 따른 스타일
  const sizeClasses =
    size === 'sm'
      ? `text-sm ${fontWeight} gap-1 py-2.5 px-3.5` // gap-[4px], py-[10px], px-[14px]
      : `text-base ${fontWeight} gap-1.5 py-2.5 px-4`; // gap-[6px], py-[10px], px-[16px]

  // 아이콘 크기
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';

  const baseClasses =
    'inline-flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ease-in-out leading-none disabled:cursor-not-allowed';

  return (
    <button className={`${baseClasses} ${stateClasses} ${sizeClasses} ${className}`} {...props}>
      {icon && (
        <span className={`inline-flex items-center justify-center ${iconSize}`}>{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};
