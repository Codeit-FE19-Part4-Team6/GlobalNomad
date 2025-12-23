import { StateBadge } from '@/components/common/badge';
import type { ReservationStatus } from '@/components/common/badge';
import Title from '@/components/common/Title';
import { PrimaryButton } from '@/components/common/button/PrimaryButton';
import { cn } from '@/utils/cn';
import { ActionButton } from '@/components/common/button';

export type CardListProps = {
  status: ReservationStatus;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  headCount: number;
  bannerImageUrl?: string;
  onReviewClick?: () => void;
  onCancelClick?: () => void;
  onChangeClick?: () => void;
};

/**
 * CardList
 *
 *
 * <CardList
 * status="confirmed"
 * title="남산 타워 야경 투어"
 * date="2024.03.20"
 * startTime="19:00"
 * endTime="21:00"
 * totalPrice={50000}
 * headCount={2}
 * bannerImageUrl="/images/namsan.jpg"
 * onCancelClick={() => handleCancel(id)}
 * />
 */
export default function CardList({
  status,
  title,
  date,
  startTime,
  endTime,
  totalPrice,
  headCount,
  bannerImageUrl,
  onReviewClick,
  onCancelClick,
  onChangeClick,
}: CardListProps) {
  const RenderButtons = ({ isMobile }: { isMobile: boolean }) => {
    const isModifiable = status === 'confirmed';
    const isCompleted = status === 'completed';

    return (
      <>
        {isCompleted && (
          <div
            className={cn(
              isMobile ? 'mt-3 flex flex-col gap-2 lg:hidden' : 'ml-auto hidden lg:flex'
            )}>
            <PrimaryButton
              onClick={onReviewClick}
              ignoreSize
              className={cn(
                'font-md-medium whitespace-nowrap',
                isMobile
                  ? 'flex h-9.25 w-full items-center rounded-lg p-2.5 md:w-119'
                  : 'h-7.25 w-17.75 rounded-lg px-2.5 py-1.5'
              )}>
              후기 작성
            </PrimaryButton>
          </div>
        )}
        {isModifiable && (
          <div
            className={cn(
              'gap-2',
              isMobile ? 'mt-3 flex items-center lg:hidden' : 'ml-auto hidden lg:flex'
            )}>
            <ActionButton
              action='neutral'
              onClick={onChangeClick}
              className={cn(
                'whitespace-nowrap',
                isMobile ? 'w-full py-2.5 md:w-58' : 'h-7.25 w-17.75'
              )}>
              예약 변경
            </ActionButton>
            <ActionButton
              action='muted'
              onClick={onCancelClick}
              className={cn(
                'whitespace-nowrap',
                isMobile ? 'w-full py-2.5 md:w-58' : 'h-7.25 w-17.75'
              )}>
              예약 취소
            </ActionButton>
          </div>
        )}
      </>
    );
  };

  return (
    <div className='flex w-full flex-col lg:flex-row'>
      <div className='font-lg-bold mb-3 ml-2 flex text-gray-800 lg:hidden'>
        <span>{date}</span>
      </div>

      <div className='flex w-full flex-row items-start -space-x-9.5 md:-space-x-5 lg:-space-x-6.5'>
        <div
          className={cn(
            'relative z-10 flex flex-col items-center rounded-3xl border border-white bg-white p-5 lg:px-10 lg:py-7.5',
            'h-34 min-h-38.25 w-full gap-3.5 md:w-90 lg:h-45.25 lg:w-121.5 lg:rounded-4xl'
          )}
          style={{ boxShadow: '0 -8px 20px 0 rgba(0, 0, 0, 0.05)' }}>
          <div className='flex w-full flex-col gap-2 lg:gap-3'>
            <StateBadge status={status} />
            <Title as='h4' size='md' weight='bold' className='lg:font-xl-bold text-gray-950'>
              {title}
            </Title>

            <div className='font-lg-medium hidden items-center gap-2 text-gray-500 lg:flex'>
              <span>{date}</span>
              <span>∙</span>
              <span>
                {startTime} - {endTime}
              </span>
            </div>
            <div className='font-sm-medium text-gray-500 lg:hidden'>
              {startTime} - {endTime}
            </div>

            <div className='flex items-center gap-4'>
              <span className='font-lg-bold lg:font-xl-bold text-gray-950'>
                ₩{totalPrice.toLocaleString()}
              </span>
              <span className='font-md-medium lg:font-lg-medium text-gray-400'>{headCount}명</span>

              <RenderButtons isMobile={false} />
            </div>
          </div>
        </div>
        {bannerImageUrl && (
          <div className='aspect-square h-34 min-h-38.25 w-34 shrink-0 overflow-hidden rounded-[0_24px_24px_0] bg-gray-100 lg:h-45.25 lg:w-45.25 lg:rounded-[0_32px_32px_0]'>
            <img src={bannerImageUrl} alt={title} className='h-full w-full object-cover' />
          </div>
        )}
      </div>
      <RenderButtons isMobile={true} />
    </div>
  );
}
