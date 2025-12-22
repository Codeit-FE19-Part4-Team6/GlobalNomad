/**
 * ActionButton 컴포넌트
 *
 * 승인, 수정, 삭제, 거절하기 등의 행동을 위한 액션 버튼입니다.
 *
 * ## 특징
 * - 2가지 variant 지원 (neutral, muted)
 * - 고정 크기 (padding: 6px 10px, border-radius: 8px)
 * - 14px 폰트 사이즈
 * - 호버 시 opacity 0.9 효과
 *
 * ## Variants
 * - `neutral`: 흰색 배경, 회색 텍스트, 회색 테두리 (기본 액션)
 * - `muted`: Gray-50 배경, 회색 텍스트, 회색 테두리 (보조 액션)
 *
 * @example
 * ```tsx
 * // Neutral 버튼 (기본 액션)
 * <ActionButton variant='neutral'>승인하기</ActionButton>
 * <ActionButton variant='neutral'>수정하기</ActionButton>
 *
 * // Muted 버튼 (보조 액션)
 * <ActionButton variant='muted'>거절하기</ActionButton>
 * <ActionButton variant='muted'>삭제하기</ActionButton>
 *
 * // onClick 핸들러와 함께
 * <ActionButton
 *   variant='neutral'
 *   onClick={() => console.log('승인!')}
 * >
 *   승인하기
 * </ActionButton>
 * ```
 */

import React from 'react';

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

type ActionButtonType = 'neutral' | 'muted';

interface ActionButtonProps extends BaseButtonProps {
  variant: ActionButtonType;
}

export const ActionButton = ({
  variant,
  children,
  className = '',
  ...props
}: ActionButtonProps) => {
  // 공통 스타일
  const baseClasses =
    'inline-flex items-center justify-center ' +
    'rounded-lg px-2.5 py-1.5 ' +
    'text-sm font-medium leading-none ' +
    'cursor-pointer transition-all duration-200 ease-in-out ' +
    'disabled:cursor-not-allowed disabled:opacity-50 ' +
    'hover:opacity-90';

  // Variant별 스타일
  const variantClasses = {
    neutral: 'bg-white text-gray-600 border border-gray-50',
    muted: 'bg-gray-50 text-gray-600 border border-gray-50',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button className={classes} type='button' {...props}>
      {children}
    </button>
  );
};
