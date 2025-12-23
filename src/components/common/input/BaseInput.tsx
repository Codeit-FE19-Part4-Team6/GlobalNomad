/**
 * BaseInput 컴포넌트
 *
 * 모든 Input의 기본이 되는 컴포넌트
 * 직접 사용보다는 TextInput, NumberInput 등을 사용 권장
 */

import { forwardRef } from 'react';
import { type BaseInputProps } from './types';

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ error = false, errorMessage, label, className = '', ...props }, ref) => {
    // 상태별 스타일
    const stateClasses = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
      : 'border-gray-100 focus:border-primary-500 focus:ring-primary-500/40';

    const baseClasses = `w-full rounded-2xl border h-[54px] px-5 transition-all duration-200 outline-none focus:ring-2 focus:ring-opacity-50 placeholder:text-gray-400 placeholder:font-lg-medium ${stateClasses} ${className}`;

    return (
      <div className='w-full'>
        {label && <label className='font-lg-medium mb-2.5 block text-gray-950'>{label}</label>}
        <input ref={ref} className={baseClasses} {...props} />
        {error && errorMessage && (
          <p className='font-xs-medium mt-1.5 ml-2 text-red-500'>{errorMessage}</p>
        )}
      </div>
    );
  }
);

BaseInput.displayName = 'BaseInput';
