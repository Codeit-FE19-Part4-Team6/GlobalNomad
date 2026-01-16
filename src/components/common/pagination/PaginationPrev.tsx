import { usePagination } from './PaginationContext';

const PaginationPrev = () => {
  const { prevBlock, isFirstBlock } = usePagination();

  return (
    <button
      onClick={prevBlock}
      disabled={isFirstBlock}
      className='flex h-10 w-10 items-center justify-center text-gray-400 disabled:opacity-30'
      aria-label='이전 페이지 블록'>
      ‹
    </button>
  );
};

export default PaginationPrev;
