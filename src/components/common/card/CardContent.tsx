import { useCardContext } from './CardContext';
import { cn } from '@/utils/cn';

/**
 * [Card.Content] - 카드의 정보(텍스트, 가격, 버튼 등)를 감싸는 본문 영역
 * 
 * - grid: 이미지 하단에 위치하되, 위로 약 33px~60px 정도 겹쳐서 떠 있는 디자인
 * - reservation: 모바일/데스크탑 환경에 맞춰 각각 최적화된 고정 너비와 패딩 적용
 * - list: 남은 공간을 꽉 채우는 유연한 레이아웃 (flex-1)
 * 
 * <Card.Content>
 *  <Card.Title title="별빛 밤바다 투어" />
 *  <Card.Price price={45000} />
  </Card.Content>
 */
export default function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { variant } = useCardContext();

  const style =
    variant === 'grid'
      ? '-mt-[33.75px] flex w-full flex-col rounded-[18px] border-white bg-white px-4.25 py-4 md:-mt-15 md:rounded-4xl md:px-7.5 md:py-7.5 shadow-[0_-8px_20px_0_rgba(0,0,0,0.05)] relative z-10'
      : variant === 'reservation'
        ? cn(
            'relative z-10 flex flex-col',
            'rounded-3xl border border-white bg-white p-5 lg:px-10 lg:py-[26px]',
            'h-34 min-h-38.25 w-full md:w-90 lg:w-121.5 lg:h-45.25 lg:rounded-4xl',
            'gap-2 lg:gap-3',
            'shadow-[0_-8px_20px_0_rgba(0,0,0,0.05)]'
          )
        : 'flex flex-col flex-1';

  return <div className={cn(style, className)}>{children}</div>;
}
