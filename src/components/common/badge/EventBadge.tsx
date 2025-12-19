import { badgeVariants } from './BaseBadge';

type EventType = '예약' | '승인' | '완료';

const eventColor: Record<EventType, 'blue' | 'orange' | 'gray'> = {
  예약: 'blue',
  승인: 'orange',
  완료: 'gray',
};

type EventBadgeProps = {
  type: EventType;
  count?: number;
  onClick?: () => void;
};
/**
 * 캘린더 날짜 칸 내부에서 예약 현황(건수)을 요약해서 보여주는 버튼형 배지입니다.
 *
 * count가 0 이하이면 화면에 나타나지 않습니다.
 *
 * <EventBadge type="예약" count={2} onClick={() => console.log('모달 열기')} />
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
