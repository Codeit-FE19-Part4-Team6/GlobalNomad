import { forwardRef, useState } from 'react';
import { BaseInput } from './BaseInput';
import { type BaseInputProps } from './types';
import { useInputValidation, type ValidationType } from '@/hooks/useInputValidation';
import Icons from '@/assets/icons';

export interface PasswordInputProps extends Omit<BaseInputProps, 'type'> {
  validationType?: Extract<ValidationType, 'password' | 'passwordConfirm'>;
  compareValue?: string; // passwordConfirm 타입일 때 비교할 비밀번호
  validateOnChange?: boolean;
}

/**
 * PasswordInput 컴포넌트
 *
 * 비밀번호 입력을 위한 Input 컴포넌트입니다.
 * 비밀번호 보기/숨기기 토글 아이콘을 기본으로 제공하며,
 * 비밀번호 및 비밀번호 확인(validation) 시나리오를 지원합니다.
 *
 * BaseInput을 기반으로 하며,
 * 내부적으로 useInputValidation 훅을 사용해 검증 상태를 관리합니다.
 *
 * @remarks
 * - validationType이 지정되면 입력값 검증이 자동 적용됩니다.
 * - 외부에서 전달된 error / errorMessage가 내부 검증보다 우선합니다.
 * - compareValue는 passwordConfirm 검증 시 필수입니다.
 *
 * @example 비밀번호 입력
 * ```tsx
 *
 * <PasswordInput
 *   label="비밀번호"
 *   placeholder="비밀번호를 입력하세요"
 *   validationType="password"
 *   validateOnChange
 * />
 * ```
 *
 * @example 비밀번호 확인
 * ```tsx
 * <PasswordInput
 *   label="비밀번호 확인"
 *   placeholder="비밀번호를 다시 입력하세요"
 *   validationType="passwordConfirm"
 *   compareValue={password}
 * />
 * ```
 *
 * @example 회원가입 폼에서 사용
 * ```tsx
 * <PasswordInput
 *   label="비밀번호"
 *   required
 * />
 *
 * <PasswordInput
 *   label="비밀번호 확인"
 *   compareValue={password}
 *   required
 * />
 * ```
 */

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className = '',
      validationType,
      compareValue,
      validateOnChange = false,
      onChange,
      onBlur,
      error: externalError,
      errorMessage: externalErrorMessage,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
      error: validationError,
      errorMessage: validationErrorMessage,
      handleChange,
      handleBlur,
    } = useInputValidation({
      type: validationType,
      compareValue,
      validateOnChange,
    });

    // 외부에서 전달된 error가 우선, 없으면 validation error 사용
    const finalError = externalError !== undefined ? externalError : validationError;
    const finalErrorMessage =
      externalErrorMessage !== undefined ? externalErrorMessage : validationErrorMessage;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e);
      onChange?.(e);
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      handleBlur(e);
      onBlur?.(e);
    };

    return (
      <div className='relative w-full'>
        <BaseInput
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={`pr-12 ${className}`}
          error={finalError}
          errorMessage={finalErrorMessage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          {...props}
        />
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute top-[56px] right-4 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700`}
          aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          tabIndex={-1}>
          {showPassword ? <Icons.PasswordShow /> : <Icons.PasswordHidden />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
