import BaseModal from '@/components/common/modal/BaseModal';
import { tv } from 'tailwind-variants';
import warningLg from '@/assets/icons/page/warning-lg.svg?url';
import warningSm from '@/assets/icons/page/warning-sm.svg?url';
import { cn } from '@/utils/cn';

interface CancelReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
  children?: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  className?: string;
}

const BaseModalStyles = tv({
  base: 'flex flex-col items-center justify-between  py-[30px] px-[30px] bg-white',
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
      closeOnOverlayClick={!isLoading}
      closeOnEsc={!isLoading}
      containerClassName={cn(BaseModalStyles(), className)}>
      <div className='flex flex-col items-center'>
        <img
          src={warningSm}
          alt='예약취소 모달 이미지'
          className='block h-[49px] w-[49px] md:hidden'
        />

        <img
          src={warningLg}
          alt='예약취소 모달 이미지'
          className='hidden h-[88px] w-[88px] md:block'
        />
        <p className=''>{children}</p>
      </div>

      {/* 버튼 영역 */}
      <div className='flex w-full justify-center gap-[8px]'>
        <button
          type='button'
          onClick={onClose}
          className='font-md-bold md:font-lg-bold h-[41px] w-[113px] rounded-[14px] border border-gray-200 md:h-[47px] md:w-[135px]'>
          {cancelText}
        </button>

        <button
          type='button'
          disabled={isLoading}
          onClick={handleConfirm}
          className='bg-primary-500 font-md-bold md:font-lg-bold h-[41px] w-[113px] rounded-[14px] text-white disabled:opacity-60 md:h-[47px] md:w-[135px]'>
          {isLoading ? '처리중...' : confirmText}
        </button>
      </div>
    </BaseModal>
  );
}
