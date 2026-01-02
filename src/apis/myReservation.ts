import { http } from '@/apis/http';
import type { MyReservationsResponse, MyReservationEditRequest } from './type';

// 내 예약 리스트 조회
export const getMyReservations = async (status?: string) => {
  const res = await http.get<MyReservationsResponse>('/my-reservations', {
    params: { status }, // status 쿼리 파라미터로 필터링
  });
  return res.data;
};

// 예약 취소
export const cancelReservation = async (reservationId: number) => {
  const res = await http.patch(`/my-reservations/${reservationId}`, {
    status: 'canceled',
  } as MyReservationEditRequest);
  return res.data;
};
