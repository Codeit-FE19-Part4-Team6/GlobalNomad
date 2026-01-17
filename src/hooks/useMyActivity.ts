import { useQuery } from '@tanstack/react-query';
import { getMyActivities } from '@/apis/myActivities';

export const useMyActivity = () => {
  return useQuery({
    queryKey: ['myActivities'],
    queryFn: () => getMyActivities({ size: 100 }),
    select: (data) => data.activities,
  });
};
