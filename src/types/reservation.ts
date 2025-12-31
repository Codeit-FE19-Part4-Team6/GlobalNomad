export type ReservationStatus = 'pending' | 'confirmed' | 'declined' | 'completed';
export type ReservationStatusWithCanceled = ReservationStatus | 'canceled';

export interface ReservationResponse {
  id: number;
  nickname: string;
  headCount: number;
  status: ReservationStatus;
  startTime: string;
  endTime: string;
}
