/**
 * [Card.Schedule] - 예약 날짜 및 시간 정보를 표시하는 컴포넌트
 *
 * - 반응형 레이아웃: 모바일에서는 시간 위주로, 데스크탑에서는 날짜와 시간을 한 줄에 표시합니다.
 * - 조건부 렌더링 (isMobileDate): 모바일 전용 제목 형태로 날짜만 강조하고 싶을 때 사용합니다.
 *
 * ```tsx
 * // 1. 일반적인 사용 (본문 내부)
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
    return (
      <div className='font-lg-bold mb-3 ml-2 flex text-gray-800 lg:hidden'>
        <span>{date}</span>
      </div>
    );
  }

  return (
    <>
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
    </>
  );
}
