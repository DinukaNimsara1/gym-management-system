import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../shared/services/api.service';
import { Member } from '../../shared/models/member';

@Component({
  selector: 'app-admin-member-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  template: `
    <div style="padding: 1rem;">
      <table mat-table [dataSource]="members" class="mat-elevation-z1" *ngIf="members.length; else emptyTpl">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let m">{{ m.name }}</td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let m">{{ m.email }}</td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let m">{{ m.status }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let m">
            <button mat-button color="primary" (click)="approve(m)" [disabled]="m.status !== 'pending'">Approve</button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      <ng-template #emptyTpl>
        <p>No members found.</p>
      </ng-template>
    </div>
  `,
})
export class MemberListComponent implements OnInit {
  private readonly api = inject(ApiService);
  members: Member[] = [];
  displayedColumns = ['name', 'email', 'status', 'actions'];

  ngOnInit(): void {
    this.api.getMembers().subscribe((ms) => (this.members = ms));
  }

  approve(member: Member): void {
    this.api.approveRegistration(member.memberId).subscribe(() => {
      member.status = 'active';
    });
  }
}


