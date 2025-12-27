import Icons from '@/assets/icons';
import Avatar from '@/components/Avatar';
import { LogOut } from 'lucide-react';

interface Props {
  userName?: string; // optional로 변경
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onLogin?: () => void;
  onSignUp?: () => void;
}

export const HeaderUserMenu = ({
  userName,
  isOpen,
  onToggle,
  onClose,
  onLogin,
  onSignUp,
}: Props) => {
  const isLoggedIn = !!userName; // userName이 있으면 로그인 상태

  const handleLogout = () => {
    // TODO: 로그아웃 API 호출 및 관련 로직 구현
    console.log('로그아웃 처리');
    onClose();
  };

  const handleMyPage = () => {
    // TODO: 마이페이지로 이동하는 라우팅 로직 구현
    console.log('마이페이지로 이동');
    onClose();
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      // onLogin prop이 전달되지 않았을 경우의 처리.
      // 개발 환경에서만 경고를 표시하거나, 기본 동작을 정의할 수 있습니다.
      console.warn('onLogin prop이 제공되지 않았습니다.');
    }
    onClose();
  };
  const handleSignUp = () => {
    if (onSignUp) {
      onSignUp();
    } else {
      // onSignUp prop이 전달되지 않았을 경우의 처리.
      console.warn('onSignUp prop이 제공되지 않았습니다.');
    }
    onClose();
  };

  // 로그인하지 않은 경우
  if (!isLoggedIn) {
    return (
      <div className='relative'>
        <button
          onClick={handleLogin}
          className='font-md-medium hover:text-primary-500 cursor-pointer rounded-lg px-4 py-2 text-gray-950'>
          로그인
        </button>
        <button
          onClick={handleSignUp}
          className='font-md-medium hover:text-primary-500 cursor-pointer rounded-lg px-4 py-2 text-gray-950'>
          회원가입
        </button>
      </div>
    );
  }

  // 로그인한 경우
  return (
    <div className='relative'>
      <button
        onClick={onToggle}
        className='flex cursor-pointer items-center space-x-2 rounded-lg px-1 py-2'
        aria-expanded={isOpen}
        aria-haspopup='true'>
        <Avatar />
        <span className='font-md-medium text-gray-950'>{userName}</span>
        <Icons.Down className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className='absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg bg-white text-gray-950 shadow-[0_0_8px_rgba(0,0,0,0.1)] transition-shadow duration-200'>
          <button
            onClick={handleMyPage}
            className='hover:bg-primary-100 font-sm-medium flex w-full cursor-pointer items-center space-x-2 px-4 py-3 text-left'>
            <Icons.User className='h-4 w-4' />
            <span>마이페이지</span>
          </button>

          <button
            onClick={handleLogout}
            className='hover:bg-primary-100 font-sm-medium flex w-full cursor-pointer items-center space-x-2 border-t border-gray-100 px-4 py-3 text-left'>
            <LogOut className='h-4 w-4' />
            <span>로그아웃</span>
          </button>
        </div>
      )}
    </div>
  );
};
