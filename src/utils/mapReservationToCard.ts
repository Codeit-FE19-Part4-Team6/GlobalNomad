// src/utils/mapReservationToCard.ts

import type { ReservationResponse } from '@/types/reservation';
import type { CardListProps } from '@/components/common/card/CardList';
import type { ReservationStatus } from '@/components/common/badge';

/**
 * API에서 받은 예약 데이터를 CardListProps 형식으로 변환
 */
export function mapReservationToCard(reservation: ReservationResponse): CardListProps {
  return {
    status: reservation.status as ReservationStatus,
    title: reservation.activity.title,
    bannerImageUrl: reservation.activity.bannerImageUrl,
    date: reservation.date.replace(/-/g, '. '),
    startTime: reservation.startTime,
    endTime: reservation.endTime,
    totalPrice: reservation.totalPrice,
    headCount: reservation.headCount,
  };
}
