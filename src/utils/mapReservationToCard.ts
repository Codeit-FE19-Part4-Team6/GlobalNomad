import type { ReservationResponse } from '@/types/reservation';
import type { CardListProps } from '@/components/common/card/CardList';

/**
 * API에서 받은 예약 데이터를 CardList 컴포넌트에서 사용하는 props로 변환
 */
export function mapReservationToCard(reservation: ReservationResponse): CardListProps {
  return {
    status: reservation.status,
    title: reservation.activity.title,
    bannerImageUrl: reservation.activity.bannerImageUrl,
    date: reservation.date.replace(/-/g, '. '),
    startTime: reservation.startTime,
    endTime: reservation.endTime,
    totalPrice: reservation.totalPrice,
    headCount: reservation.headCount,
  };
}
