import { useState } from 'react';
import Card from '@/components/common/card';
import Title from '@/components/common/Title';
import { Down, Earth } from '@/assets/icons';
import type { MyActivityEditResponse } from '@/apis/type';

// mock 데이터
const mockReservations: MyActivityEditResponse[] = [
  {
    id: 1,
    userId: 1,
    title: '예약 완료 예시',
    description: '설명',
    category: '체험',
    price: 45000,
    address: '서울시 강남구',
    bannerImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    subImages: [],
    schedules: [{ date: '2025-01-20', times: [{ id: 1, startTime: '18:00', endTime: '20:00' }] }],
    reviewCount: 567,
    rating: 6,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 2,
    userId: 2,
    title: '체험 완료 예시',
    description: '설명2',
    category: '체험',
    price: 32000,
    address: '서울시 마포구',
    bannerImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    subImages: [],
    schedules: [{ date: '2025-01-15', times: [{ id: 2, startTime: '16:00', endTime: '18:00' }] }],
    reviewCount: 123,
    rating: 5,
    createdAt: '2025-01-02',
    updatedAt: '2025-01-02',
  },
];

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ReservationPage({ setMobileOpen }: Props) {
  const [reservations] = useState<MyActivityEditResponse[]>(mockReservations);

  // 최신순 정렬
  const sortedReservations = reservations.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

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

      {sortedReservations.length === 0 ? (
        <div className='mb-3 flex flex-col items-center justify-center gap-7.5 md:mx-45 lg:mx-70'>
          <div className='flex flex-col items-center justify-center'>
            <Earth className='mb-7.5' />
            <div className='font-xl-medium text-center whitespace-nowrap text-gray-600'>
              아직 등록한 체험이 없어요
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-7.5 lg:gap-6'>
          {sortedReservations.map((item) => (
            <Card
              key={item.id}
              variant='reservation'
              className='border-t border-gray-50 first:border-t-0 lg:border-t-0 lg:pt-0'>
              <div className='flex flex-row'>
                <Card.Content>
                  <Card.Title title={item.title} />
                  <Card.Price price={item.price} headCount={1} />
                </Card.Content>
                <Card.Image src={item.bannerImageUrl} alt={item.title} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
