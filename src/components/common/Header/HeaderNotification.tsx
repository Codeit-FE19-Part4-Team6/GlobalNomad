import Icons from '@/assets/icons';
import { type Notification } from '@/components/common/Header/types';
import { useState } from 'react';

interface Props {
  notifications: Notification[];
  isOpen: boolean;
  onToggle: () => void;
  onDeleteNotification?: (id: number) => void;
}

export const HeaderNotification = ({
  notifications,
  isOpen,
  onToggle,
  onDeleteNotification,
}: Props) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // 클릭 이벤트 버블링 방지
    onDeleteNotification?.(id);
  };

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
          <div className='flex items-center justify-between border-b border-gray-100 px-4 py-4'>
            <span className='font-lg-bold'>알림 {notifications.length}개</span>
            <button
              onClick={onToggle}
              className='cursor-pointer transition-opacity hover:opacity-50'
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
                    onMouseEnter={() => setHoveredId(n.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className='hover:bg-primary-100 cursor-pointer border-b border-gray-50/80 px-4 py-5 transition-colors last:border-b-0'>
                    <div className='flex flex-col gap-2'>
                      <div className='flex items-start'>
                        {/* 왼쪽 텍스트 */}
                        <span className='font-md-bold text-gray-950'>
                          예약 {n.status === 'approved' ? '승인' : '거절'}
                        </span>

                        {/* 오른쪽 영역 (time + delete 공간 고정) */}
                        <div className='relative ml-auto flex w-16 justify-end'>
                          <span className='font-xs-medium absolute right-4 mt-1 text-gray-400'>
                            {n.time}
                          </span>
                          {onDeleteNotification && (
                            <button
                              onClick={(e) => handleDelete(e, n.id)}
                              className={`hover:text-primary-500 absolute top-[0.6] left-13 cursor-pointer transition-opacity ${hoveredId === n.id ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                              aria-label={`알림 삭제: ${n.title}`}>
                              <Icons.Delete className='h-5 w-5' />
                            </button>
                          )}
                        </div>
                      </div>

                      <p className='font-md-medium leading-[1.2] text-gray-800'>{n.title}</p>
                      <p className='font-md-medium leading-[1.2] text-gray-800'>
                        ({n.reservationTime})
                      </p>
                      <p className='font-md-medium mt-0.5 leading-[1.2] text-gray-800'>
                        예약이{' '}
                        <span
                          className={n.status === 'approved' ? 'text-primary-500' : 'text-red-500'}>
                          {n.status === 'approved' ? '승인' : '거절'}
                        </span>
                        되었어요.
                      </p>
                    </div>
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
