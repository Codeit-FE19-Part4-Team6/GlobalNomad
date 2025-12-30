import { BaseInput } from './BaseInput';
import { type BaseInputProps } from './types';
export interface TextInputProps extends BaseInputProps {
  /** input type @default 'text' */
  type?: 'text' | 'email' | 'tel' | 'url' | 'number' | 'search';
}

/**
 * TextInput 컴포넌트
 *
 * 일반 텍스트 입력을 위한 기본 Input 컴포넌트입니다.
 * BaseInput을 기반으로 하며, 다양한 type을 지원합니다.
 *
 * @remarks
 * - 검증 로직은 포함하지 않으며, 상위 컴포넌트나 폼 라이브러리에서 관리합니다.
 * - error와 errorMessage props를 통해 외부에서 에러 상태를 제어할 수 있습니다.
 *
 * @example 기본 사용
 * ```tsx
 * <TextInput
 *   label="이름"
 *   placeholder="이름을 입력하세요"
 * />
 * ```
 *
 * @example 이메일 입력
 * ```tsx
 * <TextInput
 *   label="이메일"
 *   type="email"
 *   placeholder="email@example.com"
 * />
 * ```
 *
 * @example 에러 상태
 * ```tsx
 * <TextInput
 *   label="이메일"
 *   type="email"
 *   error={!!errors.email}
 *   errorMessage={errors.email?.message}
 * />
 * ```

 *
 * @example 커스텀 검증
 * ```tsx
 * const [email, setEmail] = useState('');
 * const [error, setError] = useState('');
 *
 * const handleBlur = () => {
 *   if (!validators.email(email)) {
 *     setError('올바른 이메일을 입력하세요');
 *   } else {
 *     setError('');
 *   }
 * };
 *
 * <TextInput
 *   label="이메일"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   onBlur={handleBlur}
 *   error={!!error}
 *   errorMessage={error}
 * />
 * ```
 */
export const TextInput = ({ type = 'text', ...props }: TextInputProps) => {
  return <BaseInput type={type} {...props} />;
};

TextInput.displayName = 'TextInput';
