import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CardsideBar from '@/components/common/CardsideBar';
import type { ActivePage } from '@/types/mypage';

/**
 * MyPageLayout (라우터 기반)
 *
 * - 좌측: CardsideBar
 * - 우측: <Outlet />
 * - URL 기준으로 activePage 계산
 */
export default function MyPageLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * URL 기준 현재 페이지 판별
   * /mypage/profile → profile
   * /mypage/reservation → reservation
   * /mypage → reservation (기본값)
   */
  const path = location.pathname.split('/')[2];

  const activePage: ActivePage =
    path === 'profile' || path === 'reservation' || path === 'experiences' || path === 'status'
      ? path
      : 'reservation';

  const handleSelect = (page: ActivePage) => {
    navigate(`/mypage/${page}`);
    setMobileOpen(true);
  };

  return (
    <div className='flex flex-col px-6 md:flex-row md:items-start md:gap-7.5 md:px-7.5 lg:justify-between'>
      <aside
        className={`md:sticky md:top-30 md:w-auto md:shrink-0 ${
          mobileOpen ? 'hidden md:block' : 'block'
        }`}>
        {/* mobile */}
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

        {/* tablet */}
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

        {/* desktop */}
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
        <div className='hidden md:block'>
          <Outlet context={{ setMobileOpen }} />
        </div>

        {mobileOpen && (
          <div className='block md:hidden'>
            <Outlet context={{ setMobileOpen }} />
          </div>
        )}
      </main>
    </div>
  );
}
