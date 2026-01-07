import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import Title from '@/components/common/Title';
import { BaseBadge } from '@/components/common/badge';
import Pagination from '@/components/common/pagination';
import { PrimaryButton } from '@/components/common/button/PrimaryButton';
import { TimeSelectButton } from '@/components/common/button/TimeSelectButton';
import Dropdown from '@/components/common/dropdown/Dropdown';
import DropdownTrigger from '@/components/common/dropdown/DropdownTrigger';
import DropdownList from '@/components/common/dropdown/DropdownList';
import DropdownItem from '@/components/common/dropdown/DropdownItem';
import { Star, More, Spot } from '@/assets/icons';
import { DayPicker } from 'react-day-picker';
import BottomSheet from '@/components/common/modal/BottomSheet';

// 임시 더미 데이터 (API 연동 시 교체)
const DUMMY_ACTIVITY = {
  id: 1,
  title: '캠핑 배우면 즐기는 스트릿 댄스',
  category: '문화 · 예술',
  rating: 4.9,
  reviewCount: 293,
  price: 1000,
  address: '서울 중구 창경궁로 100 10F',
  description: `안녕하세요! 저의 스튜 스트릿 댄스, 저희랑 스트릿 댄스 고고합시다~! 서로 즐기면서 춤도 배우고 스트릿 배틀도 하고 즐겁게 놀아요!
다양한 장르의 춤을 배우며 그 뼈들을 살펴봐서 그때 이해하고 진중하게 춤추며 연마를 합니다! 서로 배틀도 기획하고 제가 춤을 따라가기 쉽게 스텝별로 세세히 안내하고 있으니 춤을 잘못 추는 초보인 분들도 춤으로 즐기고 놀죠.`,
  images: [
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
  ],
};

const DUMMY_REVIEWS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  author: '김**민',
  rating: 4 + Math.random(),
  createdAt: '2022. 3. 4',
  content:
    '스트릿 처음 춰봤는데 너무 재밌었습니다! 어쩌고 저쩌고 후기후기후기후기~~ 다음에 또 체험해보고싶습니다',
}));

// 달력, 예약 관련 타입 정의
type SelectedDate = {
  year: number;
  month: number;
  date: number;
};

