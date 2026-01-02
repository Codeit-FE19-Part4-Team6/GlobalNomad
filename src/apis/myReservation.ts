import { http } from './http';
import type {
  MyReservationsResponse,
  MyReservationEditRequest,
  MyReservationReviewResponse,
  MyReservationReviewRequest,
} from './type';

// 내 예약 리스트 조회
export const getMyReservations = async (status?: string) => {
  const res = await http.get<MyReservationsResponse>('/my-reservations', {
    params: { status },
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
