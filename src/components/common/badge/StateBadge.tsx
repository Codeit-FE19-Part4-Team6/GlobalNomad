import { BaseBadge } from './BaseBadge';

type State =
  | 'cancelled' // 예약취소
  | 'completed' // 예약완료
  | 'rejected' // 예약거절
  | 'CompletedExperience' // 체험완료
  | 'approved'; // 예약승인

const STATUS_COLOR: Record<State, 'darkgray' | 'green' | 'red' | 'darkblue' | 'cyan'> = {
  cancelled: 'darkgray',
  completed: 'green',
  rejected: 'red',
  CompletedExperience: 'darkblue',
  approved: 'cyan',
};

const STATUS_LABEL: Record<State, string> = {
  cancelled: '예약취소',
  completed: '예약완료',
  rejected: '예약거절',
  CompletedExperience: '체험완료',
  approved: '예약승인',
};

type StatusBadgeProps = {
  status: State;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <BaseBadge color={STATUS_COLOR[status]}>{STATUS_LABEL[status]}</BaseBadge>;
}
