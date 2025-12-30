import { cn } from '@/utils/cn';

interface TextAreaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange'
> {
  value: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'modal';
}
/**
 * TextArea 컴포넌트
 *
 * - TextArea는 controlled component이므로 `value`와 `onChange` 반드시 필요
 * - `variant`를 통해 스타일 선택 가능 ('default' | 'modal')
 *
 * ```tsx
 * <TextArea
 *   value={text}                    // 현재 입력 값
 *   onChange={setText}              // 입력 값 변경 시 상태 업데이트
 *   placeholder="여기에 입력..."   // placeholder 텍스트
 *   variant="default"               // 스타일 variant
 *   className="custom-class"        // 추가 Tailwind 클래스
 * />
 * ```
 */

export default function TextArea({
  className,
  value,
  onChange,
  variant = 'default',
  ...props
}: TextAreaProps) {
  return (
    <div className={cn('flex w-full', variant === 'default' && 'lg:w-175')}>
      <textarea
        className={cn(
          'w-full resize-none border border-gray-100 bg-white px-5 placeholder:text-gray-400 focus:outline-none',
          variant === 'default'
            ? 'placeholder:font-lg-medium md:placeholder:font-lg-medium font-md-medium md:font-lg-medium h-35 max-w-175 rounded-2xl py-4 md:h-50'
            : 'placeholder:font-md-medium md:placeholder:font-lg-medium font-md-medium h-44.75 rounded-xl py-5',
          className
        )}
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
