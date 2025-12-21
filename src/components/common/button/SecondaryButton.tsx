/**
 * SecondaryButton 컴포넌트
 *
 * 로그인/회원가입, 2개 중 선택을 유도하는 버튼 그룹에 사용하는 보조 버튼입니다.
 *
 * ## 특징
 * - 3가지 크기 지원 (sm, md, lg)
 * - 아이콘 지원 (optional)
 * - Active 상태 지원 (Primary 색상으로 변경)
 * - Disabled 상태 지원
 * - 흰색 배경에 회색 테두리 디자인
 * - 호버 시 배경색 변경 (gray-50)
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Button.Secondary size='md'>Button</Button.Secondary>
 *
 * // 아이콘과 함께
 * <Button.Secondary size='lg' icon={<GoogleIcon />}>
 *   Large with Icon
 * </Button.Secondary>
 *
 * <Button.Secondary size='md' icon={<GoogleIcon />}>
 *   Medium with Icon
 * </Button.Secondary>
 *
 * <Button.Secondary size='sm' icon={<GoogleIcon />}>
 *   Small with Icon
 * </Button.Secondary>
 *
 * // Active 상태 (선택됨)
 * <Button.Secondary size='lg' icon={<GoogleIcon />} active>
 *   Active State
 * </Button.Secondary>
 *
 * // Disabled 상태
 * <Button.Secondary size='lg' icon={<GoogleIcon />} disabled>
 *   Disabled
 * </Button.Secondary>
 *
 * // 버튼 그룹 예제
 * <div style={{ display: 'flex', gap: '8px' }}>
 *   <Button.Secondary active>로그인</Button.Secondary>
 *   <Button.Secondary>회원가입</Button.Secondary>
 * </div>
 * ```
 */

import React from 'react';
import { type BaseButtonProps, type ButtonSize } from './types';

interface SecondaryButtonProps extends BaseButtonProps {
  icon?: React.ReactNode;
  active?: boolean;
  size?: ButtonSize;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  icon,
  size = 'md',
  active = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const fontClass = size === 'sm' ? 'font-md-medium' : 'font-lg-medium';
  const stateClass = disabled ? 'disabled' : active ? 'active' : 'normal';

  const classes = `button button-secondary button-secondary--${size} ${fontClass} button-secondary--${stateClass} ${className}`;

  return (
    <button className={classes} disabled={disabled} {...props}>
      {icon && (
        <span className={`button-secondary__icon button-secondary__icon--${size}`}>{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};
