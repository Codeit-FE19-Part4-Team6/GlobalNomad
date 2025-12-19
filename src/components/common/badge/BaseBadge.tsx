import { cva, type VariantProps } from 'class-variance-authority';
/**
 * BaseBadge
 *
 * color, size props를 전달하면 해당 variant 스타일이 적용됩니다.
 * color, size를 전달하지 않으면
 * badgeVariants에 defaultVariants가 없으므로 기본 스타일(색상/사이즈)은 적용되지 않습니다.
 *
 */
export const badgeVariants = cva('inline-flex items-center whitespace-nowrap', {
  variants: {
    color: {
      blue: 'bg-primary-100 text-primary-500',
      darkblue: 'bg-blue-50 text-blue-600',
      skyblue: 'bg-sky-100 text-sky-700',
      gray: 'bg-gray-50 text-gray-500',
      darkgray: 'bg-gray-100 text-gray-600',
      orange: 'bg-orange-50 text-orange-400',
      green: 'bg-green-50 text-green-600',
      red: 'bg-red-50 text-red-400',
      cyan: 'bg-cyan-50 text-cyan-600',
    },
    size: {
      // 상태 뱃지용
      status: 'w-[63px] h-[24px] flex items-center justify-center font-sm-bold rounded-full',
      // 이벤트 뱃지용
      event:
        'w-full h-[16px] md:h-[21px] px-2 py-0.5 font-md-medium md:font-2xs-medium flex items-center rounded justify-center',
    },
  },
});

type BaseBadgeProps = React.HTMLAttributes<HTMLElement> & VariantProps<typeof badgeVariants>;

export function BaseBadge({ className, color, size, ...props }: BaseBadgeProps) {
  return <span className={badgeVariants({ color, size, className })} {...props} />;
}
