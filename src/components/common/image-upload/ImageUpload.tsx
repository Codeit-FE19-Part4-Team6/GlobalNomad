import { useEffect, useRef, useState } from 'react';
import Icons from '@/assets/icons';

type ImageUploadProps = {
  file?: File;
  fileCount: number;
  maxFiles: number;
  onAdd?: (file: File) => void;
  onRemove?: () => void;
};

export default function ImageUpload({
  file,
  fileCount = 0,
  maxFiles = 4,
  onAdd,
  onRemove,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

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
          className='flex h-20 w-20 flex-col items-center justify-center gap-0.5 rounded-md border border-gray-100 bg-white px-5 py-1.5 sm:h-32 sm:w-32 sm:gap-2.5 sm:rounded-2xl sm:py-4'>
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
