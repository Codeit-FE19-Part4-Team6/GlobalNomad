import { useQuery } from '@tanstack/react-query';
import { getMyReservations } from '@/apis/myReservation';
import type { MyReservationsResponse } from '@/apis/type';

type Status = 'confirmed' | 'canceled' | 'declined' | 'completed' | 'pending';

export const useMyReservationsQuery = (status: Status) => {
  return useQuery<MyReservationsResponse['reservations']>({
    queryKey: ['myReservations', status],
    queryFn: () => getMyReservations(status),
  });
};
