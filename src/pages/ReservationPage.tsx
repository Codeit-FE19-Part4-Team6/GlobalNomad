import { useEffect, useState } from 'react';
import Card from '@/components/common/card';
import CancelReservationModal from '@/components/common/modal/CancelReservationModal';
import ReviewModal from '@/components/common/modal/ReviewModal';
import { FilterButton, PrimaryButton } from '@/components/common/button';
import Title from '@/components/common/Title';
import { Down, Earth } from '@/assets/icons';
import type { MyReservationsResponse } from '@/apis/type';
import { useSearchParams } from 'react-router-dom';

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

// mock 데이터
const mockReservations: Reservation[] = [
  {
    id: 1,
    title: '예약 완료 예시',
    bannerImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    status: 'confirmed',
    totalPrice: 45000,
    headCount: 2,
    date: '2025-01-20',
    startTime: '18:00',
    endTime: '20:00',
  },
  {
    id: 2,
    title: '체험 완료 예시',
    bannerImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    status: 'completed',
    totalPrice: 32000,
    headCount: 4,
    reviewSubmitted: false,
    date: '2025-01-15',
    startTime: '16:00',
    endTime: '18:00',
  },
  {
    id: 3,
    title: '예약 취소 예시',
    bannerImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    status: 'canceled',
    totalPrice: 32000,
    headCount: 1,
    date: '2025-01-15',
    startTime: '16:00',
    endTime: '18:00',
  },
  {
    id: 4,
    title: '예약 대기 예시',
    bannerImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    status: 'pending',
    totalPrice: 32000,
    headCount: 1,
    date: '2025-01-15',
    startTime: '16:00',
    endTime: '18:00',
  },
  {
    id: 5,
    title: '예약 거절 예시',
    bannerImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    status: 'declined',
    totalPrice: 32000,
    headCount: 1,
    date: '2025-01-15',
    startTime: '16:00',
    endTime: '18:00',
  },
  {
    id: 6,
    title: '체험 완료 예시',
    bannerImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    status: 'completed',
    totalPrice: 32000,
    headCount: 4,
    reviewSubmitted: true,
    date: '2025-01-15',
    startTime: '16:00',
    endTime: '18:00',
  },
];
const STATUS_LIST = ['confirmed', 'canceled', 'declined', 'completed', 'pending'] as const;

type Status = (typeof STATUS_LIST)[number];

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ReservationPage({ setMobileOpen }: Props) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // 모달 상태
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null); // 선택된 예약 정보
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null); // 예약 목록 상태
  const [searchParams, setSearchParams] = useSearchParams(); // 필터 상태
  const rawStatus = searchParams.get('status');
  const statusParam: Status = STATUS_LIST.includes(rawStatus as Status)
    ? (rawStatus as Status)
    : 'confirmed';
  const [selected, setSelected] = useState<Status>(statusParam);

  useEffect(() => {
    setSelected(statusParam);
  }, [statusParam]);

  const filteredReservations = reservations.filter((item) => item.status === selected); // 선택된 상태값에 따른 예약 목록 필터링
  // 리뷰 작성 버튼 클릭
  const handleReviewClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsReviewModalOpen(true);
  };
  // 필터 버튼 클릭
  const handleFilterClick = (status: Reservation['status']) => {
    setSelected(status);
    searchParams.set('status', status); // URL 쿼리 파라미터와 상태 동기화
    setSearchParams(searchParams);
  };
  const isReviewModalClose = () => setIsReviewModalOpen(false); // 리뷰 모달 닫기
  // 예약 취소 버튼 클릭
  const handleCancelClick = (id: number) => {
    setSelectedReservationId(id);
    setIsCancelModalOpen(true);
  };
  // 예약 취소 확정
  const handleConfirmCancel = () => {
    if (selectedReservationId === null) {
      return;
    }
    // 선택된 예약 상태를 canceled로 변경
    setReservations((prev) =>
      prev.map((item) =>
        item.id === selectedReservationId ? { ...item, status: 'canceled' } : item
      )
    );
    setSelected('canceled');
    setIsCancelModalOpen(false);
    setSelectedReservationId(null);
  };
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
      {reservations.length === 0 ? (
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
          <div className='scrollbar-hide -mr-6 flex flex-nowrap gap-2 overflow-x-auto pb-[13px] md:pb-[30px]'>
            {['confirmed', 'canceled', 'declined', 'completed', 'pending'].map((s) => (
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
