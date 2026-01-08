import { http } from './http';
import type {
  MyReservationsResponse,
  MyReservationReviewResponse,
  MyReservationReviewRequest,
} from './type';

// 내 예약 리스트 조회
export const getMyReservations = async (status?: string) => {
  const res = await http.get<MyReservationsResponse>('/my-reservations', {
    params: status && status !== 'all' ? { status } : {},
  });
  return res.data.reservations;
};

// 예약 취소
export const cancelReservation = async (reservationId: number) => {
  const res = await http.patch(`/my-reservations/${reservationId}`, {
    status: 'canceled',
  });
  return res.data;
};

// 후기 작성
export const postReservationReview = async (
  reservationId: number,
  reviewData: MyReservationReviewRequest
): Promise<MyReservationReviewResponse> => {
  const res = await http.post<MyReservationReviewResponse>(
    `/my-reservations/${reservationId}/reviews`,
    reviewData
  );
  return res.data;
};
