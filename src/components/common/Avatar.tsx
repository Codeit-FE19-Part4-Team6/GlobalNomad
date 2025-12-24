import Icons from '@/assets/icons';
import { useProfileImageStore } from '@/stores/profileImageStore';
import { cn } from '@/utils/cn';

type AvatarProps = {
  className?: string;
};
/**
 * Avatar 컴포넌트
 *
 * - 사용자 프로필 이미지를 표시
 * - previewUrl이 존재하면 이미지 표시
 * - previewUrl이 없으면 기본 SVG 아이콘 표시
 *
 * @example
 * // 기본 사용
 * <Avatar />
 *
 * // 클래스 추가
 * <Avatar className="border-2 border-gray-500" />
 *
 */
export default function Avatar({ className }: AvatarProps) {
  const { previewUrl } = useProfileImageStore();

  return (
    <div className={cn('relative inline-block h-fit w-fit border-gray-200', className)}>
      {previewUrl ? (
        <img src={previewUrl} alt='Profile' className='h-7.5 w-7.5 rounded-full object-cover' />
      ) : (
        <Icons.ProfileSm />
      )}
    </div>
  );
}
