import type { ReservationStatus } from '@/types/reservation';
import { ActionButton } from '@/components/common/button';
import { StateBadge } from '@/components/common/badge';

interface ReservationCardProps {
  nickname: string;
  headCount: number;
  tab: ReservationStatus;
  onApprove: () => void;
  onReject: () => void;
}

export default function ReservationCard({
  nickname,
  headCount,
  tab,
  onApprove,
  onReject,
}: ReservationCardProps) {
  return (
    <div className='flex h-23.5 flex-col justify-center rounded-2xl border border-gray-50 px-4'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex flex-col gap-2.5'>
          <div>
            <span className='lg:font-lg-bold font-md-bold mr-2 text-gray-500'>닉네임</span>
            <span className='font-md-medium lg:font-lg-medium text-black-50'>{nickname}</span>
          </div>
          <div>
            <span className='lg:font-lg-bold font-md-bold mr-5.5 text-gray-500'>인원</span>
            <span className='font-md-medium lg:font-lg-medium text-black-50'>{headCount}명</span>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          {tab === 'confirmed' && (
            <>
              <ActionButton
                action='neutral'
                onClick={onApprove}
                type='button'
                className='bg-color-white font-md-medium h-7.25 w-17 rounded-lg border border-gray-50 whitespace-nowrap text-gray-600 hover:bg-gray-50'>
                승인하기
              </ActionButton>
              <ActionButton
                action='muted'
                type='button'
                onClick={onReject}
                className='font-md-medium h-7.25 w-17 rounded-lg bg-gray-50 whitespace-nowrap text-gray-600 hover:bg-gray-100'>
                거절하기
              </ActionButton>
            </>
          )}

          {tab === 'approved' && <StateBadge status='approved'></StateBadge>}
          {tab === 'declined' && <StateBadge status='declined'></StateBadge>}
        </div>
      </div>
    </div>
  );
}
