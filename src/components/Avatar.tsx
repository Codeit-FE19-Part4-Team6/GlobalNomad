import Icons from '@/assets/icons';
import { useProfileImageStore } from '@/stores/profileImageStore';
import { cn } from '@/utils/cn';

type AvatarProps = { className?: string };

/**
 * Avatar 컴포넌트
 *
 * - Header에서 사용되는 사용자 프로필 아바타
 * - ProfileImageUpload와 zustand store를 통해 상태 공유
 * - 이미지가 없으면 기본 디폴트 이미지 표시
 *
 * 사용 예시:
 * <Avatar />
 */
export default function Avatar({ className }: AvatarProps) {
  const { previewUrl, profileImageUrl } = useProfileImageStore();
  const displayUrl = previewUrl ?? profileImageUrl ?? null;

  return (
    <div className={cn('relative inline-block h-fit w-fit border-gray-200', className)}>
      {displayUrl ? (
        <img src={displayUrl} alt='Profile' className='h-7.5 w-7.5 rounded-full object-cover' />
      ) : (
        <Icons.ProfileSm />
      )}
    </div>
  );
}
