/**
 * [Card.Schedule] - 예약 날짜 및 시간 정보를 표시하는 컴포넌트
 *
 * ```tsx
 * <Card.Schedule date={date} startTime={startTime} endTime={endTime} />
 * ```
 */
export function CardSchedule({
  date,
  startTime,
  endTime,
  isMobileDate = false,
}: {
  date: string;
  startTime: string;
  endTime: string;
  isMobileDate?: boolean;
}) {
  if (isMobileDate) {
    return <div className='font-lg-bold text-gray-800'>{date}</div>;
  }

  return (
    <div className='flex items-center gap-2 text-gray-500'>
      <span>{date}</span>
      <span>∙</span>
      <span>
        {startTime} - {endTime}
      </span>
    </div>
  );
}
