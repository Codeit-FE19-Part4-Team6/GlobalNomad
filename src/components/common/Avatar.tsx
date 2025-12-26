import Icons from '@/assets/icons';
import { useProfileImageStore } from '@/stores/profileImageStore';
import { cn } from '@/utils/cn';

type AvatarProps = {
  className?: string;
};
/**
 *
 * profileImageUrl을 스토어에서 가져옵니다.
 * 이 값이 있으면 업로드된 이미지, 없으면 디폴트 아이콘 표시합니다.
 * ProfileImageUpload와 연동되어 선택된 이미지가 자동으로 반영됩니다.
 */
export default function Avatar({ className }: AvatarProps) {
  const { profileImageUrl } = useProfileImageStore();
  return (
    <div className={cn('relative inline-block h-fit w-fit border-gray-200', className)}>
      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          alt='Profile'
          className='h-7.5 w-7.5 rounded-full object-cover'
        />
      ) : (
        <Icons.ProfileSm />
      )}
    </div>
  );
}
