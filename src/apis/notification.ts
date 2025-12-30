import { http } from '@/apis/http';
import type { MyActivitiesParams, NotificationsResponse } from '@/apis/type';

const notificationApi = {
  // 내 알림 리스트 조회
  getNotifications: async (params: MyActivitiesParams) => {
    const response = await http.get<NotificationsResponse>('/my-notifications', {
      params,
    });
    return response.data;
  },
  // 내 알림 리스트 삭제
  deleteNotification: async (notificationId: number) => {
    const response = await http.delete(`/my-notifications/${notificationId}`);
    return response.data;
  },
};

export default notificationApi;
