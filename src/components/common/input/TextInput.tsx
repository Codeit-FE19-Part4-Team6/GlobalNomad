import { forwardRef } from 'react';
import { BaseInput } from './BaseInput';
import { type BaseInputProps } from './types';
import { useInputValidation, type ValidationType } from '@/hooks/useInputValidation';

export interface TextInputProps extends BaseInputProps {
  validationType?: ValidationType;
  validateOnChange?: boolean;
}

/**
 * TextInput 컴포넌트
 *
 * 일반 텍스트 입력을 위한 기본 Input 컴포넌트입니다.
 * BaseInput을 기반으로 하며, type="text"를 기본값으로 사용합니다.
 *
 * 주로 이름, 이메일, 일반 문자열 입력에 사용되며
 * validationType을 통해 입력값 검증 로직을 쉽게 적용할 수 있습니다.
 *
 * @remarks
 * - 내부적으로 BaseInput을 사용합니다.
 * - validationType이 설정된 경우 useInputValidation 훅과 연동됩니다.
 * - error / errorMessage가 외부에서 전달되면 해당 값이 우선 적용됩니다.
 *
 * @example 기본 사용
 * ```tsx
 * <TextInput
 *   label="이름"
 *   placeholder="이름을 입력하세요"
 * />
 * ```
 *
 * @example 이메일 입력 + 실시간 검증
 * ```tsx
 * <TextInput
 *   label="이메일"
 *   type="email"
 *   placeholder="email@example.com"
 *   validationType="email"
 *   validateOnChange
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 * ```
 *
 * @example 폼에서 필수 입력
 * ```tsx
 * <TextInput
 *   label="이메일"
 *   required
 * />
 * ```
 */

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type = 'text',
      validationType,
      validateOnChange = false,
      onChange,
      onBlur,
      error: externalError,
      errorMessage: externalErrorMessage,
      ...props
    },
    ref
  ) => {
    const {
      error: validationError,
      errorMessage: validationErrorMessage,
      handleChange,
      handleBlur,
    } = useInputValidation({
      type: validationType,
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
      <BaseInput
        ref={ref}
        type={type}
        error={finalError}
        errorMessage={finalErrorMessage}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        {...props}
      />
    );
  }
);

TextInput.displayName = 'TextInput';
