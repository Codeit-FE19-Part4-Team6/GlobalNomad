import { useEffect, useState } from 'react';
import Card from '@/components/common/card';
import CancelReservationModal from '@/components/common/modal/CancelReservationModal';
import ReviewModal from '@/components/common/modal/ReviewModal';
import { FilterButton, PrimaryButton } from '@/components/common/button';
import Title from '@/components/common/Title';
import { Down, Earth } from '@/assets/icons';
import type { MyReservationsResponse } from '@/apis/type';
import { useSearchParams } from 'react-router-dom';
import { cancelReservation, getMyReservations } from '@/apis/myReservation';

type Reservation = {
  id: number;
  title: string;
  bannerImageUrl: string;
  status: MyReservationsResponse['reservations'][number]['status'] | 'canceled';
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  reviewSubmitted?: boolean;
};

const STATUS_LIST = ['confirmed', 'canceled', 'declined', 'completed', 'pending'] as const;
type Status = (typeof STATUS_LIST)[number];

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ReservationPage({ setMobileOpen }: Props) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const rawStatus = searchParams.get('status');
  const statusParam: Status = STATUS_LIST.includes(rawStatus as Status)
    ? (rawStatus as Status)
    : 'confirmed';
  const [selected, setSelected] = useState<Status>(statusParam);

  useEffect(() => {
    setSelected(statusParam);
  }, [statusParam]);

  // ===================== API 연동 =====================
  const fetchReservations = async (status: Status) => {
    setIsLoading(true);
    try {
      const data = await getMyReservations(status);
      const formatted: Reservation[] = data.reservations.map((r) => ({
        id: r.id,
        title: r.activity.title,
        bannerImageUrl: r.activity.bannerImageUrl,
        status: r.status,
        totalPrice: r.totalPrice,
        headCount: r.headCount,
        date: r.date,
        startTime: r.startTime,
        endTime: r.endTime,
        reviewSubmitted: r.reviewSubmitted,
      }));
      setReservations(formatted);
    } catch (error) {
      console.error('예약 목록 조회 실패:', error);
      setReservations([]); // 에러 발생 시 빈 배열로 초기화
      alert('예약 목록을 불러오는 데 실패했습니다.'); // 사용자에게 알림
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations(selected);
  }, [selected]);

  // ===================== 필터 =====================
  const handleFilterClick = (status: Reservation['status']) => {
    setSelected(status);
    searchParams.set('status', status);
    setSearchParams(searchParams);
  };

  // ===================== 리뷰 =====================
  const handleReviewClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsReviewModalOpen(true);
  };
  const isReviewModalClose = () => setIsReviewModalOpen(false);

  // ===================== 취소 =====================
  const handleCancelClick = (id: number) => {
    setSelectedReservationId(id);
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (selectedReservationId === null) {
      return;
    }
    try {
      await cancelReservation(selectedReservationId);
      // 상태 업데이트 후 리스트 새로 조회
      fetchReservations(selected);
    } catch (error) {
      console.error('예약 취소 실패:', error);
    } finally {
      setIsCancelModalOpen(false);
      setSelectedReservationId(null);
    }
  };

  const filteredReservations = reservations.filter((item) => item.status === selected);

  return (
    <div className='flex flex-col gap-3.5 px-4 md:px-7.5'>
      <div className='flex flex-col items-start gap-2.5 py-[10px]'>
        <Down
          className='block rotate-90 cursor-pointer md:hidden'
          onClick={() => setMobileOpen(false)}
        />
        <Title as='h3' size='xl' weight='bold'>
          예약내역
        </Title>
        <div className='font-md-medium text-gray-500'>예약내역 변경 및 취소할 수 있습니다.</div>
      </div>

      {/* ===================== 빈 데이터 UI ===================== */}
      {isLoading ? (
        <div className='py-20 text-center'>로딩 중...</div>
      ) : reservations.length === 0 ? (
        <div className='mb-3 flex flex-col items-center justify-center gap-7.5 md:mx-45 lg:mx-70'>
          <div className='flex flex-col items-center justify-center'>
            <Earth className='mb-7.5' />
            <div className='font-xl-medium text-center whitespace-nowrap text-gray-600'>
              아직 등록한 체험이 없어요
            </div>
          </div>
          <PrimaryButton
            className='font-lg-medium h-[54px] w-[182px] rounded-2xl px-10 py-3.5'
            onClick={() => console.log('둘러보기 클릭')}>
            둘러보기
          </PrimaryButton>
        </div>
      ) : (
        <>
          {/* ===================== 필터 버튼 ===================== */}
          <div className='scrollbar-hide -mr-6 flex flex-nowrap gap-2 overflow-x-auto pb-[13px] md:pb-[30px]'>
            {STATUS_LIST.map((s) => (
              <FilterButton
                key={s}
                selected={selected === s}
                onClick={() => handleFilterClick(s as Reservation['status'])}>
                {s === 'confirmed'
                  ? '예약 완료'
                  : s === 'canceled'
                    ? '예약 취소'
                    : s === 'declined'
                      ? '예약 거절'
                      : s === 'completed'
                        ? '체험 완료'
                        : '예약 대기'}
              </FilterButton>
            ))}
          </div>

          {/* ===================== 예약 카드 ===================== */}
          <div className='flex flex-col gap-7.5 lg:gap-6'>
            {filteredReservations.map((item) => (
              <Card
                key={item.id}
                variant='reservation'
                className='border-t border-gray-50 first:border-t-0 lg:border-t-0 lg:pt-0'>
                <div className='mt-5 mb-3 ml-2 lg:hidden'>
                  <Card.Schedule
                    date={item.date}
                    startTime={item.startTime}
                    endTime={item.endTime}
                    isMobileDate
                  />
                </div>
                <div className='flex flex-row'>
                  <Card.Content>
                    <Card.Badge status={item.status} />
                    <Card.Title title={item.title} />
                    <div className='font-sm-medium text-gray-500 lg:hidden'>
                      {item.startTime} - {item.endTime}
                    </div>
                    <div className='hidden lg:block'>
                      <Card.Schedule
                        date={item.date}
                        startTime={item.startTime}
                        endTime={item.endTime}
                      />
                    </div>
                    <div className='flex w-full items-center justify-between'>
                      <Card.Price price={item.totalPrice} headCount={item.headCount} />
                      <div className='hidden lg:flex'>
                        <Card.CardButton
                          status={item.status}
                          onReviewClick={() => handleReviewClick(item)}
                          onCancelClick={() => handleCancelClick(item.id)}
                          reviewSubmitted={
                            item.status === 'completed' ? item.reviewSubmitted : undefined
                          }
                        />
                      </div>
                    </div>
                  </Card.Content>
                  <Card.Image src={item.bannerImageUrl} alt={item.title} />
                </div>
                <div className='lg:hidden'>
                  <Card.CardButton
                    status={item.status}
                    onReviewClick={() => handleReviewClick(item)}
                    onCancelClick={() => handleCancelClick(item.id)}
                    reviewSubmitted={item.status === 'completed' ? item.reviewSubmitted : undefined}
                  />
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ===================== 모달 ===================== */}
      <CancelReservationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        cancelText='아니요'
        confirmText='예약 취소'>
        예약을 취소하시겠습니까?
      </CancelReservationModal>
      {selectedReservation && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={isReviewModalClose}
          title={selectedReservation.title}
          date={selectedReservation.date}
          startTime={selectedReservation.startTime}
          endTime={selectedReservation.endTime}
          headCount={selectedReservation.headCount}
        />
      )}
    </div>
  );
}
