// src/libs/api/activityImage.ts
import { http } from '@/libs/api/http';

type UploadActivityImageResponse = {
  activityImageUrl: string;
};

export const uploadActivityImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file); // Swagger 필드명 그대로 "image"

  const res = await http.post<UploadActivityImageResponse>(`/activities/image`, formData);

  return res.data.activityImageUrl;
};
