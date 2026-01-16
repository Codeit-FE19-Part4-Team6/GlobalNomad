import { http } from '@/apis/http';
import type {
  CreateActivityRequest,
  MyActivityEditRequest,
  ActivityDetailResponse,
  ActivityReviewParams,
  ActivityReviewResponse,
  ActivityRequest,
  ActivityResponse,
  ActivityScheduleParams,
  ActivityScheduleResponse,
  ActivityReservationRequest,
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

export const getActivities = async (params: ActivityRequest) => {
  const res = await http.get<ActivityResponse>('/activities', { params });
  return res.data;
};

// 체험 예약 가능일 조회
export const getActivitySchedules = async ({ activityId, year, month }: ActivityScheduleParams) => {
  const res = await http.get<ActivityScheduleResponse[]>(
    `/activities/${activityId}/available-schedule`,
    { params: { year, month: String(month).padStart(2, '0') } }
  );
  return res.data;
};

// 체험 예약 신청
export const createActivityReservation = async (
  activityId: number,
  payload: ActivityReservationRequest
) => {
  const res = await http.post(`/activities/${activityId}/reservations`, payload);
  return res.data;
};
