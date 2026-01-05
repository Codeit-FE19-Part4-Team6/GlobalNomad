import { useQuery } from '@tanstack/react-query';
import { getMyActivities } from '@/apis/myActivities';
import type { Activity } from '@/apis/type';
/**
 * 내 체험 목록 조회 훅
 *
 * React Query의 useQuery를 사용하여 내 체험 데이터를 가져옵니다.
 * 반환 타입은 Activity[]이며, 에러 발생 시 Error 타입을 반환합니다.
 */
export const useMyActivities = () => {
  return useQuery<Activity[], Error>({
    queryKey: ['myActivities'],
    queryFn: async () => {
      const data = await getMyActivities();
      return data.activities;
    },
    staleTime: 1000 * 60,
  });
};
