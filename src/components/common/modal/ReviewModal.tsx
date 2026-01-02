import { useState, useEffect } from 'react';
import BaseModal from '@/components/common/modal/BaseModal';
import RatingStar from '@/components/common/RatingStar';
import TextArea from '@/components/common/TextArea';
import { tv } from 'tailwind-variants';

import { PrimaryButton } from '@/components/common/button';
import Title from '@/components/common/Title';
import Label from '@/components/common/Label';
import { Delete } from '@/assets/icons';

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
        <div className='mb-1 flex justify-end'>
          <button onClick={onClose} className='h-6 w-6'>
            <Delete />
          </button>
        </div>
        <div className='flex flex-col items-center gap-[14px]'>
          <div className='flex flex-col items-center gap-[6px]'>
            <Title as='h5' weight='bold' size='md' className='md:font-lg-bold'>
              {title}
            </Title>
            <p className='font-sm-medium md:font-md-medium flex gap-1 text-gray-500'>
              {date} / {startTime} - {endTime} ({headCount}명)
            </p>
          </div>

          <RatingStar
            className='gap-[6px] md:gap-3 [&_svg]:h-9 [&_svg]:w-9 md:[&_svg]:h-10.5 md:[&_svg]:w-[42px]'
            value={rating}
            onChange={setRating}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-3 md:gap-4'>
          <Label htmlFor='review-content' className='font-lg-bold md:font-xl-bold'>
            소중한 경험을 들려주세요.
          </Label>
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
        className='[@media(max-width:640px)]:h-[41px] [@media(max-width:640px)]:rounded-xl'
        size='lg'
        onClick={handleSubmit}>
        <span className='font-md-bold md:font-lg-bold'>작성하기</span>
      </PrimaryButton>
    </BaseModal>
  );
}
