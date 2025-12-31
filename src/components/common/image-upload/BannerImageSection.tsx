import ImageUpload from '@/components/common/image-upload/ImageUpload';
import { useState } from 'react';

const MAX = 1; // 배너 이미지는 최대 1장만 업로드 가능

/**
 * [BannerImageSection] - 배너 이미지 업로드 섹션 컴포넌트
 *
 * 기능:
 * - 최대 1개의 배너 이미지를 업로드할 수 있음
 * - 업로드된 이미지 위에는 삭제 버튼 제공
 * - 업로드된 이미지 수를 ImageUpload 컴포넌트에 전달하여 "x/1" 형태로 표시
 *
 * 사용 예시:
 * <BannerImageSection />
 */
export default function BannerImageSection() {
  // 업로드된 이미지를 저장하는 상태
  const [images, setImages] = useState<File[]>([]);

  /**
   * 이미지 추가
   * @param file 업로드할 파일
   * - 최대 개수(MAX)를 초과하면 추가하지 않음
   */
  const addImage = (file: File) => {
    if (images.length >= MAX) {
      return;
    }
    setImages((prev) => [...prev, file]);
  };

  /**
   * 이미지 삭제
   * @param index 삭제할 이미지의 인덱스
   * - images 배열에서 해당 인덱스를 제외하고 상태 업데이트
   */
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='flex items-center gap-3'>
      {/* 업로드 버튼: 최대 이미지 개수(MAX) 이하일 때만 표시 */}
      {images.length <= MAX && (
        <ImageUpload onAdd={addImage} fileCount={images.length} maxFiles={MAX} />
      )}

      {/* 업로드된 이미지 표시 */}
      {images.map((file, index) => (
        <ImageUpload
          key={index} // 리스트 렌더링 시 고유 키
          file={file} // 업로드된 이미지 파일
          onRemove={() => removeImage(index)} // 삭제 버튼 클릭 시 호출
          fileCount={images.length} // 현재 업로드된 이미지 수
          maxFiles={MAX} // 최대 업로드 가능 개수
        />
      ))}
    </div>
  );
}
