import { useEffect, useState } from 'react';
import ReservationInfoModal from '@/components/common/modal/ReservationInfoModal'; // 경로 너 프로젝트에 맞게 수정

// ✅ 화면 크기 체크 훅 (lg=1024px 기준)
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

type ReservationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

type Reservation = {
  id: number;
  nickname: string;
  headCount: number;
  status: ReservationStatus;
  date: string;
  startTime: string;
  endTime: string;
};

export default function ReservationInfoModalTestPage() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [isOpen, setIsOpen] = useState(true);

  // ✅ UI 확인용 mock 데이터
  const reservations: Reservation[] = [
    // 14:00-15:00
    {
      id: 1,
      nickname: '정만철',
      headCount: 10,
      status: 'PENDING',
      date: '2025-12-23',
      startTime: '14:00',
      endTime: '15:00',
    },
    {
      id: 2,
      nickname: '홍길동',
      headCount: 12,
      status: 'PENDING',
      date: '2025-12-23',
      startTime: '14:00',
      endTime: '15:00',
    },
    {
      id: 3,
      nickname: '김코딩',
      headCount: 8,
      status: 'APPROVED',
      date: '2025-12-23',
      startTime: '14:00',
      endTime: '15:00',
    },
    {
      id: 4,
      nickname: '이프론트',
      headCount: 6,
      status: 'REJECTED',
      date: '2025-12-23',
      startTime: '14:00',
      endTime: '15:00',
    },

    // 15:00-16:00
    {
      id: 5,
      nickname: '박테스트',
      headCount: 5,
      status: 'PENDING',
      date: '2025-12-23',
      startTime: '15:00',
      endTime: '16:00',
    },
    {
      id: 6,
      nickname: '최승인',
      headCount: 9,
      status: 'APPROVED',
      date: '2025-12-23',
      startTime: '15:00',
      endTime: '16:00',
    },
  ];

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <h1 className='text-xl font-bold text-gray-900'>예약 모달 UI 테스트</h1>
      <p className='mt-2 text-sm text-gray-600'>
        데스크탑(lg 이상)은 바텀시트, 모바일/태블릿은 모달처럼 보이게 테스트합니다.
      </p>

      <div className='mt-4 flex gap-2'>
        <button
          type='button'
          onClick={onOpen}
          className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700'>
          열기
        </button>
        <button
          type='button'
          onClick={onClose}
          className='rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300'>
          닫기
        </button>
      </div>

      {/* ✅ 데스크탑: 바텀 시트 */}
      {isDesktop && isOpen && (
        <div className='fixed inset-x-0 top-50 left-150 z-50 w-[340px]'>
          <div className='rounded-[24px] bg-white shadow-2xl'>
            <ReservationInfoModal
              isOpen={isOpen}
              onClose={onClose}
              dateText='23년 2월 10일'
              reservations={reservations}
            />
          </div>
        </div>
      )}

      {/* ✅ 모바일/태블릿: 딤 + 중앙 모달 (BaseModal 없어도 UI 확인 가능하게) */}
      {!isDesktop && isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'>
          <div className='w-[327px] rounded-[28px] bg-white shadow-2xl md:w-[385px]'>
            <ReservationInfoModal
              isOpen={isOpen}
              onClose={onClose}
              dateText='23년 2월 10일'
              reservations={reservations}
            />
          </div>
        </div>
      )}
    </div>
  );
}
