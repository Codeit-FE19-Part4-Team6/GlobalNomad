import { usePagination } from './PaginationContext';

/**
 * 다음 페이지 블록으로 이동하는 버튼
 */
const PaginationNext = () => {
  const { nextBlock, isLastBlock } = usePagination();

  return (
    <button
      onClick={nextBlock}
      disabled={isLastBlock}
      className='text-gray-400 disabled:opacity-30'>
      ›
    </button>
  );
};

export default PaginationNext;
