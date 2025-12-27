/**
 * 고정 블록 단위 페이지 범위를 계산합니다.
 *
 * @remarks
 * offset 기반 페이지네이션(page, size)에 사용됩니다.
 *
 * @example
 * currentPage = 7, blockSize = 5 → { start: 6, end: 10 }
 */
export const getPageBlockRange = (currentPage: number, totalPages: number, blockSize: number) => {
  const blockIndex = Math.floor((currentPage - 1) / blockSize);

  const start = blockIndex * blockSize + 1;
  const end = Math.min(start + blockSize - 1, totalPages);

  return { start, end };
};
