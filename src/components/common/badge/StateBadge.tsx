import { BaseBadge } from './BaseBadge';
import type { ReservationStatusWithCanceled } from '@/types/reservation';

const statusColor: Record<
  ReservationStatusWithCanceled,
  'green' | 'red' | 'darkblue' | 'cyan' | 'darkgray'
> = {
  confirmed: 'green', // 예약 완료
  declined: 'red', // 예약 거절
  completed: 'darkblue', // 체험 완료
  pending: 'cyan', // 예약 대기
  canceled: 'darkgray', // 예약 취소
};

const statusLabel: Record<ReservationStatusWithCanceled, string> = {
  confirmed: '예약 완료',
  declined: '예약 거절',
  completed: '체험 완료',
  pending: '예약 대기',
  canceled: '예약 취소',
};

type StateBadgeProps = {
  status: ReservationStatusWithCanceled;
};

export function StateBadge({ status }: StateBadgeProps) {
  return (
    <BaseBadge color={statusColor[status]} size='status'>
      {statusLabel[status]}
    </BaseBadge>
  );
}
