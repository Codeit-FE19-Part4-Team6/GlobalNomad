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
    alert('로그아웃');
    onClose();
  };

  const handleMyPage = () => {
    alert('마이페이지 이동');
    onClose();
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      alert('로그인 페이지로 이동');
    }
    onClose();
  };
  const handleSignUp = () => {
    if (onSignUp) {
      onSignUp();
    } else {
      alert('로그인 페이지로 이동');
    }
    onClose();
  };

  // 로그인하지 않은 경우
  if (!isLoggedIn) {
    return (
      <div className='relative'>
        <button onClick={handleLogin} className='font-md-medium rounded-lg px-4 py-2 text-gray-950'>
          로그인
        </button>
        <button
          onClick={handleSignUp}
          className='font-md-medium hover:bg-primary-50 rounded-lg px-4 py-2 text-gray-950'>
          회원가입
        </button>
      </div>
    );
  }

  // 로그인한 경우
  return (
    <div className='relative'>
      <button onClick={onToggle} className='flex items-center space-x-2 rounded-lg px-1 py-2'>
        <Avatar className='h-7.5 w-7.5' />
        <span className='font-md-medium text-gray-950'>{userName}</span>
        <Icons.Down className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 overflow-hidden rounded-lg bg-white shadow-[0_0_8px_rgba(0,0,0,0.1)] transition-shadow duration-200'>
          <button
            onClick={handleMyPage}
            className='flex w-full items-center space-x-2 px-4 py-3 text-left text-sm hover:bg-gray-50'>
            <Avatar className='h-6 w-6' />
            <span>마이페이지</span>
          </button>

          <button
            onClick={handleLogout}
            className='flex w-full items-center space-x-2 border-t border-gray-100 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50'>
            <LogOut className='h-4 w-4' />
            <span>로그아웃</span>
          </button>
        </div>
      )}
    </div>
  );
};
