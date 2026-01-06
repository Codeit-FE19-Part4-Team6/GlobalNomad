// src/utils/errorMessages.ts

export const getSignupErrorMessage = (error: any): string => {
  const status = error.response?.status;

  // HTTP 상태 코드로 폴백
  switch (status) {
    case 400:
      return '입력 정보를 확인해주세요.';
    case 409:
      return '이미 가입된 이메일입니다.';
    case 500:
      return '서버 오류가 발생했습니다.';
    default:
      return error.response?.data?.message || '회원가입에 실패했습니다.';
  }
};

export const getLoginErrorMessage = (error: any): string => {
  const status = error.response?.status;
  // HTTP 상태 코드로 폴백
  switch (status) {
    case 400:
      return '비밀번호가 일치하지 않습니다.';
    case 404:
      return '존재하지 않는 유저입니다.';
    case 500:
      return '서버 오류가 발생했습니다.';
    default:
      return error.response?.data?.message || '로그인에 실패했습니다.';
  }
};
