import { useState } from 'react';
import Title from '@/components/common/Title';
import Pagination from '@/components/common/pagination';
import { Star } from '@/assets/icons';

interface Review {
  id: number;
  author: string;
  rating: number;
  createdAt: string;
  content: string;
}

interface ActivityReviewsProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export default function ActivityReviews({ reviews, rating, reviewCount }: ActivityReviewsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <section className='mb-10 border-t border-gray-100 pt-10'>
      <div className='mb-6'>
        <div className='flex items-center gap-2'>
          <Title as='h3' size='xl' weight='bold'>
            체험 후기
          </Title>
          <span className='font-md-medium text-gray-500'>{reviewCount.toLocaleString()}개</span>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <Title as='h2' size='3xl' weight='bold'>
            {rating.toFixed(1)}
          </Title>
          <div>
            <span className='font-lg-bold text-gray-950'>매우 만족</span>
          </div>
          <span className='font-md-medium flex items-center gap-1 text-gray-500'>
            <Star className='h-4 w-4' />
            {reviewCount.toLocaleString()}개 후기
          </span>
        </div>
      </div>

      {/* 후기 리스트 */}
      <div className='space-y-6'>
        {reviews
          .slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)
          .map((review) => (
            <div
              key={review.id}
              className='rounded-3xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.08)] last:border-b-0'>
              <div className='mb-2 flex items-center gap-3'>
                <span className='font-md-bold text-gray-900'>{review.author}</span>
                <span className='font-md-medium text-gray-500'>{review.createdAt}</span>
              </div>
              <div className='mb-2 flex items-center gap-1'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className='font-md-medium text-gray-800'>{review.content}</p>
            </div>
          ))}
      </div>

      {/* 후기 페이지네이션 */}
      <div className='mt-8 flex justify-center'>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}>
          <Pagination.Prev />
          <Pagination.Items />
          <Pagination.Next />
        </Pagination>
      </div>
    </section>
  );
}
