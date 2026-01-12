/**
 * 날짜 관련 유틸리티 함수
 */

/**
 * 주어진 날짜가 예약 가능한 날짜 목록에 포함되어 있는지 확인
 * @param date - 확인할 날짜
 * @param availableDates - 예약 가능한 날짜 목록
 * @returns 예약 가능 여부
 */
export const isDateAvailable = (date: Date, availableDates: Date[]): boolean => {
  return availableDates.some(
    (availableDate) => availableDate.toDateString() === date.toDateString()
  );
};
