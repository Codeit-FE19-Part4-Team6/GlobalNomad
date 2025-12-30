import { useMutation } from '@tanstack/react-query';
import { createActivity } from '@/api/activity';
import type { createdActivityRequest } from '@/types/activityRequest';

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: (payload: createdActivityRequest) => createActivity(payload),
  });
};
