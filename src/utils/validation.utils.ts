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
    if (!response.ok) {
      throw new Error('이메일 중복 확인 중 오류가 발생했습니다.');
    }
    const data = await response.json();
    return data.isDuplicate;
  } catch (error) {
    console.error('이메일 중복 체크 실패:', error);
    throw error;
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
