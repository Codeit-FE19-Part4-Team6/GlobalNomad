import { FilterButton } from '@/components/common/button';
import Card from '@/components/common/card';
import CardsideBar from '@/components/common/CardsideBar';
import Title from '@/components/common/Title';

import { useState } from 'react';
const mockReservations: {
  id: number;
  title: string;
  bannerImageUrl: string;
  status: ReservationStatus;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  reviewSubmitted?: boolean;
}[] = [
  {
    id: 1,
    title: '별빛 밤바다 요트 투어',
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
    title: '한강 선셋 카약 체험',
    bannerImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    status: 'completed',
    totalPrice: 32000,
    reviewSubmitted: false,
    headCount: 41,
    date: '2025-01-15',
    startTime: '16:00',
    endTime: '18:00',
  },
  {
    id: 3,
    title: '한강 선셋 카약 체험',
    bannerImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    status: 'declined',
    totalPrice: 32000,
    headCount: 1,
    date: '2025-01-15',
    startTime: '16:00',
    endTime: '18:00',
  },
  {
    id: 4,
    title: '한강 선셋 카약 체험',
    bannerImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    status: 'canceled',
    totalPrice: 32000,
    headCount: 9,
    date: '2025-01-15',
    startTime: '16:00',
    endTime: '18:00',
  },
  {
    id: 5,
    title: '한강 선셋 카약 체험',
    bannerImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    status: 'approved',
    totalPrice: 32000,
    headCount: 1,
    date: '2025-01-15',
    startTime: '16:00',
    endTime: '18:00',
  },
  {
    id: 6,
    title: '한강 선셋 카약 체험',
    bannerImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    status: 'completed',
    totalPrice: 32000,
    headCount: 5,
    reviewSubmitted: true,
    date: '2025-01-15',
    startTime: '16:00',
    endTime: '18:00',
  },
];

type ReservationStatus = 'approved' | 'canceled' | 'confirmed' | 'declined' | 'completed';

export default function ReservationPage() {
  const [selected, setSelected] = useState<ReservationStatus>('approved');
  const handleReviewClick = () => {};
  const handleChangeClick = () => {};
  const handleCancelClick = () => {};
  return (
    <div className='px-6 md:px-7.5'>
      <div className='hidden md:block lg:hidden'>
        <CardsideBar variant='tablet' />
      </div>
      <div className='hidden lg:block'>
        <CardsideBar variant='desktop' />
      </div>

      <div className='flex flex-col gap-3.5'>
        <div className='flex flex-col items-start gap-2.5 py-2.5'>
          <Title as='h3' size='xl' weight='bold'>
            예약내역
          </Title>
          <div className='font-md-medium text-gray-500'>예약내역 변경 및 취소할 수 있습니다.</div>
        </div>
        <div className='scrollbar-hide mb-3.25 flex flex-nowrap gap-2 md:mb-7.5'>
          <FilterButton selected={selected === 'approved'} onClick={() => setSelected('approved')}>
            예약 승인
          </FilterButton>
          <FilterButton selected={selected === 'canceled'} onClick={() => setSelected('canceled')}>
            예약 취소
          </FilterButton>
          <FilterButton
            selected={selected === 'confirmed'}
            onClick={() => setSelected('confirmed')}>
            예약 완료
          </FilterButton>
          <FilterButton selected={selected === 'declined'} onClick={() => setSelected('declined')}>
            예약 거절
          </FilterButton>
          <FilterButton
            selected={selected === 'completed'}
            onClick={() => setSelected('completed')}>
            체험 완료
          </FilterButton>
        </div>
        <div className='flex flex-col gap-7.5 lg:gap-6'>
          {mockReservations.map((item) => (
            <Card
              key={item.id}
              variant='reservation'
              className='border-t border-gray-50 pt-5 first:border-t-0 lg:mt-0 lg:border-t-0 lg:pt-0'>
              <Card.Schedule
                date={item.date}
                startTime={item.startTime}
                endTime={item.endTime}
                isMobileDate
              />
              <div className='flex flex-row'>
                <Card.Content>
                  <Card.Badge status={item.status} />
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
                        onReviewClick={handleReviewClick}
                        onChangeClick={handleChangeClick}
                        onCancelClick={handleCancelClick}
                        reviewSubmitted={
                          item.status === 'completed' ? item.reviewSubmitted : undefined
                        }
                      />
                    </div>
                  </div>
                </Card.Content>
                <Card.Image src={item.bannerImageUrl} alt={item.title} />
              </div>
              <div className='flex flex-col lg:hidden'>
                <Card.CardButton
                  status={item.status}
                  onReviewClick={handleReviewClick}
                  onChangeClick={handleChangeClick}
                  onCancelClick={handleCancelClick}
                  reviewSubmitted={item.status === 'completed' ? item.reviewSubmitted : undefined}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
