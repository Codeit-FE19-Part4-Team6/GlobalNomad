import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editMyInfo } from '@/apis/user';
import type { UserEditRequest, User } from '@/apis/type';
import { useSnackBar } from '@/providers/SnackBarProvider';
import { useAuthStore } from '@/stores/authStore';

export const useEditMyInfoMutation = (onSuccessCallback?: (data: User) => void) => {
  const queryClient = useQueryClient();
  const { showSnack } = useSnackBar();
  const refreshUser = useAuthStore((state) => state.refreshUser);

  return useMutation({
    mutationFn: (payload: Partial<UserEditRequest>) => editMyInfo(payload),
    onSuccess: async (data) => {
      // ✅ React Query 캐시 업데이트
      queryClient.setQueryData(['myInfo'], data);

      // ✅ Zustand authStore도 서버에서 최신 데이터로 갱신
      await refreshUser();

      showSnack('내 정보가 수정되었습니다.', 'success');
      onSuccessCallback?.(data);
    },
    onError: () => {
      showSnack('수정에 실패했습니다.', 'error');
    },
  });
};
