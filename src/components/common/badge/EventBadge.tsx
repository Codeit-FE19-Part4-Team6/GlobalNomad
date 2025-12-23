import { badgeVariants } from './BaseBadge';

export const eventType = {
  reservation: '예약',
  confirmed: '승인',
  completed: '완료',
} as const;
type EventType = (typeof eventType)[keyof typeof eventType];
const eventColor: Record<EventType, 'blue' | 'orange' | 'gray'> = {
  [eventType.reservation]: 'blue',
  [eventType.confirmed]: 'orange',
  [eventType.completed]: 'gray',
};

type EventBadgeProps = {
  type: EventType;
  count?: number;
  onClick?: () => void;
};
/**
 * 캘린더 날짜 칸 내부에서 예약 상태별 건수를 요약해서 보여주는 버튼형 배지 컴포넌트입니다.
 *
 * 예약, 승인, 완료 등 이벤트 유형과 해당 건수를 함께 표시합니다.
 *
 * count가 0 이하인 경우 화면에 렌더링되지 않습니다.
 *
 * @example
 * <EventBadge
 *   type={eventType.reservation}
 *   count={2}
 *   onClick={() => console.log('모달 열기')}
 * />
 */
export function EventBadge({ type, count = 0, onClick }: EventBadgeProps) {
  if (count <= 0) {
    return null;
  }

  return (
    <button
      type='button'
      className={badgeVariants({
        color: eventColor[type],
        size: 'event',
      })}
      onClick={onClick}>
      {type}
      <span className='ml-1'>{count}</span>
    </button>
  );
}
