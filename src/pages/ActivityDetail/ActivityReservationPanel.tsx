import { DayPicker } from 'react-day-picker';
import Title from '@/components/common/Title';
import { PrimaryButton } from '@/components/common/button/PrimaryButton';
import { TimeSelectButton } from '@/components/common/button/TimeSelectButton';

interface ActivityReservationPanelProps {
  price: number;
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  selectedTimeSlot: string | null;
  onSelectTimeSlot: (timeSlot: string) => void;
  participantCount: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReservation: () => void;
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
}: ActivityReservationPanelProps) {
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
          className='font-md-medium w-full rounded-xl bg-white p-4'
          modifiersClassNames={{
            selected: 'custom-selected',
            today: 'custom-today',
            disabled: 'text-gray-300 cursor-not-allowed',
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
          disabled={[{ before: new Date() }]}
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
          <span className='font-lg-medium min-w-[40px] text-center text-gray-900'>
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
          <TimeSelectButton
            onClick={() => onSelectTimeSlot('14:00~15:00')}
            selected={selectedTimeSlot === '14:00~15:00'}
            className='w-full'>
            14:00~15:00
          </TimeSelectButton>
          <TimeSelectButton
            onClick={() => onSelectTimeSlot('15:00~16:00')}
            selected={selectedTimeSlot === '15:00~16:00'}
            className='w-full'>
            15:00~16:00
          </TimeSelectButton>
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
        <PrimaryButton size='lg' onClick={onReservation} className='w-30'>
          예약하기
        </PrimaryButton>
      </div>
    </div>
  );
}
