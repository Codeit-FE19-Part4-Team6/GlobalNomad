import { useState } from 'react';
import Card from '@/components/common/card';
import CancelReservationModal from '@/components/common/modal/CancelReservationModal';
import ReviewModal from '@/components/common/modal/ReviewModal';
import { FilterButton, PrimaryButton } from '@/components/common/button';
import Title from '@/components/common/Title';
import Icons from '@/assets/icons';
import type { MyReservationsResponse } from '@/apis/type';
import { StateBadge } from '@/components/common/badge';

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

// TODO: mock 데이터
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
    title: '에약 대기 예시',
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
];

type ReservationPageProps = {
  setMobileOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ReservationPage({ setMobileOpen }: ReservationPageProps) {
  const [selected, setSelected] = useState<Reservation['status']>('confirmed');
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const filteredReservations = reservations.filter((item) => item.status === selected);

  const handleReviewClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsReviewModalOpen(true);
  };

  const isReviewModalClose = () => setIsReviewModalOpen(false);

  const handleCancelClick = (id: number) => {
    setSelectedReservationId(id);
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancel = () => {
    if (selectedReservationId === null) {
      return;
    }

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
    <div className='flex flex-col gap-10 px-4 md:px-7.5'>
      <div className='flex flex-col items-start gap-2.5 py-2.5'>
        <Icons.Down
          className='block rotate-90 cursor-pointer md:hidden'
          onClick={() => setMobileOpen?.(false)}
        />
        <Title as='h3' size='xl' weight='bold'>
          예약내역
        </Title>
        <div className='font-md-medium text-gray-500'>예약내역 변경 및 취소할 수 있습니다.</div>
      </div>

      {reservations.length === 0 ? (
        <div className='mb-3 flex flex-col items-center justify-center gap-7.5 md:mx-45 lg:mx-70'>
          <div className='flex flex-col items-center justify-center'>
            <Icons.Earth className='mb-7.5' />
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
          <div className='scrollbar-hide -mr-6 mb-3.25 flex flex-nowrap gap-2 overflow-x-auto md:mb-7.5'>
            <FilterButton
              selected={selected === 'confirmed'}
              onClick={() => setSelected('confirmed')}>
              예약 완료
            </FilterButton>
            <FilterButton
              selected={selected === 'canceled'}
              onClick={() => setSelected('canceled')}>
              예약 취소
            </FilterButton>
            <FilterButton
              selected={selected === 'declined'}
              onClick={() => setSelected('declined')}>
              예약 거절
            </FilterButton>
            <FilterButton
              selected={selected === 'completed'}
              onClick={() => setSelected('completed')}>
              체험 완료
            </FilterButton>
            <FilterButton selected={selected === 'pending'} onClick={() => setSelected('pending')}>
              예약 대기
            </FilterButton>
          </div>

          <div className='flex flex-col gap-7.5 lg:gap-6'>
            {filteredReservations.map((item) => (
              <Card
                key={item.id}
                variant='reservation'
                className='border-t border-gray-50 pt-5 first:border-t-0 lg:mt-0 lg:mb-3 lg:border-t-0 lg:pt-0'>
                <div className='flex flex-row'>
                  <Card.Content>
                    <StateBadge status={item.status} />
                    <Card.Title title={item.title} />
                    <Card.Schedule
                      date={item.date}
                      startTime={item.startTime}
                      endTime={item.endTime}
                    />
                    <div className='flex w-full items-center justify-between'>
                      <Card.Price price={item.totalPrice} headCount={item.headCount} />
                      <div className='hidden lg:flex'>
                        <Card.CardButton
                          status={item.status}
                          onReviewClick={() => handleReviewClick(item)}
                          onCancelClick={() => handleCancelClick(item.id)}
                        />
                      </div>
                    </div>
                  </Card.Content>
                  <Card.Image src={item.bannerImageUrl} alt={item.title} />
                </div>
                <div className='flex flex-col lg:hidden'>
                  <Card.CardButton
                    status={item.status}
                    onReviewClick={() => handleReviewClick(item)}
                    onCancelClick={() => handleCancelClick(item.id)}
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
