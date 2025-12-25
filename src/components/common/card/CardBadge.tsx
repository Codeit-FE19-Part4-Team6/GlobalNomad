import { StateBadge } from '@/components/common/badge';
import { useCardContext } from '@/components/common/card/CardContext';
import type { ReservationStatus } from '@/types/reservation';

/**
 * [Card.Badge] - 예약 상태를 나타내는 컬러 뱃지 컴포넌트
 * - 'reservation' 타입의 카드에서만 렌더링됩니다.
 * - 예약 확정, 취소, 완료 등 상태에 따라 다른 색상의 뱃지를 출력합니다.
 * * * [사용 예시]
 * ```tsx
 * <Card variant="reservation">
 * <Card.Content>
 * <Card.Badge status="confirmed" />
 * </Card.Content>
 * </Card>
 * ```
 * * @param status - 예약의 현재 상태 (confirmed, pending, canceled, completed 등)
 */
export function CardBadge({ status }: { status: ReservationStatus }) {
  const { variant } = useCardContext();
  if (variant !== 'reservation') {
    return null;
  }
  return (
    <div className='w-fit shrink-0'>
      <StateBadge status={status} />
    </div>
  );
}
