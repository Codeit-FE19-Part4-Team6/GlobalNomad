import { useMutation } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import activityApi from '@/apis/activity';
import type { CreateActivityRequest } from '@/apis/type';

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: (payload: CreateActivityRequest) =>
      activityApi.createActivity(payload),
  });
};
import type { createdActivityRequest } from '@/types/activityRequest';

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: (payload: createdActivityRequest) => createActivity(payload),
  });
};