function ActivityDetailPage() {
  // 예약 관련 상태
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [participantCount, setParticipantCount] = useState(10);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 케밥 메뉴 핸들러
  const handleEdit = () => {
    // TODO: 수정 페이지로 이동
  };

  const handleDelete = () => {
    // TODO: 삭제 확인 모달 열기
  };

  // 리뷰 페이지네이션 상태
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const reviewsPerPage = 3;
  const totalReviewPages = Math.ceil(DUMMY_REVIEWS.length / reviewsPerPage);

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
            <div className='mb-6 lg:hidden'>
              {/* 카테고리 및 타이틀 */}
              <div className='mb-4 flex items-start justify-between'>
                <div className='flex-1'>
                  <BaseBadge color='orange' size='status' className='mb-2'>
                    {DUMMY_ACTIVITY.category}
                  </BaseBadge>
                  <Title as='h1' size='2xl' weight='bold' className='mb-2'>
                    {DUMMY_ACTIVITY.title}
                  </Title>
                </div>
                {/* 케밥 메뉴 */}
                <Dropdown>
                  <DropdownTrigger>
                    <button className='p-1'>
                      <More className='h-6 w-6 text-gray-900' />
                    </button>
                  </DropdownTrigger>
                  <DropdownList>
                    <DropdownItem onClick={handleEdit}>수정하기</DropdownItem>
                    <DropdownItem onClick={handleDelete}>삭제하기</DropdownItem>
                  </DropdownList>
                </Dropdown>
              </div>

              {/* 평점 */}
              <div className='mb-2 flex items-center gap-1'>
                <Star className='h-4 w-4 text-yellow-500' />
                <span className='font-md-medium text-gray-800'>{DUMMY_ACTIVITY.rating}</span>
                <span className='font-md-medium text-gray-500'>({DUMMY_ACTIVITY.reviewCount})</span>
              </div>

              {/* 주소 */}
              <div className='flex items-start gap-1'>
                <Spot className='mt-0.5 h-4 w-4 flex-shrink-0 text-gray-700' />
                <span className='font-md-regular text-gray-700'>{DUMMY_ACTIVITY.address}</span>
              </div>
            </div>

            {/* 체험 이미지 영역 */}
            <section className='mb-6'>
              {DUMMY_ACTIVITY.images.length === 1 ? (
                // 이미지 1개: 전체 영역
                <div className='h-[400px] overflow-hidden rounded-3xl'>
                  <img
                    src={DUMMY_ACTIVITY.images[0]}
                    alt={DUMMY_ACTIVITY.title}
                    className='h-full w-full object-cover'
                  />
                </div>
              ) : DUMMY_ACTIVITY.images.length === 4 ? (
                // 이미지 4개: 왼쪽 2개 + 오른쪽 2개
                <div className='grid h-[400px] grid-cols-2 gap-3 overflow-hidden rounded-3xl'>
                  {/* 왼쪽 이미지 2개 */}
                  <div className='grid h-full grid-rows-2 gap-3'>
                    <div className='h-full w-full overflow-hidden'>
                      <img
                        src={DUMMY_ACTIVITY.images[0]}
                        alt={DUMMY_ACTIVITY.title}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='h-full w-full overflow-hidden'>
                      <img
                        src={DUMMY_ACTIVITY.images[1]}
                        alt={`${DUMMY_ACTIVITY.title} 2`}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  </div>
                  {/* 오른쪽 이미지 2개 */}
                  <div className='grid h-full grid-rows-2 gap-3'>
                    <div className='h-full w-full overflow-hidden'>
                      <img
                        src={DUMMY_ACTIVITY.images[2]}
                        alt={`${DUMMY_ACTIVITY.title} 3`}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='h-full w-full overflow-hidden'>
                      <img
                        src={DUMMY_ACTIVITY.images[3]}
                        alt={`${DUMMY_ACTIVITY.title} 4`}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // 이미지 2-3개: 왼쪽 큰 이미지 1개 + 오른쪽 작은 이미지들
                <div className='grid h-[400px] grid-cols-2 gap-3 overflow-hidden rounded-3xl'>
                  {/* 왼쪽 큰 이미지 */}
                  <div className='h-full w-full overflow-hidden'>
                    <img
                      src={DUMMY_ACTIVITY.images[0]}
                      alt={DUMMY_ACTIVITY.title}
                      className='h-full w-full object-cover'
                    />
                  </div>
                  {/* 오른쪽 작은 이미지들 */}
                  <div
                    className={`grid h-full gap-3 ${
                      DUMMY_ACTIVITY.images.length === 2 ? 'grid-rows-1' : 'grid-rows-2'
                    }`}>
                    {DUMMY_ACTIVITY.images.slice(1).map((image, index) => (
                      <div key={index} className='h-full w-full overflow-hidden'>
                        <img
                          src={image}
                          alt={`${DUMMY_ACTIVITY.title} ${index + 2}`}
                          className='h-full w-full object-cover'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 체험 설명 */}
            <section className='mb-10'>
              <Title as='h3' size='xl' weight='bold' className='mb-4'>
                체험 설명
              </Title>
              <p className='font-md-regular whitespace-pre-wrap text-gray-800'>
                {DUMMY_ACTIVITY.description}
              </p>
            </section>

            {/* 오시는 길 */}
            <section className='mb-10'>
              <Title as='h3' size='xl' weight='bold' className='mb-4'>
                오시는 길
              </Title>
              <p className='font-md-regular mb-4 flex items-center gap-1 text-gray-700'>
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
            <section className='mb-10'>
              <div className='mb-6 flex items-center gap-4'>
                <Title as='h3' size='xl' weight='bold'>
                  후기
                </Title>
                <div className='flex items-center gap-2'>
                  <Title as='h2' size='3xl' weight='bold'>
                    {DUMMY_ACTIVITY.rating.toFixed(1)}
                  </Title>
                  <div className='flex flex-col'>
                    <div className='flex items-center gap-1'>
                      <Star className='h-4 w-4' />
                      <span className='font-md-medium text-gray-500'>매우 만족</span>
                    </div>
                    <span className='font-md-medium text-gray-500'>
                      {DUMMY_ACTIVITY.reviewCount.toLocaleString()}개 후기
                    </span>
                  </div>
                </div>
              </div>

              {/* 후기 리스트 */}
              <div className='space-y-6'>
                {DUMMY_REVIEWS.slice(
                  (currentReviewPage - 1) * reviewsPerPage,
                  currentReviewPage * reviewsPerPage
                ).map((review) => (
                  <div key={review.id} className='border-b border-gray-300 pb-6 last:border-b-0'>
                    <div className='mb-2 flex items-center gap-3'>
                      <span className='font-md-semibold text-gray-900'>{review.author}</span>
                      <span className='text-gray-400'>|</span>
                      <span className='font-md-regular text-gray-500'>{review.createdAt}</span>
                    </div>
                    <div className='mb-2 flex items-center gap-1'>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className='font-md-regular text-gray-800'>{review.content}</p>
                  </div>
                ))}
              </div>

              {/* 후기 페이지네이션 */}
              <div className='mt-8 flex justify-center'>
                <Pagination
                  currentPage={currentReviewPage}
                  totalPages={totalReviewPages}
                  onPageChange={setCurrentReviewPage}>
                  <Pagination.Prev />
                  <Pagination.Items />
                  <Pagination.Next />
                </Pagination>
              </div>
            </section>
          </div>

          {/* 우측 영역 - 예약 정보 (데스크톱) */}
          <aside className='hidden lg:block lg:w-[384px]'>
            <div className='sticky top-6'>
              {/* 상단 정보 영역 */}
              <div className='mb-4'>
                <div className='mb-4 flex items-start justify-between'>
                  <div className='flex-1'>
                    <BaseBadge color='orange' size='status' className='mb-2'>
                      {DUMMY_ACTIVITY.category}
                    </BaseBadge>
                    <Title as='h2' size='xl' weight='bold' className='mb-2'>
                      {DUMMY_ACTIVITY.title}
                    </Title>
                  </div>
                  {/* 케밥 메뉴 */}
                  <Dropdown>
                    <DropdownTrigger>
                      <button className='p-1'>
                        <More className='h-6 w-6 text-gray-900' />
                      </button>
                    </DropdownTrigger>
                    <DropdownList>
                      <DropdownItem onClick={handleEdit}>수정하기</DropdownItem>
                      <DropdownItem onClick={handleDelete}>삭제하기</DropdownItem>
                    </DropdownList>
                  </Dropdown>
                </div>

                {/* 평점 */}
                <div className='mb-2 flex items-center gap-1'>
                  <Star className='h-4 w-4 text-yellow-500' />
                  <span className='font-md-medium text-gray-800'>{DUMMY_ACTIVITY.rating}</span>
                  <span className='font-md-medium text-gray-500'>
                    ({DUMMY_ACTIVITY.reviewCount})
                  </span>
                </div>

                {/* 주소 */}
                <div className='flex items-start gap-1'>
                  <Spot className='mt-0.5 h-4 w-4 flex-shrink-0 text-gray-700' />
                  <span className='font-md-regular text-gray-700'>{DUMMY_ACTIVITY.address}</span>
                </div>
              </div>

              {/* 예약 정보 박스 */}
              <div className='rounded-3xl border border-gray-200 p-6 shadow-[0_0_20px_rgba(0,0,0,0.08)]'>
                {/* 가격 */}
                <div className='mb-6 border-b border-gray-300 pb-6'>
                  <div className='flex items-center gap-1'>
                    <Title as='h3' size='2xl' weight='bold'>
                      ₩ {DUMMY_ACTIVITY.price.toLocaleString()}
                    </Title>
                    <span className='font-lg-regular text-gray-700'>/ 인</span>
                  </div>
                </div>

                {/* 날짜 선택 */}
                <div className='mb-8'>
                  <Title as='h4' size='lg' weight='bold' className='mb-4'>
                    날짜
                  </Title>
                  <DayPicker
                    mode='single'
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className='font-md-medium w-full rounded-xl border border-gray-300 bg-white p-4'
                    modifiersClassNames={{
                      selected: 'custom-selected',
                      today: 'custom-today',
                      disabled: 'text-gray-300 cursor-not-allowed',
                    }}
                    modifiersStyles={{
                      selected: {
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        fontWeight: 700,
                        borderRadius: '9999px',
                      },
                      today: {
                        backgroundColor: '#dbeafe',
                        color: '#3b82f6',
                        fontWeight: 700,
                        borderRadius: '9999px',
                      },
                    }}
                    disabled={[{ before: new Date() }]}
                  />
                </div>

                {/* 참가 인원 수 */}
                <div className='mb-8 flex items-center justify-between'>
                  <Title as='h4' size='lg' weight='bold'>
                    참여 인원 수
                  </Title>
                  <div className='flex items-center gap-3 rounded-3xl border border-gray-200 p-0'>
                    <button
                      onClick={handleDecrement}
                      className='flex h-11 w-11 items-center justify-center text-3xl text-gray-500 transition-colors hover:text-gray-700'>
                      −
                    </button>
                    <span className='font-lg-regular min-w-[40px] text-center text-gray-900'>
                      {participantCount}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className='flex h-11 w-11 items-center justify-center text-3xl text-gray-500 transition-colors hover:text-gray-700'>
                      +
                    </button>
                  </div>
                </div>

                {/* 예약 가능한 시간 */}
                <div className='mb-10'>
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

                {/* 총 금액 및 예약 버튼 */}
                <div className='space-y-4 border-t border-gray-300 pt-6'>
                  <div className='flex items-center justify-between'>
                    <span className='font-lg-regular text-gray-900'>총 합계</span>
                    <Title as='h3' size='2xl' weight='bold'>
                      ₩ {(DUMMY_ACTIVITY.price * participantCount).toLocaleString()}
                    </Title>
                  </div>
                  <PrimaryButton size='lg' onClick={handleReservation} className='w-full'>
                    예약하기
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* 모바일/태블릿 하단 고정 예약 바 */}
        <div className='fixed inset-x-0 bottom-0 z-50 bg-white px-6 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] sm:px-[30px] lg:hidden'>
          <div className='mx-auto flex max-w-[1200px] items-center justify-between gap-4'>
            <button
              onClick={handleMobileReservation}
              className='font-md-semibold flex-shrink-0 text-gray-900 underline'>
              날짜 선택하기
            </button>
            <div className='flex items-center gap-3'>
              <div className='flex items-baseline gap-1'>
                <Title as='h3' size='xl' weight='bold'>
                  ₩ {DUMMY_ACTIVITY.price.toLocaleString()}
                </Title>
                <span className='font-md-regular text-gray-500'>/ 인</span>
              </div>
              <PrimaryButton size='lg' disabled>
                예약하기
              </PrimaryButton>
            </div>
          </div>
        </div>
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
          <div className='mb-6 flex gap-6'>
            {/* 왼쪽: 날짜 선택 */}
            <div className='flex-1'>
              <DayPicker
                mode='single'
                selected={selectedDate}
                onSelect={setSelectedDate}
                className='font-md-medium w-full rounded-xl border border-gray-300 bg-white p-4'
                modifiersClassNames={{
                  selected: 'custom-selected',
                  today: 'custom-today',
                  disabled: 'text-gray-300 cursor-not-allowed',
                }}
                modifiersStyles={{
                  selected: {
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    fontWeight: 700,
                    borderRadius: '9999px',
                  },
                  today: {
                    backgroundColor: '#dbeafe',
                    color: '#3b82f6',
                    fontWeight: 700,
                    borderRadius: '9999px',
                  },
                }}
                disabled={[{ before: new Date() }]}
              />
            </div>

            {/* 오른쪽: 예약 가능한 시간 (날짜 선택 시에만 보임) */}
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
              <span className='font-lg-regular min-w-[40px] text-center text-gray-900'>
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
              <span className='font-lg-regular text-gray-900'>총 합계</span>
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
