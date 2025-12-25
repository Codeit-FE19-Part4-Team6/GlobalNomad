import type { ReservationResponse, ReservationStatus } from '@/types/reservation';

export interface MappedReservation {
  id: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  title: string;
  bannerImageUrl: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  headCount: number;
}

export function mapReservationToCard(reservation: ReservationResponse): MappedReservation {
  return {
    id: reservation.id,
    status: reservation.status,
    reviewSubmitted: reservation.reviewSubmitted,
    title: reservation.activity.title,
    bannerImageUrl: reservation.activity.bannerImageUrl,
    date: reservation.date.replace(/-/g, '. '),
    startTime: reservation.startTime,
    endTime: reservation.endTime,
    totalPrice: reservation.totalPrice,
    headCount: reservation.headCount,
  };
}
