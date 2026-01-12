import { useQuery } from '@tanstack/react-query';
import { getActivityReservations } from '@/apis/getActivityReservations';
import type { MyReservationsResponse } from '@/apis/type';

type Reservation = MyReservationsResponse['reservations'][number];

type UseActivityReservationsParams = {
  activityId?: number; // ✅ 선택 전엔 undefined
  status?: Reservation['status']; // ✅ status 타입 재사용
  // cursorId/size는 지금 페이지에서 안 쓸 거면 빼도 됨
};

export const useActivityReservations = ({ activityId, status }: UseActivityReservationsParams) => {
  return useQuery({
    queryKey: ['activityReservations', activityId, status],
    queryFn: () =>
      getActivityReservations({
        activityId: activityId!, // enabled로 막아서 안전
        status,
      }),
    enabled: !!activityId, // ✅ activity 선택되기 전엔 호출 X
  });
};
