import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editMyInfo } from '@/apis/user';
import type { UserEditRequest, User } from '@/apis/type';
import { useSnackBar } from '@/providers/SnackBarProvider';
/**
 * 내 정보 수정 뮤테이션 훅
 * - 사용자가 닉네임, 비밀번호, 프로필 이미지를 변경했을 때 호출
 * - 성공/실패 시 스낵바 알림 표시
 * - 성공 시 React Query 캐시 업데이트
 */
export const useEditMyInfoMutation = (onSuccessCallback?: (data: User) => void) => {
  const queryClient = useQueryClient();
  const { showSnack } = useSnackBar();

  return useMutation({
    mutationFn: (payload: Partial<UserEditRequest>) => editMyInfo(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['myInfo'], data);
      showSnack('내 정보가 수정되었습니다.', 'success');
      onSuccessCallback?.(data);
    },
    onError: () => {
      showSnack('수정에 실패했습니다.', 'error');
    },
  });
};
