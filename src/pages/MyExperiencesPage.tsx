import Card from '@/components/common/card';
import Title from '@/components/common/Title';
import { Down, Earth } from '@/assets/icons';
import { useNavigate } from 'react-router-dom';
import type { Activity } from '@/apis/type';
import { PrimaryButton } from '@/components/common/button';
import CancelReservationModal from '@/components/common/modal/CancelReservationModal';
import { useState } from 'react';

// import { useMyActivities } from '@/hooks/queries/useMyActivities';

const mockMyActivities: Activity[] = [
  {
    id: 1,
    userId: 10,
    title: '제주 바다 선셋 요트 체험',
    description: '노을이 지는 제주 바다에서 즐기는 요트 체험',
    category: '투어',
    price: 75000,
    address: '제주특별자치도 제주시',
    bannerImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    rating: 3,
    reviewCount: 32,
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 2,
    userId: 10,
    title: '서울 야경 도보 투어',
    description: '서울의 숨겨진 야경 명소를 걷는 투어',
    category: '관광',
    price: 35000,
    address: '서울특별자치도 중구',
    bannerImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    rating: 4.5,
    reviewCount: 18,
    createdAt: '2024-12-20T09:00:00Z',
    updatedAt: '2025-01-02T12:00:00Z',
  },
  {
    id: 3,
    userId: 10,
    title: '한강 피크닉 & 와인 클래스',
    description: '한강에서 즐기는 피크닉과 와인 테이스팅',
    category: '식음료',
    price: 55000,
    address: '서울특별자치도 영등포구',
    bannerImageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff',
    rating: 5,
    reviewCount: 876,
    createdAt: '2025-01-15T15:00:00Z',
    updatedAt: '2025-01-15T15:00:00Z',
  },
];

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MyExperiencesPage({ setMobileOpen }: Props) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);

  const navigate = useNavigate();

  // 현재는 mock 데이터만 사용 TODO: 추후 수정
  const [activities, setActivities] = useState<Activity[]>(mockMyActivities);

  // const { data: myActivities, isLoading, isError } = useMyActivities();

  const handleDelete = (id: number) => {
    setSelectedActivityId(id);
    setIsCancelModalOpen(true);
  };
  const handleConfirmCancel = () => {
    if (!selectedActivityId) {
      return;
    }
    setActivities((prev) => prev.filter((a) => a.id !== selectedActivityId));
    setSelectedActivityId(null);
    setIsCancelModalOpen(false); // 모달 닫기
  };

  return (
    <div className='flex flex-col gap-3.5 px-4 md:px-7.5'>
      <div className='mb-[30px] flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-col gap-2.5'>
          <Down
            className='block rotate-90 cursor-pointer md:hidden'
            onClick={() => setMobileOpen(false)}
          />
          <Title as='h3' size='xl' weight='bold'>
            내 체험 관리
          </Title>
          <div className='font-md-medium text-gray-500'>
            내가 등록한 체험을 수정하거나 삭제할 수 있습니다.
          </div>
        </div>
        <PrimaryButton
          onClick={() => navigate('/activities/new')} // 임시
          className='font-lg-bold md:h-12 md:w-[138px]'>
          체험 등록하기
        </PrimaryButton>
      </div>
      {activities.length === 0 ? (
        <div className='mb-3 flex flex-col items-center justify-center gap-7.5 md:mx-45 lg:mx-70'>
          <Earth className='mb-7.5' />
          <div className='font-xl-medium text-center text-gray-600'>아직 등록한 체험이 없어요</div>
        </div>
      ) : (
        <div className='mb-3 flex flex-col gap-7.5 lg:gap-6'>
          {activities.map((activity) => (
            <Card key={activity.id} variant='list'>
              <div className='flex w-full items-stretch justify-between'>
                <Card.Content className='flex flex-1 flex-col justify-center'>
                  <Card.Title title={activity.title} className='mb-[6px] lg:mb-2' />
                  <Card.Rating
                    rating={activity.rating}
                    reviewCount={activity.reviewCount}
                    className='mb-[10px] lg:mb-3'
                  />
                  <Card.Price price={activity.price} className='mb-[10px] lg:mb-5' />
                  <Card.CardButton
                    onEdit={() => navigate(`/activities/${activity.id}/edit`)} // 임시
                    onDelete={() => handleDelete(activity.id)}
                  />
                </Card.Content>
                <Card.Image src={activity.bannerImageUrl} alt={activity.title} />
              </div>
            </Card>
          ))}
        </div>
      )}
      <CancelReservationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        cancelText='아니요'
        confirmText='예'>
        삭제하시겠습니까?
      </CancelReservationModal>
    </div>
  );
}
