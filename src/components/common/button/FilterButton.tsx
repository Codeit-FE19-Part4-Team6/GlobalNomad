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
 * // 아이콘은 임포트 해와서 사용합니다.
 * import {
    ArtIcon,
    FoodIcon,
    SportIcon,
    TourIcon,
    BusIcon,
    WellbeingIcon,
  } from '@/components/common/button/icons';

 * // 기본 사용
 * <Button.Filter>카테고리</Button.Filter>
 *
 * // 아이콘과 함께
 * <Button.Filter icon={<ArtIcon />}>With Icon</Button.Filter>
 *
 * // 선택 상태
 * <Button.Filter size='md' icon={<FoodIcon />} selected>
 *   Selected
 * </Button.Filter>
 *
 * // 작은 크기
 * <Button.Filter size='sm' icon={<WellbeingIcon />}>
 *   Small Size
 * </Button.Filter>
 *
 * // 아이콘 없이 선택 상태
 * <Button.Filter selected>No Icon Selected</Button.Filter>
 * ```
 */

import React from 'react';
import { type BaseButtonProps, type ButtonSize } from './types';

interface FilterButtonProps extends BaseButtonProps {
  icon?: React.ReactNode;
  selected?: boolean;
  size?: ButtonSize;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  children,
  icon,
  size = 'md',
  selected = false,
  className = '',
  ...props
}) => {
  const stateClass = selected ? 'selected' : 'normal';

  const fontWeight = selected ? 'bold' : 'medium';
  const sizeClass =
    size === 'sm'
      ? `font-md-${fontWeight} gap-[4px] py-[10px] px-[14px]`
      : `font-lg-${fontWeight} gap-[6px] py-[10px] px-[16px]`;

  const classes = `button button-filter ${sizeClass} button-filter--${stateClass} ${icon ? 'button-filter--with-icon' : ''} ${className}`;
  const iconClass =
    size === 'sm' ? 'button-filter__icon icon-size--sm' : 'button-filter__icon icon-size--md';

  return (
    <button className={classes} {...props}>
      {icon && <span className={iconClass}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
