import { getReservedSchedule } from '@/apis/getReservedSchedule';
import type { MyActivitySchedule } from '@/apis/type';
import { useQuery } from '@tanstack/react-query';

export function useReservedSchedule(activityId?: number, date?: string, open?: boolean) {
  return useQuery<MyActivitySchedule[]>({
    queryKey: ['reservedSchedule', activityId, date],
    queryFn: () => getReservedSchedule(activityId!, date!),
    enabled: Boolean(open && activityId && date),
  });
}
