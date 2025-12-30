import { useCardContext } from '@/components/common/card/CardContext';
import { cn } from '@/utils/cn';

/**
 * [Card.Price] - 가격 및 인원수 정보를 표시하는 컴포넌트
 *
 * - 천 단위 콤마(,) 자동 적용: `toLocaleString()`을 통해 숫자를 화폐 단위로 포맷팅합니다.
 * - 동적 레이아웃: `headCount` 여부에 따라 요소 간 간격을 다르게 적용합니다.
 *
 * * * * [사용 방법]
 * ```tsx
 * <Card.Price price={price} headCount={headCount} />
 * ```
 */
export function CardPrice({ price, headCount }: { price: number; headCount?: number }) {
  const { variant } = useCardContext();

  const priceStyle =
    variant === 'grid' ? 'font-md-bold md:font-xl-bold' : 'font-lg-bold lg:font-xl-bold';

  return (
    <div className={cn('flex items-center', headCount ? 'gap-2' : 'gap-0.5')}>
      <span className={cn('text-gray-950', priceStyle)}>₩{price.toLocaleString()}</span>

      {headCount ? (
        <span className='font-md-medium lg:font-lg-medium text-gray-400'>{headCount}명</span>
      ) : (
        <span className='font-md-medium lg:font-lg-medium text-gray-400'>/인</span>
      )}
    </div>
  );
}
