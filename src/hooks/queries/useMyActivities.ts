import { useQuery } from '@tanstack/react-query';
import type { Activity, MyActivitiesResponse } from '@/apis/type';
import { getMyActivities } from '@/apis/myActivities';

/**
 * 내 체험 목록 조회 훅
 *
 * API 준비 전에는 enabled: false + mock 사용
 * API 연결 시 enabled: true 로 전환
 */
export function useMyActivities() {
  return useQuery<MyActivitiesResponse, Error, Activity[]>({
    queryKey: ['myExperiences'],
    queryFn: getMyActivities,
    select: (data) => data.activities,
    // API 준비 전에는 false
    enabled: false,
  });
}
