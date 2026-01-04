import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReservationReview } from '@/apis/myReservation';
import type { MyReservationReviewRequest } from '@/apis/type';
import { useSnackBar } from '@/providers/SnackBarProvider';

export const useReviewReservationMutation = (onSuccessClose?: () => void) => {
  const queryClient = useQueryClient();
  const { showSnack } = useSnackBar();

  return useMutation({
    mutationFn: ({
      reservationId,
      data,
    }: {
      reservationId: number;
      data: MyReservationReviewRequest;
    }) => postReservationReview(reservationId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myReservations'] });
      onSuccessClose?.();
      showSnack('후기가 등록되었습니다!', 'success', { duration: 2000 });
    },

    onError: () => {
      showSnack('후기 작성에 실패했습니다.', 'error');
    },
  });
};
