import { http } from '@/apis/http';
import type { MyActivitySchedulesResponse } from '@/apis/type';

type GetMyActivitySchedulesParams = {
  activityId: number;
  year: string;
  month: string;
};

export const getMyActivitySchedules = async ({
  activityId,
  year,
  month,
}: GetMyActivitySchedulesParams): Promise<MyActivitySchedulesResponse[]> => {
  const res = await http.get<MyActivitySchedulesResponse[]>(
    `/my-activities/${activityId}/reservation-dashboard`,
    {
      params: {
        year,
        month,
      },
    }
  );

  return res.data;
};
