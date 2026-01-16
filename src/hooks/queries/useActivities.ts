import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getActivities } from '@/apis/activity';
import type { ActivityRequest } from '@/apis/type';

export const useActivities = (params: ActivityRequest) => {
  return useQuery({
    queryKey: ['activities', params],
    queryFn: () => getActivities(params),
    // 파라미터 변경 시 이전 데이터를 유지하여 깜빡임 방지
    placeholderData: keepPreviousData,
  });
};
