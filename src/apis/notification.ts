import { http } from '@/apis/http';
import type { NotificationsResponse } from '@/apis/type';

const notificationApi = {
  // 내 알림 리스트 조회
  getNotifications: async (cursorId?: number, size?: number) => {
    const response = await http.get<NotificationsResponse>('/my-notifications', {
      params: {
        cursorId,
        size,
      },
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
