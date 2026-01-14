import { useCardContext } from './CardContext';
import { cn } from '@/utils/cn';

/**
 * [Card.Content] - 카드의 정보(텍스트, 가격, 버튼 등)를 감싸는 본문 영역
 *
 * <Card.Content>
 *  <Card.Title title="별빛 밤바다 투어" />
 *   <Card.Price price={45000} />
 * </Card.Content>
 */
export default function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { variant } = useCardContext();

  const styles: Record<typeof variant, string> = {
    grid: '-mt-8 flex w-full flex-1 flex-col rounded-[18px] border-white bg-white px-4 py-3 sm:-mt-15 sm:rounded-4xl sm:px-6 sm:py-5 lg:-mt-10 lg:px-5 lg:py-4 shadow-[0_-8px_20px_0_rgba(0,0,0,0.05)] relative z-10',
    reservation: cn(
      'relative z-10 flex flex-col',
      'rounded-3xl border border-white bg-white p-5 lg:px-10 lg:py-[26px]',
      'h-34 min-h-38.25 w-full md:w-90 lg:w-121.5 lg:h-45.25 lg:rounded-4xl',
      'gap-[8px] lg:gap-[10px]',
      'shadow-[0_-8px_20px_0_rgba(0,0,0,0.05)]'
    ),
    list: 'flex flex-col flex-1',
  };

  return <div className={cn(styles[variant], className)}>{children}</div>;
}
