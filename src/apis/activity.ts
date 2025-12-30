import { http } from '@/apis/http';
import type { createdActivityRequest } from '@/types/activityRequest';

export type CreatedActivityResponse = {
  id: number;
};

export const createActivity = async (payload: createdActivityRequest) => {
  const res = await http.post<CreatedActivityResponse>('/activities', payload);
  return res.data;
};
