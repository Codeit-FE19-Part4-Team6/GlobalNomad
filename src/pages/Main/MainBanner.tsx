import Title from '@/components/common/Title';
import { Cloud } from '@/assets/images';

interface MainBannerProps {
  bannerImageUrl?: string;
  bannerTitle?: string;
}

export default function MainBanner({ bannerImageUrl, bannerTitle }: MainBannerProps) {
  return (
    <div className='relative -mt-21 overflow-hidden bg-linear-to-b from-blue-50 via-blue-50/50 to-white pt-21 pb-10 sm:-mt-29 sm:pt-29 sm:pb-16'>
      {/* 구름 이미지들 - 불규칙 배치 */}
      <Cloud className='pointer-events-none absolute top-8 -left-10 w-28 opacity-80 sm:top-12 sm:left-0 sm:w-40 lg:top-16 lg:left-10 lg:w-48' />
      <Cloud className='pointer-events-none absolute top-20 right-4 w-20 opacity-60 sm:top-16 sm:right-20 sm:w-28 lg:top-20 lg:right-40 lg:w-36' />
      <Cloud className='pointer-events-none absolute top-40 -left-5 w-16 opacity-50 sm:top-60 sm:left-20 sm:w-24 lg:top-80 lg:left-40 lg:w-32' />
      <Cloud className='pointer-events-none absolute top-32 right-0 w-24 opacity-70 sm:top-48 sm:-right-5 sm:w-32 lg:top-56 lg:right-10 lg:w-44' />
      <Cloud className='pointer-events-none absolute top-56 left-1/4 hidden w-20 opacity-40 sm:block sm:w-24 lg:top-72 lg:w-28' />
      <Cloud className='pointer-events-none absolute top-72 right-1/4 hidden w-16 opacity-50 sm:block sm:w-20 lg:top-96 lg:w-24' />

      {/* 컨텐츠 래퍼 */}
      <div className='relative z-10 mx-auto w-full max-w-300 px-6 sm:px-7.5 lg:px-10'>
        {/* 배너 섹션 */}
        <section className='relative h-45 w-full overflow-hidden rounded-3xl sm:h-93.75 lg:h-125'>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: bannerImageUrl
                ? `url(${bannerImageUrl})`
                : 'url(https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1920&h=550&fit=crop)',
            }}>
            {/* 오버레이 */}
            <div className='absolute inset-0 rounded-3xl bg-black/30' />
          </div>

          {/* 배너 텍스트 */}
          <div className='relative flex h-full flex-col items-center justify-center px-4 text-center text-white'>
            <Title as='h1' size='3xl' weight='bold' className='mb-4 text-white sm:text-4xl'>
              {bannerTitle || '함께 배우며 즐기는 스트릿 댄스'}
            </Title>
            <p className='font-md-medium sm:font-xl-medium text-white'>1월의 인기 체험 BEST</p>
          </div>
        </section>
      </div>
    </div>
  );
}
