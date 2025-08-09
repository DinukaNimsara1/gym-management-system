import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../shared/services/api.service';
import { Member } from '../../shared/models/member';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatListModule],
  template: `
    <div class="container" *ngIf="member(); else loadingTpl">
      <mat-card>
        <h2>{{ member()?.name }}</h2>
        <p>Email: {{ member()?.email }}</p>
        <p>Height: {{ member()?.height }} cm | Weight: {{ member()?.weight }} kg</p>
      </mat-card>

      <mat-card *ngIf="member()?.subscriptionPlan as plan">
        <h3>Subscription</h3>
        <p>{{ plan.name }} ({{ plan.status }})</p>
        <p>{{ plan.startDate }} -> {{ plan.endDate }}</p>
      </mat-card>
    </div>

    <ng-template #loadingTpl>
      <p style="padding: 1rem;">Loading profile...</p>
    </ng-template>
  `,
  styles: [
    `
      .container { display: grid; gap: 1rem; padding: 1rem; }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  private readonly api = inject(ApiService);
  protected readonly member = signal<Member | null>(null);

  ngOnInit(): void {
    this.api.getUserProfile().subscribe((m) => this.member.set(m));
  }
}


