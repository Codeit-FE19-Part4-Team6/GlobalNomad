import { http } from '@/apis/http';

// 내 체험 리스트 조회
export const getMyActivities = async () => {
  const response = await http.get(`/my-activities`);
  return response.data;
};
// 내 체험 삭제
export const deleteMyActivity = async ({ activityId }: { activityId: number }) => {
  const response = await http.delete(`/my-activities/${activityId}`);
  return response.data;
};
