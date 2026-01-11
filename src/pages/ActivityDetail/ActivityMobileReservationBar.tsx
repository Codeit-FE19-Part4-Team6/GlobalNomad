import Title from '@/components/common/Title';
import { PrimaryButton } from '@/components/common/button/PrimaryButton';

interface ActivityMobileReservationBarProps {
  price: number;
  selectedDate: Date | undefined;
  selectedTimeSlot: number | null; // scheduleId
  selectedTimeSlotDisplay?: string; // 표시용 시간 문자열
  onOpenBottomSheet: () => void;
  onReservation?: () => void;
  isReservationEnabled?: boolean;
}

export default function ActivityMobileReservationBar({
  price,
  selectedDate,
  selectedTimeSlot,
  selectedTimeSlotDisplay,
  onOpenBottomSheet,
  onReservation,
  isReservationEnabled = false,
}: ActivityMobileReservationBarProps) {
  const formatSelectedDate = () => {
    if (!selectedDate || !selectedTimeSlot) {
      return '날짜 선택하기';
    }

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    return `${year.toString().slice(2)}/${month}/${day} ${selectedTimeSlotDisplay || ''}`;
  };

  return (
    <div className='fixed inset-x-0 bottom-0 z-50 bg-white px-6 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] sm:px-[30px] lg:hidden'>
      <div className='mx-auto flex max-w-[1200px] items-center justify-between gap-4'>
        <button
          onClick={onOpenBottomSheet}
          className='font-md-bold text-primary-500 flex-shrink-0 underline'>
          {formatSelectedDate()}
        </button>
        <div className='flex items-center gap-3'>
          <div className='flex items-baseline gap-1'>
            <Title as='h3' size='xl' weight='bold'>
              ₩ {price.toLocaleString()}
            </Title>
            <span className='font-md-medium text-gray-500'>/ 인</span>
          </div>
          <PrimaryButton size='lg' disabled={!isReservationEnabled} onClick={onReservation}>
            예약하기
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
