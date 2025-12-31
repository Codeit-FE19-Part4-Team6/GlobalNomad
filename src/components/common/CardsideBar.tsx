import ProfileImageUpload from '@/components/common/image-upload/ProfileImageUpload';
import SidebarButton from '@/components/common/SidebarButton';
import { cn } from '@/utils/cn';
import type { ActivePage } from '@/types/mypage';

type Props = {
  variant: 'desktop' | 'tablet' | 'mobile';
  activePage: ActivePage;
  defaultImageUrl?: string | null;
  onProfileClick?: () => void;
  onBookingsClick?: () => void;
  onExperiencesClick?: () => void;
  onBookingStatusClick?: () => void;
};

/**
 * CardsideBar 컴포넌트
 * - activePage 기준으로 선택 상태 표시
 * - 클릭 시 상위 컴포넌트에서 라우팅 처리
 */
export default function CardsideBar({
  variant,
  activePage,
  defaultImageUrl,
  onProfileClick,
  onBookingsClick,
  onExperiencesClick,
  onBookingStatusClick,
}: Props) {
  return (
    <div
      className={cn(
        'flex shrink-0 flex-col items-center rounded-xl border border-gray-50',
        variant === 'desktop' && 'h-112.5 w-72.5 gap-6 px-3.5 py-6',
        variant === 'tablet' && 'h-85.5 w-44.5 gap-3 overflow-y-auto px-3.5 py-4',
        variant === 'mobile' && 'h-112.5 w-full max-w-93 gap-6 px-3.5 py-6'
      )}>
      <ProfileImageUpload
        size={variant === 'tablet' ? 'medium' : 'large'}
        edit
        defaultImageUrl={defaultImageUrl}
      />

      <div className='flex w-full flex-col gap-3.5'>
        <SidebarButton
          theme='MyProfile'
          onClick={onProfileClick}
          selected={activePage === 'profile'}
        />
        <SidebarButton
          theme='MyBookings'
          onClick={onBookingsClick}
          selected={activePage === 'reservation'}
        />
        <SidebarButton
          theme='MyExperiences'
          onClick={onExperiencesClick}
          selected={activePage === 'experiences'}
        />
        <SidebarButton
          theme='BookingStatus'
          onClick={onBookingStatusClick}
          selected={activePage === 'status'}
        />
      </div>
    </div>
  );
}
