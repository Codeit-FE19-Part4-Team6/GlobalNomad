import { BaseBadge } from './BaseBadge';
import type { MyReservationsResponse } from '@/apis/type';

type ReservationStatus = MyReservationsResponse['reservations'][number]['status'];
type ReservationStatusWithCanceled = ReservationStatus | 'canceled';

const statusColor: Record<ReservationStatus, 'green' | 'red' | 'darkblue' | 'cyan'> = {
  confirmed: 'green', // 예약 완료
  declined: 'red', // 예약 거절
  completed: 'darkblue', // 체험 완료
  pending: 'cyan', // 예약 대기
};

const statusLabel: Record<ReservationStatus, string> = {
  confirmed: '예약 완료',
  declined: '예약 거절',
  completed: '체험 완료',
  pending: '예약 대기',
};

type StateBadgeProps = {
  status: ReservationStatusWithCanceled;
};

export function StateBadge({ status }: StateBadgeProps) {
  if (status === 'canceled') {
    return (
      <BaseBadge color='darkgray' size='status'>
        예약 취소
      </BaseBadge>
    );
  }

  return (
    <BaseBadge color={statusColor[status]} size='status'>
      {statusLabel[status]}
    </BaseBadge>
  );
}
