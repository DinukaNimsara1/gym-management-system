import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <a routerLink="/" style="text-decoration:none; color:white; margin-right: 1rem;">Gym</a>
      <span style="flex:1 1 auto;"></span>
      <ng-container *ngIf="isLoggedIn(); else guest">
        <a mat-button routerLink="/profile" *ngIf="role() === 'member'">Profile</a>
        <a mat-button routerLink="/admin/dashboard" *ngIf="role() === 'admin'">Dashboard</a>
        <button mat-button (click)="logout()">Logout</button>
      </ng-container>
      <ng-template #guest>
        <a mat-button routerLink="/login">Login</a>
        <a mat-button routerLink="/register">Register</a>
      </ng-template>
    </mat-toolbar>
  `,
})
export class HeaderComponent {
  private readonly auth = inject(AuthService);
  readonly role = computed(() => this.auth.getUserRole());
  isLoggedIn = () => this.auth.isAuthenticated();
  logout = () => this.auth.logout();
}


