import Icons from '@/assets/icons';
import { type Notification } from '@/components/common/Header/types';

interface Props {
  notifications: Notification[];
  isOpen: boolean;
  onToggle: () => void;
}

export const HeaderNotification = ({ notifications, isOpen, onToggle }: Props) => {
  return (
    <div className='relative flex items-center gap-5'>
      <button
        onClick={onToggle}
        className='relative h-6 w-6 cursor-pointer rounded-full transition-colors'
        aria-label={`알림 ${notifications.length}개`}
        aria-expanded={isOpen}
        aria-haspopup='true'>
        <Icons.Bell className={isOpen ? 'text-primary-500' : 'text-gray-600 hover:text-gray-900'} />

        {notifications.length > 0 && (
          <span
            className='absolute top-1 right-1.5 h-2 w-2 rounded-full border border-white bg-red-500'
            aria-hidden='true'
          />
        )}
      </button>

      <div className='h-4 w-px bg-gray-100' />

      {isOpen && (
        <div
          className='absolute top-10 right-0 z-50 mt-2 w-80 rounded-lg bg-white shadow-[0_0_8px_rgba(0,0,0,0.1)] max-[744px]:right-auto max-[744px]:left-1/2 max-[744px]:-translate-x-1/2 sm:w-60'
          role='dialog'
          aria-label='알림 목록'
          aria-modal='true'>
          <div className='flex items-center justify-between border-b border-gray-100 px-4 py-3'>
            <span className='font-lg-bold'>알림 {notifications.length}개</span>
            <button
              onClick={onToggle}
              className='cursor-pointer transition-opacity hover:opacity-70'
              aria-label='알림창 닫기'>
              <Icons.Delete />
            </button>
          </div>

          <div className='max-h-60 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
            {notifications.length ? (
              <ul role='list'>
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className='hover:bg-primary-100 cursor-pointer border-b border-gray-50/80 px-4 py-3 transition-colors last:border-b-0'>
                    <p className='text-sm'>{n.message}</p>
                    <p className='mt-1 text-xs text-gray-500'>{n.time}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='px-4 py-8 text-center text-sm text-gray-500'>알림이 없습니다</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
