import { forwardRef, useCallback, useState } from 'react';
import Icons from '@/assets/icons';
import { PrimaryButton } from '@/components/common/button';
import { BaseInput } from '@/components/common/input/BaseInput';
import type { BaseInputProps } from '@/components/common/input/types';

export interface SearchInputProps extends Omit<BaseInputProps, 'type'> {
  onSearch?: (value: string) => void;
  searchButtonText?: string;
  showButton?: boolean;
  /** 최소 검색어 길이 (기본값: 1) */
  minLength?: number;
  /** 빈 검색어 시도 시 콜백 */
  onEmptySearch?: () => void;
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
 * - 빈 검색어 방어 로직이 포함되어 있습니다.
 *
 * @example
 * ```tsx
 * <SearchInput
 *   placeholder="내가 원하는 체험은"
 *   onSearch={(value) => {
 *     console.log('검색어:', value);
 *   }}
 *   minLength={2}
 *   onEmptySearch={() => {
 *     alert('검색어를 입력해주세요');
 *   }}
 * />
 * ```
 */

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      placeholder = '내가 원하는 체험은',
      onSearch,
      searchButtonText = '검색하기',
      showButton = true,
      className = '',
      minLength = 1,
      onEmptySearch,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const handleSearch = useCallback(() => {
      const trimmedValue = value.trim();
      // 빈 검색어 또는 최소 길이 미달 체크
      if (!trimmedValue || trimmedValue.length < minLength) {
        setError(true);
        onEmptySearch?.();
        return;
      }
      setError(false);
      onSearch?.(trimmedValue);
    }, [value, minLength, onSearch, onEmptySearch]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
      // 외부에서 전달된 onKeyDown도 실행
      props.onKeyDown?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      // 입력 시 에러 상태 초기화
      if (error) {
        setError(false);
      }
    };

    return (
      <div className='flex flex-col items-center gap-3 sm:gap-9'>
        <h1 className='font-lg-bold sm:font-4xl-bold'>무엇을 체험하고 싶으신가요?</h1>

        <div className='relative w-full'>
          {/* 검색 아이콘 */}
          <div
            className='absolute top-1/2 left-5 -translate-y-1/2 text-gray-500'
            aria-hidden='true'>
            <Icons.Search />
          </div>

          {/* Input */}
          <BaseInput
            ref={ref}
            type='search'
            aria-label='검색어 입력'
            aria-invalid={error}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            error={error}
            className={`h-[50px] w-full rounded-2xl border pl-14 sm:h-[70px] sm:rounded-3xl ${
              showButton ? 'pr-38' : 'pr-5'
            } caret-primary-500 sm:placeholder:font-xl-medium placeholder:font-md-medium transition-all duration-200 outline-none placeholder:text-gray-400 focus:ring-2 ${className}`}
            {...props}
          />

          {showButton && (
            <div className='absolute top-1/2 right-3 -translate-y-1/2'>
              <PrimaryButton
                onClick={handleSearch}
                className='font-md-bold sm:font-lg-bold h-[41px] px-5 py-3 leading-none sm:h-[50px] sm:px-8 sm:py-4'
                aria-label='검색 실행'>
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
