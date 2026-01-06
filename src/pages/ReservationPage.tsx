import { useEffect, useState } from 'react';
import Card from '@/components/common/card';
import CancelReservationModal from '@/components/common/modal/CancelReservationModal';
import ReviewModal from '@/components/common/modal/ReviewModal';
import { FilterButton, PrimaryButton } from '@/components/common/button';
import Title from '@/components/common/Title';
import { Down, Earth } from '@/assets/icons';
import type { MyReservationsResponse } from '@/apis/type';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMyReservationsQuery } from '@/hooks/queries/useMyReservationsQuery';
import { useCancelReservationMutation } from '@/hooks/queries/useCancelReservationMutation';
import { useReviewReservationMutation } from '@/hooks/queries/useReviewReservationMutation';

const STATUS_LIST = ['confirmed', 'canceled', 'declined', 'completed', 'pending'] as const;

type Status = (typeof STATUS_LIST)[number];
type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type ReservationItem = MyReservationsResponse['reservations'][number];

export default function ReservationPage({ setMobileOpen }: Props) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // 모달 상태
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null); // 선택된 예약 정보
  const [selectedReservation, setSelectedReservation] = useState<ReservationItem | null>(null);
  const [searchParams, setSearchParams] = useSearchParams(); // 필터 상태
  const rawStatus = searchParams.get('status');
  const navigate = useNavigate();
  const statusParam: Status = STATUS_LIST.includes(rawStatus as Status)
    ? (rawStatus as Status)
    : 'confirmed';
  const [selected, setSelected] = useState<Status>(statusParam);
  const isReviewModalClose = () => setIsReviewModalOpen(false); // 리뷰 모달 닫기

  useEffect(() => {
    setSelected(statusParam);
  }, [statusParam]);

  // 필터 버튼 클릭
  const handleFilterClick = (status: Status) => {
    setSelected(status);
    setSearchParams({ status });
  };

  // 예약 내역 조회
  const { data: reservations = [], isLoading, isError } = useMyReservationsQuery(selected);

  // 후기 작성 버튼 클릭
  const handleReviewClick = (reservation: ReservationItem) => {
    setSelectedReservation(reservation);
    setIsReviewModalOpen(true);
  };
  // 후기 제출
  const handleSubmitReview = (data: { rating: number; content: string }) => {
    if (!selectedReservation) {
      return;
    }
    reviewMutate({
      reservationId: selectedReservation.id,
      data,
    });
  };
  // 후기 작성
  const { mutate: reviewMutate } = useReviewReservationMutation(() => setIsReviewModalOpen(false));

  // 예약 취소 버튼 클릭
  const handleCancelClick = (id: number) => {
    setSelectedReservationId(id);
    setIsCancelModalOpen(true);
  };
  const { mutate: cancelMutate } = useCancelReservationMutation(
    () => setIsCancelModalOpen(false),
    () => setSelectedReservationId(null)
  );
  // 예약 취소 확정
  const handleConfirmCancel = () => {
    if (!selectedReservationId) {
      return;
    }
    cancelMutate(selectedReservationId);
  };
  if (isLoading) {
    return <div className='px-4 py-10'>로딩 중...</div>;
  }
  if (isError) {
    return <div className='px-4 py-10'>예약 내역을 불러오지 못했어요.</div>;
  }
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
              아직 예약한 체험이 없어요
            </div>
          </div>
          <PrimaryButton
            className='font-lg-medium h-[54px] w-[182px] rounded-2xl px-10 py-3.5'
            onClick={() => navigate('/')}>
            둘러보기
          </PrimaryButton>
        </div>
      ) : (
        <>
          <div className='scrollbar-hide -mr-6 flex flex-nowrap gap-2 overflow-x-auto pb-[13px] md:pb-[30px]'>
            {STATUS_LIST.map((s) => (
              <FilterButton key={s} selected={selected === s} onClick={() => handleFilterClick(s)}>
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
            {reservations.map((item) => (
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
                    <Card.Title title={item.activity.title} />
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
                  <Card.Image src={item.activity.bannerImageUrl} alt={item.activity.title} />
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
          title={selectedReservation.activity.title}
          date={selectedReservation.date}
          startTime={selectedReservation.startTime}
          endTime={selectedReservation.endTime}
          headCount={selectedReservation.headCount}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
}
