import { DayPicker } from 'react-day-picker';
import Title from '@/components/common/Title';
import { PrimaryButton } from '@/components/common/button/PrimaryButton';
import { TimeSelectButton } from '@/components/common/button/TimeSelectButton';

interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
}

interface ActivityReservationPanelProps {
  price: number;
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  selectedTimeSlot: number | null; // scheduleId
  onSelectTimeSlot: (scheduleId: number) => void;
  participantCount: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReservation: () => void;
  availableTimeSlots?: TimeSlot[];
  availableDates?: Date[];
  isReservationEnabled?: boolean;
  isLoading?: boolean;
  onMonthChange?: (date: Date) => void;
  /** 스케줄 데이터가 로드되었는지 여부 */
  isScheduleLoaded?: boolean;
}

export default function ActivityReservationPanel({
  price,
  selectedDate,
  onSelectDate,
  selectedTimeSlot,
  onSelectTimeSlot,
  participantCount,
  onIncrement,
  onDecrement,
  onReservation,
  availableTimeSlots = [],
  availableDates = [],
  isReservationEnabled = false,
  isLoading = false,
  onMonthChange,
  isScheduleLoaded = false,
}: ActivityReservationPanelProps) {
  // 예약 가능한 날짜인지 확인하는 함수
  const isDateAvailable = (date: Date) => {
    return availableDates.some(
      (availableDate) => availableDate.toDateString() === date.toDateString()
    );
  };
  return (
    <div className='rounded-3xl border border-gray-50 p-6 shadow-[0_0_20px_rgba(0,0,0,0.08)]'>
      {/* 가격 */}
      <div className='pb-6'>
        <div className='flex items-center gap-1'>
          <Title as='h3' size='2xl' weight='bold'>
            ₩ {price.toLocaleString()}
          </Title>
          <span className='font-lg-medium text-gray-700'>/ 인</span>
        </div>
      </div>

      {/* 날짜 선택 */}
      <div className='mb-8'>
        <Title as='h4' size='lg' weight='bold' className='mb-4'>
          날짜
        </Title>
        <DayPicker
          mode='single'
          selected={selectedDate}
          onSelect={onSelectDate}
          onMonthChange={onMonthChange}
          className='font-md-medium w-full rounded-xl bg-white p-4'
          modifiers={{
            available: (date) => isDateAvailable(date),
          }}
          modifiersClassNames={{
            selected: 'custom-selected',
            today: 'custom-today',
            disabled: 'text-gray-300 cursor-not-allowed',
            available: 'font-bold text-primary-500',
          }}
          modifiersStyles={{
            selected: {
              backgroundColor: 'var(--color-primary-500)',
              color: 'white',
              fontWeight: 700,
              borderRadius: '9999px',
            },
            today: {
              backgroundColor: 'var(--color-primary-100)',
              color: 'var(--color-primary-500)',
              fontWeight: 700,
              borderRadius: '9999px',
            },
          }}
          disabled={[
            { before: new Date() },
            // 스케줄 데이터가 로드되었으면, 예약 가능한 날짜만 활성화
            (date) => isScheduleLoaded && !isDateAvailable(date),
          ]}
        />
      </div>

      {/* 참가 인원 수 */}
      <div className='mb-8 flex items-center justify-between'>
        <Title as='h4' size='lg' weight='bold'>
          참여 인원 수
        </Title>
        <div className='flex items-center gap-1 rounded-3xl border border-gray-100 p-0'>
          <button
            onClick={onDecrement}
            className='flex h-10 w-10 items-center justify-center text-3xl text-gray-500 transition-colors hover:text-gray-700'>
            −
          </button>
          <span className='font-lg-medium min-w-10 text-center text-gray-900'>
            {participantCount}
          </span>
          <button
            onClick={onIncrement}
            className='flex h-10 w-10 items-center justify-center text-3xl text-gray-500 transition-colors hover:text-gray-700'>
            +
          </button>
        </div>
      </div>

      {/* 예약 가능한 시간 */}
      <div className='mb-10'>
        <Title as='h4' size='lg' weight='bold' className='mb-4'>
          예약 가능한 시간
        </Title>
        <div className='space-y-2'>
          {selectedDate && availableTimeSlots.length > 0 ? (
            availableTimeSlots.map((slot) => (
              <TimeSelectButton
                key={slot.id}
                onClick={() => onSelectTimeSlot(slot.id)}
                selected={selectedTimeSlot === slot.id}
                className='w-full'>
                {slot.startTime}~{slot.endTime}
              </TimeSelectButton>
            ))
          ) : (
            <p className='font-md-medium text-center text-gray-500'>
              {selectedDate ? '예약 가능한 시간이 없습니다.' : '날짜를 선택해주세요.'}
            </p>
          )}
        </div>
      </div>

      {/* 총 금액 및 예약 버튼 */}
      <div className='flex justify-between border-t border-gray-100 pt-6'>
        <div className='flex items-center justify-between gap-2'>
          <span className='font-lg-medium text-gray-900'>총 합계</span>
          <Title as='h3' size='2xl' weight='bold'>
            ₩ {(price * participantCount).toLocaleString()}
          </Title>
        </div>
        <PrimaryButton
          size='lg'
          onClick={onReservation}
          className='w-30'
          disabled={!isReservationEnabled || isLoading}>
          {isLoading ? '예약 중...' : '예약하기'}
        </PrimaryButton>
      </div>
    </div>
  );
}
