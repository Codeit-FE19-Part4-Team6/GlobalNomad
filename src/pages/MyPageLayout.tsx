import CardsideBar from '@/components/common/CardsideBar';
import BookingStatusPage from '@/pages/BookingStatusPage';
import MyExperiencesPage from '@/pages/MyExperiencesPage';
import MyProfilePage from '@/pages/MyProfilePage';
import ReservationPage from '@/pages/ReservationPage';
import { useState } from 'react';

type ActivePage = 'profile' | 'bookings' | 'experiences' | 'status';

/**
 *  MyPageLayout
 *
 * - 좌측: CardsideBar (mobile / tablet / desktop 반응형)
 * - 우측: 선택된 페이지 컨텐츠 영역
 * - activePage: 현재 선택된 페이지 (profile | bookings | experiences | status)
 * - mobileOpen: 모바일에서 사이드바 -> 컨텐츠 전환 여부
 */
export default function MyPageLayout() {
  const [activePage, setActivePage] = useState<ActivePage>('bookings');
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleMobileSelect = (page: ActivePage) => {
    setActivePage(page);
    setMobileOpen(true);
  };

  const handleSelect = (page: ActivePage) => {
    setActivePage(page);
  };

  const pageMap: Record<ActivePage, React.ReactNode> = {
    profile: <MyProfilePage setMobileOpen={setMobileOpen} />,
    bookings: <ReservationPage setMobileOpen={setMobileOpen} />,
    experiences: <MyExperiencesPage setMobileOpen={setMobileOpen} />,
    status: <BookingStatusPage setMobileOpen={setMobileOpen} />,
  };

  return (
    <div className='flex flex-col px-6 md:flex-row md:items-start md:gap-7.5 md:px-7.5 lg:justify-between'>
      <aside
        className={`md:sticky md:top-30 md:w-auto md:shrink-0 ${mobileOpen ? 'hidden md:block' : 'block'}`}>
        <div className='mb-3 block md:hidden'>
          <CardsideBar
            variant='mobile'
            activePage={activePage}
            onProfileClick={() => handleMobileSelect('profile')}
            onBookingsClick={() => handleMobileSelect('bookings')}
            onExperiencesClick={() => handleMobileSelect('experiences')}
            onBookingStatusClick={() => handleMobileSelect('status')}
          />
        </div>
        <div className='hidden md:block lg:hidden'>
          <CardsideBar
            variant='tablet'
            activePage={activePage}
            onProfileClick={() => handleSelect('profile')}
            onBookingsClick={() => handleSelect('bookings')}
            onExperiencesClick={() => handleSelect('experiences')}
            onBookingStatusClick={() => handleSelect('status')}
          />
        </div>
        <div className='hidden lg:block'>
          <CardsideBar
            variant='desktop'
            activePage={activePage}
            onProfileClick={() => handleSelect('profile')}
            onBookingsClick={() => handleSelect('bookings')}
            onExperiencesClick={() => handleSelect('experiences')}
            onBookingStatusClick={() => handleSelect('status')}
          />
        </div>
      </aside>
      <main className='min-w-0 flex-1'>
        {mobileOpen && <div className='block md:hidden'>{pageMap[activePage]}</div>}
        <div className='hidden md:flex md:flex-1'>{pageMap[activePage]}</div>
      </main>
    </div>
  );
}
