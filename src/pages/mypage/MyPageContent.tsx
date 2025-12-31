import BookingStatusPage from '@/pages/BookingStatusPage';
import MyExperiencesPage from '@/pages/MyExperiencesPage';
import MyProfilePage from '@/pages/MyProfilePage';
import ReservationPage from '@/pages/ReservationPage';

// Props 타입 정의
// - activePage: 현재 활성화된 페이지 ('profile' | 'reservation' | 'experiences' | 'status')
// - setMobileOpen: 모바일에서 사이드바 열림/닫힘 상태를 제어하는 함수
type Props = {
  activePage: 'profile' | 'reservation' | 'experiences' | 'status';
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// MyPageContent 컴포넌트
// - activePage 값에 따라 보여줄 페이지 컴포넌트를 결정
// - 각 페이지에 모바일에서 사이드바를 닫을 수 있도록 setMobileOpen 함수를 전달
export default function MyPageContent({ activePage, setMobileOpen }: Props) {
  switch (activePage) {
    case 'profile':
      return <MyProfilePage setMobileOpen={setMobileOpen} />;
    case 'experiences':
      return <MyExperiencesPage setMobileOpen={setMobileOpen} />;
    case 'status':
      return <BookingStatusPage setMobileOpen={setMobileOpen} />;
    case 'reservation':
    default:
      return <ReservationPage setMobileOpen={setMobileOpen} />;
  }
}
