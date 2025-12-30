import { useMutation } from '@tanstack/react-query';
import activityApi from '@/apis/activity';
import type { CreateActivityRequest } from '@/apis/type';

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: (payload: CreateActivityRequest) => activityApi.createActivity(payload),
  });
};
