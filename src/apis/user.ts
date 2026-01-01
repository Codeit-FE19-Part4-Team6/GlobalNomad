import { http } from './http';
import type { User, UserEditRequest } from './type';

// 내 정보 조회
export const getMyInfo = async (): Promise<User> => {
  const res = await http.get<User>('/users/me');
  return res.data;
};

// 내 정보 수정 (닉네임, 비밀번호)
export const editMyInfo = async (payload: Partial<UserEditRequest>): Promise<User> => {
  const res = await http.patch<User>('/users/me', payload); // 변경된 필드만 서버에서 반영
  return res.data;
};
