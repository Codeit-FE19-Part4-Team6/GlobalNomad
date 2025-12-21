/**
 * CircleButton 컴포넌트
 *
 * 추가, 빼기, 삭제하기에 사용되는 아이콘 원형 버튼입니다.
 *
 * ## 특징
 * - 4가지 variant 지원 (plus, minus, close-dark, close-light)
 * - 고정 크기 원형 디자인 (plus/minus: 42px, close: 26px)
 * - 아이콘 커스터마이징 가능
 * - 아이콘 미제공 시 기본 텍스트 아이콘 표시
 * - 호버 시 opacity 0.9 효과
 *
 * ## Variants
 * - `plus`: Primary 색상 배경 (추가 버튼)
 * - `minus`: Gray-50 배경 (빼기 버튼)
 * - `close-dark`: 어두운 배경에 흰색 아이콘 (닫기)
 * - `close-light`: 투명 배경에 어두운 아이콘 (닫기)
 *
 * @example
 * 
 * ```tsx
 * 
 * // 아이콘을 임포트해서 사용해야 합니다.
 * import {
      PlusIcon,
      MinusIcon,
      CloseIcon,
    } from '@/components/common/button/icons';
 * 
 * // Plus 버튼
 * <Button.Circle
 *   variant='plus'
 *   icon={<PlusIcon />}
 *   onClick={() => alert('Plus clicked')}
 * />
 *
 * // Minus 버튼
 * <Button.Circle
 *   variant='minus'
 *   icon={<MinusIcon />}
 *   onClick={() => alert('Minus clicked')}
 * />
 *
 * // Close Dark 버튼
 * <Button.Circle
 *   variant='close-dark'
 *   icon={<CloseIcon />}
 *   onClick={() => alert('Close dark clicked')}
 * />
 *
 * // Close Light 버튼
 * <Button.Circle
 *   variant='close-light'
 *   icon={<CloseIcon />}
 *   onClick={() => alert('Close light clicked')}
 * />
 * ```
 */

import React, { type ReactNode } from 'react';
import { type BaseButtonProps, type CircleButtonType } from './types';

interface CircleButtonProps extends Omit<BaseButtonProps, 'children'> {
  variant: CircleButtonType;
  icon?: ReactNode;
}

export const CircleButton: React.FC<CircleButtonProps> = ({
  variant,
  icon,
  className = '',
  ...props
}) => {
  const classes = `button button-circle button-circle--${variant} ${className}`;

  // 기본 아이콘 (icon prop이 없을 때만 사용)
  const defaultIconMap: Record<CircleButtonType, string> = {
    plus: '+',
    minus: '−',
    'close-dark': '×',
    'close-light': '×',
  };

  return (
    <button className={classes} type='button' {...props}>
      {icon || defaultIconMap[variant]}
    </button>
  );
};
