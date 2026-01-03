import { deleteMyActivity } from '@/apis/myActivities';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UseDeleteMyActivityProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useDeleteMyActivity = ({ onSuccess, onError }: UseDeleteMyActivityProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: number) => deleteMyActivity({ activityId }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myExperiences'],
      });
      onSuccess?.();
    },

    onError: () => {
      onError?.();
    },
  });
};
