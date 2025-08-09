export interface Member {
  memberId: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  height: number;
  weight: number;
  subscriptionPlan?: {
    name: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'expired' | 'pending';
  };
  status: 'pending' | 'active' | 'inactive';
}


