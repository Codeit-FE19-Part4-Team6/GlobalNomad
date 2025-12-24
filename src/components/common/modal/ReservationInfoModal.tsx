import { useEffect, useMemo, useState } from 'react';
import Dropdown from '@/components/common/dropdown/Dropdown';
import DropdownTrigger from '@/components/common/dropdown/DropdownTrigger';
import DropdownList from '@/components/common/dropdown/DropdownList';
import DropdownItem from '@/components/common/dropdown/DropdownItem';
import Icons from '@/assets/icons';
import Label from '@/components/common/Label';

type ReservationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

type Reservation = {
  id: number;
  nickname: string;
  headCount: number;
  status: ReservationStatus;
  date: string;
  startTime: string;
  endTime: string;
};

type ReservationProps = {
  isOpen: boolean;
  onClose: () => void;
  dateText?: string;
  reservations: Reservation[];
};

export default function ReservationInfoModal({
  isOpen,
  onClose,
  dateText,
  reservations,
}: ReservationProps) {
  const [tab, setTab] = useState<ReservationStatus>('PENDING');

  const reservationTime = useMemo(() => {
    const times = reservations.map((r) => `${r.startTime} - ${r.endTime}`);
    return Array.from(new Set(times));
  }, [reservations]);

  const [selectedTime, setSelectedTime] = useState(reservationTime[0] ?? '예약 내역이 없습니다.');

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
      PENDING: reservations.filter((r) => r.status === 'PENDING').length,
      APPROVED: reservations.filter((r) => r.status === 'APPROVED').length,
      REJECTED: reservations.filter((r) => r.status === 'REJECTED').length,
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
    <div className='w-[340px] rounded-[24px] bg-white'>
      {/* header */}
      <div className='flex items-start justify-between px-[24px] pt-[30px]'>
        <h2 className='text-[16px] font-semibold text-gray-900'>{dateText}</h2>

        <button
          type='button'
          onClick={onClose}
          aria-label='닫기'
          className='grid h-8 w-8 place-items-center rounded-full hover:bg-gray-100'>
          ✕
        </button>
      </div>

      {/* tabs */}
      <div className='px-5 pt-3'>
        <div className='flex gap-6 text-[13px]'>
          <TabButton
            label={`신청 ${reservationCount.PENDING}`}
            active={tab === 'PENDING'}
            onClick={() => setTab('PENDING')}
          />
          <TabButton
            label={`승인 ${reservationCount.APPROVED}`}
            active={tab === 'APPROVED'}
            onClick={() => setTab('APPROVED')}
          />
          <TabButton
            label={`거절 ${reservationCount.REJECTED}`}
            active={tab === 'REJECTED'}
            onClick={() => setTab('REJECTED')}
          />
        </div>

        <div className='mt-1 h-[1px] w-full bg-gray-100' />
      </div>

      {/* content */}
      <div className='px-5 pt-4 pb-6'>
        {/* 예약 시간 */}
        <section className='mb-4'>
          <h3 className='mb-2 text-[14px] font-semibold text-gray-900'>예약 시간</h3>

          <div className='rounded-xl border border-gray-200 px-3 py-2'>
            {/* ✅ Dropdown은 className 필수 + onSelect 없음 */}
            <Dropdown className='relative w-full'>
              {/* ✅ 트리거: selectedTime + ▼ */}
              <DropdownTrigger className='flex w-full items-center justify-between'>
                <span className='text-[14px] text-gray-900'>
                  {selectedTime || '예약 내역이 없습니다.'}
                </span>
                <Icons.ArrowDown />
              </DropdownTrigger>

              {/* ✅ 리스트: reservationTime 나열 */}
              <DropdownList className='absolute mt-2 w-full rounded-xl border border-gray-200 bg-white p-1 px-3 py-2 shadow-md'>
                {reservationTime.length === 0 ? (
                  <div className='px-3 py-2 text-[13px] text-gray-500'>예약 시간이 없습니다.</div>
                ) : (
                  reservationTime.map((time) => (
                    <DropdownItem
                      key={time}
                      onClick={() => setSelectedTime(time)} // ✅ 여기서 선택값 변경
                      className={`cursor-pointer rounded-lg px-3 py-2 text-[14px] hover:bg-gray-100 ${
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

        {/* 예약 내역 */}
        <section>
          <h3 className='mb-2 text-[14px] font-semibold text-gray-900'>예약 내역</h3>

          <div className='space-y-3'>
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
                  onApprove={() => console.log('승인', r.id)}
                  onReject={() => console.log('거절', r.id)}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

/** 탭 버튼 */
function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button type='button' onClick={onClick} className='relative pb-3'>
      <span className={active ? 'font-semibold text-blue-600' : 'text-gray-500'}>{label}</span>

      {active && (
        <span className='absolute right-0 bottom-[-5px] left-0 h-[2px] rounded bg-blue-600' />
      )}
    </button>
  );
}

/** 예약 카드 */
function ReservationCard({
  nickname,
  headCount,
  tab,
  onApprove,
  onReject,
}: {
  nickname: string;
  headCount: number;
  tab: ReservationStatus;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className='rounded-2xl border border-gray-200 px-4 py-3'>
      <div className='flex items-center justify-between gap-3'>
        <div className='space-y-1'>
          <div className='text-[13px] text-gray-600'>
            <span className='mr-2 text-gray-400'>닉네임</span>
            <span className='font-medium text-gray-900'>{nickname}</span>
          </div>
          <div className='text-[13px] text-gray-600'>
            <span className='mr-2 text-gray-400'>인원</span>
            <span className='font-medium text-gray-900'>{headCount}명</span>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          {tab === 'PENDING' && (
            <>
              <button
                type='button'
                onClick={onApprove}
                className='h-8 w-[84px] rounded-full bg-gray-100 text-[12px] font-medium text-gray-700 hover:bg-gray-200'>
                승인하기
              </button>
              <button
                type='button'
                onClick={onReject}
                className='h-8 w-[84px] rounded-full bg-gray-100 text-[12px] font-medium text-gray-700 hover:bg-gray-200'>
                거절하기
              </button>
            </>
          )}

          {tab === 'APPROVED' && (
            <Label className='inline-flex h-8 w-[84px] items-center justify-center rounded-full bg-cyan-50 text-[12px] font-semibold text-cyan-600'>
              승인하기
            </Label>
          )}

          {tab === 'REJECTED' && (
            <Label className='inline-flex h-8 w-[84px] items-center justify-center rounded-full bg-red-50 text-[12px] font-semibold text-red-500'>
              승인하기
            </Label>
          )}
        </div>
      </div>
    </div>
  );
}
