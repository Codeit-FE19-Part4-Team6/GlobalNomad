import { BaseBadge } from './BaseBadge';

export const reservationStatus = {
  canceled: 'canceled',
  confirmed: 'confirmed',
  declined: 'declined',
  completed: 'completed',
  approved: 'approved',
} as const;

export type ReservationStatus = (typeof reservationStatus)[keyof typeof reservationStatus];

const statusColor: Record<ReservationStatus, 'darkgray' | 'green' | 'red' | 'darkblue' | 'cyan'> = {
  canceled: 'darkgray',
  confirmed: 'green',
  declined: 'red',
  completed: 'darkblue',
  approved: 'cyan',
};

const statusLabel: Record<ReservationStatus, string> = {
  canceled: '예약 취소',
  confirmed: '예약 완료',
  declined: '예약 거절',
  completed: '체험 완료',
  approved: '예약 승인',
};

type StateBadgeProps = {
  status: ReservationStatus;
};
/**
 * 예약의 현재 상태를 색상과 텍스트로 표현하는 상태 뱃지 컴포넌트입니다.
 *
 * 승인, 거절, 완료, 취소 등 예약 진행 단계를 직관적으로 확인할 수 있습니다.
 *
 * @example
 * <StateBadge status={reservationStatus.approved} />
 */

export function StateBadge({ status }: StateBadgeProps) {
  return (
    <BaseBadge color={statusColor[status]} size='status'>
      {statusLabel[status]}
    </BaseBadge>
  );
}
