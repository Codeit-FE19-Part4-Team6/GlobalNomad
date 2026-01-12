import { http } from '@/apis/http';
import type { ReservationStatus } from '@/types/reservation';

type PatchReservationStatusBody = {
  status: ReservationStatus;
};

export async function patchMyActivityReservationStatus(
  activityId: number,
  reservationId: number,
  status: ReservationStatus
) {
  const body: PatchReservationStatusBody = { status };

  const res = await http.patch(`/my-activities/${activityId}/reservations/${reservationId}`, body);

  return res.data;
}
