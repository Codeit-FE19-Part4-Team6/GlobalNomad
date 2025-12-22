import ProfileImageUpload from '@/components/common/image-upload/ProfileImageUpload';
import SidebarButton from '@/components/common/SidebarButton';
import { cn } from '@/utils/cn';

type CardsideBarProps = {
  variant: 'desktop' | 'tablet' | 'mobile';
  file: File | null;
  onFileChange: (file: File | null) => void;
};
/**
 * CardsideBar 컴포넌트
 *
 * 마이페이지 / 카드 페이지에서 사용되는 사이드바 UI 컴포넌트입니다.
 * - 프로필 이미지 업로드 영역
 * - 마이페이지 관련 네비게이션 버튼들을 포함합니다.
 * - variant 값에 따라 desktop / tablet / mobile 레이아웃을 다르게 렌더링합니다.
 *
 * 사용 예시:
 *  <CardsideBar variant='tablet' file={file} onFileChange={setFile} />
 */

export default function CardsideBar({ variant, file, onFileChange }: CardsideBarProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 flex-col items-center rounded-xl border border-gray-50',
        variant === 'desktop' && 'h-112.5 w-72.5 gap-6 px-3.5 py-6',
        variant === 'tablet' && 'h-85.5 w-44.5 gap-3 overflow-y-auto px-3.5 py-4',
        variant === 'mobile' && 'h-112.5 w-81.75 gap-6 px-3.5 py-6'
      )}>
      <ProfileImageUpload
        size={variant === 'tablet' ? 'Medium' : 'Large'}
        file={file}
        edit
        onFileChange={onFileChange}
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
