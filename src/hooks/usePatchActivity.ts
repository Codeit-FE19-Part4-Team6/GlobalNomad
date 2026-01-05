import { useMutation, useQueryClient } from '@tanstack/react-query'; //서버에 get이외에 데이터 변경 요청 및 캐시 무효화
import type { MyActivityEditRequest } from '@/apis/type'; //패치요청할 때 타입
import { patchActivity } from '@/apis/activity'; //패치요청 함수

export const usePatchActivity = (activityId: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: MyActivityEditRequest) => patchActivity(activityId, payload),
    onSuccess: () => {
      //해당 아이디에 체험 캐시 무효화
      qc.invalidateQueries({ queryKey: ['activityDetail', activityId] });
      //내 체험목록 캐시 무효화
      qc.invalidateQueries({ queryKey: ['myActivities'] });
    },
  });
};
