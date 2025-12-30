import { http } from './api/http';

type UploadImageResponse = {
  imageUrl?: string;
  url?: string;
  fileUrl?: string;
  location?: string;
};

/**
 * 서버에 이미지를 업로드하고 결과 URL을 반환합니다.
 * - 서버 응답에서 가능한 여러 필드(imageUrl|url|fileUrl|location)를 확인하여 URL을 추출합니다.
 * - URL이 없으면 에러를 throw 합니다.
 */
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();

  // 대부분의 서버는 image, file 등 다양한 키를 사용하므로 두 가지 모두 추가
  formData.append('image', file);
  formData.append('file', file);

  const res = await http.post<UploadImageResponse>('/images', formData);

  const url = res.data.imageUrl ?? res.data.url ?? res.data.fileUrl ?? res.data.location;

  if (!url) {
    // 응답 전체를 확인하기 쉽게 에러를 던집니다.
    throw new Error('업로드 응답에 URL이 없습니다.');
  }

  return url;
}
