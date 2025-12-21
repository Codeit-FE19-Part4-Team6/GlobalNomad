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
 * <Button.Action variant='neutral'>승인하기</Button.Action>
 * <Button.Action variant='neutral'>수정하기</Button.Action>
 *
 * // Muted 버튼 (보조 액션)
 * <Button.Action variant='muted'>거절하기</Button.Action>
 * <Button.Action variant='muted'>삭제하기</Button.Action>
 *
 * // onClick 핸들러와 함께
 * <Button.Action
 *   variant='neutral'
 *   onClick={() => handleApprove()}
 * >
 *   승인하기
 * </Button.Action>
 *
 * // 버튼 그룹 예제
 * <div style={{ display: 'flex', gap: '8px' }}>
 *   <Button.Action variant='neutral'>승인</Button.Action>
 *   <Button.Action variant='muted'>거절</Button.Action>
 * </div>
 * ```
 */

import React from 'react';
import { type BaseButtonProps, type ActionButtonType } from './types';

interface ActionButtonProps extends BaseButtonProps {
  variant: ActionButtonType;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  variant,
  children,
  className = '',
  ...props
}) => {
  const classes = `button button-action button-action--${variant} ${className}`;

  return (
    <button className={classes} type='button' {...props}>
      {children}
    </button>
  );
};
