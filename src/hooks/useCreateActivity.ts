import { useMutation } from '@tanstack/react-query';
import type { CreateActivityRequest } from '@/apis/type';
import { createActivity } from '@/apis/activity';

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: (payload: CreateActivityRequest) => createActivity(payload),
  });
};
