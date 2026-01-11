import { useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';

import { Down, ArrowDown } from '@/assets/icons';
import Title from '@/components/common/Title';

import Dropdown from '@/components/common/dropdown/Dropdown';
import DropdownTrigger from '@/components/common/dropdown/DropdownTrigger';
import DropdownList from '@/components/common/dropdown/DropdownList';
import DropdownItem from '@/components/common/dropdown/DropdownItem';

import { useMyActivity } from '@/hooks/useMyActivity';
import { useMyActivitySchedules } from '@/hooks/useMyActivitySchedules';

import { eventType, EventBadge } from '@/components/common/badge/EventBadge';
import type { MyActivitySchedulesResponse } from '@/apis/type';
import ReservationInfoModal from '@/components/common/modal/ReservationCard/ReservationInfoModal';
import { useReservedSchedule } from '@/hooks/useReservedSchedule';
type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type DayCounts = {
  [eventType.reservation]: number; // pending
  [eventType.approved]: number; // confirmed
  [eventType.completed]: number; // completed
};

const toYmd = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const ymdToKorean = (ymd: string) => {
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) {
    return ymd;
  }
  return `${y}년 ${m}월 ${d}일`;
};

export default function BookingStatusPage({ setMobileOpen }: Props) {
  // ✅ 드롭다운용: 내 체험 목록
  const { data: activities = [], isLoading, isError } = useMyActivity();

  // ✅ 선택된 체험 id
  const [selectedActivityId, setSelectedActivityId] = useState<number | undefined>(undefined);

  // ✅ 달력 현재 월
  const [monthDate, setMonthDate] = useState(new Date());

  // ✅ 모달 상태(이름 유지)
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectBadge, setSelectBadge] = useState<string | null>(null);

  const openReservationModal = (dateYmd: string) => {
    setSelectBadge(dateYmd);
    setIsReservationModalOpen(true);
  };

  const closeReservationModal = () => {
    setIsReservationModalOpen(false);
    setSelectBadge(null);
  };

  // ✅ selectBadge는 string | null 이라서, 훅에 넘길 때 undefined로 바꿔줌
  const reservedDate = selectBadge ?? undefined;

  // ✅ 모달이 열렸을 때만 + activityId/date 있을 때만 호출됨(enabled 조건)
  const { data: reservedSchedules = [] } = useReservedSchedule(
    selectedActivityId,
    reservedDate,
    isReservationModalOpen
  );

  // ✅ year/month
  const year = String(monthDate.getFullYear());
  const month = String(monthDate.getMonth() + 1).padStart(2, '0');

  // ✅ 월별 예약현황 조회 (달력용)
  const {
    data: dashboard = [],
    isLoading: isDashboardLoading,
    isError: isDashboardError,
  } = useMyActivitySchedules({
    activityId: selectedActivityId,
    year,
    month,
  });

  // ✅ 트리거에 보여줄 선택된 체험 객체
  const selectedActivity = useMemo(() => {
    if (!selectedActivityId) {
      return undefined;
    }
    return activities.find((a) => a.id === selectedActivityId);
  }, [activities, selectedActivityId]);

  // ✅ dashboard -> countsByDate 변환
  const countsByDate = useMemo(() => {
    return dashboard.reduce<Record<string, DayCounts>>((acc, item: MyActivitySchedulesResponse) => {
      acc[item.date] = {
        [eventType.reservation]: item.reservations.pending,
        [eventType.approved]: item.reservations.confirmed,
        [eventType.completed]: item.reservations.completed,
      };
      return acc;
    }, {});
  }, [dashboard]);

  const handleBadgeClick = (dateYmd: string) => () => {
    openReservationModal(dateYmd);
  };

  return (
    <div className='flex min-h-0 flex-1 flex-col'>
      <div className='px-4 py-4'>
        <Down
          className='block rotate-90 cursor-pointer md:hidden'
          onClick={() => setMobileOpen(false)}
        />
      </div>

      <div className='flex flex-col gap-[18px] md:gap-6 lg:gap-[30px]'>
        <div className='flex flex-col gap-[10px]'>
          <Title as='h3' className='font-xl-bold text-gray-950'>
            예약 현황
          </Title>
          <span className='font-md-medium text-gray-500'>
            내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
          </span>
        </div>

        {/* ✅ 체험 선택 드롭다운 */}
        <div>
          <Dropdown className='relative w-full'>
            <DropdownTrigger className='flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2'>
              <span className='truncate'>{selectedActivity?.title ?? '체험을 선택하세요'}</span>
              <ArrowDown />
            </DropdownTrigger>

            <DropdownList className='absolute top-full left-0 z-50 mt-2 max-h-[280px] w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-md'>
              {isLoading && <div className='px-3 py-2 text-sm text-gray-400'>불러오는 중...</div>}
              {isError && (
                <div className='px-3 py-2 text-sm text-red-500'>체험 목록을 불러오지 못했어요.</div>
              )}

              {!isLoading &&
                !isError &&
                activities.map((a) => (
                  <DropdownItem
                    key={a.id}
                    onClick={() => setSelectedActivityId(a.id)}
                    className='rounded-lg px-3 py-2 hover:bg-gray-50'>
                    {a.title}
                  </DropdownItem>
                ))}

              {!isLoading && !isError && activities.length === 0 && (
                <div className='px-3 py-2 text-sm text-gray-400'>등록된 체험이 없어요.</div>
              )}
            </DropdownList>
          </Dropdown>
        </div>

        {/* ✅ dashboard 로딩/에러 */}
        {selectedActivityId && (
          <div className='px-1 text-sm'>
            {isDashboardLoading && <span className='text-gray-400'>예약 현황 불러오는 중...</span>}
            {isDashboardError && (
              <span className='text-red-500'>예약 현황을 불러오지 못했어요.</span>
            )}
          </div>
        )}

        {/* ✅ 달력 */}
        <div className='h-screen min-h-0 flex-1'>
          <DayPicker
            className='relative h-full w-full'
            month={monthDate}
            onMonthChange={setMonthDate}
            classNames={{
              nav: 'w-[100%] absolute',
              month: 'flex flex-col items-center h-full w-full',
              button_previous: 'absolute left-[30%] top-[9px]',
              button_next: 'absolute right-[30%] top-[9px]',
              month_grid: 'lg:w-[640px] lg:h-[779px] md:h-[779px] w-full h-[500px]',
              months: 'w-full h-full',
            }}
            components={{
              Day: (props: any) => {
                const date: Date = props.date ?? props.day?.date ?? props.day;
                const key = toYmd(date);
                const counts = countsByDate[key];

                const isOpenThisDay = isReservationModalOpen && selectBadge === key;

                return (
                  <td className={props.className}>
                    <div className='flex h-full w-full flex-col items-center'>
                      {/* 날짜(기존 children) */}
                      <div className='w-full text-center'>{props.children}</div>

                      {/* 뱃지 + (PC) 팝오버 */}
                      {counts && (
                        <div className='relative mt-1 flex w-[45px] flex-col items-center gap-1 px-1 lg:w-[67px]'>
                          <EventBadge
                            type={eventType.reservation}
                            count={counts[eventType.reservation]}
                            onClick={handleBadgeClick(key)}
                          />
                          <EventBadge
                            type={eventType.approved}
                            count={counts[eventType.approved]}
                            onClick={handleBadgeClick(key)}
                          />
                          <EventBadge
                            type={eventType.completed}
                            count={counts[eventType.completed]}
                            onClick={handleBadgeClick(key)}
                          />

                          {/* ✅ PC(lg)에서는 셀 기준 팝오버(딤 없음) */}
                          {isOpenThisDay && (
                            <div
                              className='absolute top-0 left-full z-[10000] ml-2 hidden lg:block'
                              onClick={(e) => e.stopPropagation()}>
                              <ReservationInfoModal
                                isOpen={isReservationModalOpen}
                                onClose={closeReservationModal}
                                dateText={ymdToKorean(selectBadge)}
                                activityId={selectedActivityId!}
                                dateYmd={selectBadge!}
                                reservedSchedules={reservedSchedules}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                );
              },
            }}
          />
        </div>
      </div>

      {/* ✅ 모바일(md 이하): 딤 + 바텀시트 */}
      {isReservationModalOpen && selectBadge && (
        <div className='lg:hidden'>
          <div className='fixed inset-0 z-[9999] bg-black/40' onClick={closeReservationModal} />

          <div className='fixed inset-x-0 bottom-0 z-[10000]' onClick={(e) => e.stopPropagation()}>
            <ReservationInfoModal
              isOpen={isReservationModalOpen}
              onClose={closeReservationModal}
              dateText={ymdToKorean(selectBadge)}
              activityId={selectedActivityId!}
              dateYmd={selectBadge!}
              reservedSchedules={reservedSchedules}
            />
          </div>
        </div>
      )}

      {/* ✅ PC(lg 이상): 바깥 클릭 닫기용 투명 레이어 */}
      {isReservationModalOpen && selectBadge && (
        <div
          className='fixed inset-0 z-[9998] hidden bg-transparent lg:block'
          onClick={closeReservationModal}
        />
      )}
    </div>
  );
}
