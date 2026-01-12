import { http } from '@/apis/http';
import type { MyReservationsResponse } from '@/apis/type';

type GetActivityReservationsParams = {
  activityId: number;
  status?: 'pending' | 'confirmed' | 'declined' | 'completed';
};

export const getActivityReservations = async (params: GetActivityReservationsParams) => {
  const res = await http.get<MyReservationsResponse>('/my-reservations', { params });
  return res.data.reservations;
};
