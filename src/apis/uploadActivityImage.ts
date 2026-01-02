import { http } from '@/apis/http';

type UploadActivityImageResponse = {
  activityImageUrl: string;
};

//서버가 경로를 다르게 설정하여 같은 등록페이지여도 경로를 다르게 하기 위해 이미지용 post를 만들어야 함
//나중에 같은 작업이 있을 때 스웨거 확인하고 작업하기.
export const uploadActivityImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file); // Swagger 필드명 그대로 "image"

  const res = await http.post<UploadActivityImageResponse>(`/activities/image`, formData);

  return res.data.activityImageUrl;
};
