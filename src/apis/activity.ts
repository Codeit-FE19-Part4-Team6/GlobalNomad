import { http } from '@/apis/http';
import type { CreateActivityRequest } from './type';

export type CreatedActivityResponse = {
  id: number;
};

export const createActivity = async (payload: CreateActivityRequest) => {
  const res = await http.post<CreatedActivityResponse>('/activities', payload);
  return res.data;
};
