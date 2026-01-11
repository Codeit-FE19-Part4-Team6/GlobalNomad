import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '@/components/SearchInput';
import Card from '@/components/common/card';
import { FilterButton } from '@/components/common/button/FilterButton';
import Pagination from '@/components/common/pagination';
import Title from '@/components/common/Title';
import { Art, Food, Sport, Tour, Bus, Wellbeing, ArrowRight } from '@/assets/icons';
import Dropdown from '@/components/common/dropdown/Dropdown';
import DropdownTrigger from '@/components/common/dropdown/DropdownTrigger';
import DropdownList from '@/components/common/dropdown/DropdownList';
import DropdownItem from '@/components/common/dropdown/DropdownItem';
import { useActivities } from '@/hooks/queries/useActivities';
import type { ActivityCategory } from '@/apis/type';

// 카테고리 타입 정의
type Category = '전체' | ActivityCategory;

// 가격 정렬 타입 정의
type PriceSort = 'price_asc' | 'price_desc' | null;

// 카테고리 아이콘 매핑 (아이콘만 매핑)
const categoryIconMap: Record<ActivityCategory, React.ReactNode> = {
  '문화 · 예술': <Art />,
  식음료: <Food />,
  스포츠: <Sport />,
  투어: <Tour />,
  관광: <Bus />,
  웰빙: <Wellbeing />,
};

// 전체 카테고리 목록 (동적으로 생성)
const categories: Category[] = ['전체', ...Object.keys(categoryIconMap)] as Category[];

// 가격 정렬 옵션
const priceSortOptions: { label: string; value: PriceSort }[] = [
  { label: '가격 낮은 순', value: 'price_asc' },
  { label: '가격 높은 순', value: 'price_desc' },
];

// 슬라이더 설정 상수
const SLIDER_CONFIG = {
  CARD_WIDTH: 384, // sm 이상 카드 너비
  CARD_WIDTH_MOBILE: 280, // 모바일 카드 너비
  GAP: 24, // sm 이상 gap
  GAP_MOBILE: 16, // 모바일 gap
} as const;

