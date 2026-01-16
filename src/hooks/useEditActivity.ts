import { useQuery } from '@tanstack/react-query'; //get요청 및 캐시관리
import type { ActivityDetailResponse } from '@/apis/type';
import { getActivityDetail } from '@/apis/activity';

//해당 액티비티 아이디로 체험 상세정보 가져오기, 체험이 없을 수도 있어서 undefined 허용
export const useGetActivityDetail = (activityId: number | undefined) => {
  return useQuery<ActivityDetailResponse>({
    queryKey: ['activityDetail', activityId], //activityDetatil , id 별로 캐시관리
    queryFn: () => getActivityDetail(activityId as number), //아이디가 있을때만 실행이므로 타입은 넘버
    enabled: !!activityId,
  });
};
