// src/hooks/useHeaderNotifications.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import notificationApi from '@/apis/notification';
import type { MyNotification } from '@/apis/type';

interface UseHeaderNotificationsParams {
  isOpen: boolean;
}

export const useHeaderNotifications = ({ isOpen }: UseHeaderNotificationsParams) => {
  /** 알림 목록 */
  const [notifications, setNotifications] = useState<MyNotification[]>([]);
  /** hover 상태 (삭제 버튼 표시용) */
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  /** pagination cursor */
  const [cursorId, setCursorId] = useState<number | undefined>();
  /** 더 불러올 데이터 존재 여부 */
  const [hasMore, setHasMore] = useState(true);
  /** 로딩 중 여부 */
  const [isLoading, setIsLoading] = useState(false);
  /** 전체 알림 개수 */
  const [totalCount, setTotalCount] = useState(0);

  /** IntersectionObserver target */
  const observerTarget = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * 알림 목록 로드
   */
  const loadNotifications = useCallback(async () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await notificationApi.getNotifications(cursorId, 10);

      setNotifications((prev) => {
        const ids = new Set(prev.map((n) => n.id));
        return [...prev, ...response.notifications.filter((n) => !ids.has(n.id))];
      });

      setTotalCount(response.totalCount);
      setCursorId(response.cursorId);

      if (!response.cursorId || response.notifications.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('알림 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cursorId, isLoading, hasMore]);

  /**
   * 최초 1회 로딩
   */
  useEffect(() => {
    if (notifications.length === 0 && hasMore && !isLoading) {
      loadNotifications();
    }
  }, []);

  /**
   * 60초 polling
   */
  setInterval(() => {
    loadNotifications();
  }, 60000);

  /**
   * IntersectionObserver 콜백
   */
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (!entries.length || !entries[0].isIntersecting) {
        return;
      }
      loadNotifications();
    },
    [loadNotifications]
  );

  /**
   * 드롭다운 열릴 때만 observer 활성화
   */
  useEffect(() => {
    if (!isOpen || !hasMore) {
      return;
    }

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    });

    const target = observerTarget.current;
    if (target) {
      observerRef.current.observe(target);
    }

    return () => observerRef.current?.disconnect();
  }, [isOpen, hasMore, handleObserver]);

  /**
   * 알림 삭제
   */
  const deleteNotification = async (id: number) => {
    try {
      await notificationApi.deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setTotalCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('알림 삭제 실패:', error);
    }
  };

  return {
    notifications,
    hoveredId,
    setHoveredId,
    observerTarget,
    isLoading,
    hasMore,
    totalCount,
    deleteNotification,
  };
};
