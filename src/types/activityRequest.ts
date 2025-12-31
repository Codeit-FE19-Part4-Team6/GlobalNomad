export type scheduleRequest = {
  date: string;
  startTime: string;
  endTime: string;
};

export type createdActivityRequest = {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  schedules: scheduleRequest[];
  bannerImageUrl: string;
  introImageUrls: string[];
};
