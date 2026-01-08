import { useQuery } from '@tanstack/react-query';
import { getActivityDetail } from '@/apis/activity';

export const useActivityDetail = (activityId: number) => {
  return useQuery({
    queryKey: ['activityDetail', activityId],
    queryFn: () => getActivityDetail(activityId),
    enabled: !!activityId, // activityId가 있을 때만 쿼리 실행
  });
};
