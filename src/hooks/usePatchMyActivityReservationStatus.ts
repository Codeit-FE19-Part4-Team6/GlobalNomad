import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchMyActivityReservationStatus } from '@/apis/patchMyActivityReservationStatus';
import type { ReservationStatus } from '@/types/reservation';

type Vars = {
  activityId: number;
  reservationId: number;
  status: ReservationStatus;
};

export function usePatchMyActivityReservationStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ activityId, reservationId, status }: Vars) =>
      patchMyActivityReservationStatus(activityId, reservationId, status),

    onSuccess: () => {
      // ✅ 예약내역/시간대 카운트 둘 다 최신화 필요
      qc.invalidateQueries({ queryKey: ['myActivityReservations'] });
      qc.invalidateQueries({ queryKey: ['reservedSchedule'] });
      qc.invalidateQueries({ queryKey: ['myActivitySchedules'] });
    },
  });
}
