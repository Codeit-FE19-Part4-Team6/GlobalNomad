import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

const titleVariants = cva('', {
  variants: {
    size: {
      '4xl': 'text-4xl',
      '3xl': 'text-3xl',
      '2xl': 'text-2xl',
      xl: 'text-xl',
      lg: 'text-lg',
      md: 'text-md',
      sm: 'text-sm',
      xs: 'text-xs',
      '2xs': 'text-2xs',
    },
    weight: {
      bold: 'font-bold',
      medium: 'font-medium',
    },
  },
  defaultVariants: {
    size: 'xl',
    weight: 'bold',
  },
});

interface TitleProps extends VariantProps<typeof titleVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
}

/**
 * Title 컴포넌트
 *
 * Tailwind 기반의 공통 타이틀 컴포넌트입니다.
 * h2~h6, 태그 선택 가능하며, size와 weight로 스타일링 가능합니다.
 * 기본 컬러는 text-gray-950이며, 예외는 className으로 적용합니다.
 *
 * h1: 최상위 제목 -> 32이상
 * h2: 주요 섹션 제목 -> 24~32
 * h3: 보조 섹션 제목 -> 18~24
 * h4~h6: 리스트/카드 제목 -> 14~18
 *
 * @example
 * <Title as='h1' size='4xl' weight='medium' className='text-gray-200'>
 *   타이틀
 * </Title>
 */

export default function Title({
  as: Component = 'h3',
  children,
  className,
  size,
  weight,
}: TitleProps) {
  return (
    <Component className={cn('text-gray-950', titleVariants({ size, weight }), className)}>
      {children}
    </Component>
  );
}
