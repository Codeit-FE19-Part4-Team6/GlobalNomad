import ModalPortal from '@/components/common/modal/ModalPortal';
import useEscapeClose from '@/hooks/useEscapeClose';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { tv } from 'tailwind-variants';
import { cn } from '@/utils/cn';

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  size?: 'confirm' | 'review';
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  overlayClassName?: string;
  containerClassName?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
};

const ModalLayout = tv({
  base: 'fixed inset-0 z-30 flex items-center justify-center bg-gray-900/70 bg-cover bg-no-repeat',
});

const ModalContainer = tv({
  base: 'flex flex-col bg-white rounded-[30px]',
  variants: {
    size: {
      confirm: 'w-[320px] md:w-[400px]',
      review: 'w-[327px] md:w-[385px]',
    },
  },
});

/**
 * 공통(Base) 모달 컴포넌트입니다.
 *
 * - `isOpen`이 `true`일 때만 렌더링됩니다.
 * - 오버레이 클릭/ESC 닫기 옵션을 제공합니다.
 * - `overlayClassName`, `containerClassName`으로 스타일 확장이 가능합니다.
 * - 접근성을 위해 `role="dialog"` + `aria-*`를 지원합니다.
 */

export default function BaseModal({
  isOpen,
  onClose,
  size = 'confirm',
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  overlayClassName,
  containerClassName,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}: BaseModalProps) {
  useEscapeClose({
    isOpen,
    enabled: closeOnEsc,
    onClose,
  });

  useBodyScrollLock({ isLocked: isOpen });

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnOverlayClick) {
      return;
    }

    if (e.target === e.currentTarget) {
      e.stopPropagation();
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <ModalPortal>
      <div
        onClick={handleOverlayClick}
        className={cn(ModalLayout(), overlayClassName)}
        role='dialog'
        aria-modal='true'
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}>
        <div className={cn(ModalContainer({ size }), containerClassName)}>{children}</div>
      </div>
    </ModalPortal>
  );
}
