import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardsideBar from '@/components/common/CardsideBar';
import BookingStatusPage from '@/pages/BookingStatusPage';
import MyExperiencesPage from '@/pages/MyExperiencesPage';
import MyProfilePage from '@/pages/MyProfilePage';
import ReservationPage from '@/pages/ReservationPage';
import { useMyInfo } from '@/hooks/queries/useMyInfo';
import { useProfileImageStore } from '@/stores/profileImageStore';

type ActivePage = 'profile' | 'reservation' | 'experiences' | 'status';

export default function MyPageLayout() {
  // URL 쿼리에서 tab 값 가져오기
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const { data: myInfo } = useMyInfo();
  const { setProfileImageUrl } = useProfileImageStore();

  const activePage: ActivePage =
    tabParam === 'profile' ||
    tabParam === 'reservation' ||
    tabParam === 'experiences' ||
    tabParam === 'status'
      ? tabParam
      : 'reservation';

  // 모바일에서 사이드바가 열려있는지 상태
  // 초기값: URL에 tab이 있으면 true
  const [mobileOpen, setMobileOpen] = useState<boolean>(() => {
    const tab = searchParams.get('tab');
    return !!tab;
  });
  // 페이지 선택 시 호출
  // URL 쿼리(tab) 업데이트
  // 모바일에서는 선택한 페이지를 보여주기 위해 mobileOpen true
  const handleSelect = (page: ActivePage) => {
    const params = new URLSearchParams(searchParams); // 기존 URL 쿼리 파라미터를 복사해서 새 URLSearchParams 객체 생성

    params.set('tab', page); // 선택한 탭을 tab 쿼리로 설정

    if (page !== 'reservation') {
      params.delete('status');
    }
    setSearchParams(params);
    setMobileOpen(true);
  };

  // 페이지 컴포넌트 매핑
  // key: activePage, value: 각 페이지 컴포넌트
  const pageMap: Record<ActivePage, React.ReactNode> = {
    profile: <MyProfilePage setMobileOpen={setMobileOpen} />,
    reservation: <ReservationPage setMobileOpen={setMobileOpen} />,
    experiences: <MyExperiencesPage setMobileOpen={setMobileOpen} />,
    status: <BookingStatusPage setMobileOpen={setMobileOpen} />,
  };

  useEffect(() => {
    if (myInfo?.profileImageUrl) {
      setProfileImageUrl(myInfo.profileImageUrl);
    }
  }, [myInfo, setProfileImageUrl]);

  return (
    <div className='mx-auto flex w-full max-w-[1200px] flex-col justify-center px-6 md:flex-row md:items-start md:gap-7.5 md:px-7.5 lg:justify-between'>
      <aside
        className={`md:sticky md:top-30 md:w-auto md:shrink-0 ${mobileOpen ? 'hidden md:block' : 'block'}`}>
        <div className='mb-3 block md:hidden'>
          <CardsideBar
            variant='mobile'
            activePage={activePage}
            onProfileClick={() => handleSelect('profile')}
            onBookingsClick={() => handleSelect('reservation')}
            onExperiencesClick={() => handleSelect('experiences')}
            onBookingStatusClick={() => handleSelect('status')}
          />
        </div>

        <div className='hidden md:block lg:hidden'>
          <CardsideBar
            variant='tablet'
            activePage={activePage}
            onProfileClick={() => handleSelect('profile')}
            onBookingsClick={() => handleSelect('reservation')}
            onExperiencesClick={() => handleSelect('experiences')}
            onBookingStatusClick={() => handleSelect('status')}
          />
        </div>

        <div className='hidden lg:block'>
          <CardsideBar
            variant='desktop'
            activePage={activePage}
            onProfileClick={() => handleSelect('profile')}
            onBookingsClick={() => handleSelect('reservation')}
            onExperiencesClick={() => handleSelect('experiences')}
            onBookingStatusClick={() => handleSelect('status')}
          />
        </div>
      </aside>

      <main className='min-w-0 flex-1'>
        {/* 모바일에서만 activePage 보여주기  */}
        {mobileOpen && <div className='block md:hidden'>{pageMap[activePage]}</div>}
        <div className='hidden md:flex md:flex-1'>{pageMap[activePage]}</div>
      </main>
    </div>
  );
}
