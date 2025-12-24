import { useCardContext } from '@/components/common/card/CardContext';
import Title from '@/components/common/Title';
import { cn } from '@/utils/cn';
/**
 * [Card.Title] - 카드의 제목을 표시하는 컴포넌트
 *
 * ```tsx
 * <Card.Title title={title} className="mb-4" />
 * ```
 */
export function CardTitle({ title, className }: { title: string; className?: string }) {
  const { variant } = useCardContext();
  const sizeClass =
    variant === 'grid' ? 'font-md-semibold lg:font-xl-bold' : 'font-lg-bold lg:font-xl-bold';
  return (
    <Title as='h4' className={cn(sizeClass, 'truncate text-gray-950', className)}>
      {title}
    </Title>
  );
}
