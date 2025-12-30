import { http } from '@/apis/http';
import type { MyActivitiesParams, Notification } from '@/apis/type';

const notificationApi = {
  // 내 알림 리스트 조회
  getNotifications: async (params: MyActivitiesParams) => {
    return http.get<Notification>('/my-notifications', {
      params,
    });
  },

  deleteNotification: async (notificationId: number) => {
    return http.delete(`/my-notifications/${notificationId}`);
  },
};

export default notificationApi;
