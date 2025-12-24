import { useCardContext } from './CardContext';
import { cn } from '@/utils/cn';
/**
 * 카드의 이미지 영역 컴포넌트
 *
 * * * [Variant별 스타일 정의]
 * - grid: 이미지 상단부만 둥글게 처리 (카드 본문과 연결되는 형태)
 * - list: 1:1 정사각 비율, 모서리 전체가 부드러운 사각형 형태
 * - reservation: 카드 우측 끝에 위치하며, 우측 모서리만 둥글게 처리
 *
 * <Card.Image src="..." alt="..." />
 */
export default function CardImage({ src, alt }: { src?: string; alt: string }) {
  const { variant } = useCardContext();

  const imageWrapperStyle = {
    grid: 'aspect-square h-38.75 w-full overflow-hidden rounded-[18px_18px_0_0] md:h-86.75 md:rounded-[32px_32px_0_0] lg:h-72.5',
    list: 'h-20.5 w-20.5 shrink-0 lg:h-35.5 lg:w-35.5',
    reservation:
      'aspect-square h-34 min-h-38.25 w-34 shrink-0 overflow-hidden rounded-[0_24px_24px_0] bg-gray-100 lg:h-45.25 lg:w-45.25 lg:rounded-[0_32px_32px_0] relative z-0 -ml-6 lg:-ml-10',
  }[variant];

  const imgStyle = 'h-full w-full object-cover';
  const listImgStyle = variant === 'list' ? 'rounded-[20px] lg:rounded-4xl' : '';

  return (
    <div className={imageWrapperStyle}>
      {src && <img src={src} alt={alt} className={cn(imgStyle, listImgStyle)} />}
    </div>
  );
}
