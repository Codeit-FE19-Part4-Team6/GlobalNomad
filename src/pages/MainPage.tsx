import { useState } from 'react';
import { useActivities } from '@/hooks/queries/useActivities';
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

  // 페이지네이션 계산
  const totalPages = allActivitiesData ? Math.ceil(allActivitiesData.totalCount / pageSize) : 1;

  // 검색 핸들러
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setSelectedCategory('전체');
    setPriceSort(null);
    setCurrentPage(1);
  };

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
      {/* 배너 + 검색 영역 */}
      <MainBanner
        bannerImageUrl={popularActivitiesData?.activities[0]?.bannerImageUrl}
        bannerTitle={popularActivitiesData?.activities[0]?.title}
        onSearch={handleSearch}
      />

      {/* 흰색 배경 영역 */}
      <div className='mx-auto w-full max-w-300 px-6 sm:px-7.5 lg:px-10'>
        {/* 인기 체험 섹션 */}
        <PopularActivities activities={popularActivitiesData?.activities || []} />

        {/* 모든 체험 섹션 */}
        <AllActivities
          activities={allActivitiesData?.activities || []}
          isLoading={isLoading}
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
