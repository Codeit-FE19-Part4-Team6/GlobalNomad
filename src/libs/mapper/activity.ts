import type { scheduleRequest } from '@/types/activityRequest';
import type { ScheduleRow } from '@/types/ScheduleRow';

export const mapRowsToScheduleRequests = (rows: ScheduleRow[]): scheduleRequest[] => {
  return rows.map((row) => ({
    date: row.date.toISOString().split('T')[0],
    startTime: row.startTime,
    endTime: row.endTime,
  }));
};
