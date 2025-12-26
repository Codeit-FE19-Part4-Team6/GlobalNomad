import { useRef } from 'react';
import Icons from '@/assets/icons';
import { cn } from '@/utils/cn';
import { useProfileImageStore } from '@/stores/profileImageStore';

type ProfileImageUploadProps = {
  size?: 'medium' | 'large';
  edit?: boolean;
  className?: string;
  defaultImageUrl?: string | null;
};

/**
 * 파일 선택 시 URL.createObjectURL(file)로 미리보기
 * 선택 취소 시 reset() -> 디폴트 이미지 표시
 */
export default function ProfileImageUpload({
  size = 'medium',
  edit = false,
  className,
  defaultImageUrl,
}: ProfileImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { profileImageUrl, setProfileImageUrl, reset } = useProfileImageStore();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      reset();
      return;
    }
    // 파일 선택 시 임시 URL 생성 -> 스토어 업데이트 -> 화면 미리보기
    const tempUrl = URL.createObjectURL(file);
    setProfileImageUrl(tempUrl);
    // TODO: 서버 업로드는 나중에 로그인/토큰 연동 후 구현 예정
  };

  const background = profileImageUrl ?? defaultImageUrl ?? null;

  return (
    <div className={cn('relative inline-block h-fit w-fit', className)}>
      <div
        className={cn(
          'flex aspect-square items-center justify-center overflow-hidden rounded-full bg-gray-200',
          {
            'h-17.5 w-17.5': size === 'medium',
            'h-30 w-30': size === 'large',
          }
        )}
        style={{
          backgroundImage: background ? `url(${background})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        {!background && (size === 'medium' ? <Icons.ProfileMd /> : <Icons.ProfileLg />)}
      </div>

      {edit && (
        <button
          type='button'
          onClick={handleEditClick}
          className={cn(
            'absolute right-0 bottom-0 flex items-center justify-center rounded-full bg-gray-300',
            {
              'h-6 w-6 p-[5.6px]': size === 'medium',
              'h-7.5 w-7.5 p-1.75': size === 'large',
            }
          )}>
          <Icons.Edit className='text-white' />
        </button>
      )}

      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className='hidden'
      />
    </div>
  );
}
