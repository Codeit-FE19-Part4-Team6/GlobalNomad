import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import Icons from '@/assets/icons';

const ButtonStyle = cva(
  `group w-full bg-white flex items-center gap-2 transition-colors text-gray-600 font-lg-medium
   rounded-[16px] px-[20px] py-[12px]
   md:rounded-[14px] md:py-[14px]
   hover:bg-primary-100 hover:text-gray-950`,
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
  children?: React.ReactNode;
  type?: React.ComponentProps<'button'>['type'];
  className?: string;
  onClick?: () => void;
}

type AsProps<T extends React.ElementType> = SidebarButtonProps<T> &
  Omit<React.ComponentProps<T>, keyof SidebarButtonProps<T>>;

const themeConfig = {
  MyProfile: {
    label: '내 정보',
    icon: <Icons.User className='group-hover:text-primary-500 text-gray-600' />,
  },
  MyBookings: {
    label: '예약 내역',
    icon: <Icons.List className='group-hover:text-primary-500 text-gray-600' />,
  },
  MyExperiences: {
    label: '내 체험 관리',
    icon: <Icons.Setting className='group-hover:text-primary-500 text-gray-600' />,
  },
  BookingStatus: {
    label: '예약 현황',
    icon: <Icons.Calenber className='group-hover:text-primary-500 text-gray-600' />,
  },
} as const;

/**
 * 사이드바 전용 버튼 컴포넌트
 * - theme에 따라 아이콘과 레이블 자동 적용
 * - 아이콘 색상은 THEME_CONFIG에서 Tailwind로 직접 지정
 * - button, a 등 다른 엘리먼트로도 변경 가능
 * - className, onClick 등 props 확장 가능
 *
 * 사용 예시:
 * <SidebarButton onClick={handleClick} theme="MyBookings" />
 */
export default function SidebarButton<T extends React.ElementType = 'button'>({
  as,
  theme = 'MyProfile',
  type = 'button',
  className,
  onClick,
  ...props
}: AsProps<T>) {
  const Component = as || 'button';
  const config = themeConfig[theme as keyof typeof themeConfig];

  const componentProps = {
    className: cn(ButtonStyle({ theme }), className),
    ...(Component === 'button' ? { type } : {}),
    onClick,
    ...props,
  };

  return (
    <Component {...componentProps}>
      {config?.icon}
      <span className='whitespace-nowrap'>{config?.label}</span>
    </Component>
  );
}
