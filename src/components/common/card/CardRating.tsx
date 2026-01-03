import { Star } from '@/assets/icons';
import { useCardContext } from '@/components/common/card/CardContext';
import { cn } from 'tailwind-variants';

/**
 * [Card.Rating] - 별점 점수 및 리뷰 개수를 표시하는 컴포넌트
 *
 * - 아이콘 크기 자동 조정: 카드 타입(variant)에 따라 별 아이콘의 크기가 반응형으로 조절됩니다.
 *
 * ```tsx
 * <Card.Rating rating={4.8} reviewCount={120} />
 * ```
 */

export function CardRating({
  rating,
  reviewCount,
  className,
}: {
  rating: number;
  reviewCount: number;
  className?: string;
}) {
  const { variant } = useCardContext();
  const iconSize = variant === 'list' ? 'h-3.5 w-3.5 lg:h-4 lg:w-4' : 'h-2.75 w-2.75 md:h-5 md:w-5';

  return (
    <div
      className={cn(
        'font-xs-medium md:font-md-medium lg:font-md-medium flex items-center gap-1 text-gray-500',
        className
      )}>
      <Star className={iconSize} />
      <span>{rating}</span>
      <span className={variant === 'grid' ? 'text-gray-400' : 'text-gray-500'}>
        ({reviewCount})
      </span>
    </div>
  );
}
