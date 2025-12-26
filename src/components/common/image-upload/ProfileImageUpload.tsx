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
 * ProfileImageUpload 컴포넌트
 *
 * - 프로필 이미지 선택 및 미리보기 UI 담당
 * - edit=true 시 우측 하단 편집 버튼 표시, 클릭하면 파일 선택 가능
 * - 파일 선택 시 setPreviewUrl 호출하여 store 상태 업데이트
 * - 서버 업로드는 TODO로 남겨두었으며, API 연동 시 profileImageUrl 상태를 업데이트하면 자동 반영
 *
 * 사용 예시:
 * <ProfileImageUpload size="large" edit />
 */
export default function ProfileImageUpload({
  size = 'medium',
  edit = false,
  className,
  defaultImageUrl,
}: ProfileImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { previewUrl, profileImageUrl, setPreviewUrl, clearPreview } = useProfileImageStore();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      clearPreview();
      return;
    }

    setPreviewUrl(file);

    // TODO: 서버 업로드 (나중에 API 연동)
  };

  const background = previewUrl ?? profileImageUrl ?? defaultImageUrl ?? null;

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
