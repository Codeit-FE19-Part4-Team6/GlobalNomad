/**
 * 입력 검증 유틸리티 함수들
 */

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * 이메일 형식 검증
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, message: '이메일을 입력해주세요' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { isValid: false, message: '올바른 이메일 형식이 아닙니다' };
  }

  return { isValid: true };
};

/**
 * 비밀번호 검증 (8자 이상)
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: '비밀번호를 입력해주세요' };
  }

  if (password.length < 8) {
    return { isValid: false, message: '비밀번호는 8자 이상이어야 합니다' };
  }

  return { isValid: true };
};

/**
 * 비밀번호 확인 검증
 */
export const validatePasswordConfirm = (
  password: string,
  passwordConfirm: string
): ValidationResult => {
  if (!passwordConfirm) {
    return { isValid: false, message: '비밀번호 확인을 입력해주세요' };
  }

  if (password !== passwordConfirm) {
    return { isValid: false, message: '비밀번호가 일치하지 않습니다' };
  }

  return { isValid: true };
};
