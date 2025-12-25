import { ActionButton, PrimaryButton } from '@/components/common/button';
import { useCardContext } from '@/components/common/card/CardContext';
import type { ReservationStatus } from '@/types/reservation';
import { cn } from '@/utils/cn';

interface CardButtonProps {
  status?: ReservationStatus;
  reviewSubmitted?: boolean;
  onReviewClick?: () => void;
  onCancelClick?: () => void;
  onChangeClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
  isMobileOnly?: boolean;
  isDesktopOnly?: boolean;
}

/**
 * [Card.CardButton] - 카드 타입에 따른 액션 버튼 (후기작성, 예약변경/취소, 수정/삭제)
 *
 * 1. Variant 대응:
 * - 'reservation': 상태에 따라 후기 작성 또는 예약 변경/취소 버튼 노출.
 * - 'list': 관리자용 수정하기/삭제하기 버튼 노출.
 * 2. 위치 자동 제어: `isMobileOnly` 또는 `isDesktopOnly`를 통해 반응형 중복 노출 방지.
 *
 * ```tsx
 * // 예약 내역용
 * <Card.CardButton status="confirmed" onCancelClick={handleCancel} isDesktopOnly />
 * * // 내 체험 관리(List)용
 * <Card.CardButton onEdit={handleEdit} onDelete={handleDelete} />
 * ```
 */
export default function CardButton({
  status,
  reviewSubmitted,
  onReviewClick,
  onCancelClick,
  onChangeClick,
  onEdit,
  onDelete,
  className,
  isMobileOnly = false,
  isDesktopOnly = false,
}: CardButtonProps) {
  const { variant } = useCardContext();

  if (variant === 'list') {
    if (!onEdit && !onDelete) {
      return null;
    }
    return (
      <div className={cn('mt-3 flex gap-2', className)}>
        {onEdit && (
          <ActionButton
            action='neutral'
            size='sm'
            onClick={onEdit}
            className='h-7.25 w-17 whitespace-nowrap'>
            수정하기
          </ActionButton>
        )}
        {onDelete && (
          <ActionButton
            action='muted'
            size='sm'
            onClick={onDelete}
            className='h-7.25 w-17 whitespace-nowrap'>
            삭제하기
          </ActionButton>
        )}
      </div>
    );
  }

  if (variant === 'reservation') {
    const canWriteReview = status === 'completed' && !reviewSubmitted;

    return (
      <div
        className={cn(
          'mt-3 flex w-full flex-col gap-2 lg:mt-0 lg:ml-auto lg:w-auto lg:flex-row',
          isMobileOnly && 'lg:hidden',
          isDesktopOnly && 'max-lg:hidden',
          className
        )}>
        {canWriteReview && (
          <PrimaryButton
            onClick={onReviewClick}
            ignoreSize
            className={cn(
              'font-md-medium rounded-lg whitespace-nowrap',
              'h-9.25 w-full p-2.5 md:w-119 lg:h-7.25 lg:w-17.75 lg:px-2.5 lg:py-1.5'
            )}>
            후기 작성
          </PrimaryButton>
        )}
        {status === 'confirmed' && (
          <div className='flex w-full gap-2 lg:w-auto'>
            <ActionButton
              action='neutral'
              onClick={onChangeClick}
              className='w-full py-2.5 whitespace-nowrap md:w-58 lg:h-7.25 lg:w-17.75 lg:py-0'>
              예약 변경
            </ActionButton>
            <ActionButton
              action='muted'
              onClick={onCancelClick}
              className='w-full py-2.5 whitespace-nowrap md:w-58 lg:h-7.25 lg:w-17.75 lg:py-0'>
              예약 취소
            </ActionButton>
          </div>
        )}
      </div>
    );
  }

  return null;
}
