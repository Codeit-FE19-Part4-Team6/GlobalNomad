import { useInfiniteQuery } from '@tanstack/react-query';
import type { MyActivitiesResponse } from '@/apis/type';
import { getMyActivities } from '@/apis/myActivities';

const SIZE = 6;
/**
 * 내 체험 목록 조회 무한 스크롤 훅
 *
 * React Query의 useInfiniteQuery를 사용하여
 * 내 체험 목록을 무한 스크롤 형태로 가져옵니다.
 */
export const useMyActivitiesInfinite = () => {
  return useInfiniteQuery({
    queryKey: ['myActivitiesInfinite'],
    initialPageParam: 0,
    refetchOnMount: 'always',
    queryFn: ({ pageParam = 0 }) => {
      const params = pageParam ? { cursorId: pageParam, size: SIZE } : { size: SIZE };
      return getMyActivities(params);
    },
    getNextPageParam: (lastPage: MyActivitiesResponse) => {
      if (lastPage.activities.length < SIZE) {
        return undefined;
      }
      return lastPage.activities[lastPage.activities.length - 1].id;
    },
  });
};
