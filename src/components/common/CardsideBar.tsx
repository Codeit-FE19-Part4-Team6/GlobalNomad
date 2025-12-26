import ProfileImageUpload from '@/components/common/image-upload/ProfileImageUpload';
import SidebarButton from '@/components/common/SidebarButton';
import { cn } from '@/utils/cn';

type Props = {
  variant: 'desktop' | 'tablet' | 'mobile';
  defaultImageUrl?: string | null;
};
/**
 * CardsideBar 컴포넌트
 *
 * - 사용자 프로필 이미지 업로드(ProfileImageUpload)와 사이드바 버튼들을 렌더링
 * - defaultImageUrl: 사용자가 아직 이미지를 선택하지 않았을 때 표시할 기본 이미지
 * - variant: 화면 크기/레이아웃에 따라 desktop / tablet / mobile 스타일 적용
 *
 * 사용 예시:
 * <CardsideBar variant="tablet" />
 */
export default function CardsideBar({ variant, defaultImageUrl }: Props) {
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
