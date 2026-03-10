import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

interface AttendanceRecord {
  id: number;
  name: string;
  department: string;
  present: boolean;
  time: string | null;
  initials: string;
  color: string;
}

@Component({
  selector: 'app-attendance-tracker',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Attendance <span>Tracker</span></h1>
        <p>Mark daily attendance for employees — {{ today }}</p>
      </div>

      <!-- Summary bar -->
      <div class="att-summary-row">
        <div class="att-stat present">
          <mat-icon>check_circle</mat-icon>
          <div>
            <span class="att-num">{{ presentCount }}</span>
            <span class="att-lbl">Present</span>
          </div>
        </div>
        <div class="att-stat absent">
          <mat-icon>cancel</mat-icon>
          <div>
            <span class="att-num">{{ absentCount }}</span>
            <span class="att-lbl">Absent</span>
          </div>
        </div>
        <div class="att-stat-rate">
          <div class="rate-circle">
            <span class="rate-pct">{{ presentRate }}%</span>
          </div>
          <span class="att-lbl">Attendance Rate</span>
        </div>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Today's Attendance Sheet</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <table mat-table [dataSource]="records">

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Employee</th>
              <td mat-cell *matCellDef="let r">
                <div class="emp-cell">
                  <div class="emp-avatar" [style.background]="r.color">{{ r.initials }}</div>
                  <div class="emp-info">
                    <span class="emp-name">{{ r.name }}</span>
                    <span class="emp-dept">{{ r.department }}</span>
                  </div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let r">
                <span class="status-pill" [class.present]="r.present" [class.absent]="!r.present">
                  <mat-icon>{{ r.present ? 'check_circle' : 'cancel' }}</mat-icon>
                  {{ r.present ? 'Present' : 'Absent' }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="time">
              <th mat-header-cell *matHeaderCellDef>Check-in Time</th>
              <td mat-cell *matCellDef="let r">
                <span class="time-badge" *ngIf="r.time">{{ r.time }}</span>
                <span class="no-time" *ngIf="!r.time">—</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="toggle">
              <th mat-header-cell *matHeaderCellDef>Mark</th>
              <td mat-cell *matCellDef="let r">
                <mat-slide-toggle
                  [checked]="r.present"
                  (change)="toggleAttendance(r, $event.checked)"
                  [matTooltip]="r.present ? 'Mark Absent' : 'Mark Present'">
                </mat-slide-toggle>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>

        <mat-card-actions class="card-actions">
          <button mat-raised-button color="primary" (click)="saveAll()">
            <mat-icon>save</mat-icon>
            Save Attendance
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    /* Summary row */
    .att-summary-row {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      align-items: center;
    }

    .att-stat {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-radius: 12px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      flex: 1;
      transition: border-color 0.22s, transform 0.22s;
      animation: cardPop 0.5s ease both;
    }

    .att-stat:nth-child(1) { animation-delay: 0.05s; }
    .att-stat:nth-child(2) { animation-delay: 0.14s; }

    .att-stat:hover { transform: translateY(-2px); }

    .att-stat mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .att-stat.present { border-color: rgba(34,197,94,0.22); }
    .att-stat.present mat-icon { color: #22c55e; }
    .att-stat.absent  { border-color: rgba(239,68,68,0.22); }
    .att-stat.absent mat-icon  { color: #ef4444; }

    .att-stat > div { display: flex; flex-direction: column; }

    .att-num {
      font-size: 1.5rem;
      font-weight: 700;
      color: #f0f4ff;
      line-height: 1;
    }

    .att-lbl {
      font-size: 0.72rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 500;
      margin-top: 2px;
    }

    .att-stat-rate {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 12px 24px;
      border-radius: 12px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(160,82,45,0.22);
      animation: cardPop 0.5s ease 0.22s both;
    }

    .rate-circle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 3px solid #cd853f;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 16px rgba(160,82,45,0.3);
      animation: pulseRing 2.5s ease infinite;
    }

    .rate-pct {
      font-size: 0.9rem;
      font-weight: 700;
      color: #cd853f;
    }

    /* Employee cell */
    .emp-cell {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 0;
    }

    .emp-avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-weight: 700;
      color: #fff;
      flex-shrink: 0;
    }

    .emp-info { display: flex; flex-direction: column; }
    .emp-name { font-size: 0.875rem; font-weight: 600; color: #f0f4ff; }
    .emp-dept { font-size: 0.72rem; color: #94a3b8; }

    /* Status pill */
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.78rem;
      font-weight: 500;
    }

    .status-pill mat-icon { font-size: 14px; width: 14px; height: 14px; }

    .status-pill.present {
      background: rgba(34,197,94,0.12);
      color: #22c55e;
      border: 1px solid rgba(34,197,94,0.22);
    }

    .status-pill.absent {
      background: rgba(239,68,68,0.12);
      color: #ef4444;
      border: 1px solid rgba(239,68,68,0.22);
    }

    /* Time badge */
    .time-badge {
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 0.78rem;
      font-weight: 500;
      background: rgba(37,99,235,0.12);
      color: #60a5fa;
      border: 1px solid rgba(37,99,235,0.20);
    }

    .no-time { color: #4b5563; font-size: 0.85rem; }

    /* Card actions */
    .card-actions {
      padding: 12px 20px 16px !important;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class AttendanceTrackerComponent {
  today = new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

  records: AttendanceRecord[] = [
    { id: 1,  name: 'Rahul Sharma',   department: 'Engineering', present: true,  time: '9:05 AM', initials: 'RS', color: '#00b894' },
    { id: 2,  name: 'Priya Mehta',    department: 'HR',          present: true,  time: '9:12 AM', initials: 'PM', color: '#fd79a8' },
    { id: 3,  name: 'Arjun Reddy',    department: 'Engineering', present: false, time: null,      initials: 'AR', color: '#74b9ff' },
    { id: 4,  name: 'Sneha Kapoor',   department: 'Marketing',   present: false, time: null,      initials: 'SK', color: '#fdcb6e' },
    { id: 5,  name: 'Vikram Singh',   department: 'Finance',     present: true,  time: '9:30 AM', initials: 'VS', color: '#a29bfe' },
    { id: 6,  name: 'Anjali Nair',    department: 'Engineering', present: true,  time: '9:08 AM', initials: 'AN', color: '#55efc4' },
    { id: 7,  name: 'Rohit Verma',    department: 'Operations',  present: false, time: null,      initials: 'RV', color: '#636e72' },
    { id: 8,  name: 'Meera Iyer',     department: 'HR',          present: true,  time: '9:20 AM', initials: 'MI', color: '#e17055' },
    { id: 9,  name: 'Karthik Raj',    department: 'Engineering', present: true,  time: '8:55 AM', initials: 'KR', color: '#00cec9' },
    { id: 10, name: 'Divya Krishnan', department: 'Marketing',   present: true,  time: '9:40 AM', initials: 'DK', color: '#fab1a0' },
  ];

  displayedColumns = ['name', 'status', 'time', 'toggle'];

  constructor(private snackBar: MatSnackBar) {}

  get presentCount(): number  { return this.records.filter(r => r.present).length; }
  get absentCount():  number  { return this.records.filter(r => !r.present).length; }
  get presentRate():  number  { return Math.round((this.presentCount / this.records.length) * 100); }

  toggleAttendance(record: AttendanceRecord, checked: boolean): void {
    record.present = checked;
    record.time    = checked
      ? new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      : null;
  }

  saveAll(): void {
    this.snackBar.open('Attendance saved successfully!', 'Close', {
      duration: 3000,
      panelClass: ['success-snack']
    });
  }
}
