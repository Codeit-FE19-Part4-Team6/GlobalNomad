import { useMutation } from '@tanstack/react-query';
import type { CreateActivityRequest } from '@/apis/type';
import { createActivity } from '@/apis/activity';

export const useCreateActivity = () => {
  return useMutation({
    //CreateActivityRequest 타입의 payload를 createActivity 함수에 전달해서 실행시킨다.
    mutationFn: (payload: CreateActivityRequest) => createActivity(payload),
  });
};
