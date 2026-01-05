export interface Notification {
  id: number;
  status: 'approved' | 'rejected';
  title: string;
  reservationTime: string;
  time: string;
  createdAt: string;
}
