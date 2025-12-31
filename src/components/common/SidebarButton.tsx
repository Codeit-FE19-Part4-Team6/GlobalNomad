import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { Calendar, List, Setting, User } from '@/assets/icons';

const ButtonStyle = cva(
  `group w-full flex items-center gap-2 transition-colors font-lg-medium
   rounded-[16px] px-[20px] py-[12px]
   md:rounded-[14px] md:py-[14px]`,
  {
    variants: {
      theme: {
        MyProfile: '',
        MyBookings: '',
        MyExperiences: '',
        BookingStatus: '',
      },
    },
    defaultVariants: {
      theme: 'MyProfile',
    },
  }
);

interface SidebarButtonProps<T extends React.ElementType> extends VariantProps<typeof ButtonStyle> {
  as?: T;
  type?: React.ComponentProps<'button'>['type'];
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

type AsProps<T extends React.ElementType> = SidebarButtonProps<T> &
  Omit<React.ComponentProps<T>, keyof SidebarButtonProps<T>>;

// themeConfig에서 아이콘 컴포넌트만 저장
const themeConfig = {
  MyProfile: { label: '내 정보', icon: User },
  MyBookings: { label: '예약 내역', icon: List },
  MyExperiences: { label: '내 체험 관리', icon: Setting },
  BookingStatus: { label: '예약 현황', icon: Calendar },
} as const;
/**
 * 사이드바 전용 버튼 컴포넌트
 * - theme에 따라 아이콘과 레이블 자동 적용
 * - selected prop으로 선택 상태 시 색상 변경
 * - button, a 등 다른 엘리먼트로도 변경 가능
 *
 * 사용 예시:
 * <SidebarButton onClick={handleClick} theme="MyBookings" selected={true} />
 */
export default function SidebarButton<T extends React.ElementType = 'button'>({
  as,
  theme = 'MyProfile',
  type = 'button',
  className,
  onClick,
  selected = false,
  ...props
}: AsProps<T>) {
  const Component = as || 'button';
  const config = themeConfig[theme as keyof typeof themeConfig];
  const IconComponent = config.icon;

  const componentProps = {
    className: cn(
      ButtonStyle({ theme }),
      selected
        ? 'bg-primary-100 text-gray-950'
        : 'bg-white text-gray-600 hover:bg-primary-100 hover:text-gray-950',
      className
    ),
    ...(Component === 'button' ? { type } : {}),
    onClick,
    ...props,
  };

  return (
    <Component {...componentProps}>
      <IconComponent
        className={cn(
          'transition-colors',
          selected ? 'text-primary-500' : 'group-hover:text-primary-500 text-gray-600'
        )}
      />
      <span className='whitespace-nowrap'>{config.label}</span>
    </Component>
  );
}
