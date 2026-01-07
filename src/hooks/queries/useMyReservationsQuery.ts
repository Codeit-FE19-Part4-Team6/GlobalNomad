import { useQuery } from '@tanstack/react-query';
import { getMyReservations } from '@/apis/myReservation';
import type { MyReservationsResponse } from '@/apis/type';

type Status = 'confirmed' | 'canceled' | 'declined' | 'completed' | 'pending';

/**
 * 내 예약 조회 훅
 * 특정 상태(status)의 예약 목록을 가져오는 커스텀 훅
 */
export const useMyReservationsQuery = (status?: Status) => {
  return useQuery<MyReservationsResponse['reservations']>({
    queryKey: ['myReservations', status],
    queryFn: () => getMyReservations(status),
  });
};
