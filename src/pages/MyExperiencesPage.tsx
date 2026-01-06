import Card from '@/components/common/card';
import Title from '@/components/common/Title';
import { Down, Earth } from '@/assets/icons';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '@/components/common/button';
import CancelReservationModal from '@/components/common/modal/CancelReservationModal';
import { useState } from 'react';
import { useDeleteActivityMutation } from '@/hooks/queries/useDeleteActivityMutation';
import { useMyActivities } from '@/hooks/queries/useMyActivities';

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MyExperiencesPage({ setMobileOpen }: Props) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null); // 선택된 체험 정보
  const navigate = useNavigate();

  // React Query를 통해 내 체험 목록 조회
  const { data: myActivities, isLoading, isError } = useMyActivities();

  const handleDelete = (id: number) => {
    setSelectedActivityId(id);
    setIsCancelModalOpen(true);
  };
  // 체험 삭제 뮤테이션 (React Query)
  // 삭제 성공 시 모달 닫기, 선택 ID 초기화
  const { mutate: deleteMutate } = useDeleteActivityMutation(
    () => setIsCancelModalOpen(false),
    () => setSelectedActivityId(null)
  );
  // 모달에서 삭제 확정 시 호출
  const handleConfirmCancel = () => {
    if (selectedActivityId !== null) {
      deleteMutate(selectedActivityId); // 삭제 뮤테이션 실행
    }
  };
  if (isLoading) {
    return <div className='px-4 py-10'>로딩 중...</div>;
  }
  if (isError) {
    return <div className='px-4 py-10'>데이터를 불러오지 못했습니다.</div>;
  }
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
          onClick={() => navigate('/activities/create')}
          className='font-lg-bold md:h-12 md:w-[138px]'>
          체험 등록하기
        </PrimaryButton>
      </div>
      {!myActivities || myActivities.length === 0 ? (
        <div className='mb-3 flex flex-col items-center justify-center gap-7.5 md:mx-45 lg:mx-70'>
          <Earth className='mb-7.5' />
          <div className='font-xl-medium text-center text-gray-600'>아직 등록한 체험이 없어요</div>
        </div>
      ) : (
        <div className='mb-3 flex flex-col gap-7.5 lg:gap-6'>
          {myActivities?.map((activity) => (
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
