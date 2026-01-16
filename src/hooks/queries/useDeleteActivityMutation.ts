import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMyActivity } from '@/apis/myActivities';
import { useSnackBar } from '@/providers/SnackBarProvider';
import type { MyActivitiesResponse } from '@/apis/type';

export const useDeleteActivityMutation = (onClose?: () => void, onResetId?: () => void) => {
  const queryClient = useQueryClient();
  const { showSnack } = useSnackBar();

  return useMutation({
    mutationFn: (activityId: number) => deleteMyActivity({ activityId }),
    onSuccess: (_, activityId) => {
      // 무한 스크롤 캐시에서 제거
      queryClient.setQueryData<{ pages: MyActivitiesResponse[]; pageParams: unknown[] }>(
        ['myActivitiesInfinite'],
        (oldData) => {
          if (!oldData) {
            return oldData;
          }
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              activities: page.activities.filter((a) => a.id !== activityId),
            })),
          };
        }
      );
      onClose?.();
      onResetId?.();
      showSnack('체험이 삭제되었습니다.', 'success');
    },
    onError: () => {
      showSnack('체험 삭제에 실패했습니다. 다시 시도해주세요.', 'error');
    },
  });
};
