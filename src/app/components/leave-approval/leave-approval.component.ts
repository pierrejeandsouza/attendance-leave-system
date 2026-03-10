import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

export interface LeaveApplication {
  id: number;
  employee: string;
  initials: string;
  color: string;
  department: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Component({
  selector: 'app-leave-approval',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTabsModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Leave <span>Approval</span></h1>
        <p>Review and manage employee leave requests</p>
      </div>

      <!-- Summary badges -->
      <div class="approval-summary">
        <div class="summ-badge pending">
          <mat-icon>hourglass_empty</mat-icon>
          <span class="summ-num">{{ pendingCount }}</span>
          <span class="summ-lbl">Pending</span>
        </div>
        <div class="summ-badge approved">
          <mat-icon>check_circle</mat-icon>
          <span class="summ-num">{{ approvedCount }}</span>
          <span class="summ-lbl">Approved</span>
        </div>
        <div class="summ-badge rejected">
          <mat-icon>cancel</mat-icon>
          <span class="summ-num">{{ rejectedCount }}</span>
          <span class="summ-lbl">Rejected</span>
        </div>
      </div>

      <mat-card>
        <mat-card-content>
          <mat-tab-group>
            <!-- Pending Tab -->
            <mat-tab label="Pending ({{ pendingCount }})">
              <div class="tab-content">
                <div class="leave-cards" *ngIf="pendingLeaves.length; else noPending">
                  <div class="leave-card" *ngFor="let r of pendingLeaves">
                    <div class="lc-header">
                      <div class="lc-avatar" [style.background]="r.color">{{ r.initials }}</div>
                      <div class="lc-meta">
                        <span class="lc-name">{{ r.employee }}</span>
                        <span class="lc-dept">{{ r.department }}</span>
                      </div>
                      <span class="status-chip pending">Pending</span>
                    </div>
                    <div class="lc-body">
                      <div class="lc-info-row">
                        <div class="lc-info">
                          <mat-icon>category</mat-icon>
                          <span>{{ r.leaveType }}</span>
                        </div>
                        <div class="lc-info">
                          <mat-icon>date_range</mat-icon>
                          <span>{{ r.fromDate }} → {{ r.toDate }}</span>
                        </div>
                        <div class="lc-info">
                          <mat-icon>schedule</mat-icon>
                          <span>{{ r.days }} day(s)</span>
                        </div>
                      </div>
                      <div class="lc-reason">
                        <mat-icon>notes</mat-icon>
                        <span>{{ r.reason }}</span>
                      </div>
                    </div>
                    <div class="lc-actions">
                      <button class="action-btn reject-btn" (click)="reject(r)" matTooltip="Reject">
                        <mat-icon>close</mat-icon>
                        Reject
                      </button>
                      <button class="action-btn approve-btn" (click)="approve(r)" matTooltip="Approve">
                        <mat-icon>check</mat-icon>
                        Approve
                      </button>
                    </div>
                  </div>
                </div>

                <ng-template #noPending>
                  <div class="empty-state">
                    <mat-icon>done_all</mat-icon>
                    <p>All caught up! No pending requests.</p>
                  </div>
                </ng-template>
              </div>
            </mat-tab>

            <!-- All Applications Tab -->
            <mat-tab label="All Applications">
              <div class="tab-content">
                <table mat-table [dataSource]="applications">
                  <ng-container matColumnDef="employee">
                    <th mat-header-cell *matHeaderCellDef>Employee</th>
                    <td mat-cell *matCellDef="let r">
                      <div class="emp-cell">
                        <div class="emp-avatar-sm" [style.background]="r.color">{{ r.initials }}</div>
                        <div class="emp-info">
                          <span class="emp-name">{{ r.employee }}</span>
                          <span class="emp-dept-sm">{{ r.department }}</span>
                        </div>
                      </div>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="leaveType">
                    <th mat-header-cell *matHeaderCellDef>Leave Type</th>
                    <td mat-cell *matCellDef="let r">{{ r.leaveType }}</td>
                  </ng-container>

                  <ng-container matColumnDef="duration">
                    <th mat-header-cell *matHeaderCellDef>Duration</th>
                    <td mat-cell *matCellDef="let r">
                      {{ r.fromDate }} → {{ r.toDate }}
                      <span class="days-badge">{{ r.days }}d</span>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Status</th>
                    <td mat-cell *matCellDef="let r">
                      <span class="status-chip"
                            [class.pending]="r.status === 'Pending'"
                            [class.approved]="r.status === 'Approved'"
                            [class.rejected]="r.status === 'Rejected'">
                        {{ r.status }}
                      </span>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="allColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: allColumns;"></tr>
                </table>
              </div>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    /* Summary badges */
    .approval-summary {
      display: flex;
      gap: 14px;
      margin-bottom: 24px;
    }

    .summ-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
      border-radius: 12px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      flex: 1;
      transition: border-color 0.22s, transform 0.22s;
      animation: cardPop 0.5s ease both;
    }

    .summ-badge:nth-child(1) { animation-delay: 0.05s; }
    .summ-badge:nth-child(2) { animation-delay: 0.13s; }
    .summ-badge:nth-child(3) { animation-delay: 0.21s; }

    .summ-badge:hover { transform: translateY(-2px); }

    .summ-badge mat-icon {
      font-size: 22px;
      width: 22px;
      height: 22px;
    }

    .summ-badge.pending  { border-color: rgba(245,158,11,0.22); }
    .summ-badge.pending mat-icon  { color: #f59e0b; }
    .summ-badge.approved { border-color: rgba(160,82,45,0.25); }
    .summ-badge.approved mat-icon { color: #cd853f; }
    .summ-badge.rejected { border-color: rgba(239,68,68,0.22); }
    .summ-badge.rejected mat-icon { color: #ef4444; }

    .summ-num {
      font-size: 1.4rem;
      font-weight: 700;
      color: #f0f4ff;
      line-height: 1;
    }

    .summ-lbl {
      font-size: 0.72rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Tab */
    .tab-content {
      padding: 20px 0 8px;
    }

    /* Leave cards (pending) */
    .leave-cards {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .leave-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 12px;
      overflow: hidden;
      transition: border-color 0.22s, box-shadow 0.22s;
      animation: fadeSlideUp 0.4s ease both;
    }

    .leave-card:nth-child(1) { animation-delay: 0.1s; }
    .leave-card:nth-child(2) { animation-delay: 0.18s; }
    .leave-card:nth-child(3) { animation-delay: 0.26s; }

    .leave-card:hover {
      border-color: rgba(160,82,45,0.22);
      box-shadow: 0 4px 24px rgba(0,0,0,0.35);
    }

    .lc-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .lc-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-weight: 700;
      color: #fff;
      flex-shrink: 0;
    }

    .lc-meta {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .lc-name {
      font-size: 0.9rem;
      font-weight: 600;
      color: #f0f4ff;
    }

    .lc-dept {
      font-size: 0.75rem;
      color: #94a3b8;
    }

    .lc-body {
      padding: 12px 16px;
    }

    .lc-info-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 10px;
    }

    .lc-info {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      color: #94a3b8;
    }

    .lc-info mat-icon {
      font-size: 15px;
      width: 15px;
      height: 15px;
      color: #4b5563;
    }

    .lc-reason {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      font-size: 0.82rem;
      color: #94a3b8;
      padding: 8px;
      background: rgba(255,255,255,0.02);
      border-radius: 6px;
    }

    .lc-reason mat-icon {
      font-size: 15px;
      width: 15px;
      height: 15px;
      color: #4b5563;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .lc-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      padding: 10px 14px 12px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 16px;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: all 0.22s ease;
    }

    .action-btn mat-icon { font-size: 16px; width: 16px; height: 16px; }

    .approve-btn {
      background: rgba(160,82,45,0.15);
      color: #cd853f;
      border: 1px solid rgba(160,82,45,0.28);
    }

    .approve-btn:hover {
      background: linear-gradient(135deg, #a0522d, #cd853f);
      color: #fff;
      box-shadow: 0 0 14px rgba(160,82,45,0.35);
      transform: translateY(-1px);
    }

    .reject-btn {
      background: rgba(239,68,68,0.10);
      color: #ef4444;
      border: 1px solid rgba(239,68,68,0.22);
    }

    .reject-btn:hover {
      background: rgba(239,68,68,0.22);
      transform: translateY(-1px);
    }

    /* All Applications table */
    .emp-cell {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 5px 0;
    }

    .emp-avatar-sm {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.65rem;
      font-weight: 700;
      color: #fff;
      flex-shrink: 0;
    }

    .emp-info { display: flex; flex-direction: column; }
    .emp-name { font-size: 0.85rem; font-weight: 600; color: #f0f4ff; }
    .emp-dept-sm { font-size: 0.7rem; color: #94a3b8; }

    .days-badge {
      display: inline-block;
      margin-left: 8px;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 0.7rem;
      font-weight: 600;
      background: rgba(37,99,235,0.10);
      color: #60a5fa;
      border: 1px solid rgba(37,99,235,0.18);
    }

    /* Empty state */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 56px;
      color: #4b5563;
      gap: 10px;
    }

    .empty-state mat-icon {
      font-size: 56px;
      width: 56px;
      height: 56px;
      color: #cd853f;
      opacity: 0.4;
    }

    .empty-state p {
      font-size: 0.9rem;
      color: #94a3b8;
    }
  `]
})
export class LeaveApprovalComponent {
  applications: LeaveApplication[] = [
    { id: 1, employee: 'Priya Mehta',    initials: 'PM', color: '#fd79a8', department: 'HR',          leaveType: 'Sick Leave',   fromDate: '10 Mar 2026', toDate: '11 Mar 2026', days: 2, reason: 'Fever and cold',      status: 'Pending'  },
    { id: 2, employee: 'Vikram Singh',   initials: 'VS', color: '#a29bfe', department: 'Finance',     leaveType: 'Casual Leave', fromDate: '12 Mar 2026', toDate: '12 Mar 2026', days: 1, reason: 'Family function',     status: 'Pending'  },
    { id: 3, employee: 'Sneha Kapoor',   initials: 'SK', color: '#fdcb6e', department: 'Marketing',   leaveType: 'Annual Leave', fromDate: '15 Mar 2026', toDate: '19 Mar 2026', days: 5, reason: 'Planned vacation',    status: 'Pending'  },
    { id: 4, employee: 'Arjun Reddy',    initials: 'AR', color: '#74b9ff', department: 'Engineering', leaveType: 'Sick Leave',   fromDate: '05 Mar 2026', toDate: '06 Mar 2026', days: 2, reason: 'Doctor appointment',  status: 'Approved' },
    { id: 5, employee: 'Rohit Verma',    initials: 'RV', color: '#636e72', department: 'Operations',  leaveType: 'Casual Leave', fromDate: '03 Mar 2026', toDate: '03 Mar 2026', days: 1, reason: 'Personal work',       status: 'Rejected' },
    { id: 6, employee: 'Divya Krishnan', initials: 'DK', color: '#fab1a0', department: 'Marketing',   leaveType: 'Annual Leave', fromDate: '20 Mar 2026', toDate: '22 Mar 2026', days: 3, reason: 'Family trip',         status: 'Approved' },
  ];

  allColumns = ['employee', 'leaveType', 'duration', 'status'];

  constructor(private snackBar: MatSnackBar) {}

  get pendingLeaves():  LeaveApplication[] { return this.applications.filter(a => a.status === 'Pending');  }
  get pendingCount():   number { return this.pendingLeaves.length;  }
  get approvedCount():  number { return this.applications.filter(a => a.status === 'Approved').length; }
  get rejectedCount():  number { return this.applications.filter(a => a.status === 'Rejected').length; }

  approve(app: LeaveApplication): void {
    app.status = 'Approved';
    this.snackBar.open(`${app.employee}'s leave approved!`, 'Close', {
      duration: 3000,
      panelClass: ['success-snack']
    });
  }

  reject(app: LeaveApplication): void {
    app.status = 'Rejected';
    this.snackBar.open(`${app.employee}'s leave rejected.`, 'Close', { duration: 3000 });
  }
}
