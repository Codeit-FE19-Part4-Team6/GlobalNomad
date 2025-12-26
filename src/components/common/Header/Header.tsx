import { useState } from 'react';

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

export const Header = ({ userName, notifications = [], onLogin, onSignUp }: Props) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const isLoggedIn = !!userName;

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
        <div
          className='fixed inset-0 z-40'
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </header>
  );
};
