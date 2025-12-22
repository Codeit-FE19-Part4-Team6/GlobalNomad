/**
 * PrimaryButton 컴포넌트
 *
 * 주요 액션을 위한 기본 버튼 컴포넌트입니다.
 *
 * ## 특징
 * - 3가지 크기 지원 (sm, md, lg)
 * - Primary 500 배경색과 흰색 텍스트
 * - 크기에 따라 자동으로 폰트 크기 조정 (sm: 14px, md/lg: 16px)
 * - Disabled 상태 지원
 * - 호버 시 opacity 0.9 효과
 *
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Button.Primary size='md'>클릭하세요</Button.Primary>
 *
 * // 크기별 사용
 * <Button.Primary size='lg'>Large Button</Button.Primary>
 * <Button.Primary size='md'>Medium Button</Button.Primary>
 * <Button.Primary size='sm'>Small Button</Button.Primary>
 *
 * // Disabled 상태
 * <Button.Primary size='lg' disabled>
 *   Disabled
 * </Button.Primary>
 *
 * // 커스텀 클래스와 onClick 핸들러
 * <Button.Primary
 *   size='md'
 *   className='custom-class'
 *   onClick={() => console.log('clicked')}
 * >
 *   Submit
 * </Button.Primary>
 * ```
 */

import { type BaseButtonProps, type ButtonSize } from './types';

interface PrimaryButtonProps extends BaseButtonProps {
  size?: ButtonSize;
}

export const PrimaryButton = ({
  children,
  size = 'md',
  disabled = false,
  className = '',
  ...props
}: PrimaryButtonProps) => {
  // size에 따른 스타일 클래스
  const sizeClasses = {
    lg: 'h-[54px] px-6 py-3.5 rounded-2xl text-base font-bold',
    md: 'h-12 px-5 py-3.5 rounded-[14px] text-base font-bold',
    sm: 'h-[34px] px-4 py-3 rounded-xl text-sm font-bold',
  };

  const baseClasses =
    'inline-flex items-center justify-center bg-primary-500 text-white border-none cursor-pointer transition-all duration-200 ease-in-out hover:opacity-90 disabled:bg-gray-200 disabled:text-gray-50 disabled:opacity-60 disabled:cursor-not-allowed leading-none';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      type='button'
      {...props}>
      {children}
    </button>
  );
};
