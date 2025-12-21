/** 
 * TimeSelectButton 컴포넌트
 * 
 * 시간을 선택할 때 사용하는 버튼 컴포넌트입니다.
 * 
 * ## 특징
 * - `selected` 상태에 따라 스타일이 변경됩니다.
 * - 버튼 내부 텍스트는 `children`을 통해 자유롭게 전달할 수 있습니다.
 * - 기본 폰트는 `font-md-medium`으로 고정되어 있으며, 폰트 스타일은 컴포넌트 내부에서 관리됩니다.
 *
 * 
 * @example
 * ```tsx
 *  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
      <Button.TimeSelect>14:00~15:00</Button.TimeSelect>
      <Button.TimeSelect selected>15:00~16:00</Button.TimeSelect>
    </div>
    ```
      
*/

import React from 'react';
import { type BaseButtonProps } from './types';

interface TimeSelectButtonProps extends BaseButtonProps {
  selected?: boolean;
}

export const TimeSelectButton: React.FC<TimeSelectButtonProps> = ({
  children,
  selected = false,
  className = '',
  ...props
}) => {
  const classes = `button button-time-select font-md-medium ${selected ? 'button-time-select--selected' : ''} ${className}`;
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
