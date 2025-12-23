import { forwardRef, useState } from 'react';
import { type BaseInputProps } from './types';
import Icons from '@/assets/icons';
import { PrimaryButton } from '@/components/common/button';
import { BaseInput } from '@/components/common/input/BaseInput';

export interface SearchInputProps extends Omit<BaseInputProps, 'type'> {
  onSearch?: (value: string) => void;
  searchButtonText?: string;
  showButton?: boolean;
}

/**
 * SearchInput 컴포넌트
 *
 * 검색 아이콘과 검색 버튼이 포함된 검색 전용 입력 필드입니다.
 * 사용자가 키워드를 입력하고 Enter 키 또는 버튼 클릭으로 검색을 실행할 수 있습니다.
 *
 * - 내부적으로 BaseInput을 사용하여 기본 Input 스타일을 유지합니다.
 * - 모바일 / 데스크탑 반응형 스타일을 지원합니다.
 * - 검색 버튼은 선택적으로 표시할 수 있습니다.
 *
 * @example
 * ```tsx
 * <SearchInput
 *   placeholder="내가 원하는 체험은"
 *   onSearch={(value) => {
 *     console.log('검색어:', value);
 *   }}
 * />
 * ```
 */

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className = '',
      placeholder = '내가 원하는 체험은',
      onSearch,
      searchButtonText = '검색하기',
      showButton = true,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState('');

    const handleSearch = () => {
      if (onSearch) {
        onSearch(value);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    return (
      <div className='flex flex-col items-center gap-3 sm:gap-9'>
        <h1 className='font-lg-bold sm:font-4xl-bold'>무엇을 체험하고 싶으신가요?</h1>

        <div className='relative w-full'>
          {/* 검색 아이콘 */}
          <div className='absolute top-1/2 left-5 -translate-y-1/2 text-gray-500'>
            <Icons.Search />
          </div>

          {/* Input */}
          <BaseInput
            ref={ref}
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`h-[50px] w-full rounded-2xl border border-gray-100 pl-14 sm:h-[70px] sm:rounded-3xl ${
              showButton ? 'pr-38' : 'pr-5'
            } focus:border-primary-500 caret-primary-500 focus:ring-primary-500/40 sm:placeholder:font-xl-medium placeholder:font-md-medium transition-all duration-200 outline-none placeholder:text-gray-400 focus:ring-2 ${className}`}
            {...props}
          />

          {showButton && (
            <div className='absolute top-1/2 right-3 -translate-y-1/2'>
              <PrimaryButton
                onClick={handleSearch}
                className='font-md-bold sm:font-lg-bold h-[41px] px-5 py-3 leading-none sm:h-[50px] sm:px-8 sm:py-4'>
                {searchButtonText}
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
