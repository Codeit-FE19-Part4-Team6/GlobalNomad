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
 * <FilterButton>카테고리</FilterButton>
 *
 * // 아이콘과 함께
 * <FilterButton icon={<Icons.Art />}>With Icon</FilterButton>
 *
 * // 선택 상태
 * <FilterButton size='md' icon={<Icons.Food />} selected>
 *   Selected
 * </FilterButton>
 *
 * // 작은 크기
 * <FilterButton size='sm' icon={<Icons.Wellbeing />}>
 *   Small Size
 * </FilterButton>
 *
 * // 아이콘 없이 선택 상태
 * <FilterButton selected>No Icon Selected</FilterButton>
 * ```
 */

import type { ReactNode } from 'react';
import { type BaseButtonProps } from './types';

type FilterButtonSize = 'sm' | 'md'; // lg 제외

interface FilterButtonProps extends Omit<BaseButtonProps, 'size'> {
  size?: FilterButtonSize; // BaseButtonProps의 size 대신 사용
  icon?: ReactNode;
  selected?: boolean;
}

export const FilterButton = ({
  children,
  icon,
  size = 'md',
  selected = false,
  className = '',
  ...props
}: FilterButtonProps) => {
  // 공통 스타일
  const baseClasses =
    'inline-flex items-center justify-center rounded-full ' +
    'cursor-pointer transition-all duration-200 ease-in-out ' +
    'leading-none disabled:cursor-not-allowed';

  // 선택 상태에 따른 스타일
  const stateClasses = selected
    ? 'bg-gray-900 text-white border-none'
    : 'bg-white text-gray-950 border border-gray-50';

  // 폰트 클래스: size에 따라 lg/md, selected에 따라 bold/medium
  const getFontClass = () => {
    const fontSize = size === 'sm' ? 'md' : 'lg';
    const fontWeight = selected ? 'bold' : 'medium';
    return `font-${fontSize}-${fontWeight}`;
  };

  // 크기에 따른 간격 및 패딩
  const sizeClasses = {
    sm: 'gap-1 py-2.5 px-3.5', // gap-[4px], py-[10px], px-[14px]
    md: 'gap-1.5 py-2.5 px-4', // gap-[6px], py-[10px], px-[16px]
  };

  // 아이콘 크기
  const iconSizeClasses = {
    sm: 'w-4 h-4', // 16px
    md: 'w-6 h-6', // 24px
  };

  const classes = `${baseClasses} ${stateClasses} ${sizeClasses[size]} ${getFontClass()} ${className}`;

  return (
    <button className={classes} type='button' {...props}>
      {icon && (
        <span className={`inline-flex items-center justify-center ${iconSizeClasses[size]}`}>
          {icon}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};
