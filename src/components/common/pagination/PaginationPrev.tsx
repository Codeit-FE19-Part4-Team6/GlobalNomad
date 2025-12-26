import { usePagination } from './PaginationContext';

/**
 * 이전 페이지 블록으로 이동하는 버튼
 */
const PaginationPrev = () => {
  const { prevBlock, isFirstBlock } = usePagination();

  return (
    <button
      onClick={prevBlock}
      disabled={isFirstBlock}
      className='text-gray-400 disabled:opacity-30'>
      ‹
    </button>
  );
};

export default PaginationPrev;
