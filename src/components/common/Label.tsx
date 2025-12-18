import { cn } from '@/utils/cn';

/**
 * Label 컴포넌트
 *
 * 기본 HTML <label> 태그를 기반으로 만든 공통 컴포넌트입니다.
 * htmlFor Prop을 통해 input과 연결할 수 있습니다.
 * children에는 문자열, 아이콘, 다양한 JSX 요소를 자유롭게 넣을 수 있습니다.
 *
 * 사용 예시:
 *   <Label htmlFor="username" className="text-2xs font-bold">
 *     아이디
 *   </Label>
 *
 */

export default function Label({
  htmlFor,
  children,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label htmlFor={htmlFor} className={cn('text-gray-950', className)} {...props}>
      {children}
    </label>
  );
}
