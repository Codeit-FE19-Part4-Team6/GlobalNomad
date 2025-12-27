import type { ReservationStatus } from '@/types/reservation';
import Label from '@/components/common/Label';
import { ActionButton } from '@/components/common/button';

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
    <div className='flex h-[94px] flex-col justify-center rounded-[16px] border border-gray-100 px-[16px]'>
      <div className='flex items-center justify-between gap-3'>
        <div className='space-y-1'>
          <div className='text-[13px] text-gray-600'>
            <span className='font-lg-bold mr-[8px] text-gray-500'>닉네임</span>
            <span className='font-lg-medium text-black-50'>{nickname}</span>
          </div>
          <div className='text-[13px] text-gray-600'>
            <span className='font-lg-bold mr-[22px] text-gray-500'>인원</span>
            <span className='font-lg-medium text-black-50'>{headCount}명</span>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          {tab === 'confirmed' && (
            <>
              <ActionButton
                action='neutral'
                onClick={onApprove}
                type='button'
                className='bg-color-white font-md-medium h-[29px] w-[68px] rounded-[8px] border border-gray-50 whitespace-nowrap text-gray-600 hover:bg-gray-50'>
                승인하기
              </ActionButton>
              <ActionButton
                action='muted'
                type='button'
                onClick={onReject}
                className='font-md-medium h-[29px] w-[68px] rounded-[8px] bg-gray-50 whitespace-nowrap text-gray-600 hover:bg-gray-100'>
                거절하기
              </ActionButton>
            </>
          )}

          {tab === 'approved' && (
            <Label className='font-sm-bold inline-flex h-[24px] w-[63px] cursor-pointer items-center justify-center rounded-full bg-cyan-50 text-cyan-600'>
              예약승인
            </Label>
          )}
          {tab === 'declined' && (
            <Label className='font-sm-bold inline-flex h-[24px] w-[63px] cursor-pointer items-center justify-center rounded-full bg-red-50 text-red-500'>
              예약거절
            </Label>
          )}
        </div>
      </div>
    </div>
  );
}
