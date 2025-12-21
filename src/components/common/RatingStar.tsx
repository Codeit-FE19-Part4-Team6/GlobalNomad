import { useState } from 'react';
import StarOff from '@/assets/icons/page/star-off.svg';
import StarOn from '@/assets/icons/page/star.svg';
import { cn } from '@/utils/cn';

interface RatingStarProps {
  value: number;
  //onChange는 리뷰모달 전용입니다. 댓글에서는 사용하지 않습니다.
  onChange?: (value: number) => void;
  className?: string;
}

{
  /* <RatingStar
  value={comment.rating}
  아래와 같이 최상위 div와 div안에 button들에 className을 줄 수 있습니다.
  className="
    flex gap-1
    [&_button]:h-4 [&_svg]:w-4
  "
/> */
}

export default function RatingStar({ value, onChange, className }: RatingStarProps) {
  const [hover, setHover] = useState<number | null>(null);

  const displayValue = onChange ? (hover ?? value) : value;
  return (
    <div className={cn('flex', className)}>
      {Array.from({ length: 5 }, (_, i) => {
        const star = i + 1;
        //선택된 별 까지만 filled 처리
        const filled = star <= displayValue;

        return (
          <button
            key={star}
            type='button'
            disabled={!onChange}
            onMouseEnter={() => onChange && setHover(star)}
            onMouseLeave={() => onChange && setHover(null)}
            onClick={() => onChange?.(star)}
            className={onChange ? 'cursor-pointer' : ''}>
            {filled ? <StarOn className='h-7 w-7' /> : <StarOff className='h-7 w-7' />}
          </button>
        );
      })}
    </div>
  );
}
