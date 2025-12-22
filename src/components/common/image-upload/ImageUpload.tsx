import { useEffect, useMemo, useRef } from 'react';
import Icons from '@/assets/icons';

type ImageUploadProps = {
  file?: File;
  fileCount: number;
  maxFiles: number;
  onAdd?: (file: File) => void;
  onRemove?: () => void;
};
/**
 * ImageUpload 컴포넌트
 * - 파일이 없으면 업로드 버튼을 표시
 * - 파일이 있으면 미리보기 이미지와 삭제 버튼을 표시
 * - 업로드된 이미지 개수와 최대 업로드 가능 개수를 표시
 */
export default function ImageUpload({
  file,
  fileCount = 0,
  maxFiles = 4,
  onAdd,
  onRemove,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const preview = useMemo(() => {
    if (!file) {
      return null;
    }
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  const handleClick = () => {
    if (!file) {
      inputRef.current?.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) {
      return;
    }
    onAdd?.(selected);
    e.target.value = '';
  };

  if (!file) {
    return (
      <div>
        <button
          type='button'
          onClick={handleClick}
          className='flex h-20 w-20 flex-col items-center justify-center gap-0.5 rounded-md border border-gray-100 bg-white px-5 py-1.5 md:h-32 md:w-32 md:gap-2.5 md:rounded-2xl md:py-4'>
          <Icons.PasswordHidden className='h-10 w-10 px-[6.67px] pt-2.5 pb-[6.14px] text-gray-400' />
          <div className='font-sm-medium md:font-md-medium text-gray-600'>
            {fileCount}/{maxFiles}
          </div>
        </button>

        <input
          ref={inputRef}
          type='file'
          accept='image/*'
          onChange={handleChange}
          className='hidden'
        />
      </div>
    );
  }

  return (
    <div
      className='relative h-20 w-20 rounded-md border border-gray-100 bg-cover bg-center md:h-32 md:w-32 md:rounded-2xl'
      style={{ backgroundImage: `url(${preview})` }}>
      <button
        type='button'
        aria-label='삭제'
        onClick={onRemove}
        className='absolute -top-1 -right-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-950'>
        <Icons.Delete className='text-white' />
      </button>
    </div>
  );
}
