import { BaseBadge } from './BaseBadge';

type State =
  | 'cancelled' // 예약취소
  | 'completed' // 예약완료
  | 'rejected' // 예약거절
  | 'completedExperience' // 체험완료
  | 'approved'; // 예약승인

const statusColor: Record<State, 'darkgray' | 'green' | 'red' | 'darkblue' | 'cyan'> = {
  cancelled: 'darkgray',
  completed: 'green',
  rejected: 'red',
  completedExperience: 'darkblue',
  approved: 'cyan',
};

const statusLabel: Record<State, string> = {
  cancelled: '예약취소',
  completed: '예약완료',
  rejected: '예약거절',
  completedExperience: '체험완료',
  approved: '예약승인',
};

type StatusBadgeProps = {
  status: State;
};
/**
 * 예약의 현재 상태(승인, 거절, 완료 등)를 시각적으로 나타내는 뱃지 컴포넌트입니다.
 *
 * <StatusBadge status="approved" />
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <BaseBadge color={statusColor[status]} size='status'>
      {statusLabel[status]}
    </BaseBadge>
  );
}
