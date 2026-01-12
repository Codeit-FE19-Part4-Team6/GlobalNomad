import { Bell, Delete } from '@/assets/icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import notificationApi from '@/apis/notification';
import type { MyNotification } from '@/apis/type';
import NotificationContent from '@/components/common/Header/NotificationContent';
import { getTimeAgo } from '@/utils/timeUtils';

interface Props {
  isOpen: boolean; /** 알림 드롭다운 열림 여부 */
  onToggle: () => void;
}

export const HeaderNotification = ({ isOpen, onToggle }: Props) => {
  const [notifications, setNotifications] = useState<MyNotification[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  /** 다음 페이지를 요청하기 위한 커서 ID */
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true); /** 더 불러올 데이터가 있는지 여부 */
  const [isLoading, setIsLoading] = useState(false); /** 알림 로딩 중 여부 (중복 호출 방지) */
  const [totalCount, setTotalCount] = useState(0);

  const observerTarget = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 알림 데이터 로드
  const loadNotifications = useCallback(async () => {
    if (isLoading || !hasMore) {
      return;
    }
    try {
      setIsLoading(true);
      // 서버에 알림 목록 요청 (cursorId 기준으로 다음 페이지 조회)
      const response = await notificationApi.getNotifications(cursorId, 10);
      /**
       * 기존 알림과 새 알림을 병합
       * - 중복 ID 제거 (Observer가 여러 번 호출될 수 있기 때문)
       */
      setNotifications((prev) => {
        const existingIds = new Set(prev.map((n) => n.id));
        const newNotifications = response.notifications.filter((n) => !existingIds.has(n.id));
        return [...prev, ...newNotifications];
      });
      /** 전체 알림 개수 업데이트 */
      setTotalCount(response.totalCount);
      /** 다음 요청을 위한 커서 ID 저장 */
      setCursorId(response.cursorId);

      /**
       * 서버에서 더 이상 내려올 데이터가 없을 경우
       * → 무한 스크롤 중단
       */
      const shouldStop =
        response.notifications.length === 0 ||
        response.cursorId === null ||
        response.cursorId === undefined;

      if (shouldStop) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('알림 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cursorId]);

  //초기 데이터 로드
  useEffect(() => {
    if (notifications.length === 0 && !isLoading && hasMore) {
      loadNotifications();
    }
  }, []);

  /**
   * IntersectionObserver 설정
   *
   * - 드롭다운이 열려 있을 때만 활성화
   * - observerTarget이 화면에 들어오면 다음 페이지 로드
   */
  useEffect(() => {
    if (!isOpen || isLoading || !hasMore) {
      return;
    }
    const options = {
      root: null,
      rootMargin: '20px', // 바닥 근처에서 미리 감지
      threshold: 0.1, // 10%만 보여도 트리거
    };
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        // 타겟이 화면에 들어오면 알림 추가 로드
        loadNotifications();
      }
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    if (observerTarget.current) {
      observerRef.current.observe(observerTarget.current);
    }
    // 컴포넌트 언마운트 또는 조건 변경 시 observer 정리
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isOpen, isLoading, loadNotifications, hasMore]);

  // 알림 삭제
  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    try {
      await notificationApi.deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setTotalCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('알림 삭제 실패:', error);
    }
  };

  /**
   * 알림 버튼 토글 핸들러
   */
  const handleToggle = () => {
    onToggle();
  };

  return (
    <div className='relative flex items-center gap-5'>
      <button
        onClick={handleToggle}
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
              onClick={handleToggle}
              className='cursor-pointer transition-opacity hover:opacity-50'
              aria-label='알림창 닫기'>
              <Delete className='h-2.5 w-2.5' />
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
                        <div className='relative'>
                          <span className='font-xs-medium absolute right-0 whitespace-nowrap text-gray-400'>
                            {getTimeAgo(notification.createdAt)}
                          </span>
                          <button
                            onClick={(e) => handleDelete(e, notification.id)}
                            className={`hover:text-primary-500 absolute top-5 right-0 cursor-pointer transition-opacity ${
                              hoveredId === notification.id
                                ? 'opacity-100'
                                : 'pointer-events-none opacity-0'
                            }`}
                            aria-label='알림 삭제'>
                            <Delete className='mt-2 h-2.5 w-2.5' />
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
