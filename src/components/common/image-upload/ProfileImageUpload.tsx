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
}: ProfileImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null); //inputRef는 숨겨진 파일 input을 직접 클릭하거나 조작
  const { previewUrl, profileImageUrl, setPreviewUrl, clearPreview } = useProfileImageStore();

  // 편집 버튼 클릭 시 파일 선택 input 열기
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 이벤트 버블링 방지
    inputRef.current?.click();
  };

  // 파일 선택 시 previewUrl 상태에 저장
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      clearPreview(); // 선택 취소 시 미리보기 초기화
      return;
    }

    setPreviewUrl(file);

    // TODO: 서버 업로드 (API 연동 시 구현)
  };

  // 배경 이미지 결정: preview > 실제 업로드된 이미지 > 기본 이미지
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
        {/* 이미지 없으면 기본 아이콘 표시 */}
        {!background && (size === 'medium' ? <ProfileMd /> : <ProfileLg />)}
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
          <Edit className='text-white' />
        </button>
      )}

      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange} //사용자가 파일을 선택했을 때 호출되는 함수
        className='hidden'
      />
    </div>
  );
}
