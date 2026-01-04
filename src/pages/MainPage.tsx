import { useState, useRef } from 'react';
import { SearchInput } from '@/components/SearchInput';
import Card from '@/components/common/card';
import { FilterButton } from '@/components/common/button/FilterButton';
import Pagination from '@/components/common/pagination';
import Title from '@/components/common/Title';
import { Art, Food, Sport, Tour, Bus, Wellbeing, ArrowRight } from '@/assets/icons';

// 카테고리 타입 정의
type Category = '전체' | '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';

// 카테고리 아이콘 매핑
const categoryIcons: Record<Category, React.ReactNode> = {
  전체: null,
  '문화 · 예술': <Art />,
  식음료: <Food />,
  스포츠: <Sport />,
  투어: <Tour />,
  관광: <Bus />,
  웰빙: <Wellbeing />,
};

// 임시 더미 데이터 (추후 API 연동 시 교체)
const DUMMY_POPULAR_ACTIVITIES = [
  {
    id: 1,
    title: '함께 배우며 즐기는 스트릿 댄스',
    price: 38000,
    rating: 4.5,
    reviewCount: 120,
    headCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400',
  },
  {
    id: 2,
    title: '아름다운 석양과 함께하는 요가',
    price: 35000,
    rating: 4.8,
    reviewCount: 89,
    headCount: 2,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
  },
  {
    id: 3,
    title: '서울 야경 투어 with 프로 가이드',
    price: 45000,
    rating: 4.7,
    reviewCount: 156,
    headCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
  },
  {
    id: 4,
    title: '한강에서 즐기는 수상 스포츠',
    price: 65000,
    rating: 4.6,
    reviewCount: 234,
    headCount: 4,
    imageUrl: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400',
  },
  {
    id: 5,
    title: '아름다운 석양과 함께하는 요가',
    price: 35000,
    rating: 4.8,
    reviewCount: 89,
    headCount: 2,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
  },
  {
    id: 6,
    title: '서울 야경 투어 with 프로 가이드',
    price: 45000,
    rating: 4.7,
    reviewCount: 156,
    headCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
  },
];

const DUMMY_ALL_ACTIVITIES = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `체험 활동 ${i + 1}`,
  price: 30000 + i * 5000,
  rating: 4.0 + Math.random(),
  reviewCount: Math.floor(Math.random() * 300),
  headCount: Math.floor(Math.random() * 5) + 1,
  // TODO: API 연결 시 실제 이미지 URL로 교체
  // imageUrl: `https://images.unsplash.com/photo-${1500000000000 + i * 1000000000}?w=400`,
  imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400', // 임시 이미지
}));

// 슬라이더 설정 상수
const SLIDER_CONFIG = {
  CARD_WIDTH: 384, // sm 이상 카드 너비
  CARD_WIDTH_MOBILE: 280, // 모바일 카드 너비
  GAP: 24, // sm 이상 gap
  GAP_MOBILE: 16, // 모바일 gap
} as const;

