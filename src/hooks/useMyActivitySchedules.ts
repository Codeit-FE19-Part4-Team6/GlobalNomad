import { useQuery } from '@tanstack/react-query';
import { getMyActivitySchedules } from '@/apis/myActivitySchedules';
import type { MyActivitySchedulesResponse } from '@/apis/type';

type UseMyActivitySchedulesParams = {
  activityId?: number;
  year: string;
  month: string;
};

export const useMyActivitySchedules = ({
  activityId,
  year,
  month,
}: UseMyActivitySchedulesParams) => {
  return useQuery<MyActivitySchedulesResponse[], Error>({
    queryKey: ['myActivitySchedules', activityId, year, month],
    queryFn: () =>
      getMyActivitySchedules({
        activityId: activityId!,
        year,
        month,
      }),
    placeholderData: (prev) => prev,
    enabled: !!activityId,
  });
};
