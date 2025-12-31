import type { MyReservationsResponse } from '@/apis/type';
import { ActionButton, PrimaryButton } from '@/components/common/button';
import { useCardContext } from '@/components/common/card/CardContext';
import { cn } from '@/utils/cn';

interface CardButtonProps {
  status?: MyReservationsResponse['reservations'][number]['status'] | 'canceled';
  onReviewClick?: () => void;
  onCancelClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

/**
 * [Card.CardButton] - 카드 타입에 따른 액션 버튼 (후기작성, 취소, 수정/삭제)
 */
export default function CardButton({
  status,
  onReviewClick,
  onCancelClick,
  onEdit,
  onDelete,
  className,
}: CardButtonProps) {
  const { variant } = useCardContext();

  // 리스트용 버튼 (수정 / 삭제)
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
    if (!status || status === 'canceled') {
      return null;
    }

    const canWriteReview = status === 'completed';

    return (
      <div
        className={cn(
          'mt-3 flex w-full flex-col gap-2 lg:mt-0 lg:ml-auto lg:w-auto lg:flex-row',
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
              action='muted'
              onClick={onCancelClick}
              className='w-full py-2.5 whitespace-nowrap lg:h-7.25 lg:w-17.75 lg:py-0'>
              예약 취소
            </ActionButton>
          </div>
        )}
      </div>
    );
  }

  return null;
}
