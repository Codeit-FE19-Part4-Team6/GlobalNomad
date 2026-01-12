import Title from '@/components/common/Title';
import { BaseBadge } from '@/components/common/badge';
import Dropdown from '@/components/common/dropdown/Dropdown';
import DropdownTrigger from '@/components/common/dropdown/DropdownTrigger';
import DropdownList from '@/components/common/dropdown/DropdownList';
import DropdownItem from '@/components/common/dropdown/DropdownItem';
import { Star, More, Spot } from '@/assets/icons';

interface ActivityInfoProps {
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
  shortDescription: string;
  onEdit?: () => void;
  onDelete?: () => void;
  variant?: 'mobile' | 'desktop';
  /** 케밥 메뉴 표시 여부 (본인의 체험일 때만 true) */
  showKebabMenu?: boolean;
}

export default function ActivityInfo({
  category,
  title,
  rating,
  reviewCount,
  address,
  shortDescription,
  onEdit,
  onDelete,
  variant = 'mobile',
  showKebabMenu = false,
}: ActivityInfoProps) {
  const titleSize = variant === 'desktop' ? '3xl' : '2xl';
  const marginBottom = variant === 'desktop' ? 'mb-14' : 'mb-4';
  const dropdownWidth = variant === 'desktop' ? 'w-[95px]' : 'w-[100px]';
  const dropdownBorder = variant === 'desktop' ? 'border-gray-100' : 'border-gray-300';

  return (
    <div className={marginBottom}>
      <div className='mb-4 flex items-start justify-between'>
        <div className='flex-1'>
          <BaseBadge color='orange' size='status' className='mb-2'>
            {category}
          </BaseBadge>
          <Title as={variant === 'desktop' ? 'h2' : 'h1'} size={titleSize} weight='bold'>
            {title}
          </Title>
        </div>
        {/* 케밥 메뉴 - 본인의 체험일 때만 표시 */}
        {showKebabMenu && (
          <Dropdown className='relative'>
            <DropdownTrigger className='p-1'>
              <More className='h-6 w-6 text-gray-900' />
            </DropdownTrigger>
            <DropdownList
              className={`absolute top-8 right-0 z-10 ${dropdownWidth} overflow-hidden rounded-md border ${dropdownBorder} bg-white shadow-lg`}>
              <DropdownItem
                onClick={onEdit || (() => {})}
                className='font-md-medium cursor-pointer px-4 py-2.5 text-center text-gray-800 hover:bg-gray-50'>
                수정하기
              </DropdownItem>
              <DropdownItem
                onClick={onDelete || (() => {})}
                className='font-md-medium cursor-pointer px-4 py-2.5 text-center text-gray-800 hover:bg-gray-50'>
                삭제하기
              </DropdownItem>
            </DropdownList>
          </Dropdown>
        )}
      </div>

      {/* 평점 */}
      <div className={`flex items-center gap-1 ${variant === 'desktop' ? 'mb-3' : 'mb-2'}`}>
        <Star className='h-4 w-4 text-yellow-500' />
        <span
          className={`font-md-medium ${variant === 'desktop' ? 'text-gray-900' : 'text-gray-800'}`}>
          {rating}
        </span>
        <span className='font-md-medium text-gray-500'>({reviewCount})</span>
      </div>

      {/* 주소 */}
      <div className={`flex items-start gap-1 ${variant === 'desktop' ? 'mb-6' : 'mb-2'}`}>
        <Spot className='mt-0.5 h-4 w-4 shrink-0 text-gray-700' />
        <span className='font-md-medium text-gray-700'>{address}</span>
      </div>

      {/* 간단한 설명 */}
      <p className='font-md-medium text-gray-700'>{shortDescription}</p>
    </div>
  );
}
