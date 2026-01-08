import { http } from '@/apis/http';
import type {
  CreateActivityRequest,
  MyActivityEditRequest,
  ActivityDetailResponse,
  ActivityReviewParams,
  ActivityReviewResponse,
} from './type';

export type CreatedActivityResponse = {
  id: number;
};

export const createActivity = async (payload: CreateActivityRequest) => {
  const res = await http.post<CreatedActivityResponse>('/activities', payload);
  return res.data;
};

export const getActivityDetail = async (activityId: number) => {
  const res = await http.get<ActivityDetailResponse>(`/activities/${activityId}`);
  return res.data;
};

export const patchActivity = async (activityId: number, payload: MyActivityEditRequest) => {
  const res = await http.patch(`/my-activities/${activityId}`, payload);
  return res.data;
};

export const getActivityReviews = async ({
  activityId,
  page = 1,
  size = 3,
}: ActivityReviewParams) => {
  const res = await http.get<ActivityReviewResponse>(`/activities/${activityId}/reviews`, {
    params: { page, size },
  });
  return res.data;
};
