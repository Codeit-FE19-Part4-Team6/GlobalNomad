import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelReservation } from '@/apis/myReservation';
import { useSnackBar } from '@/providers/SnackBarProvider';
/**
 * 예약 취소 뮤테이션 훅
 *
 * 특정 예약을 취소하고, 성공 시:
 * 1. 'myReservations' 캐시를 무효화하여 최신 데이터 반영
 * 2. 취소 모달 닫기 콜백(onClose) 호출
 * 3. 선택된 예약 ID 초기화 콜백(onResetId) 호출
 * 4. 스낵바로 메시지 표시
 *
 */
export const useCancelReservationMutation = (onClose?: () => void, onResetId?: () => void) => {
  const queryClient = useQueryClient();
  const { showSnack } = useSnackBar();

  return useMutation({
    mutationFn: cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myReservations'] });
      onClose?.();
      onResetId?.();
      showSnack('예약이 취소되었습니다.', 'success');
    },
    onError: () => {
      showSnack('예약 취소에 실패했습니다. 다시 시도해주세요.', 'error');
    },
  });
};
