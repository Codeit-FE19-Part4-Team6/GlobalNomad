import { useQuery } from '@tanstack/react-query';
import { getActivityReviews } from '@/apis/activity';

export const useActivityReviews = (activityId: number, page: number = 1, size: number = 3) => {
  return useQuery({
    queryKey: ['activityReviews', activityId, page, size],
    queryFn: () => getActivityReviews({ activityId, page, size }),
    enabled: !!activityId,
  });
};
