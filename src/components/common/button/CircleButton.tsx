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
 * import Icons from '@/assets/icons';
 *
 * // Plus 버튼
 * <Button.Circle
 *   variant='plus'
 *   icon={<Icons.Plus />}
 *   onClick={() => alert('Plus clicked')}
 * />
 *
 * // Minus 버튼
 * <Button.Circle
 *   variant='minus'
 *   icon={<Icons.Minus />}
 *   onClick={() => alert('Minus clicked')}
 * />
 *
 * // Close Dark 버튼
 * <Button.Circle
 *   variant='close-dark'
 *   icon={<Icons.Close />}
 *   onClick={() => alert('Close dark clicked')}
 * />
 *
 * // Close Light 버튼
 * <Button.Circle
 *   variant='close-light'
 *   icon={<Icons.Close />}
 *   onClick={() => alert('Close light clicked')}
 * />
 * ```
 */

import { type ReactNode } from 'react';
import { type BaseButtonProps, type CircleButtonType } from './types';

interface CircleButtonProps extends Omit<BaseButtonProps, 'children'> {
  variant: CircleButtonType;
  icon?: ReactNode;
}

export const CircleButton = ({ variant, icon, className = '', ...props }: CircleButtonProps) => {
  // variant별 스타일 클래스
  const variantClasses = {
    plus: 'w-[42px] h-[42px] bg-primary-500 text-white',
    minus: 'w-[42px] h-[42px] bg-gray-50 text-black',
    'close-dark': 'w-[26px] h-[26px] bg-gray-950 text-white',
    'close-light': 'w-[26px] h-[26px] bg-transparent text-gray-950',
  };

  const baseClasses =
    'inline-flex items-center justify-center rounded-full border-none p-0 cursor-pointer transition-all duration-200 ease-in-out hover:opacity-90 leading-none disabled:cursor-not-allowed';

  // 기본 아이콘 (icon prop이 없을 때만 사용)
  const defaultIconMap: Record<CircleButtonType, string> = {
    plus: '+',
    minus: '−',
    'close-dark': '×',
    'close-light': '×',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      type='button'
      {...props}>
      {icon || defaultIconMap[variant]}
    </button>
  );
};
