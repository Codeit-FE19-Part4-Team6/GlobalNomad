// import { getMyReservations } from '@/apis/myReservation';
// import { useInfiniteQuery } from '@tanstack/react-query';

// type Props = {
//   status?: string;
// };

// export const useMyReservations = ({ status }: Props) => {
//   return useInfiniteQuery({
//     queryKey: ['myReservations', status],
//     queryFn: ({ pageParam }) =>
//       getMyReservations({
//         cursorId: pageParam,
//         status,
//       }),
//     initialPageParam: undefined,
//     getNextPageParam: (lastPage) => {
//       return lastPage.cursorId ?? undefined;
//     },
//   });
// };
