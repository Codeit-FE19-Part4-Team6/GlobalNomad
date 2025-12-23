/**
 * Input 검증을 위한 커스텀 훅
 */

import { useState, useCallback } from 'react';
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  type ValidationResult,
} from '@/utils/validation';

export type ValidationType = 'email' | 'password' | 'passwordConfirm';

interface UseInputValidationProps {
  type?: ValidationType;
  compareValue?: string; // passwordConfirm 타입일 때 비교할 비밀번호
  validateOnChange?: boolean; // 입력할 때마다 검증할지 여부
}

export const useInputValidation = ({
  type,
  compareValue,
  validateOnChange = false,
}: UseInputValidationProps = {}) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [touched, setTouched] = useState(false);

  const validate = useCallback(
    (value: string): ValidationResult => {
      if (!type) {
        return { isValid: true };
      }

      let result: ValidationResult;

      switch (type) {
        case 'email':
          result = validateEmail(value);
          break;
        case 'password':
          result = validatePassword(value);
          break;
        case 'passwordConfirm':
          result = validatePasswordConfirm(compareValue || '', value);
          break;
        default:
          result = { isValid: true };
      }

      setError(!result.isValid);
      setErrorMessage(result.message || '');

      return result;
    },
    [type, compareValue]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (validateOnChange && touched) {
        validate(value);
      }

      return value;
    },
    [validate, validateOnChange, touched]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setTouched(true);
      validate(e.target.value);
    },
    [validate]
  );

  const reset = useCallback(() => {
    setError(false);
    setErrorMessage('');
    setTouched(false);
  }, []);

  return {
    error,
    errorMessage,
    touched,
    validate,
    handleChange,
    handleBlur,
    reset,
  };
};
