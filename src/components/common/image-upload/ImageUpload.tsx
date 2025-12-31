import { useEffect, useRef, useState } from 'react';
import Icons from '@/assets/icons';

type ImageUploadProps = {
  file?: File; // 업로드된 파일. 없으면 업로드 버튼 표시
  fileCount: number; // 현재 업로드된 이미지 개수
  maxFiles: number; // 최대 업로드 가능 개수
  onAdd?: (file: File) => void; // 이미지 추가 시 호출
  onRemove?: () => void; // 이미지 삭제 시 호출
};

/**
 * [ImageUpload] - 이미지 업로드 컴포넌트
 *
 * 기능:
 * - 업로드 전: 버튼 클릭으로 파일 선택 가능, 현재 업로드 개수 표시
 * - 업로드 후: 이미지 미리보기 표시, 삭제 버튼 제공
 * - maxFiles를 초과하면 업로드 버튼은 표시되지 않음
 *
 * 사용 예시:
 * <ImageUpload fileCount={images.length} maxFiles={4} onAdd={addImage} />
 */
export default function ImageUpload({
  file,
  fileCount = 0,
  maxFiles = 4,
  onAdd,
  onRemove,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null); // 파일 input 참조
  const [preview, setPreview] = useState<string | null>(null); // 이미지 미리보기 URL

  // file이 바뀔 때 미리보기 URL 생성 및 정리
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url); // 미리보기로

    return () => {
      URL.revokeObjectURL(url); // 이전 URL 메모리 해제
    };
  }, [file]);

  // 업로드 버튼 클릭 시 input 클릭
  const handleClick = () => {
    if (!file) {
      inputRef.current?.click();
    }
  };

  // 파일 선택 시 호출
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) {
      return;
    }

    onAdd?.(selected); // 상위에서 이미지 추가 처리
    e.target.value = ''; // 같은 파일 선택 시도 허용
  };

  // 업로드 전 UI (버튼)
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
