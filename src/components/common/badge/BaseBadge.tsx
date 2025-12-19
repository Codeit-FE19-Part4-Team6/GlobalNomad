import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva('inline-flex items-center font-medium whitespace-nowrap', {
  variants: {
    color: {
      blue: 'bg-primary-100, text-primary-500',
      darkblue: 'bg-blue-50 text-sky-600',
      skyblue: 'bg-sky-100 text-sky-700',
      gray: 'bg-gray-50 text-gray-500',
      darkgray: 'bg-gray-100 text-gray-600',
      orange: 'bg-orange-50 text-orange-400',
      green: 'bg-green-50 text-green-600',
      red: 'bg-red-50 text-red-400',
      cyan: 'bg-cyan-50 text-cyan-600',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'gray',
  },
});

type BaseBadgeProps = React.HTMLAttributes<HTMLElement> & VariantProps<typeof badgeVariants>;

export function BaseBadge({ className, color, size, ...props }: BaseBadgeProps) {
  return <span className={badgeVariants({ color, size, className })} {...props} />;
}
