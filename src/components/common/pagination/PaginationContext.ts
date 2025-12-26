import { createContext, useContext } from 'react';

/**
 * PaginationContextValue
 *
 * Pagination 컴파운드 컴포넌트 간에 공유되는 상태 및 액션 정의입니다.
 */
export interface PaginationContextValue {
  currentPage: number;
  totalPages: number;
  pages: number[];
  isFirstBlock: boolean;
  isLastBlock: boolean;
  goTo: (page: number) => void;
  prevBlock: () => void;
  nextBlock: () => void;
}

export const PaginationContext = createContext<PaginationContextValue | null>(null);

/**
 * usePagination
 *
 * Pagination 하위 컴포넌트 전용 훅입니다.
 */
export const usePagination = () => {
  const ctx = useContext(PaginationContext);
  if (!ctx) {
    throw new Error('Pagination compound components must be used within <Pagination />');
  }
  return ctx;
};
