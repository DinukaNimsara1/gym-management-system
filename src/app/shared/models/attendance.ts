export interface Attendance {
  id: number;
  memberId: number;
  date: string;
  status: 'present' | 'absent';
}


