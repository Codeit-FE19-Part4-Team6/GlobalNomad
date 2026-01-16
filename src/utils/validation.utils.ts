// src/utils/validation.utils.ts

/**
 * 이메일 유효성 검사
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

/**
 * 비밀번호 유효성 검사 (8자 이상 16자 이하, 영문+숫자 포함)
 */
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/;
  return passwordRegex.test(password);
};

/**
 * 닉네임 유효성 검사 (2-8자, 한글/영문/숫자만 허용)
 */
export const isValidNickname = (nickname: string): boolean => {
  const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/;
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
  if (!error) {
    return undefined;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error.message) {
    return error.message;
  }
  return undefined;
};

/**
 * 이메일 중복 체크 (API 호출)
 */
export const checkEmailDuplicate = async (email: string) => {
  try {
    // TODO: backend endpoint TBD (email availability check)
    const res = await fetch(`/api/availability/email?email=${email}`);
    if (!res.ok) {
      throw new Error('이메일 중복 확인 중 오류가 발생했습니다.');
    }
    const data = await res.json();
    return data.isDuplicate;
  } catch (error) {
    console.error('이메일 중복 체크 실패:', error);
    throw error;
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
