import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../shared/services/api.service';
import { Payment } from '../../shared/models/payment';

@Component({
  selector: 'app-admin-payments',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <div style="padding:1rem;">
      <table mat-table [dataSource]="payments" *ngIf="payments.length; else emptyTpl">
        <ng-container matColumnDef="memberId">
          <th mat-header-cell *matHeaderCellDef>Member</th>
          <td mat-cell *matCellDef="let p">{{ p.memberId }}</td>
        </ng-container>
        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef>Amount</th>
          <td mat-cell *matCellDef="let p">{{ p.amount | currency }}</td>
        </ng-container>
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let p">{{ p.status }}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      <ng-template #emptyTpl><p>No payments found.</p></ng-template>
    </div>
  `,
})
export class PaymentsComponent implements OnInit {
  private readonly api = inject(ApiService);
  payments: Payment[] = [];
  displayedColumns = ['memberId', 'amount', 'status'];

  ngOnInit(): void {
    this.api.getPayments().subscribe((ps) => (this.payments = ps));
  }
}


