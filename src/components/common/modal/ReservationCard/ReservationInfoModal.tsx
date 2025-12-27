import { useEffect, useMemo, useState } from 'react';
import Dropdown from '@/components/common/dropdown/Dropdown';
import DropdownTrigger from '@/components/common/dropdown/DropdownTrigger';
import DropdownList from '@/components/common/dropdown/DropdownList';
import DropdownItem from '@/components/common/dropdown/DropdownItem';
import Icons from '@/assets/icons';
import ReservationCard from '@/components/common/modal/ReservationCard/ReservationCard';
import type { ReservationStatus, ReservationResponse } from '@/types/reservation';
import TabButton from '@/components/common/modal/ReservationCard/ReservationTab';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

type ReservationProps = {
  isOpen: boolean;
  onClose: () => void;
  dateText?: string;
  reservations: ReservationResponse[];
};

export default function ReservationInfoModal({
  isOpen,
  onClose,
  dateText,
  reservations,
}: ReservationProps) {
  const [tab, setTab] = useState<ReservationStatus>('confirmed');
  const [isMouseOnModal, setIsMouseOnModal] = useState(false);
  const reservationTime = useMemo(() => {
    const times = reservations
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
      .map((r) => `${r.startTime} - ${r.endTime}`);
    return Array.from(new Set(times));
  }, [reservations]);

  const [selectedTime, setSelectedTime] = useState(reservationTime[0] ?? '예약 내역이 없습니다.');

  useBodyScrollLock({ isLocked: isMouseOnModal });
  useEffect(() => {
    if (reservationTime.length === 0) {
      setSelectedTime('예약 내역이 없습니다.');
      return;
    }

    if (!reservationTime.includes(selectedTime)) {
      setSelectedTime(reservationTime[0]);
    }
  }, [reservationTime, selectedTime]);

  const reservationCount = useMemo(() => {
    return {
      confirmed: reservations.filter((r) => r.status === 'confirmed').length,
      approved: reservations.filter((r) => r.status === 'approved').length,
      declined: reservations.filter((r) => r.status === 'declined').length,
    };
  }, [reservations]);

  // ✅ 보여줄 리스트(탭 + 시간 필터)
  const visibleList = useMemo(() => {
    return reservations.filter((r) => {
      const timeText = `${r.startTime} - ${r.endTime}`;
      return r.status === tab && timeText === selectedTime;
    });
  }, [reservations, tab, selectedTime]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      onMouseEnter={() => setIsMouseOnModal(true)}
      onMouseLeave={() => setIsMouseOnModal(false)}
      className='w-full rounded-tl-[24px] rounded-tr-[24px] rounded-b-none bg-white lg:w-[340px] lg:rounded-[24px] lg:shadow-[0_8px_24px_rgba(0,0,0,0.12)]'>
      {/* header */}
      <div className='flex items-center justify-between px-[24px] pt-[30px]'>
        <h2 className='font-2xl-bold text-black-50'>{dateText}</h2>

        <button
          type='button'
          onClick={onClose}
          aria-label='닫기'
          className='grid h-8 w-8 cursor-pointer place-items-center rounded-full hover:bg-gray-100'>
          <Icons.Delete />
        </button>
      </div>

      {/* tabs */}
      <div className='px-5 pt-3'>
        <div className='flex gap-6 text-[13px]'>
          <TabButton
            label={`신청 ${reservationCount.confirmed}`}
            active={tab === 'confirmed'}
            onClick={() => setTab('confirmed')}
          />
          <TabButton
            label={`승인 ${reservationCount.approved}`}
            active={tab === 'approved'}
            onClick={() => setTab('approved')}
          />
          <TabButton
            label={`거절 ${reservationCount.declined}`}
            active={tab === 'declined'}
            onClick={() => setTab('declined')}
          />
        </div>

        <div className='mt-1 h-[1px] w-full bg-gray-100' />
      </div>

      {/* content */}
      <div className='flex min-h-[233px] flex-col px-5 pt-4 pb-6 sm:flex-row sm:gap-[20px] lg:flex-col'>
        {/* 예약 시간 */}
        <section className='mb-4 sm:w-[50%] lg:w-full'>
          <h3 className='font-xl-bold mb-2 text-black'>예약 시간</h3>

          <div className='rounded-xl border border-gray-200 px-3 py-2'>
            <Dropdown className='relative w-full'>
              <DropdownTrigger className='flex w-full items-center justify-between'>
                <span className='font-lg-medium'>{selectedTime || '예약 내역이 없습니다.'}</span>
                <Icons.ArrowDown />
              </DropdownTrigger>
              <DropdownList className='scrollbar-hide absolute mt-2 max-h-[132px] w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 px-3 py-2 shadow-md'>
                {reservationTime.length === 0 ? (
                  <div className='px-3 py-2 text-[13px] text-gray-500'>예약 시간이 없습니다.</div>
                ) : (
                  reservationTime.map((time) => (
                    <DropdownItem
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`cursor-pointer rounded-lg px-3 py-2 text-[14px] hover:bg-gray-50 ${
                        time === selectedTime ? 'bg-gray-100 font-semibold' : ''
                      }`}>
                      {time}
                    </DropdownItem>
                  ))
                )}
              </DropdownList>
            </Dropdown>
          </div>
        </section>

        <section className='sm:w-[50%] lg:w-full'>
          <h3 className='font-xl-bold text-black-50 mb-2'>예약 내역</h3>

          <div className='scrollbar-hide max-h-[235px] space-y-3 overflow-y-auto'>
            {visibleList.length === 0 ? (
              <div className='rounded-xl border border-gray-200 py-8 text-center text-[13px] text-gray-500'>
                예약 내역이 없습니다.
              </div>
            ) : (
              visibleList.map((r) => (
                <ReservationCard
                  key={r.id}
                  nickname={r.nickname}
                  headCount={r.headCount}
                  tab={tab}
                  onApprove={() => console.log('승인', r.id)} //임시코드 승인하기 api함수 넘겨주세요
                  onReject={() => console.log('거절', r.id)} //임시코드  거절하기 api함수 넘겨주세요
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
