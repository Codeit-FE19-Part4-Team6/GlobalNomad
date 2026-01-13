import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardsideBar from '@/components/common/CardsideBar';
import BookingStatusPage from '@/pages/BookingStatusPage';
import MyExperiencesPage from '@/pages/MyExperiencesPage';
import MyProfilePage from '@/pages/MyProfilePage';
import ReservationPage from '@/pages/ReservationPage';
import { useProfileImageStore } from '@/stores/profileImageStore';
import { useAuthStore } from '@/stores/authStore';

type ActivePage = 'profile' | 'reservation' | 'experiences' | 'status';

export default function MyPageLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');

  const { user: myInfo, initialize } = useAuthStore();
  const { setProfileImageUrl } = useProfileImageStore();

  const activePage: ActivePage =
    tabParam === 'profile' ||
    tabParam === 'reservation' ||
    tabParam === 'experiences' ||
    tabParam === 'status'
      ? tabParam
      : 'reservation';

  const [mobileOpen, setMobileOpen] = useState<boolean>(() => !!tabParam);

  const handleSelect = (page: ActivePage) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', page);
    if (page !== 'reservation') {
      params.delete('status');
    }
    setSearchParams(params);
    setMobileOpen(true);
  };

  // AuthStore 초기화
  useEffect(() => {
    if (!myInfo) {
      initialize();
    }
  }, [initialize, myInfo]);

  // profileImageStore 초기화
  useEffect(() => {
    if (myInfo?.profileImageUrl) {
      setProfileImageUrl(myInfo.profileImageUrl);
    }
  }, [myInfo, setProfileImageUrl]);

  const pageMap: Record<ActivePage, React.ReactNode> = {
    profile: <MyProfilePage setMobileOpen={setMobileOpen} />,
    reservation: <ReservationPage setMobileOpen={setMobileOpen} />,
    experiences: <MyExperiencesPage setMobileOpen={setMobileOpen} />,
    status: <BookingStatusPage setMobileOpen={setMobileOpen} />,
  };

  return (
    <div className='mx-auto mb-3 flex min-h-[calc(100vh-140px)] w-full max-w-300 flex-col justify-center px-6 md:flex-row md:items-start md:gap-7.5 md:px-7.5 lg:justify-between'>
      <aside
        className={`md:sticky md:top-30 md:w-auto md:shrink-0 ${mobileOpen ? 'hidden md:block' : 'block'}`}>
        <div className='block md:hidden'>
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
        {mobileOpen && <div className='block md:hidden'>{pageMap[activePage]}</div>}
        <div className='hidden md:flex md:flex-1'>{pageMap[activePage]}</div>
      </main>
    </div>
  );
}
