import { useCardContext } from '@/components/common/card/CardContext';
import Icons from '@/assets/icons';
/**
 * [Card.Rating] - 별점 점수 및 리뷰 개수를 표시하는 컴포넌트
 *
 * - 아이콘 크기 자동 조정: 카드 타입(variant)에 따라 별 아이콘의 크기가 반응형으로 조절됩니다.
 *
 * ```tsx
 * <Card.Rating rating={4.8} reviewCount={120} />
 * ```
 */
export function CardRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const { variant } = useCardContext();
  const iconSize = variant === 'list' ? 'h-3.5 w-3.5 lg:h-4 lg:w-4' : 'h-2.75 w-2.75 md:h-5 md:w-5';

  return (
    <div className='font-xs-medium md:font-md-medium flex items-center gap-1 text-gray-500'>
      <Icons.Star className={iconSize} />
      <span className='text-gray-950'>{rating}</span>
      <span className={variant === 'grid' ? 'text-gray-400' : 'text-gray-500'}>
        ({reviewCount})
      </span>
    </div>
  );
}
