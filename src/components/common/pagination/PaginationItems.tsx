import { usePagination } from './PaginationContext';
import PaginationItem from './PaginationItem';

const MOBILE_BLOCK_SIZE = 3;

/**
 * 페이지 번호 목록
 * - 데스크탑: 전체 블록
 * - 모바일: 축약 + …
 */
const PaginationItems = () => {
  const { pages, currentPage, totalPages } = usePagination();

  const blockIndex = Math.floor((currentPage - 1) / MOBILE_BLOCK_SIZE);
  const start = blockIndex * MOBILE_BLOCK_SIZE + 1;
  const end = Math.min(start + MOBILE_BLOCK_SIZE - 1, totalPages);

  return (
    <>
      {/* Desktop */}
      <ul className='hidden items-center gap-4 md:flex'>
        {pages.map((page) => (
          <PaginationItem key={page} page={page} />
        ))}
      </ul>

      {/* Mobile */}
      <ul className='flex items-center gap-4 md:hidden'>
        {start > 1 && <li className='text-gray-400'>…</li>}

        {pages
          .filter((p) => p >= start && p <= end)
          .map((page) => (
            <PaginationItem key={page} page={page} />
          ))}

        {end < totalPages && <li className='text-gray-400'>…</li>}
      </ul>
    </>
  );
};

export default PaginationItems;
