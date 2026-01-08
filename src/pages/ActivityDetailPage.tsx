import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from '@/components/common/Title';
import { PrimaryButton } from '@/components/common/button/PrimaryButton';
import { TimeSelectButton } from '@/components/common/button/TimeSelectButton';
import { DayPicker } from 'react-day-picker';
import BottomSheet from '@/components/common/modal/BottomSheet';
import ActivityInfo from './ActivityDetail/ActivityInfo';
import ActivityImageGallery from './ActivityDetail/ActivityImageGallery';
import ActivityReservationPanel from './ActivityDetail/ActivityReservationPanel';
import ActivityMobileReservationBar from './ActivityDetail/ActivityMobileReservationBar';
import ActivityReviews from './ActivityDetail/ActivityReviews';
import ActivityMap from './ActivityDetail/ActivityMap';
import { useActivityDetail } from '@/hooks/queries/useActivityDetail';

const SHORT_DESCRIPTION_MAX_LENGTH = 100;

function ActivityDetailPage() {
  // URL에서 activityId 가져오기
  const { activityId } = useParams<{ activityId: string }>();

  // API 데이터 불러오기
  const { data: activity, isLoading, isError } = useActivityDetail(Number(activityId));

  // 예약 관련 상태
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [participantCount, setParticipantCount] = useState(1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 케밥 메뉴 핸들러
  const handleEdit = () => {
    // TODO: 수정 페이지로 이동
  };

  const handleDelete = () => {
    // TODO: 삭제 확인 모달 열기
  };

  // 참가 인원 증감 핸들러
  const handleIncrement = () => {
    setParticipantCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (participantCount > 1) {
      setParticipantCount((prev) => prev - 1);
    }
  };

  // 예약하기 핸들러 (데스크톱)
  const handleReservation = () => {
    // TODO: 예약 API 호출
  };

  // 모바일 예약하기 핸들러 (바텀시트 열기)
  const handleMobileReservation = () => {
    setIsBottomSheetOpen(true);
  };

  // 바텀시트 닫기
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  // 바텀시트에서 예약하기
  const handleBottomSheetReservation = () => {
    // TODO: 예약 API 호출
    setIsBottomSheetOpen(false);
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className='flex h-[calc(100vh-200px)] items-center justify-center'>
        <span className='font-lg-medium text-gray-500'>체험 정보를 불러오는 중...</span>
      </div>
    );
  }

  // 에러 상태
  if (isError || !activity) {
    return (
      <div className='flex h-[calc(100vh-200px)] flex-col items-center justify-center gap-4'>
        <span className='font-lg-medium text-gray-700'>체험 정보를 불러올 수 없습니다.</span>
        <span className='font-md-medium text-gray-500'>잠시 후 다시 시도해주세요.</span>
      </div>
    );
  }

  // API 데이터를 컴포넌트에서 사용할 형태로 변환
  // 체험 상세 페이지에서는 subImages만 사용 (최소 1개, 최대 4개)
  const images = activity.subImages.map((img) => img.imageUrl);

  return (
    <div className='w-full'>
      {/* 컨텐츠 래퍼 - 반응형 너비 및 패딩 */}
      <div className='mx-auto w-full max-w-[1200px] px-6 py-6 sm:px-[30px] sm:py-10 lg:px-10'>
        {/* 메인 레이아웃: 좌측 컨텐츠 + 우측 예약 영역 */}
        <div className='flex flex-col gap-6 lg:flex-row lg:gap-6'>
          {/* 좌측 영역 - 체험 정보 */}
          <div className='flex-1 lg:max-w-[770px]'>
            {/* 체험 타이틀 및 정보 (모바일/태블릿에서 상단 노출) */}
            <div className='lg:hidden'>
              <ActivityInfo
                category={activity.category}
                title={activity.title}
                rating={activity.rating}
                reviewCount={activity.reviewCount}
                address={activity.address}
                shortDescription={activity.description.slice(0, SHORT_DESCRIPTION_MAX_LENGTH)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                variant='mobile'
              />
            </div>

            {/* 체험 이미지 영역 */}
            <ActivityImageGallery images={images} title={activity.title} />

            {/* 체험 설명 */}
            <section className='mb-10'>
              <Title as='h3' size='xl' weight='bold' className='mb-4'>
                체험 설명
              </Title>
              <p className='font-md-medium whitespace-pre-wrap text-gray-800'>
                {activity.description}
              </p>
            </section>

            {/* 오시는 길 */}
            <section className='mb-10 border-t border-gray-100 pt-10'>
              <Title as='h3' size='xl' weight='bold' className='mb-4'>
                오시는 길
              </Title>
              <p className='font-md-medium mb-4 flex items-center gap-1 text-gray-700'>
                <span>{activity.address}</span>
              </p>
              <ActivityMap address={activity.address} />
            </section>

            {/* 후기 영역 */}
            <ActivityReviews activityId={activity.id} />
          </div>

          {/* 우측 영역 - 예약 정보 (데스크톱) */}
          <aside className='hidden lg:block lg:w-[384px]'>
            <div className='sticky top-6'>
              {/* 상단 정보 영역 */}
              <ActivityInfo
                category={activity.category}
                title={activity.title}
                rating={activity.rating}
                reviewCount={activity.reviewCount}
                address={activity.address}
                shortDescription={activity.description.slice(0, SHORT_DESCRIPTION_MAX_LENGTH)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                variant='desktop'
              />

              {/* 예약 정보 박스 */}
              <ActivityReservationPanel
                price={activity.price}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                selectedTimeSlot={selectedTimeSlot}
                onSelectTimeSlot={setSelectedTimeSlot}
                participantCount={participantCount}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onReservation={handleReservation}
              />
            </div>
          </aside>
        </div>

        {/* 모바일/태블릿 하단 고정 예약 바 */}
        <ActivityMobileReservationBar
          price={activity.price}
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
          onOpenBottomSheet={handleMobileReservation}
        />
      </div>

      {/* 바텀시트 - 모바일/태블릿 예약 폼 */}
      <BottomSheet isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        <div className='px-6 py-6 sm:px-[30px]'>
          {/* 바텀시트 헤더 */}
          <div className='mb-6 flex items-center justify-between'>
            <Title as='h3' size='xl' weight='bold'>
              날짜
            </Title>
            <button
              onClick={handleCloseBottomSheet}
              className='font-lg-medium text-gray-600 hover:text-gray-900'>
              ✕
            </button>
          </div>

          {/* 날짜 및 시간 선택 영역 */}
          <div className='mb-6 flex flex-col gap-6 sm:flex-row'>
            {/* 날짜 선택 */}
            <div className='flex-1'>
              <DayPicker
                mode='single'
                selected={selectedDate}
                onSelect={setSelectedDate}
                className='font-md-medium w-full rounded-xl bg-white p-4'
                modifiersClassNames={{
                  selected: 'custom-selected',
                  today: 'custom-today',
                  disabled: 'text-gray-300 cursor-not-allowed',
                }}
                modifiersStyles={{
                  selected: {
                    backgroundColor: 'var(--color-primary-500)',
                    color: 'white',
                    fontWeight: 700,
                    borderRadius: '9999px',
                  },
                  today: {
                    backgroundColor: 'var(--color-primary-100)',
                    color: 'var(--color-primary-500)',
                    fontWeight: 700,
                    borderRadius: '9999px',
                  },
                }}
                disabled={[{ before: new Date() }]}
              />
            </div>

            {/* 예약 가능한 시간 (날짜 선택 시에만 보임) */}
            <div className='flex-1'>
              {selectedDate ? (
                <div>
                  <Title as='h4' size='lg' weight='bold' className='mb-4'>
                    예약 가능한 시간
                  </Title>
                  <div className='space-y-2'>
                    <TimeSelectButton
                      onClick={() => setSelectedTimeSlot('14:00~15:00')}
                      selected={selectedTimeSlot === '14:00~15:00'}
                      className='w-full'>
                      14:00~15:00
                    </TimeSelectButton>
                    <TimeSelectButton
                      onClick={() => setSelectedTimeSlot('15:00~16:00')}
                      selected={selectedTimeSlot === '15:00~16:00'}
                      className='w-full'>
                      15:00~16:00
                    </TimeSelectButton>
                  </div>
                </div>
              ) : (
                <div className='flex h-full items-center justify-center rounded-xl border border-gray-300 bg-gray-50'>
                  <p className='font-md-medium text-gray-500'>날짜를 선택해주세요.</p>
                </div>
              )}
            </div>
          </div>

          {/* 참가 인원 수 */}
          <div className='mb-6 flex items-center justify-between'>
            <Title as='h4' size='lg' weight='bold'>
              참여 인원 수
            </Title>
            <div className='flex items-center gap-3 rounded-3xl border border-gray-200 p-0'>
              <button
                onClick={handleDecrement}
                className='flex h-11 w-11 items-center justify-center text-3xl text-gray-500 transition-colors hover:text-gray-700'>
                −
              </button>
              <span className='font-lg-medium min-w-[40px] text-center text-gray-900'>
                {participantCount}
              </span>
              <button
                onClick={handleIncrement}
                className='flex h-11 w-11 items-center justify-center text-3xl text-gray-500 transition-colors hover:text-gray-700'>
                +
              </button>
            </div>
          </div>

          {/* 총 금액 및 예약 버튼 */}
          <div className='space-y-4 border-t border-gray-300 pt-6'>
            <div className='flex items-center justify-between'>
              <span className='font-lg-medium text-gray-900'>총 합계</span>
              <Title as='h3' size='2xl' weight='bold'>
                ₩ {(activity.price * participantCount).toLocaleString()}
              </Title>
            </div>
            <PrimaryButton size='lg' onClick={handleBottomSheetReservation} className='w-full'>
              확인
            </PrimaryButton>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

export default ActivityDetailPage;
