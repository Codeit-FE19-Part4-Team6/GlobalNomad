import { forwardRef, useState } from 'react';
import { BaseInput } from './BaseInput';
import { type BaseInputProps } from './types';
import Icons from '@/assets/icons';

// ✅ 개선 - 명시적으로 추가
export interface PasswordInputProps extends Omit<BaseInputProps, 'type' | 'rightElement'> {
  /** 비밀번호 보기/숨기기 토글 표시 여부 @default true */
  showToggle?: boolean;
}
/**
 * PasswordInput 컴포넌트
 *
 * 비밀번호 입력을 위한 Input 컴포넌트입니다.
 * 비밀번호 보기/숨기기 토글 아이콘을 제공합니다.
 *
 * @remarks
 * - 검증 로직은 포함하지 않으며, 상위 컴포넌트나 폼 라이브러리에서 관리합니다.
 * - error와 errorMessage props를 통해 외부에서 에러 상태를 제어할 수 있습니다.
 *
 * @example 기본 사용
 * ```tsx
 * <PasswordInput
 *   label="비밀번호"
 *   placeholder="비밀번호를 입력하세요"
 * />
 * ```
 *
 * @example 에러 상태
 * ```tsx
 * <PasswordInput
 *   label="비밀번호"
 *   error={true}
 *   errorMessage="비밀번호는 8자 이상이어야 합니다"
 * />
 * ```
 *
 * @example React Hook Form과 함께 사용
 * ```tsx
 * const { register, formState: { errors } } = useForm();
 *
 * <PasswordInput
 *   label="비밀번호"
 *   {...register('password', {
 *     required: '비밀번호를 입력해주세요',
 *     minLength: { value: 8, message: '8자 이상 입력하세요' }
 *   })}
 *   error={!!errors.password}
 *   errorMessage={errors.password?.message}
 * />
 * ```
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleButton = showToggle ? (
      <button
        type='button'
        onClick={() => setShowPassword((prev) => !prev)}
        className='text-gray-500 transition-colors hover:text-gray-700'
        aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}>
        {showPassword ? <Icons.PasswordShow /> : <Icons.PasswordHidden />}
      </button>
    ) : undefined;

    return (
      <BaseInput
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        rightElement={toggleButton}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
