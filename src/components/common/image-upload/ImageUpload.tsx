import { Delete, FallbackImage, PasswordHidden } from '@/assets/icons';
import { useEffect, useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
type ImageUploadProps = {
  file?: File;
  fileCount: number;
  maxFiles: number;
  onAdd?: (file: File) => void;
  onRemove?: () => void;
  imageUrl?: string;
};

export default function ImageUpload({
  file,
  fileCount = 0,
  maxFiles = 4,
  onAdd,
  onRemove,
  imageUrl,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // useEffect(() => {
  //   if (!file) {
  //     setPreview(null);
  //     return;
  //   }

  //   const url = URL.createObjectURL(file);
  //   setPreview(url);

  //   return () => {
  //     URL.revokeObjectURL(url);
  //   };
  // }, [file]);

  useEffect(() => {
    // 1️⃣ 새로 선택한 파일이 있으면 (최우선)
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }

    // 2️⃣ 파일은 없고, 기존 이미지 URL이 있으면
    if (imageUrl) {
      setPreview(imageUrl);
      return;
    }

    // 3️⃣ 둘 다 없으면
    setPreview(null);
  }, [file, imageUrl]);

  const handleClick = () => {
    if (!preview) {
      inputRef.current?.click();
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) {
      return;
    }
    try {
      const options = {
        maxSizeMB: 0.75,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressed = await imageCompression(selected, options);

      onAdd?.(compressed as File); // 타입 좁히기(상황에 따라 필요)
    } catch (err) {
      console.error(err);
      // TODO: toast 같은 거 띄우기
    } finally {
      e.target.value = '';
    }
  };
  if (!preview) {
    return (
      <div>
        <button
          type='button'
          onClick={handleClick}
          className='flex h-20 w-20 flex-col items-center justify-center gap-0.5 rounded-md border border-gray-100 bg-white px-5 py-1.5 sm:h-32 sm:w-32 sm:gap-2.5 sm:rounded-2xl sm:py-4'>
          <FallbackImage className='h-10 w-10 px-[6.67px] pt-2.5 pb-[6.14px] text-gray-400' />
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
        <Delete className='text-white' />
      </button>
    </div>
  );
}
