import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReservationReview } from '@/apis/myReservation';
import type { MyReservationReviewRequest } from '@/apis/type';
import { useSnackBar } from '@/providers/SnackBarProvider';
/**
 * 예약 후기 등록 뮤테이션 훅
 *
 * 특정 예약(reservationId)에 후기를 등록하고, 성공 시:
 * 1. 'myReservations' 캐시를 무효화하여 최신 데이터 반영
 * 2. 후기가 성공적으로 등록되면 모달 닫기 콜백(onSuccessClose) 호출
 * 3. 스낵바로 성공 메시지 표시
 *
 * 등록 실패 시 스낵바로 에러 메시지 표시
 *
 */
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
