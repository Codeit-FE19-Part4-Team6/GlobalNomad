import { Bell, Delete } from '@/assets/icons';
import NotificationContent from '@/components/common/Header/NotificationContent';
import { getTimeAgo } from '@/utils/timeUtils';
import { useHeaderNotifications } from '@/hooks/useHeaderNotifications';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const HeaderNotification = ({ isOpen, onToggle }: Props) => {
  const {
    notifications,
    hoveredId,
    setHoveredId,
    observerTarget,
    isLoading,
    hasMore,
    totalCount,
    deleteNotification,
  } = useHeaderNotifications({ isOpen });

  return (
    <div className='relative flex items-center gap-5'>
      <button
        onClick={onToggle}
        className='relative h-6 w-6 cursor-pointer rounded-full transition-colors'
        aria-label={`알림 ${totalCount}개`}
        aria-expanded={isOpen}
        aria-haspopup='true'>
        <Bell className={isOpen ? 'text-primary-500' : 'text-gray-600 hover:text-gray-900'} />

        {totalCount > 0 && (
          <span
            className='absolute top-1 right-1.5 h-2 w-2 rounded-full border border-white bg-red-500'
            aria-hidden='true'
          />
        )}
      </button>

      <div className='h-4 w-px bg-gray-100' />

      {isOpen && (
        <div
          className='absolute top-10 right-0 z-50 mt-2 w-80 overflow-hidden rounded-lg bg-white shadow-[0_0_8px_rgba(0,0,0,0.1)] max-[744px]:right-auto max-[744px]:left-1/2 max-[744px]:-translate-x-1/2 sm:w-60'
          role='dialog'
          aria-label='알림 목록'
          aria-modal='true'>
          <div className='flex items-center justify-between border-b border-gray-100 px-4 py-4'>
            <span className='font-lg-bold'>알림 {totalCount}개</span>
            <button
              onClick={onToggle}
              className='cursor-pointer transition-opacity hover:opacity-50'
              aria-label='알림창 닫기'>
              <Delete />
            </button>
          </div>

          <div className='max-h-60 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
            {notifications.length > 0 ? (
              <ul role='list'>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    onMouseEnter={() => setHoveredId(notification.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className='hover:bg-primary-100 cursor-pointer border-b border-gray-50/80 px-4 py-5 transition-colors last:border-b-0'>
                    <div className='flex flex-col gap-2'>
                      <div className='flex items-start justify-between'>
                        {/* 알림 내용 */}
                        <div className='flex-1'>
                          <NotificationContent content={notification.content} />
                        </div>

                        {/* 오른쪽 영역 (시간 + 삭제 버튼) */}
                        <div className='relative flex flex-col items-end gap-2'>
                          <span className='font-xs-medium whitespace-nowrap text-gray-400'>
                            {getTimeAgo(notification.createdAt)}
                          </span>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className={`hover:text-primary-500 absolute top-5 left-4 cursor-pointer transition-opacity ${
                              hoveredId === notification.id
                                ? 'opacity-100'
                                : 'pointer-events-none opacity-0'
                            }`}
                            aria-label='알림 삭제'>
                            <Delete className='h-5 w-5' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                {/* IntersectionObserver 타겟 */}
                {hasMore && (
                  <div ref={observerTarget} className='flex h-16 items-center justify-center'>
                    {isLoading && <div className='text-sm text-gray-500'>로딩 중...</div>}
                  </div>
                )}
              </ul>
            ) : (
              <div className='px-4 py-8 text-center text-sm text-gray-500'>
                {isLoading ? '로딩 중...' : '알림이 없습니다'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
