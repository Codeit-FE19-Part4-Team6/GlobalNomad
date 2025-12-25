import { useState, useEffect } from 'react';
import BaseModal from '@/components/common/modal/BaseModal';
import RatingStar from '@/components/common/RatingStar';
import TextArea from '@/components/common/TextArea';
import { tv } from 'tailwind-variants';
import Icons from '@/assets/icons';
import { PrimaryButton } from '@/components/common/button';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
}

const MAX_LENGTH = 100;

const reviewStyle = tv({
  base: 'flex flex-col gap-[20px] md:gap-[30px] px-[24px] md:px-[30px] rounded-[30px] pt-[20px] pb-[23px] md:pt-[24px] md:pb-[44px]',
});

export default function ReviewModal({
  isOpen,
  onClose,
  title,
  date,
  startTime,
  endTime,
  headCount,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  //임시 코드입니다
  //별점이 0이거나 content가 비어있으면 제출 X, 로딩중에 버튼disabled, 제출 후 onClose
  const handleSubmit = () => {
    console.log({ rating, content });
    onClose();
    setContent('');
  };

  const onChangeText = (value: string) => {
    const limitValue = value.slice(0, MAX_LENGTH);
    setContent(limitValue);
  };

  const isSubmitDisabled = rating === 0 || content.trim().length === 0;
  const textCount = content.length;

  useEffect(() => {
    if (!isOpen) {
      setContent('');
      setRating(0);
    }
  }, [isOpen]);

  return (
    <BaseModal
      isOpen={isOpen}
      containerClassName={reviewStyle()}
      onClose={onClose}
      size='review'
      closeOnEsc>
      <div>
        <div className='mb-[4px] flex justify-end'>
          <button onClick={onClose} className='h-[24px] w-[24px]'>
            <Icons.Delete />
          </button>
        </div>
        <div className='flex flex-col items-center gap-[14px]'>
          <div className='flex flex-col items-center gap-[6px]'>
            <p className='font-md-bold md:font-lg-bold text-black'>{title}</p>
            <p className='font-sm-medium md:font-md-medium flex gap-[4px] text-gray-500'>
              {date} /{startTime} - {endTime} ({headCount}명)
            </p>
          </div>

          <RatingStar
            className='gap-[6px] md:gap-[12px] [&_svg]:h-[36px] [&_svg]:w-[36px] md:[&_svg]:h-[42px] md:[&_svg]:w-[42px]'
            value={rating}
            onChange={setRating}
          />
        </div>
      </div>
      <div className='flex flex-col gap-[8px]'>
        <div className='flex flex-col gap-[12px] md:gap-[16px]'>
          <p className='font-lg-bold md:font-xl-bold'>소중한 겸험을 들려주세요.</p>
          <TextArea
            variant='modal'
            value={content}
            onChange={onChangeText}
            placeholder='체험에서 느낀 경험을 자유롭게 남겨주세요.'
            className='font-md-medium md:font-lg-medium'
          />
        </div>
        <div className='font-sm-medium md:font-md-medium flex justify-end text-gray-600'>
          {textCount} / 100
        </div>
      </div>
      <PrimaryButton
        disabled={isSubmitDisabled}
        className='[@media(max-width:640px)]:h-[41px] [@media(max-width:640px)]:rounded-[12px]'
        size='lg'
        onClick={handleSubmit}>
        <span className='font-md-bold md:font-lg-bold'>작성하기</span>
      </PrimaryButton>
    </BaseModal>
  );
}
