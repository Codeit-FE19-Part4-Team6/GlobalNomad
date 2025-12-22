import ImageUpload from '@/components/common/image-upload/ImageUpload';
import { useState } from 'react';

const MAX = 4;
/**
 * 인트로 이미지 업로드 컴포넌트
 *
 * - 최대 4개의 이미지를 업로드 가능
 * - 업로드된 이미지는 오른쪽으로 순서대로 추가
 * - 업로드된 이미지 수를 ImageUpload에 전달하여 "x/4" 표시
 *
 * 예시: <IntroImageSection />
 */
export default function IntroImageSection() {
  const [images, setImages] = useState<File[]>([]);

  const addImage = (file: File) => {
    if (images.length >= MAX) {
      return;
    }
    setImages((prev) => [...prev, file]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='flex items-center gap-3'>
      {images.length < MAX && (
        <ImageUpload onAdd={addImage} fileCount={images.length} maxFiles={MAX} />
      )}
      {images.map((file, index) => (
        <ImageUpload
          key={index}
          file={file}
          onRemove={() => removeImage(index)}
          fileCount={images.length}
          maxFiles={MAX}
        />
      ))}
    </div>
  );
}
