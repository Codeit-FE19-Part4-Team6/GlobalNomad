import { usePagination } from './PaginationContext';
import PaginationItem from './PaginationItem';
import { getPageBlockRange } from './pagination.utils';

const MOBILE_BLOCK_SIZE = 3;

/**
 * 페이지 번호 목록
 * - 데스크탑: 전체 블록
 * - 모바일: 축약 + …
 */
const PaginationItems = () => {
  const { pages, currentPage, totalPages } = usePagination();

  const { start, end } = getPageBlockRange(currentPage, totalPages, MOBILE_BLOCK_SIZE);

  return (
    <>
      {/* Desktop */}
      <ul className='hidden items-center gap-4 md:flex'>
        {pages.map((page) => (
          <PaginationItem key={page} page={page} />
        ))}
      </ul>

      {/* Mobile */}
      <ul className='flex list-none items-center gap-4 md:hidden'>
        {start > 1 && <li className='text-gray-400'>…</li>}

        {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((page) => (
          <PaginationItem key={page} page={page} />
        ))}

        {end < totalPages && <li className='text-gray-400'>…</li>}
      </ul>
    </>
  );
};

export default PaginationItems;
