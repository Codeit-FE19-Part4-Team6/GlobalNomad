interface ActivityImageGalleryProps {
  images: string[];
  title: string;
}

export default function ActivityImageGallery({ images, title }: ActivityImageGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    // 이미지 1개: 전체 영역
    return (
      <section className='mb-8'>
        <div className='h-[400px] overflow-hidden rounded-3xl'>
          <img src={images[0]} alt={title} className='h-full w-full object-cover' />
        </div>
      </section>
    );
  }

  if (images.length === 4) {
    // 이미지 4개: 왼쪽 2개 + 오른쪽 2개
    return (
      <section className='mb-8'>
        <div className='grid h-[400px] grid-cols-2 gap-3 overflow-hidden rounded-3xl'>
          {/* 왼쪽 이미지 2개 */}
          <div className='grid h-full grid-rows-2 gap-3'>
            <div className='h-50 w-full overflow-hidden'>
              <img src={images[0]} alt={title} className='h-full w-full object-cover' />
            </div>
            <div className='h-50 w-full overflow-hidden'>
              <img src={images[1]} alt={`${title} 2`} className='h-full w-full object-cover' />
            </div>
          </div>
          {/* 오른쪽 이미지 2개 */}
          <div className='grid h-full grid-rows-2 gap-3'>
            <div className='h-50 w-full overflow-hidden'>
              <img src={images[2]} alt={`${title} 3`} className='h-full w-full object-cover' />
            </div>
            <div className='h-50 w-full overflow-hidden'>
              <img src={images[3]} alt={`${title} 4`} className='h-full w-full object-cover' />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 2) {
    // 이미지 2개: 왼쪽 1개 + 오른쪽 1개
    return (
      <section className='mb-8'>
        <div className='grid h-[400px] grid-cols-2 gap-3'>
          <div className='h-full w-full overflow-hidden rounded-3xl'>
            <img src={images[0]} alt={title} className='h-full w-full object-cover' />
          </div>
          <div className='h-full w-full overflow-hidden rounded-3xl'>
            <img src={images[1]} alt={`${title} 2`} className='h-full w-full object-cover' />
          </div>
        </div>
      </section>
    );
  }

  // 이미지 3개: 왼쪽 큰 이미지 1개 + 오른쪽 작은 이미지들
  return (
    <section className='mb-8'>
      <div className='grid h-[400px] grid-cols-2 gap-3 overflow-hidden rounded-3xl'>
        {/* 왼쪽 큰 이미지 */}
        <div className='h-full w-full overflow-hidden'>
          <img src={images[0]} alt={title} className='h-full w-full object-cover' />
        </div>
        {/* 오른쪽 작은 이미지들 */}
        <div className={`grid h-full gap-3 ${images.length === 2 ? 'grid-rows-1' : 'grid-rows-2'}`}>
          {images.slice(1).map((image, index) => (
            <div key={index} className='h-50 w-full overflow-hidden'>
              <img
                src={image}
                alt={`${title} ${index + 2}`}
                className='h-full w-full object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
