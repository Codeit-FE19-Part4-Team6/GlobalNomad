export type ReservationStatus = 'confirmed' | 'approved' | 'declined' | 'completed' | 'canceled';

export type ReservationResponse = {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    id: number;
    title: string;
    bannerImageUrl: string;
  };
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type ReservationListResponse = {
  cursorId: number | null;
  reservations: ReservationResponse[];
  totalCount: number;
};