const MainPage = () => {
  // 카테고리 필터 상태
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // 임시값, 실제로는 API 응답에서 계산

  // 슬라이더 상태 및 ref
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // 검색 핸들러
  const handleSearch = (value: string) => {
    console.log('검색어:', value);
    // TODO: API 호출 로직 추가
  };

  // 카테고리 필터 핸들러
  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
    // TODO: API 호출 로직 추가
  };

  // 스크롤 위치 체크
  const checkScrollPosition = () => {
    if (!sliderRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // 슬라이더 이동 핸들러
  const handleSlide = (direction: 'left' | 'right') => {
    if (!sliderRef.current) {
      return;
    }

    const slider = sliderRef.current;

    // 반응형 슬라이드 거리 계산
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

    let slideDistance = 0;

    if (isMobile) {
      // 모바일: 현재 스크롤 위치 기준으로 자연스럽게 이동
      slideDistance = SLIDER_CONFIG.CARD_WIDTH_MOBILE + SLIDER_CONFIG.GAP_MOBILE;
    } else if (isTablet) {
      // 태블릿: 2개씩 이동
      slideDistance = (SLIDER_CONFIG.CARD_WIDTH + SLIDER_CONFIG.GAP) * 2;
    } else {
      // 데스크톱: 4개씩 이동
      slideDistance = (SLIDER_CONFIG.CARD_WIDTH + SLIDER_CONFIG.GAP) * 4;
    }

    const newScrollLeft =
      direction === 'left' ? slider.scrollLeft - slideDistance : slider.scrollLeft + slideDistance;

    slider.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });

    // 스크롤 후 화살표 상태 업데이트
    setTimeout(checkScrollPosition, 300);
  };

  return (
    <div className='w-full'>
      {/* 컨텐츠 래퍼 - 반응형 너비 및 패딩 */}
      <div className='mx-auto w-full max-w-[1200px] px-6 sm:px-[30px] lg:px-10'>
        {/* 배너 섹션 - 전체 너비 사용 */}
        <section className='relative mb-10 h-[240px] w-full overflow-hidden rounded-3xl sm:mb-16 sm:h-[550px]'>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1920&h=550&fit=crop)',
            }}>
            {/* 오버레이 */}
            <div className='absolute inset-0 rounded-3xl bg-black/30' />
          </div>

          {/* 배너 텍스트 */}
          <div className='relative flex h-full flex-col items-center justify-center px-4 text-center text-white'>
            <Title as='h1' size='3xl' weight='bold' className='mb-4 text-white sm:text-4xl'>
              함께 배우며 즐기는 스트릿 댄스
            </Title>
            <p className='font-md-medium sm:font-xl-medium text-white'>1월의 인기 체험 BEST 🔥</p>
          </div>
        </section>
        {/* 검색 영역 */}
        <section className='mb-10 sm:mb-16'>
          <SearchInput
            title='무엇을 체험하고 싶으신가요?'
            placeholder='내가 원하는 체험은'
            onSearch={handleSearch}
            searchButtonText='검색하기'
            showButton
          />
        </section>

        {/* 인기 체험 섹션 */}
        <section className='mb-10 sm:mb-20'>
          <div className='mb-6 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Title as='h2' size='2xl' weight='bold'>
                🔥 인기 체험
              </Title>
            </div>
          </div>

          {/* 카드 슬라이더 - 가로 스크롤 */}
          <div className='relative -mx-6 px-6 sm:-mx-[30px] sm:px-[30px] lg:-mx-10 lg:px-10'>
            {/* 왼쪽 화살표 버튼 - 모바일에서는 숨김 */}
            {showLeftArrow && (
              <button
                onClick={() => handleSlide('left')}
                className='absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 sm:block'
                aria-label='이전 카드'>
                <ArrowRight className='h-6 w-6 rotate-180 text-gray-900' />
              </button>
            )}

            {/* 오른쪽 화살표 버튼 - 모바일에서는 숨김 */}
            {showRightArrow && (
              <button
                onClick={() => handleSlide('right')}
                className='absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 sm:block'
                aria-label='다음 카드'>
                <ArrowRight className='h-6 w-6 text-gray-900' />
              </button>
            )}

            <div
              ref={sliderRef}
              onScroll={checkScrollPosition}
              className='scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth pb-4 sm:gap-6'>
              {DUMMY_POPULAR_ACTIVITIES.map((activity) => (
                <Card key={activity.id} variant='grid'>
                  <Card.Image src={activity.imageUrl} alt={activity.title} />
                  <Card.Content>
                    <Card.Title title={activity.title} />
                    <Card.Rating rating={activity.rating} reviewCount={activity.reviewCount} />
                    <Card.Price price={activity.price} headCount={activity.headCount} />
                  </Card.Content>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 모든 체험 섹션 */}
        <section className='mb-20'>
          <div className='mb-6 flex items-center gap-2'>
            <Title as='h2' size='2xl' weight='bold'>
              🛼 모든 체험
            </Title>
          </div>

          {/* 카테고리 필터 */}
          <div className='mb-8 flex flex-wrap gap-2 sm:gap-3'>
            {(Object.keys(categoryIcons) as Category[]).map((category) => (
              <FilterButton
                key={category}
                size='md'
                icon={categoryIcons[category]}
                selected={selectedCategory === category}
                onClick={() => handleCategoryClick(category)}>
                {category}
              </FilterButton>
            ))}
          </div>

          {/* 체험 카드 그리드 */}
          <div className='mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {DUMMY_ALL_ACTIVITIES.slice((currentPage - 1) * 8, currentPage * 8).map((activity) => (
              <Card key={activity.id} variant='grid'>
                <Card.Image src={activity.imageUrl} alt={activity.title} />
                <Card.Content>
                  <Card.Title title={activity.title} />
                  <Card.Rating rating={activity.rating} reviewCount={activity.reviewCount} />
                  <Card.Price price={activity.price} headCount={activity.headCount} />
                </Card.Content>
              </Card>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className='flex justify-center'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}>
              <Pagination.Prev />
              <Pagination.Items />
              <Pagination.Next />
            </Pagination>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
