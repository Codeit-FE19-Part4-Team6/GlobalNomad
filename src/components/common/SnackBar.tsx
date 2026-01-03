import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';
import type { SnackBarType } from '@/types/snackbar.types';

// SnackBar 설정 상수
const SNACKBAR_CONFIG = {
  DESKTOP_BASE_OFFSET: 16,
  MOBILE_BASE_OFFSET: 75,
  STACK_GAP: 60,
  MOBILE_BREAKPOINT: 680,
  DEFAULT_DURATION: 3000,
  DEFAULT_Z_INDEX: 50,
} as const;

// SnackBar 스타일 정의
const snackBarStyle = tv({
  base: 'flex items-center rounded-xl shadow-md transition-all duration-300 transform px-5 py-[15px] gap-[15px] max-[680px]:px-[15px] max-[680px]:py-3 max-[680px]:gap-[15px] max-w-[90vw] min-w-0 translate-y-0 opacity-100',
  variants: {
    type: {
      success: 'bg-primary-100 border border-primary-500 text-primary-500',
      error: 'bg-red-50 border border-red-400 text-red-400',
    },
  },
  defaultVariants: {
    type: 'success',
  },
});

const messageStyle = tv({
  base: 'responsive-text text-lg-to-xs font-lg-medium flex-1 whitespace-nowrap overflow-hidden text-ellipsis',
  variants: {
    type: {
      success: 'text-primary-500',
      error: 'text-red-400',
    },
  },
});

interface SnackBarProps {
  isOpen: boolean;
  message: string;
  type?: SnackBarType;
  duration?: number;
  onClose: () => void;
  stackIndex?: number;
  zIndex?: number;
}

/**
 * 알림 메시지를 표시하는 SnackBar 컴포넌트
 *
 * @description
 * 사용자에게 피드백을 제공하는 토스트/스낵바 컴포넌트입니다.
 * 데스크톱에서는 상단에, 모바일에서는 하단에 표시됩니다.
 * 여러 개의 스낵바가 동시에 표시될 수 있으며, 자동으로 쌓입니다.
 *
 * @remarks
 * - 이 컴포넌트는 직접 사용하기보다 `useSnackBar` 훅을 통해 사용하는 것을 권장합니다.
 * - `SnackBarProvider`로 앱을 감싸야 사용할 수 있습니다. (설정해두었습니다.)
 *
 * @example
 * // ❌ 직접 사용 (권장하지 않음)
 * <SnackBar
 *   isOpen={true}
 *   message="저장되었습니다"
 *   type="success"
 *   onClose={() => setIsOpen(false)}
 * />
 *
 * @example
 * // ✅ useSnackBar 훅 사용 (권장)
 * function MyComponent() {
 *   const { showSnack } = useSnackBar(); ✅
 *
 *   const handleSave = async () => {
 *     try {
 *       await saveData();
 *       showSnack('저장되었습니다!', 'success'); ✅
 *     } catch (error) {
 *       showSnack('저장 실패', 'error'); ✅
 *     }
 *   };
 *
 *   return <button onClick={handleSave}>저장</button>;
 * }
 *
 * @example
 * // 콜백과 함께 사용
 * showSnack('로그인 성공!', 'success', {
 *   duration: 2000,
 *   onClose: () => navigate('/dashboard')
 * });
 *
 * @example
 * // 에러 메시지 표시
 * showSnack('네트워크 오류가 발생했습니다.', 'error', {
 *   duration: 5000
 * });
 *
 * @example
 * // React Query와 함께 사용
 * const { mutate } = useMutation({
 *   mutationFn: createPost,
 *   onSuccess: () => {
 *     showSnack('게시글이 작성되었습니다.', 'success');
 *   },
 *   onError: () => {
 *     showSnack('작성 실패', 'error');
 *   }
 * });
 *
 * @example
 * // React Hook Form과 함께 사용
 * const onSubmit = async (data) => {
 *   try {
 *     await registerUser(data);
 *     showSnack('회원가입이 완료되었습니다!', 'success', {
 *       onClose: () => navigate('/login')
 *     });
 *   } catch (error) {
 *     showSnack(error.message, 'error');
 *   }
 * };
 *
 * @see {@link useSnackBar} - SnackBar를 쉽게 사용하기 위한 Hook
 * @see {@link SnackBarProvider} - SnackBar를 사용하기 위한 Provider
 */

export default function SnackBar({
  isOpen,
  message,
  type = 'success',
  duration = SNACKBAR_CONFIG.DEFAULT_DURATION,
  onClose,
  stackIndex = 0,
  zIndex = SNACKBAR_CONFIG.DEFAULT_Z_INDEX,
}: SnackBarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 모바일 감지 및 자동 닫기 타이머 관리
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= SNACKBAR_CONFIG.MOBILE_BREAKPOINT);
    };

    // 모바일 감지 초기화 및 이벤트 리스너 등록
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 자동 닫기 타이머 설정
    if (isOpen && duration > 0) {
      closeTimerRef.current = setTimeout(() => {
        onClose();
      }, duration);
    }

    // cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [isOpen, duration, onClose]);

  if (!isOpen) {
    return null;
  }

  const desktopOffset =
    SNACKBAR_CONFIG.DESKTOP_BASE_OFFSET + stackIndex * SNACKBAR_CONFIG.STACK_GAP;
  const mobileOffset = SNACKBAR_CONFIG.MOBILE_BASE_OFFSET + stackIndex * SNACKBAR_CONFIG.STACK_GAP;

  return (
    <div
      className='fixed left-1/2 -translate-x-1/2'
      style={{
        top: !isMobile ? `${desktopOffset}px` : 'auto',
        bottom: isMobile ? `${mobileOffset}px` : 'auto',
        zIndex: zIndex + stackIndex,
      }}>
      <div
        className={clsx(snackBarStyle({ type }))}
        role='alert'
        aria-live='polite'
        aria-atomic='true'
        aria-label={`${type === 'success' ? '성공' : '오류'} 알림: ${message}`}>
        {/* 메시지 */}
        <div className={clsx(messageStyle({ type }))}>{message}</div>
      </div>
    </div>
  );
}
