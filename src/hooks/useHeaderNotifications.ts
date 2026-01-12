// src/hooks/useHeaderNotifications.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import notificationApi from '@/apis/notification';
import type { MyNotification } from '@/apis/type';

interface UseHeaderNotificationsParams {
  isOpen: boolean;
}

export const useHeaderNotifications = ({ isOpen }: UseHeaderNotificationsParams) => {
  const [notifications, setNotifications] = useState<MyNotification[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [cursorId, setCursorId] = useState<number | undefined>();
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const observerTarget = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const latestNotificationIdRef = useRef<number | null>(null);

  // 초기 로드 완료 여부 추적
  const isInitialLoadDoneRef = useRef(false);

  /**
   * 최신 알림 polling (위에 추가)
   */
  const pollNewNotifications = useCallback(async () => {
    // 초기 로드 전에는 polling 하지 않음
    if (!isInitialLoadDoneRef.current) {
      return;
    }

    try {
      const response = await notificationApi.getNotifications(undefined, 10);

      setNotifications((prev) => {
        // 현재 목록의 모든 ID를 Set으로 관리
        const existingIds = new Set(prev.map((n) => n.id));

        // 1. 현재 목록에 없는 알림만 필터링
        // 2. 최신 ID보다 새로운 것만 필터링
        const newOnes = response.notifications.filter(
          (n) =>
            !existingIds.has(n.id) &&
            (!latestNotificationIdRef.current || n.id > latestNotificationIdRef.current)
        );

        if (newOnes.length > 0) {
          // 최신 ID 업데이트
          latestNotificationIdRef.current = Math.max(...newOnes.map((n) => n.id));
          // 새 알림을 위에 추가
          return [...newOnes, ...prev];
        }

        return prev;
      });

      setTotalCount(response.totalCount);
    } catch (error) {
      console.error('알림 polling 실패:', error);
    }
  }, []);

  /**
   * 과거 알림 로드 (아래에 추가) - infinite scroll용
   */
  const loadMoreNotifications = useCallback(async () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await notificationApi.getNotifications(cursorId, 10);

      setNotifications((prev) => {
        const existingIds = new Set(prev.map((n) => n.id));
        const newOnes = response.notifications.filter((n) => !existingIds.has(n.id));

        // 과거 알림은 아래에 추가
        return [...prev, ...newOnes];
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
    if (isInitialLoadDoneRef.current) {
      return;
    }

    const initialLoad = async () => {
      setIsLoading(true);
      try {
        const response = await notificationApi.getNotifications(undefined, 10);

        setNotifications(response.notifications);
        setTotalCount(response.totalCount);
        setCursorId(response.cursorId);

        // 최신 알림 ID 설정
        if (response.notifications.length > 0) {
          latestNotificationIdRef.current = response.notifications[0].id;
        }

        if (!response.cursorId || response.notifications.length === 0) {
          setHasMore(false);
        }

        isInitialLoadDoneRef.current = true;
      } catch (error) {
        console.error('초기 알림 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialLoad();
  }, []);

  /**
   * 60초 polling (최신 알림만)
   */
  useEffect(() => {
    const intervalId = setInterval(pollNewNotifications, 60000);
    return () => clearInterval(intervalId);
  }, [pollNewNotifications]);

  /**
   * IntersectionObserver 콜백
   */
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (!entries.length || !entries[0].isIntersecting) {
        return;
      }
      loadMoreNotifications();
    },
    [loadMoreNotifications]
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
