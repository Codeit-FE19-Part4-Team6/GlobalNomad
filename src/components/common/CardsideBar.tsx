import ProfileImageUpload from '@/components/common/image-upload/ProfileImageUpload';
import SidebarButton from '@/components/common/SidebarButton';
import { cn } from '@/utils/cn';

type CardsideBarProps = {
  variant: 'desktop' | 'tablet' | 'mobile';
  defaultImageUrl?: string | null;
};

/**
 * defaultImageUrl: 선택된 이미지가 없을 때 표시
 * ProfileImageUpload와 연결되어 이미지 선택/변경 가능
 */
export default function CardsideBar({ variant, defaultImageUrl }: CardsideBarProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 flex-col items-center rounded-xl border border-gray-50',
        variant === 'desktop' && 'h-112.5 w-72.5 gap-6 px-3.5 py-6',
        variant === 'tablet' && 'h-85.5 w-44.5 gap-3 overflow-y-auto px-3.5 py-4',
        variant === 'mobile' && 'h-112.5 w-81.75 gap-6 px-3.5 py-6'
      )}>
      <ProfileImageUpload
        size={variant === 'tablet' ? 'medium' : 'large'}
        edit
        defaultImageUrl={defaultImageUrl}
      />

      <div className='flex w-full flex-col gap-3.5'>
        <SidebarButton theme='MyProfile' />
        <SidebarButton theme='MyBookings' />
        <SidebarButton theme='MyExperiences' />
        <SidebarButton theme='BookingStatus' />
      </div>
    </div>
  );
}
