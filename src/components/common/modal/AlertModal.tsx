import BaseModal from '@/components/common/modal/BaseModal';
import { PrimaryButton } from '@/components/common/button';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttonText?: string;
}

/**
 * 간단한 알림 모달 컴포넌트
 * - 텍스트 메시지와 확인 버튼만 표시
 * - 예약 실패, 안내 메시지 등에 사용
 */
export default function AlertModal({
  isOpen,
  onClose,
  message,
  buttonText = '확인',
}: AlertModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} size='confirm' closeOnEsc>
      <div className='flex flex-col items-center gap-6 px-7.5 py-7.5'>
        <p className='font-lg-medium text-center text-gray-900'>{message}</p>
        <PrimaryButton onClick={onClose} className='h-12 w-full'>
          {buttonText}
        </PrimaryButton>
      </div>
    </BaseModal>
  );
}
