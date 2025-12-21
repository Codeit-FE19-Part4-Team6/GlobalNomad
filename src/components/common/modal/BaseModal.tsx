import ModalPortal from '@/components/common/modal/ModalPortal';
import useEscapeClose from '@/hooks/useEscapeClose';
import UseBodyScrollLock from '@/hooks/useBodyScrollLock';
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

  UseBodyScrollLock({ isLocked: isOpen });

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnOverlayClick) {
      return;
    }

    // 오버레이 자체를 클릭했을 때만 닫기
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
