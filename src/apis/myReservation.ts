import { http } from './http';
import type {
  MyReservationsResponse,
  MyReservationReviewResponse,
  MyReservationReviewRequest,
  UpdateMyActivityReservationStatusRequest,
} from './type';

type GetMyReservationsParams = {
  size: number;
  status?: string;
  cursorId?: number;
};

// 내 예약 리스트 조회
export const getMyReservations = async (params: GetMyReservationsParams) => {
  const res = await http.get<MyReservationsResponse>('/my-reservations', {
    params,
  });
  return res.data;
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

export const patchReservationStatus = (
  reservationId: number,
  data: UpdateMyActivityReservationStatusRequest
) => {
  return http.patch(`/my-reservations/${reservationId}/status`, data);
};
