import { http } from './http';
/**
 * 프로필 이미지 업로드 API
 *
 * - 로그인 후 발급된 accessToken은 axios interceptor(http.ts)에서 자동으로 첨부됨
 * - 서버는 multipart/form-data 형식과 "image"라는 key 이름을 기대함
 * - 성공 시 업로드된 이미지의 URL을 반환
 */
export const uploadImageToServer = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error('업로드할 파일이 없습니다.');
  }
  /**
   * multipart/form-data 생성을 위한 FormData 객체
   * - key 이름은 서버 스웨거 기준으로 "image"
   */
  const formData = new FormData();
  formData.append('image', file);

  const res = await http.post<{ profileImageUrl: string }>('/users/me/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.profileImageUrl; // 서버에서 내려주는 업로드된 이미지 URL 반환
};
