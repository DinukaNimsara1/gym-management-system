export interface Payment {
  id: number;
  memberId: number;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  createdAt: string;
}


