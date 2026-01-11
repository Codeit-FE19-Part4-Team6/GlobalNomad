import { http } from '@/apis/http';
import type { MyActivitySchedule } from '@/apis/type';

export async function getReservedSchedule(activityId: number, date: string) {
  const res = await http.get<MyActivitySchedule[]>(
    `/my-activities/${activityId}/reserved-schedule`,
    {
      params: { date },
    }
  );
  return res.data;
}
