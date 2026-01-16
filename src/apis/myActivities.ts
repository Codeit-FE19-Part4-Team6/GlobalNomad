import { http } from '@/apis/http';
import type { MyActivitiesParams, MyActivitiesResponse } from '@/apis/type';

// 내 체험 삭제
export const deleteMyActivity = async ({ activityId }: { activityId: number }) => {
  const response = await http.delete(`/my-activities/${activityId}`);
  return response.data;
};

// 내 체험 리스트 조회
export const getMyActivities = async (
  params?: MyActivitiesParams
): Promise<MyActivitiesResponse> => {
  const response = await http.get('/my-activities', { params });
  return response.data;
};
