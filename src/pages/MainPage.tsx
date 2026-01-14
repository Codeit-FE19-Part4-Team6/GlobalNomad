import { useState, useCallback } from 'react';
import { useActivities } from '@/hooks/queries/useActivities';
import { SearchInput } from '@/components/SearchInput';
import MainBanner from './Main/MainBanner';
import PopularActivities from './Main/PopularActivities';
import AllActivities, { type Category, type PriceSort } from './Main/AllActivities';

const MainPage = () => {
  // 카테고리 필터 상태
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');

  // 가격 정렬 상태
  const [priceSort, setPriceSort] = useState<PriceSort>(null);

  // 검색어 상태
  const [searchKeyword, setSearchKeyword] = useState('');

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

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
    keyword: searchKeyword.trim() || undefined,
    sort: priceSort || 'latest',
  });

  // 실제 로딩 상태 (초기 로딩일 때만 true, 이전 데이터 표시 중에는 false)
  const showLoading = isLoading && !allActivitiesData;

  // 페이지네이션 계산
  const totalPages = allActivitiesData ? Math.ceil(allActivitiesData.totalCount / pageSize) : 1;

  // 검색 핸들러 (useCallback으로 메모이제이션하여 불필요한 재생성 방지)
  const handleSearch = useCallback((value: string) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  }, []);

  // 카테고리 필터 핸들러
  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // 가격 정렬 핸들러
  const handlePriceSortChange = (sortValue: PriceSort) => {
    setPriceSort(sortValue);
    setCurrentPage(1);
  };

  return (
    <div className='w-full'>
      {/* 배너 영역 */}
      <MainBanner
        bannerImageUrl={popularActivitiesData?.activities[0]?.bannerImageUrl}
        bannerTitle={popularActivitiesData?.activities[0]?.title}
      />

      {/* 흰색 배경 영역 */}
      <div className='mx-auto w-full max-w-300 px-6 sm:px-7.5 lg:px-10'>
        {/* 인기 체험 섹션 */}
        <PopularActivities activities={popularActivitiesData?.activities || []} />

        {/* 검색 영역 */}
        <section className='mb-10 sm:mb-16'>
          <SearchInput
            title='무엇을 체험하고 싶으신가요?'
            placeholder='내가 원하는 체험은'
            onSearch={handleSearch}
            searchButtonText='검색하기'
            showButton
            minLength={0}
            enableRealtimeSearch
            debounceMs={300}
          />
        </section>

        {/* 모든 체험 섹션 */}
        <AllActivities
          activities={allActivitiesData?.activities || []}
          isLoading={showLoading}
          searchKeyword={searchKeyword}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          priceSort={priceSort}
          onPriceSortChange={handlePriceSortChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default MainPage;
