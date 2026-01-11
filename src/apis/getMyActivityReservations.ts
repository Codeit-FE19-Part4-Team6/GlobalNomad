import { http } from '@/apis/http';
import type { MyActivityReservationResponse } from '@/apis/type';

export type GetMyActivityReservationsParams = {
  scheduleId: number;
  status: 'declined' | 'pending' | 'confirmed' | 'completed';
  date?: string;
  cursorId?: number;
  size?: number;
};

export async function getMyActivityReservations(
  activityId: number,
  params: GetMyActivityReservationsParams
) {
  const res = await http.get<MyActivityReservationResponse>(
    `/my-activities/${activityId}/reservations`,
    { params }
  );
  return res.data;
}
