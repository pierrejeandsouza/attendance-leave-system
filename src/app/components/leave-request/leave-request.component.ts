import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface PolicyItem {
  icon: string;
  label: string;
  days: string;
  color: string;
}

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Leave <span>Request</span></h1>
        <p>Submit a leave application for approval</p>
      </div>

      <div class="leave-layout">
        <!-- Form Card -->
        <mat-card class="form-card">
          <mat-card-header>
            <mat-card-title>New Leave Application</mat-card-title>
            <mat-card-subtitle>All fields are required</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <form [formGroup]="leaveForm" class="leave-form" (ngSubmit)="submitLeave()">

              <mat-form-field appearance="outline">
                <mat-label>Employee Name</mat-label>
                <mat-select formControlName="employee">
                  <mat-option *ngFor="let e of employees" [value]="e">{{ e }}</mat-option>
                </mat-select>
                <mat-icon matSuffix>person</mat-icon>
                <mat-error>Employee is required</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Leave Type</mat-label>
                <mat-select formControlName="leaveType">
                  <mat-option value="Sick Leave">Sick Leave</mat-option>
                  <mat-option value="Casual Leave">Casual Leave</mat-option>
                  <mat-option value="Annual Leave">Annual Leave</mat-option>
                  <mat-option value="Maternity Leave">Maternity Leave</mat-option>
                  <mat-option value="Paternity Leave">Paternity Leave</mat-option>
                  <mat-option value="Emergency Leave">Emergency Leave</mat-option>
                </mat-select>
                <mat-icon matSuffix>category</mat-icon>
                <mat-error>Leave type is required</mat-error>
              </mat-form-field>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>From Date</mat-label>
                  <input matInput [matDatepicker]="fromPicker" formControlName="fromDate" [min]="minDate">
                  <mat-datepicker-toggle matSuffix [for]="fromPicker"></mat-datepicker-toggle>
                  <mat-datepicker #fromPicker></mat-datepicker>
                  <mat-error>From date is required</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>To Date</mat-label>
                  <input matInput [matDatepicker]="toPicker" formControlName="toDate"
                         [min]="leaveForm.get('fromDate')?.value || minDate">
                  <mat-datepicker-toggle matSuffix [for]="toPicker"></mat-datepicker-toggle>
                  <mat-datepicker #toPicker></mat-datepicker>
                  <mat-error>To date is required</mat-error>
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>Reason for Leave</mat-label>
                <textarea matInput formControlName="reason" rows="4"
                          placeholder="Describe the reason for your leave…"></textarea>
                <mat-error *ngIf="leaveForm.get('reason')?.hasError('required')">Reason is required</mat-error>
                <mat-error *ngIf="leaveForm.get('reason')?.hasError('minlength')">Minimum 10 characters</mat-error>
              </mat-form-field>

              <div class="form-actions">
                <button mat-stroked-button type="button" (click)="resetForm()">
                  <mat-icon>clear</mat-icon> Clear
                </button>
                <button mat-raised-button color="primary" type="submit" [disabled]="leaveForm.invalid">
                  <mat-icon>send</mat-icon> Submit Request
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>

        <!-- Policy Card -->
        <div class="policy-column">
          <mat-card class="policy-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon class="policy-icon">policy</mat-icon>
                Leave Policy
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="policy-items">
                <div class="policy-item" *ngFor="let p of policies">
                  <div class="policy-icon-wrap" [style.background]="p.color + '22'" [style.color]="p.color">
                    <mat-icon>{{ p.icon }}</mat-icon>
                  </div>
                  <div class="policy-body">
                    <span class="policy-label">{{ p.label }}</span>
                    <span class="policy-days">{{ p.days }}</span>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="note-card">
            <mat-card-content>
              <div class="note-inner">
                <mat-icon class="note-icon">info</mat-icon>
                <p>Submit requests at least <strong>2 days in advance</strong> for planned leaves.
                   Emergency leaves can be applied on the same day.</p>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .leave-layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
      align-items: start;
    }

    @media (max-width: 860px) {
      .leave-layout { grid-template-columns: 1fr; }
    }

    /* Form */
    .leave-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-top: 8px;
    }

    .form-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .form-row mat-form-field {
      flex: 1;
      min-width: 180px;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      padding-top: 4px;
    }

    /* Policy column */
    .policy-column {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* Policy card */
    .policy-icon {
      color: #60a5fa;
      vertical-align: middle;
      margin-right: 6px;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .policy-items {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 8px;
    }

    .policy-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px;
      border-radius: 8px;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.05);
      transition: border-color 0.22s, transform 0.22s;
      animation: fadeSlideUp 0.4s ease both;
    }

    .policy-item:nth-child(1) { animation-delay: 0.1s; }
    .policy-item:nth-child(2) { animation-delay: 0.17s; }
    .policy-item:nth-child(3) { animation-delay: 0.24s; }
    .policy-item:nth-child(4) { animation-delay: 0.31s; }

    .policy-item:hover {
      border-color: rgba(255,255,255,0.1);
      transform: translateX(3px);
    }

    .policy-icon-wrap {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .policy-icon-wrap mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .policy-body {
      display: flex;
      flex-direction: column;
    }

    .policy-label {
      font-size: 0.82rem;
      font-weight: 600;
      color: #f0f4ff;
    }

    .policy-days {
      font-size: 0.72rem;
      color: #94a3b8;
    }

    /* Note card */
    .note-card mat-card-content {
      padding: 14px !important;
    }

    .note-inner {
      display: flex;
      gap: 10px;
      align-items: flex-start;
    }

    .note-icon {
      color: #cd853f;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .note-inner p {
      font-size: 0.82rem;
      color: #94a3b8;
      line-height: 1.6;
    }

    .note-inner p strong {
      color: #cd853f;
    }
  `]
})
export class LeaveRequestComponent {
  minDate = new Date();
  leaveForm: FormGroup;

  employees = [
    'Rahul Sharma', 'Priya Mehta', 'Arjun Reddy', 'Sneha Kapoor',
    'Vikram Singh', 'Anjali Nair', 'Rohit Verma', 'Meera Iyer',
    'Karthik Raj', 'Divya Krishnan'
  ];

  policies: PolicyItem[] = [
    { icon: 'local_hospital', label: 'Sick Leave',      days: '12 days / year', color: '#ff5f7e' },
    { icon: 'beach_access',   label: 'Casual Leave',    days: '8 days / year',  color: '#f5b942' },
    { icon: 'flight',         label: 'Annual Leave',    days: '15 days / year', color: '#00d4aa' },
    { icon: 'warning',        label: 'Emergency Leave', days: '3 days / year',  color: '#58a6ff' },
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.leaveForm = this.fb.group({
      employee:  ['', Validators.required],
      leaveType: ['', Validators.required],
      fromDate:  ['', Validators.required],
      toDate:    ['', Validators.required],
      reason:    ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitLeave(): void {
    if (this.leaveForm.valid) {
      this.snackBar.open('Leave request submitted successfully!', 'Close', {
        duration: 4000,
        panelClass: ['success-snack']
      });
      this.resetForm();
    }
  }

  resetForm(): void {
    this.leaveForm.reset();
  }
}