const MainPage = () => {
  const navigate = useNavigate();

  // 카테고리 필터 상태
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');

  // 가격 정렬 상태
  const [priceSort, setPriceSort] = useState<PriceSort>(null);

  // 검색어 상태
  const [searchKeyword, setSearchKeyword] = useState('');

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // 슬라이더 상태 및 ref
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // 인기 체험 API (most_reviewed 정렬)
  const { data: popularActivitiesData } = useActivities({
    method: 'offset',
    page: 1,
    size: 10,
    sort: 'most_reviewed',
  });

  // 모든 체험 API (카테고리 필터링 + 페이지네이션 + 정렬 + 검색)
  const { data: allActivitiesData, isLoading } = useActivities({
    method: 'offset',
    page: currentPage,
    size: pageSize,
    category: selectedCategory === '전체' ? undefined : selectedCategory,
    keyword: searchKeyword.trim() || undefined, // 검색어를 API로 전달
    sort: priceSort || 'latest', // 가격 정렬이 있으면 가격 정렬, 없으면 최신순
  });

  // 페이지네이션 계산 (API에서 검색된 결과의 totalCount 사용)
  const totalPages = allActivitiesData ? Math.ceil(allActivitiesData.totalCount / pageSize) : 1;

  // 검색 핸들러 (SearchInput의 onSearch에서 호출됨)
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    // 검색 시 필터 초기화
    setSelectedCategory('전체');
    setPriceSort(null);
    setCurrentPage(1);
  };

  // 카테고리 필터 핸들러
  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
  };

  // 가격 정렬 핸들러
  const handlePriceSortChange = (sortValue: PriceSort) => {
    setPriceSort(sortValue);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
  };

  // 현재 선택된 가격 정렬 라벨
  const currentPriceSortLabel = priceSort
    ? priceSortOptions.find((option) => option.value === priceSort)?.label
    : '가격';

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

    // 2개씩 이동하도록 고정
    const slideDistance = (SLIDER_CONFIG.CARD_WIDTH + SLIDER_CONFIG.GAP) * 2;

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
      <div className='mx-auto w-full max-w-300 px-6 sm:px-7.5 lg:px-10'>
        {/* 배너 섹션 - 전체 너비 사용 */}
        <section className='relative mb-10 h-60 w-full overflow-hidden rounded-3xl sm:mb-16 sm:h-137.5'>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: popularActivitiesData?.activities[0]?.bannerImageUrl
                ? `url(${popularActivitiesData.activities[0].bannerImageUrl})`
                : 'url(https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1920&h=550&fit=crop)',
            }}>
            {/* 오버레이 */}
            <div className='absolute inset-0 rounded-3xl bg-black/30' />
          </div>

          {/* 배너 텍스트 */}
          <div className='relative flex h-full flex-col items-center justify-center px-4 text-center text-white'>
            <Title as='h1' size='3xl' weight='bold' className='mb-4 text-white sm:text-4xl'>
              {popularActivitiesData?.activities[0]?.title || '함께 배우며 즐기는 스트릿 댄스'}
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
            enableRealtimeSearch
            debounceMs={300}
            minLength={0}
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
          <div className='relative -mx-6 px-6 sm:-mx-7.5 sm:px-7.5 lg:-mx-10 lg:px-10'>
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
              {popularActivitiesData?.activities.map((activity) => (
                <div
                  key={activity.id}
                  onClick={() => navigate(`/activities/${activity.id}`)}
                  className='cursor-pointer'>
                  <Card variant='grid'>
                    <Card.Image src={activity.bannerImageUrl} alt={activity.title} />
                    <Card.Content>
                      <Card.Title title={activity.title} />
                      <Card.Rating rating={activity.rating} reviewCount={activity.reviewCount} />
                      <Card.Price price={activity.price} />
                    </Card.Content>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 모든 체험 섹션 */}
        <section className='mb-20'>
          <div className='mb-6 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Title as='h2' size='2xl' weight='bold'>
                🛼 모든 체험
              </Title>
            </div>

            {/* 가격 정렬 드롭다운 */}
            <Dropdown className='relative'>
              <DropdownTrigger className='font-md-medium flex items-center gap-1 text-gray-700 transition-colors hover:text-gray-900'>
                <span>{currentPriceSortLabel}</span>
                <svg
                  className='h-5 w-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </DropdownTrigger>
              <DropdownList className='absolute top-full right-0 z-10 mt-2 min-w-35 rounded-lg border border-gray-200 bg-white shadow-lg'>
                {priceSortOptions.map((option) => (
                  <DropdownItem
                    key={option.value}
                    onClick={() => handlePriceSortChange(option.value)}
                    className='font-md-medium cursor-pointer px-4 py-2.5 text-gray-900 transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50'>
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownList>
            </Dropdown>
          </div>

          {/* 카테고리 필터 */}
          <div className='mb-8 flex flex-wrap gap-2 sm:gap-3'>
            {categories.map((category) => (
              <FilterButton
                key={category}
                size='md'
                icon={category === '전체' ? null : categoryIconMap[category as ActivityCategory]}
                selected={selectedCategory === category}
                onClick={() => handleCategoryClick(category)}>
                {category}
              </FilterButton>
            ))}
          </div>

          {/* 체험 카드 그리드 */}
          {isLoading ? (
            <div className='flex h-100 items-center justify-center'>
              <span className='font-lg-medium text-gray-500'>체험을 불러오는 중...</span>
            </div>
          ) : allActivitiesData && allActivitiesData.activities.length > 0 ? (
            <div className='mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {allActivitiesData.activities.map((activity) => (
                <div
                  key={activity.id}
                  onClick={() => navigate(`/activities/${activity.id}`)}
                  className='cursor-pointer'>
                  <Card variant='grid'>
                    <Card.Image src={activity.bannerImageUrl} alt={activity.title} />
                    <Card.Content>
                      <Card.Title title={activity.title} />
                      <Card.Rating rating={activity.rating} reviewCount={activity.reviewCount} />
                      <Card.Price price={activity.price} />
                    </Card.Content>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex h-100 items-center justify-center'>
              <span className='font-lg-medium text-gray-500'>
                {searchKeyword.trim() ? '검색 결과가 없습니다.' : '체험이 없습니다.'}
              </span>
            </div>
          )}

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
