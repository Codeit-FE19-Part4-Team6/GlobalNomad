export interface Notification {
  id: number;
  status: 'rejected' | 'approved';
  time: string;
  title: string;
  reservationTime: string;
}
