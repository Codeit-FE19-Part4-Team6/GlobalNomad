import BaseModal from '@/components/common/modal/BaseModal';
import { tv } from 'tailwind-variants';
import Title from '@/components/common/Title';
import warning from '@/assets/images/warning.webp';

interface CancelReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
}

const BaseModalStyles = tv({
  base: 'flex flex-col items-center justify-between  py-[30px] px-[30px] bg-white h-[185px] md:h-[242px] py-[30px]',
});

export default function CancelReservationModal({
  isOpen,
  onConfirm,
  onClose,
  isLoading,
}: CancelReservationModalProps) {
  const handleConfirm = async () => {
    if (isLoading) {
      return;
    }
    try {
      await onConfirm();
      onClose();
    } catch {
      throw new Error('예약취소에 실패했습니다.');
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size='confirm'
      aria-labelledby='cancel-modal-title'
      closeOnOverlayClick={!isLoading}
      closeOnEsc={!isLoading}
      containerClassName={BaseModalStyles()}>
      <div className='flex flex-col items-center'>
        <img
          src={warning}
          alt='예약취소 모달 이미지'
          className='h-[49px] w-[49px] md:h-[88px] md:w-[88px]'
        />
        <Title
          as='h1'
          size='xl'
          weight='bold'
          className='text-[16px] text-gray-950 md:text-inherit'>
          예약을 취소하시겠어요?
        </Title>
      </div>

      {/* 버튼 영역 */}
      <div className='flex w-full justify-center gap-[8px]'>
        <button
          type='button'
          onClick={onClose}
          className='font-md-bold md:font-lg-bold h-[41px] w-[113px] rounded-[14px] border border-gray-200 md:h-[47px] md:w-[135px]'>
          <span>아니오 </span>
        </button>

        <button
          type='button'
          disabled={isLoading}
          onClick={handleConfirm}
          className='bg-primary-500 font-md-bold md:font-lg-bold h-[41px] w-[113px] rounded-[14px] text-white disabled:opacity-60 md:h-[47px] md:w-[135px]'>
          <span>취소하기</span>
        </button>
      </div>
    </BaseModal>
  );
}
