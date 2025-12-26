/**
 * BaseInput 컴포넌트
 *
 * 모든 Input의 기본이 되는 컴포넌트
 * 직접 사용보다는 TextInput, NumberInput 등을 사용 권장
 */

import { forwardRef, useId } from 'react';
import { type BaseInputProps } from './types';

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    { error = false, errorMessage, label, className = '', leftElement, rightElement, ...props },
    ref
  ) => {
    const generatedId = useId();
    const inputId = props.id ?? generatedId;

    const errorId = `${inputId}-error`;

    // 상태별 스타일
    const stateClasses = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
      : 'border-gray-100 focus:border-primary-500 focus:ring-primary-500/40';
    const paddingLeft = leftElement ? 'pl-14' : 'pl-5';
    const paddingRight = rightElement ? 'pr-12' : 'pr-5';
    const baseClasses = [
      paddingLeft,
      paddingRight,
      'w-full rounded-2xl border h-[54px] transition-all duration-200 outline-none focus:ring-2 focus:ring-opacity-50 placeholder:text-gray-400 placeholder:font-lg-medium',
      stateClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className='w-full'>
        {label && (
          <label htmlFor={inputId} className='font-lg-medium mb-2.5 block text-gray-950'>
            {label}
          </label>
        )}
        <div className='relative'>
          {leftElement && (
            <div className='absolute top-1/2 left-5 -translate-y-1/2 text-gray-500'>
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            className={baseClasses}
            id={inputId}
            aria-invalid={error}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
          {rightElement && (
            <div className='absolute top-1/2 right-4 -translate-y-1/2'>{rightElement}</div>
          )}
        </div>
        {errorMessage && (
          <p id={errorId} className='font-xs-medium mt-1.5 ml-2 text-red-500'>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

BaseInput.displayName = 'BaseInput';
