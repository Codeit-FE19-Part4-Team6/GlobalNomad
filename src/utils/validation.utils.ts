// src/utils/validation.utils.ts

/**
 * 이메일 유효성 검사
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

/**
 * 비밀번호 유효성 검사 (8자 이상, 영문+숫자 포함)
 */
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
  return passwordRegex.test(password);
};

/**
 * 비밀번호 강도 검사
 * @returns weak | medium | strong
 */
// export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
//   if (password.length < 8) return 'weak';

//   const hasLower = /[a-z]/.test(password);
//   const hasUpper = /[A-Z]/.test(password);
//   const hasNumber = /[0-9]/.test(password);
//   const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//   const strength = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

//   if (strength >= 4 && password.length >= 12) return 'strong';
//   if (strength >= 3 && password.length >= 8) return 'medium';
//   return 'weak';
// };

/**
 * 닉네임 유효성 검사 (2-10자, 한글/영문/숫자만 허용)
 */
export const isValidNickname = (nickname: string): boolean => {
  const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
  return nicknameRegex.test(nickname);
};

/**
 * 비밀번호 일치 확인
 */
export const isPasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword && password.length > 0;
};

/**
 * 에러 메시지 추출 헬퍼
 */
export const getErrorMessage = (error: any): string | undefined => {
  if (!error) return undefined;
  if (typeof error === 'string') return error;
  if (error.message) return error.message;
  return undefined;
};

/**
 * 이메일 중복 체크 (API 호출)
 */
export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  try {
    // TODO: 실제 API 엔드포인트로 교체
    const response = await fetch(`/api/auth/check-email?email=${email}`);
    const data = await response.json();
    return data.isDuplicate;
  } catch (error) {
    console.error('이메일 중복 체크 실패:', error);
    return false;
  }
};

/**
 * 닉네임 중복 체크 (API 호출)
 */
export const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
  try {
    // TODO: 실제 API 엔드포인트로 교체
    const response = await fetch(`/api/auth/check-nickname?nickname=${nickname}`);
    const data = await response.json();
    return data.isDuplicate;
  } catch (error) {
    console.error('닉네임 중복 체크 실패:', error);
    return false;
  }
};

/**
 * 폼 데이터 검증
 */
export interface SignupFormData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export const validateSignupForm = (data: SignupFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.email) {
    errors.email = '이메일을 입력해주세요';
  } else if (!isValidEmail(data.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다';
  }

  if (!data.nickname) {
    errors.nickname = '닉네임을 입력해주세요';
  } else if (!isValidNickname(data.nickname)) {
    errors.nickname = '닉네임은 2-10자의 한글, 영문, 숫자만 가능합니다';
  }

  if (!data.password) {
    errors.password = '비밀번호를 입력해주세요';
  } else if (!isValidPassword(data.password)) {
    errors.password = '8자 이상, 영문과 숫자를 포함해야 합니다';
  }

  if (!data.passwordConfirm) {
    errors.passwordConfirm = '비밀번호 확인을 입력해주세요';
  } else if (!isPasswordMatch(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다';
  }

  return errors;
};
