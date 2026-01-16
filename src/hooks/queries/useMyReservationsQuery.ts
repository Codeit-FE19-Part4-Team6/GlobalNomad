import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { getMyReservations } from '@/apis/myReservation';
import type { MyReservationsResponse } from '@/apis/type';

const SIZE = 6;
type Status = 'confirmed' | 'canceled' | 'declined' | 'completed' | 'pending' | 'all';
type QueryKey = ['myReservationsInfinite', Status];

export const useMyReservationsInfinite = (status: Status) => {
  return useInfiniteQuery<
    MyReservationsResponse,
    Error,
    InfiniteData<MyReservationsResponse>,
    QueryKey,
    number | undefined
  >({
    queryKey: ['myReservationsInfinite', status],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getMyReservations({
        size: SIZE,
        status: status !== 'all' ? status : undefined,
        cursorId: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.reservations.length < SIZE) {
        return undefined;
      }
      return lastPage.reservations.at(-1)?.id;
    },
  });
};
