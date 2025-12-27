import { usePagination } from './PaginationContext';
import { cn } from '@/utils/cn';
import { useCallback } from 'react';

interface Props {
  page: number;
}

const PaginationItem = ({ page }: Props) => {
  const { currentPage, goTo } = usePagination();
  const isActive = page === currentPage;

  const handleClick = useCallback(() => {
    goTo(page);
  }, [goTo, page]);

  return (
    <li className='list-none'>
      <button
        onClick={handleClick}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          // 공통 사이즈
          'flex h-10 w-10 items-center justify-center text-sm',
          // underline 공간 확보
          'border-b-2',
          // 상태별 스타일
          isActive
            ? 'border-[var(--color-primary-500)] font-semibold text-[var(--color-gray-950)]'
            : 'border-transparent text-[var(--color-gray-400)]'
        )}>
        {page}
      </button>
    </li>
  );
};

export default PaginationItem;
