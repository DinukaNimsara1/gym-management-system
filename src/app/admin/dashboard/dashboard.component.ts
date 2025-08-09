import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="grid">
      <mat-card>Total Active Members: --</mat-card>
      <mat-card>Pending Registrations: --</mat-card>
      <mat-card>Attendance Trend: --</mat-card>
    </div>
  `,
  styles: [
    `
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; padding: 1rem; }
    `,
  ],
})
export class DashboardComponent {}


