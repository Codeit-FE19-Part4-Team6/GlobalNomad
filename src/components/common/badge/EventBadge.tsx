import { badgeVariants } from './BaseBadge';

type EventType = '예약' | '승인' | '완료';

const EVENT_COLOR: Record<EventType, 'blue' | 'orange' | 'gray'> = {
  예약: 'blue',
  승인: 'orange',
  완료: 'gray',
};

type EventBadgeProps = {
  type: EventType;
  count?: number;
  size?: 'sm' | 'md';
  onClick: () => void;
};

export function EventBadge({ type, count, size = 'md', onClick }: EventBadgeProps) {
  return (
    <button
      type='button'
      className={badgeVariants({
        color: EVENT_COLOR[type],
        size,
      })}
      onClick={onClick}>
      {type}
      {count}
    </button>
  );
}
