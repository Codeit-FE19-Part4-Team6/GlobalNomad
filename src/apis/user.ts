import { http } from './http';
import type { User, UserEditRequest } from './type';

// 내 정보 조회
// 비밀번호는 보안상 내려오지 않음
export const getMyInfo = async (): Promise<User> => {
  const res = await http.get<User>('/users/me');
  return res.data;
};

// 내 정보 수정 (닉네임, 비밀번호)
export const editMyInfo = async (payload: Partial<UserEditRequest>): Promise<User> => {
  // 서버에 불필요한 값 전송 방지
  if (!payload.newPassword) {
    delete payload.newPassword;
  }
  if (!payload.nickname) {
    delete payload.nickname;
  }
  if (!payload.profileImageUrl) {
    delete payload.profileImageUrl;
  }

  // 내 정보 수정 요청
  // 변경된 필드만 서버에서 반영
  const res = await http.patch<User>('/users/me', payload);
  return res.data;
};

// 프로필 이미지 업로드
export const uploadProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await http.post<{ profileImageUrl: string }>('/users/me/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  // 업로드된 이미지 URL 반환
  return res.data.profileImageUrl;
};
