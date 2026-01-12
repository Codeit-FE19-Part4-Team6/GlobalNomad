import { useEffect, useMemo, useState } from 'react';

import Dropdown from '@/components/common/dropdown/Dropdown';
import DropdownTrigger from '@/components/common/dropdown/DropdownTrigger';
import DropdownList from '@/components/common/dropdown/DropdownList';
import DropdownItem from '@/components/common/dropdown/DropdownItem';

import ReservationCard from '@/components/common/modal/ReservationCard/ReservationCard';
import TabButton from '@/components/common/modal/ReservationCard/ReservationTab';

import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import Label from '@/components/common/Label';

import { ArrowDown, Delete } from '@/assets/icons';

import type { ReservationStatus } from '@/types/reservation';
import type { MyActivitySchedule } from '@/apis/type';

import { useMyActivityReservations } from '@/hooks/useMyActivityReservations';
import { usePatchMyActivityReservationStatus } from '@/hooks/usePatchMyActivityReservationStatus';

type ReservationProps = {
  isOpen: boolean;
  onClose: () => void;
  dateText?: string;

  activityId: number;
  dateYmd: string;
  reservedSchedules: MyActivitySchedule[];
};

export default function ReservationInfoModal({
  isOpen,
  onClose,
  dateText,
  activityId,
  dateYmd,
  reservedSchedules,
}: ReservationProps) {
  // ✅ 탭(신청/승인/거절) - API status와 동일하게 사용
  const [tab, setTab] = useState<ReservationStatus>('confirmed');

  // ✅ 모달 위에 마우스가 있으면 바디 스크롤 잠금
  const [isMouseOnModal, setIsMouseOnModal] = useState(false);

  // ✅ 현재 선택된 시간대(scheduleId)
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

  // ✅ 드롭다운에 표시되는 "시간 문자열"
  const [selectedTime, setSelectedTime] = useState<string>('');

  const { mutate: patchStatus } = usePatchMyActivityReservationStatus();
  /**
   * ✅ 핵심: reservedSchedules를 정렬한 "단 하나의 기준 배열"
   * - 시간 표시(reservationTime)도 여기서 만들고
   * - scheduleId 선택도 여기서 가져오면
   *   "시간과 scheduleId가 엇갈리는 버그"가 절대 안 생김
   */
  const sortedSchedules = useMemo(() => {
    return reservedSchedules.slice().sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [reservedSchedules]);

  // ✅ 드롭다운에 보여줄 시간 문자열 목록 (정렬된 schedules 기반)
  const reservationTime = useMemo(() => {
    return sortedSchedules.map((s) => `${s.startTime} - ${s.endTime}`);
  }, [sortedSchedules]);

  /**
   * ✅ 모달이 열리거나, 시간대 목록이 바뀌면
   * - 첫 번째 시간/스케줄을 기본 선택으로 세팅
   * - 시간대가 없으면 "예약 내역 없음" 처리
   */
  const selectedSchedule = useMemo(() => {
    if (!selectedScheduleId) {
      return null;
    }
    return reservedSchedules.find((s) => s.scheduleId === selectedScheduleId) ?? null;
  }, [reservedSchedules, selectedScheduleId]);

  const statusCount = selectedSchedule?.count ?? { pending: 0, confirmed: 0, declined: 0 };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (reservationTime.length === 0) {
      setSelectedTime('예약 내역이 없습니다.');
      setSelectedScheduleId(null);
      return;
    }

    // 선택된 시간이 없거나, 현재 선택이 사라졌으면 첫 번째로 세팅
    if (selectedTime === '' || !reservationTime.includes(selectedTime)) {
      setSelectedTime(reservationTime[0]);
      setSelectedScheduleId(sortedSchedules[0]?.scheduleId ?? null);
    }
  }, [isOpen, reservationTime, selectedTime, sortedSchedules]);

  /**
   * ✅ 예약 내역 조회 (모달이 직접 fetch)
   * - open일 때만
   * - activityId + dateYmd + selectedScheduleId + tab 기준으로 가져옴
   */
  const {
    data,
    isLoading: isReservationsLoading,
    isError: isReservationsError,
  } = useMyActivityReservations(activityId, selectedScheduleId, tab, dateYmd, isOpen);

  // ✅ API 응답에서 실제 예약 리스트만 꺼내기
  const reservations = data?.reservations ?? [];

  // ✅ 모달 위에 마우스가 있을 때 스크롤 잠금
  useBodyScrollLock({ isLocked: isMouseOnModal });

  /**
   * ✅ 보여줄 리스트
   * - 지금 API가 이미 tab(status)로 필터되어 내려올 수도 있지만
   * - 안전하게 한 번 더 필터(겹치면 그냥 그대로)
   * - 시간 필터는 selectedTime 기준으로 적용
   */
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
      className='w-full rounded-tl-3xl rounded-tr-3xl rounded-b-none bg-white lg:w-85 lg:rounded-3xl lg:shadow-[0_8px_24px_rgba(0,0,0,0.12)]'>
      {/* header */}
      <div className='mb-3 flex items-center justify-between px-6 pt-[30px]'>
        <h2 className='font-2xl-bold text-black-50'>{dateText}</h2>

        <button
          type='button'
          onClick={onClose}
          aria-label='닫기'
          className='grid h-8 w-8 cursor-pointer place-items-center rounded-full hover:bg-gray-100'>
          <Delete />
        </button>
      </div>

      {/* tabs */}
      <div className='px-5 pt-3'>
        <div className='font-lg-bold flex gap-2'>
          {/* ⚠️ 네 문구 기준을 유지했어.
              - "신청"을 confirmed로 쓰는 게 맞는지 헷갈릴 수 있음
              - 프로젝트 용어가 다르면 여기 label만 바꾸면 됨 */}
          <TabButton
            label={`신청 ${statusCount.pending}`}
            active={tab === 'pending'}
            onClick={() => setTab('pending')}
          />
          <TabButton
            label={`승인 ${statusCount.confirmed}`}
            active={tab === 'confirmed'}
            onClick={() => setTab('confirmed')}
          />
          <TabButton
            label={`거절 ${statusCount.declined}`}
            active={tab === 'declined'}
            onClick={() => setTab('declined')}
          />
        </div>

        <div className='mt-1 h-[1px] w-full bg-gray-100' />
      </div>

      {/* content */}
      <div className='flex min-h-[233px] flex-col px-5 pt-4 pb-6 sm:flex-row sm:gap-5 lg:flex-col'>
        {/* 예약 시간 */}
        <section className='mb-4 flex flex-col gap-3 sm:w-[50%] lg:w-full'>
          <Label className='font-xl-bold mb-2 text-start text-black'>예약 시간</Label>

          <div className='flex h-12 items-center rounded-xl border border-gray-50 px-5 lg:h-[54px]'>
            <Dropdown className='relative w-full'>
              <DropdownTrigger className='flex w-full items-center justify-between'>
                <span className='font-lg-medium text-gray-950'>
                  {selectedTime || '예약 내역이 없습니다.'}
                </span>
                <ArrowDown />
              </DropdownTrigger>

              <DropdownList className='scrollbar-hide absolute mt-2 flex max-h-33 w-full flex-col gap-1 overflow-y-auto rounded-xl border border-gray-50 bg-white p-1 px-3 py-2 shadow-md'>
                {reservationTime.length === 0 ? (
                  <div className='font-md-bold px-3 py-2 text-gray-500'>예약 시간이 없습니다.</div>
                ) : (
                  reservationTime.map((time, idx) => (
                    <DropdownItem
                      key={time}
                      onClick={() => {
                        setSelectedTime(time);
                        setSelectedScheduleId(sortedSchedules[idx]?.scheduleId ?? null);
                      }}
                      className={`font-lg-medium cursor-pointer rounded-lg px-3 py-2 text-gray-950 ${
                        time === selectedTime ? 'font-lg-medium bg-gray-50' : ''
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
        <section className='flex flex-col gap-3 sm:w-[50%] lg:w-full'>
          <Label className='font-xl-bold text-black-50 mb-2 text-start'>예약 내역</Label>

          <div className='scrollbar-hide max-h-[235px] space-y-3 overflow-y-auto'>
            {isReservationsLoading ? (
              <div className='font-md-medium rounded-xl border border-gray-200 py-8 text-center text-gray-500'>
                불러오는 중...
              </div>
            ) : isReservationsError ? (
              <div className='font-md-medium rounded-xl border border-gray-200 py-8 text-center text-red-500'>
                예약 내역을 불러오지 못했어요.
              </div>
            ) : visibleList.length === 0 ? (
              <div className='font-md-medium rounded-xl border border-gray-200 py-8 text-center text-gray-500'>
                예약 내역이 없습니다.
              </div>
            ) : (
              visibleList.map((r) => (
                <ReservationCard
                  key={r.id}
                  nickname={r.nickname}
                  headCount={r.headCount}
                  tab={tab}
                  onApprove={() =>
                    patchStatus({ activityId, reservationId: r.id, status: 'confirmed' })
                  }
                  onReject={() =>
                    patchStatus({ activityId, reservationId: r.id, status: 'declined' })
                  }
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
