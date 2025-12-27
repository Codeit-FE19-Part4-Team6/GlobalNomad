import { useEffect, useState } from 'react';

import { Logo } from '@/components/common/Logo';
import { HeaderNotification } from '@/components/common/Header/HeaderNotification';
import { HeaderUserMenu } from '@/components/common/Header/HeaderUserMenu';
import { type Notification } from '@/components/common/Header/types';

interface Props {
  userName?: string;
  notifications?: Notification[];
  onLogin?: () => void;
  onSignUp?: () => void;
}

/**
 * Header 컴포넌트
 *
 * 앱 상단에 고정되는 글로벌 헤더 레이아웃입니다.
 * 로고, 알림 영역, 사용자 메뉴를 포함하며
 * 로그인 상태에 따라 노출되는 UI가 달라집니다.
 *
 * @remarks
 * - 로그인 상태(userName 존재):
 *   - 알림 아이콘 노출
 *   - 사용자 메뉴 드롭다운 사용 가능
 *
 * - 비로그인 상태:
 *   - 알림 영역 숨김
 *   - 로그인 / 회원가입 버튼 노출
 *
 * - 알림 드롭다운과 사용자 메뉴는 동시에 열릴 수 없습니다.
 * - 드롭다운이 열려 있을 경우, 배경 클릭 시 모두 닫힙니다.
 *
 * @example
 * ```tsx
 * <Header
 *   userName={user?.name}
 *   notifications={notifications}
 *   onLogin={() => navigate('/login')}
 *   onSignUp={() => navigate('/signup')}
 * />
 * ```
 */

// 개발용 mock 데이터
const MOCK_USER_NAME = '홍길동';
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    status: 'rejected',
    time: '5분 전',
    title: '함께하면 즐거운 스트릿 댄스',
    reservationTime: '2024-07-10 14:00~16:00',
  },
  {
    id: 2,
    status: 'approved',
    time: '30분 전',
    title: '함께하면 즐거운 스트릿 댄스',
    reservationTime: '2024-07-12 10:00~11:00',
  },
  {
    id: 3,
    status: 'approved',
    time: '1시간 전',
    title: '함께하면 즐거운 스트릿 댄스',
    reservationTime: '2024-07-15 16:00~18:00',
  },
];

export const Header = ({
  userName = MOCK_USER_NAME,
  notifications: initialNotifications = MOCK_NOTIFICATIONS,
  onLogin,
  onSignUp,
}: Props) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const isLoggedIn = !!userName;

  const handleCloseAllDropdowns = () => {
    setIsUserMenuOpen(false);
    setIsNotificationOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseAllDropdowns();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // 알림 삭제 핸들러
  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    // TODO: 실제 API 호출로 서버에서도 삭제
  };

  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='mx-auto max-w-[1520px] px-6 py-[10px] sm:py-[26px]'>
        <div className='flex h-16 items-center justify-between'>
          <Logo />
          <div className='flex items-center space-x-4'>
            {/* 로그인 상태일 때만 알림 표시 */}
            {isLoggedIn && (
              <HeaderNotification
                notifications={notifications}
                isOpen={isNotificationOpen}
                onToggle={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsUserMenuOpen(false);
                }}
                onDeleteNotification={handleDeleteNotification}
              />
            )}

            <HeaderUserMenu
              userName={userName}
              isOpen={isUserMenuOpen}
              onToggle={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                setIsNotificationOpen(false);
              }}
              onClose={() => setIsUserMenuOpen(false)}
              onLogin={onLogin}
              onSignUp={onSignUp}
            />
          </div>
        </div>
      </div>

      {(isUserMenuOpen || isNotificationOpen) && (
        <div className='fixed inset-0 z-40' onClick={handleCloseAllDropdowns} />
      )}
    </header>
  );
};
