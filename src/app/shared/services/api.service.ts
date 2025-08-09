import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Member } from '../models/member';
import { Payment } from '../models/payment';
import { Attendance } from '../models/attendance';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/register`, userData);
  }

  login(credentials: { username: string; password: string }): Observable<{ token: string; role: 'admin' | 'member' }> {
    return this.http.post<{ token: string; role: 'admin' | 'member' }>(`${environment.apiUrl}/login`, credentials);
  }

  getUserProfile(): Observable<Member> {
    return this.http.get<Member>(`${environment.apiUrl}/users/profile`);
  }

  getAttendanceHistory(memberId: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${environment.apiUrl}/attendance/${memberId}`);
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${environment.apiUrl}/members`);
  }

  approveRegistration(memberId: number): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/members/${memberId}/approve`, {});
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.apiUrl}/payments`);
  }
}


