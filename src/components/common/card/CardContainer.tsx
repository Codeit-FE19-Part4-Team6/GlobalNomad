import { CardContext } from './CardContext';
import type { CardVariant } from './CardContext';
import { cn } from '@/utils/cn';

interface Props {
  variant: CardVariant;
  children: React.ReactNode;
  className?: string;
}
/**
 * 카드 컨테이너 컴포넌트
 *
 * 1. 레이아웃 결정: variant 값에 따라 Grid, List, Reservation 형태의 기본 틀을 잡습니다.
 * 2. 상태 공유: Context API를 통해 자식 컴포넌트들에게 현재 variant가 무엇인지 공유합니다.
 * 3. 확장성: 모든 서브 컴포넌트(Title, Badge 등)는 이 컨테이너 안에서 variant에 맞는 스타일을 자동으로 찾습니다.
 *
 * <Card variant="reservation">
 * <Card.Content>...</Card.Content>
 * <Card.Image src="..." />
 * </Card>
 */
export default function CardContainer({ variant, children, className }: Props) {
  const baseLayout = {
    grid: 'flex flex-col lg:w-65.5',
    list: 'flex space-between bg-white rounded-3xl p-6 md:w-119 lg:w-160 shadow-[0_4px_24px_0_rgba(156,180,202,0.20)]',
    reservation: 'flex w-full flex-col lg:flex-row ',
  }[variant];

  return (
    <CardContext.Provider value={{ variant }}>
      <div className={cn(baseLayout, className)}>{children}</div>
    </CardContext.Provider>
  );
}
