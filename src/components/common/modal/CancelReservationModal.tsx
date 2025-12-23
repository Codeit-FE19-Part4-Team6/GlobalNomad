import BaseModal from '@/components/common/modal/BaseModal';
import { tv } from 'tailwind-variants';
import Icons from '@/assets/icons';
import { cn } from '@/utils/cn';
import { SecondaryButton } from '@/components/common/button';

interface CancelReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
  children?: React.ReactNode;
  cancelText: string;
  confirmText: string;
  className?: string;
}

const BaseModalStyles = tv({
  base: 'flex flex-col gap-[24px] items-center justify-between  py-[30px] px-[30px] bg-white',
});

const BtnStyles = tv({
  base: 'w-[113px] h-[41px] md:w-[135px] md:h-[47px]',
  variants: {
    variant: {
      primary: 'font-md-bold md:font-lg-bold',
      base: 'font-md-medium md:font-lg-medium',
    },
  },
});

/**
 * 예약 취소 모달 UI로 구현하였으나 등록중 뒤로가기도 사용이 가능하도록 수정했습니다.
 * children으로 질문 텍스트를 전달할 수 있습니다.
 * cancelText, confirmText로 버튼 텍스트를 수정할 수 있습니다.
 */
export default function CancelReservationModal({
  isOpen,
  onConfirm,
  onClose,
  isLoading,
  children,
  cancelText,
  confirmText,
  className,
}: CancelReservationModalProps) {
  const handleConfirm = async () => {
    if (isLoading) {
      return;
    }
    await onConfirm();
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size='confirm'
      aria-labelledby='cancel-modal-title'
      closeOnEsc={!isLoading}
      containerClassName={cn(BaseModalStyles(), className)}>
      <div className='flex flex-col items-center'>
        <Icons.WarningSm className='block h-12.25 w-12.25 md:hidden' />
        <Icons.WarningLg className='hidden h-22 w-22 md:block' />
        <p className='font-lg-bold md:font-xl-bold text-black'>{children}</p>
      </div>

      <div className='flex w-full justify-center gap-[12px]'>
        <SecondaryButton size='md' onClick={onClose} className={BtnStyles({ variant: 'base' })}>
          {cancelText}
        </SecondaryButton>
        <SecondaryButton
          active
          disabled={isLoading}
          onClick={handleConfirm}
          size='md'
          className={BtnStyles({ variant: 'primary' })}>
          {isLoading ? '처리중...' : confirmText}
        </SecondaryButton>
      </div>
    </BaseModal>
  );
}
