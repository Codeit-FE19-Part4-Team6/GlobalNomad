import { usePagination } from './PaginationContext';
import { cn } from '@/utils/cn';

interface Props {
  page: number;
}

const PaginationItem = ({ page }: Props) => {
  const { currentPage, goTo } = usePagination();
  const isActive = page === currentPage;

  return (
    <li>
      <button
        onClick={() => goTo(page)}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'relative flex flex-col items-center px-3 text-sm',
          isActive ? 'font-semibold text-black' : 'text-gray-400'
        )}>
        {page}

        {/* underline */}
        <span
          className={cn(
            'absolute bottom-0 h-[3px] w-[56px] rounded-full bg-blue-500 transition-opacity',
            isActive ? 'opacity-100' : 'opacity-0'
          )}
        />
      </button>
    </li>
  );
};

export default PaginationItem;
