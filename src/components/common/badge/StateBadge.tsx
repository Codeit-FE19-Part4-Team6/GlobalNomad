import { BaseBadge } from './BaseBadge';

export const reservationStatus = {
  cancelled: 'cancelled', // 예약 취소
  completed: 'completed', // 예약 완료
  rejected: 'rejected', // 예약 거절
  completedExperience: 'completedExperience', // 체험 완료
  approved: 'approved', // 예약 승인
} as const;

type ReservationStatus = (typeof reservationStatus)[keyof typeof reservationStatus];

const statusColor: Record<ReservationStatus, 'darkgray' | 'green' | 'red' | 'darkblue' | 'cyan'> = {
  [reservationStatus.cancelled]: 'darkgray',
  [reservationStatus.completed]: 'green',
  [reservationStatus.rejected]: 'red',
  [reservationStatus.completedExperience]: 'darkblue',
  [reservationStatus.approved]: 'cyan',
};

const statusLabel: Record<ReservationStatus, string> = {
  [reservationStatus.cancelled]: '예약 취소',
  [reservationStatus.completed]: '예약 완료',
  [reservationStatus.rejected]: '예약 거절',
  [reservationStatus.completedExperience]: '체험 완료',
  [reservationStatus.approved]: '예약 승인',
};

type StatusBadgeProps = {
  status: ReservationStatus;
};

/**
 * 예약의 현재 상태를 색상과 텍스트로 표현하는 상태 뱃지 컴포넌트입니다.
 *
 * 승인, 거절, 완료, 취소 등 예약 진행 단계를 직관적으로 확인할 수 있습니다.
 *
 * @example
 * <StatusBadge status={reservationStatus.approved} />
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <BaseBadge color={statusColor[status]} size='status'>
      {statusLabel[status]}
    </BaseBadge>
  );
}
