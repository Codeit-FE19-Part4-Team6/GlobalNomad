import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateActivityRequest } from '@/apis/type';
import { createActivity } from '@/apis/activity';

export const useCreateActivity = () => {
  const qc = useQueryClient();
  return useMutation({
    //CreateActivityRequest 타입의 payload를 createActivity 함수에 전달해서 실행시킨다.
    mutationFn: (payload: CreateActivityRequest) => createActivity(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: ['myActivities'], // ⚠️ 목록 페이지에서 쓰는 queryKey와 반드시 동일해야 함
      });
    },
  });
};
