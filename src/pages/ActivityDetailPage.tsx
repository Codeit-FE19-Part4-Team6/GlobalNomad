import 'react-day-picker/dist/style.css';
import { useState } from 'react';
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

// 임시 더미 데이터 (API 연동 시 교체)
const DUMMY_ACTIVITY = {
  id: 1,
  title: '캠핑 배우면 즐기는 스트릿 댄스',
  category: '문화 · 예술',
  rating: 4.9,
  reviewCount: 293,
  price: 1000,
  address: '서울 중구 창경궁로 100 10F',
  shortDescription: '초보자부터 전문가까지 즐추는 즐거움을 함께 느껴보세요.',
  description: `안녕하세요! 저의 스튜 스트릿 댄스, 저희랑 스트릿 댄스 고고합시다~! 서로 즐기면서 춤도 배우고 스트릿 배틀도 하고 즐겁게 놀아요!
다양한 장르의 춤을 배우며 그 뼈들을 살펴봐서 그때 이해하고 진중하게 춤추며 연마를 합니다! 서로 배틀도 기획하고 제가 춤을 따라가기 쉽게 스텝별로 세세히 안내하고 있으니 춤을 잘못 추는 초보인 분들도 춤으로 즐기고 놀죠.`,
  images: [
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
  ],
};

const DUMMY_REVIEWS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  author: '김태민',
  rating: 4 + Math.random(),
  createdAt: '2022. 3. 4',
  content:
    '스트릿 처음 춰봤는데 너무 재밌었습니다! 어쩌고 저쩌고 후기후기후기후기어쩌고 저쩌고 후기후기후기후기어쩌고 저쩌고 너무 재밌었습니다! 너무 재밌었습니다! 후기후기후기후기~~ 다음에 또 체험해보고싶습니다',
}));

function ActivityDetailPage() {
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
                category={DUMMY_ACTIVITY.category}
                title={DUMMY_ACTIVITY.title}
                rating={DUMMY_ACTIVITY.rating}
                reviewCount={DUMMY_ACTIVITY.reviewCount}
                address={DUMMY_ACTIVITY.address}
                shortDescription={DUMMY_ACTIVITY.shortDescription}
                onEdit={handleEdit}
                onDelete={handleDelete}
                variant='mobile'
              />
            </div>

            {/* 체험 이미지 영역 */}
            <ActivityImageGallery images={DUMMY_ACTIVITY.images} title={DUMMY_ACTIVITY.title} />

            {/* 체험 설명 */}
            <section className='mb-10'>
              <Title as='h3' size='xl' weight='bold' className='mb-4'>
                체험 설명
              </Title>
              <p className='font-md-medium whitespace-pre-wrap text-gray-800'>
                {DUMMY_ACTIVITY.description}
              </p>
            </section>

            {/* 오시는 길 */}
            <section className='mb-10 border-t border-gray-100 pt-10'>
              <Title as='h3' size='xl' weight='bold' className='mb-4'>
                오시는 길
              </Title>
              <p className='font-md-medium mb-4 flex items-center gap-1 text-gray-700'>
                <span>{DUMMY_ACTIVITY.address}</span>
              </p>
              {/* TODO: 지도 라이브러리 연동 */}
              <div className='h-[476px] w-full rounded-xl bg-gray-200'>
                {/* 지도 영역 (외부 라이브러리 연결 예정) */}
                <div className='flex h-full items-center justify-center text-gray-500'>
                  지도 영역 (라이브러리 연동 예정)
                </div>
              </div>
            </section>

            {/* 후기 영역 */}
            <ActivityReviews
              reviews={DUMMY_REVIEWS}
              rating={DUMMY_ACTIVITY.rating}
              reviewCount={DUMMY_ACTIVITY.reviewCount}
            />
          </div>

          {/* 우측 영역 - 예약 정보 (데스크톱) */}
          <aside className='hidden lg:block lg:w-[384px]'>
            <div className='sticky top-6'>
              {/* 상단 정보 영역 */}
              <ActivityInfo
                category={DUMMY_ACTIVITY.category}
                title={DUMMY_ACTIVITY.title}
                rating={DUMMY_ACTIVITY.rating}
                reviewCount={DUMMY_ACTIVITY.reviewCount}
                address={DUMMY_ACTIVITY.address}
                shortDescription={DUMMY_ACTIVITY.shortDescription}
                onEdit={handleEdit}
                onDelete={handleDelete}
                variant='desktop'
              />

              {/* 예약 정보 박스 */}
              <ActivityReservationPanel
                price={DUMMY_ACTIVITY.price}
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
          price={DUMMY_ACTIVITY.price}
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
                ₩ {(DUMMY_ACTIVITY.price * participantCount).toLocaleString()}
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
