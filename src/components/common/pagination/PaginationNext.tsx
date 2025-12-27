import { usePagination } from './PaginationContext';

const PaginationNext = () => {
  const { nextBlock, isLastBlock } = usePagination();

  return (
    <button
      onClick={nextBlock}
      disabled={isLastBlock}
      className='flex h-10 w-10 items-center justify-center text-gray-400 disabled:opacity-30'
      aria-label='다음 페이지 블록'>
      ›
    </button>
  );
};

export default PaginationNext;
