import { useRef, useEffect, useMemo } from 'react';
import Icons from '@/assets/icons';
import { cn } from '@/utils/cn';

type ProfileImageUploadProps = {
  size?: 'Medium' | 'Large';
  file?: File | null;
  onFileChange?: (file: File | null) => void;
  edit?: boolean;
  className?: string;
  defaultImageUrl?: string | null;
};

/**
 * 프로필 이미지 업로드 컴포넌트
 *
 * - 프로필 이미지 미리보기 지원
 * - 기본 이미지 URL(defaultImageUrl) 표시 가능
 * - Medium / Large 사이즈
 *
 * @example
 * <ProfileImageUpload
 *   size="Large"
 *   file={file}
 *   defaultImageUrl={user.profileImage}
 *   edit
 *   onFileChange={setFile}
 * />
 */
export default function ProfileImageUpload({
  size = 'Medium',
  file,
  onFileChange,
  edit = false,
  defaultImageUrl,
  className,
}: ProfileImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const preview = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return defaultImageUrl ?? null;
  }, [file, defaultImageUrl]);

  useEffect(() => {
    if (!preview || !file) {
      return;
    }
    return () => URL.revokeObjectURL(preview);
  }, [preview, file]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    onFileChange?.(selected);
  };

  return (
    <div className={cn('relative inline-block h-fit w-fit', className)}>
      <div
        className={cn(
          'flex aspect-square items-center justify-center overflow-hidden rounded-full bg-gray-200',
          {
            'h-17.5 w-17.5': size === 'Medium',
            'h-30 w-30': size === 'Large',
          }
        )}
        style={{
          backgroundImage: preview ? `url(${preview})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        {!preview && (size === 'Medium' ? <Icons.ProfileMd /> : <Icons.ProfileLg />)}
      </div>

      {edit && (
        <button
          type='button'
          onClick={handleEditClick}
          className={cn(
            'absolute right-0 bottom-0 flex items-center justify-center rounded-full bg-gray-300',
            {
              'h-6 w-6 p-[5.6px]': size === 'Medium',
              'h-7.5 w-7.5 p-1.75': size === 'Large',
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
