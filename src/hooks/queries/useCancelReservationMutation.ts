import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelReservation } from '@/apis/myReservation';
import { useSnackBar } from '@/providers/SnackBarProvider';

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
