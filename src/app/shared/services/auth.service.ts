import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly roleKey = 'role';

  private readonly roleSubject = new BehaviorSubject<'admin' | 'member' | null>(this.getUserRole());
  readonly role$ = this.roleSubject.asObservable();

  constructor(private readonly api: ApiService, private readonly router: Router) {}

  login(credentials: { username: string; password: string }): Observable<{ token: string; role: 'admin' | 'member' }> {
    return this.api.login(credentials).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.roleKey, response.role);
        this.roleSubject.next(response.role);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    this.roleSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserRole(): 'admin' | 'member' | null {
    const role = localStorage.getItem(this.roleKey);
    return role === 'admin' || role === 'member' ? role : null;
  }
}


