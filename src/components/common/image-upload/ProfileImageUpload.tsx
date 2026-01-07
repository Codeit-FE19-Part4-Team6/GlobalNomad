import { useRef } from 'react';
import { cn } from '@/utils/cn';
import { useProfileImageStore } from '@/stores/profileImageStore';
import { Edit, ProfileLg, ProfileMd } from '@/assets/icons';

type ProfileImageUploadProps = {
  size?: 'medium' | 'large';
  edit?: boolean;
  className?: string;
  defaultImageUrl?: string | null;
};

/**
 * ProfileImageUpload 컴포넌트
 *
 * - 프로필 이미지를 선택하고 미리보기 가능
 * - edit=true 시 우측 하단 편집 버튼 표시, 클릭하면 파일 선택 가능
 * - 선택된 파일은 previewUrl 상태에 저장되어 UI에 바로 반영
 * - 실제 서버 업로드는 TODO 처리, API 연동 시 profileImageUrl 업데이트로 반영
 *
 * Props:
 * - size: 'medium' | 'large' (이미지 크기)
 * - edit: 편집 가능 여부
 * - className: 추가 클래스
 * - defaultImageUrl: 기본 이미지 URL
 *
 * 사용 예시:
 * <ProfileImageUpload size="large" edit />
 */
export default function ProfileImageUpload({
  size = 'medium',
  edit = false,
  className,
  defaultImageUrl,
  activePage,
}: ProfileImageUploadProps & { activePage?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    previewUrl,
    profileImageUrl,
    setPreviewUrl,
    clearPreview,
    setFile, // 서버 업로드용 파일 상태
  } = useProfileImageStore();

  // 편집 버튼 클릭 시 파일 선택 input 열기
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    inputRef.current?.click();
  };

  // 파일 선택 시 previewUrl과 서버 업로드용 파일 상태 동시에 업데이트
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      clearPreview(); // 프리뷰 초기화
      setFile(null); // 업로드용 파일 초기화
      return;
    }

    setPreviewUrl(file); // 브라우저 미리보기용
  };

  // 이미지 표시 결정: preview > 서버 이미지 > 기본 이미지
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
        {!background && (size === 'medium' ? <ProfileMd /> : <ProfileLg />)}
      </div>

      {edit && activePage === 'profile' && (
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
          <Edit className='text-white' />
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
