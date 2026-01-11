import { useQuery } from '@tanstack/react-query';
import { getActivities } from '@/apis/activity';
import type { ActivityRequest } from '@/apis/type';

export const useActivities = (params: ActivityRequest) => {
  return useQuery({
    queryKey: ['activities', params],
    queryFn: () => getActivities(params),
  });
};
