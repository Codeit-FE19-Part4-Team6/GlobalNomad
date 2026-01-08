import ModalPortal from '@/components/common/modal/ModalPortal';
import useEscapeClose from '@/hooks/useEscapeClose';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { cn } from '@/utils/cn';
import { useRef } from 'react';

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  closeOnEsc?: boolean;
  overlayClassName?: string;
  containerClassName?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
};

/**
 * BottomSheet 컴포넌트
 *
 * 모바일/태블릿에서 하단에서 올라오는 시트 형태의 모달입니다.
 * - `isOpen`이 `true`일 때만 렌더링됩니다.
 * - 오버레이 클릭/ESC 닫기 옵션을 제공합니다.
 * - BaseModal과 유사하지만 하단에서 슬라이드 업 애니메이션을 사용합니다.
 */
export default function BottomSheet({
  isOpen,
  onClose,
  children,
  closeOnEsc = true,
  overlayClassName,
  containerClassName,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}: BottomSheetProps) {
  useEscapeClose({
    isOpen,
    enabled: closeOnEsc,
    onClose,
  });

  useBodyScrollLock({ isLocked: isOpen });

  const mouseDownTarget = useRef<EventTarget | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseDownTarget.current = e.target;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDownTarget.current === e.target && e.target === e.currentTarget) {
      onClose();
    }

    mouseDownTarget.current = null;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalPortal>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={cn(
          'fixed inset-0 z-[9999] flex items-end justify-center bg-gray-900/70 bg-cover bg-no-repeat',
          overlayClassName
        )}
        role='dialog'
        aria-modal='true'
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}>
        <div
          className={cn(
            'flex w-full max-w-[1200px] flex-col rounded-t-3xl bg-white',
            containerClassName
          )}>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}
