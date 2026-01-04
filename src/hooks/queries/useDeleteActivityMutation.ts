import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMyActivity } from '@/apis/myActivities';
import { useSnackBar } from '@/providers/SnackBarProvider';
import type { Activity } from '@/apis/type';
/**
 * 내 체험 삭제 뮤테이션 훅
 *
 * 특정 체험(activityId)을 삭제하고, 삭제 성공 시:
 * 1. React Query 캐시에서 해당 체험 제거
 * 2. 모달 닫기(onClose) 및 선택 ID 초기화(onResetId)
 * 3. 스낵바로 성공 메시지 표시
 *
 * 삭제 실패 시 스낵바로 에러 메시지 표시
 *
 */
export const useDeleteActivityMutation = (onClose?: () => void, onResetId?: () => void) => {
  const queryClient = useQueryClient();
  const { showSnack } = useSnackBar();

  return useMutation({
    mutationFn: (activityId: number) => deleteMyActivity({ activityId }),
    onSuccess: (_, activityId) => {
      // 로컬 캐시에서 바로 제거
      queryClient.setQueryData<Activity[]>(['myActivities'], (oldData) =>
        oldData ? oldData.filter((a) => a.id !== activityId) : []
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
