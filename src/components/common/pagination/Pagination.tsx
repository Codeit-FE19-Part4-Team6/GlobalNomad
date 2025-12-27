import type { ReactNode } from 'react';
import { PaginationContext } from './PaginationContext';
import { getPageBlockRange } from './pagination.utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  children: ReactNode;
}

const BLOCK_SIZE = 5;

/**
 * Pagination
 *
 * offset 기반 API(page, size)를 사용하는 페이지네이션 루트 컴포넌트입니다.
 */
const Pagination = ({ currentPage, totalPages, onPageChange, children }: PaginationProps) => {
  const { start, end } = getPageBlockRange(currentPage, totalPages, BLOCK_SIZE);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        totalPages,
        pages,
        isFirstBlock: start === 1,
        isLastBlock: end === totalPages,
        goTo: onPageChange,
        prevBlock: () => {
          if (start > 1) {
            onPageChange(start - 1);
          }
        },
        nextBlock: () => {
          if (end < totalPages) {
            onPageChange(end + 1);
          }
        },
      }}>
      <nav className='flex items-center justify-center gap-4'>{children}</nav>
    </PaginationContext.Provider>
  );
};

export default Pagination;
