import type { ReservationResponse } from '@/types/reservation';

export function mapReservationToCard(reservation: ReservationResponse) {
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
