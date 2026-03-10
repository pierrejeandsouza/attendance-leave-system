import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

interface RecentActivity {
  employee: string;
  action: string;
  time: string;
  icon: string;
  colorClass: string;
}

interface QuickAction {
  label: string;
  icon: string;
  route: string;
  colorClass: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  template: `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header">
        <h1>Dashboard <span>Overview</span></h1>
        <p>Welcome back, HR Admin — here's today at a glance</p>
      </div>

      <!-- Stat Cards -->
      <div class="stat-cards">
        <mat-card class="stat-card primary">
          <mat-card-content>
            <div class="stat-number">24</div>
            <div class="stat-label">Total Employees</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">people</mat-icon>
        </mat-card>

        <mat-card class="stat-card success">
          <mat-card-content>
            <div class="stat-number">19</div>
            <div class="stat-label">Present Today</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">check_circle</mat-icon>
        </mat-card>

        <mat-card class="stat-card warn">
          <mat-card-content>
            <div class="stat-number">5</div>
            <div class="stat-label">Absent Today</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">cancel</mat-icon>
        </mat-card>

        <mat-card class="stat-card accent">
          <mat-card-content>
            <div class="stat-number">3</div>
            <div class="stat-label">Pending Leaves</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">event_note</mat-icon>
        </mat-card>
      </div>

      <!-- Attendance Bar -->
      <mat-card class="att-bar-card">
        <mat-card-content>
          <div class="att-bar-header">
            <span class="att-bar-title">Today's Attendance Rate</span>
            <span class="att-bar-pct">79%</span>
          </div>
          <div class="att-bar-track">
            <div class="att-bar-fill" style="width: 79%"></div>
          </div>
          <div class="att-bar-labels">
            <span class="present-label">19 Present</span>
            <span class="absent-label">5 Absent</span>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Grid: Quick Actions + Recent Activity -->
      <div class="dashboard-grid">
        <!-- Quick Actions -->
        <mat-card class="quick-card">
          <mat-card-header>
            <mat-card-title>Quick Actions</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="quick-actions">
              <a class="qa-btn qa-teal" routerLink="/attendance">
                <div class="qa-icon"><mat-icon>check_circle</mat-icon></div>
                <div class="qa-text">
                  <span class="qa-label">Mark Attendance</span>
                  <span class="qa-sub">Log daily presence</span>
                </div>
                <mat-icon class="qa-arrow">chevron_right</mat-icon>
              </a>
              <a class="qa-btn qa-gold" routerLink="/leave">
                <div class="qa-icon"><mat-icon>event_note</mat-icon></div>
                <div class="qa-text">
                  <span class="qa-label">Apply for Leave</span>
                  <span class="qa-sub">Submit a request</span>
                </div>
                <mat-icon class="qa-arrow">chevron_right</mat-icon>
              </a>
              <a class="qa-btn qa-blue" routerLink="/approve">
                <div class="qa-icon"><mat-icon>how_to_reg</mat-icon></div>
                <div class="qa-text">
                  <span class="qa-label">Review Requests</span>
                  <span class="qa-sub">3 pending approvals</span>
                </div>
                <mat-icon class="qa-arrow">chevron_right</mat-icon>
              </a>
              <a class="qa-btn qa-rose" routerLink="/employees">
                <div class="qa-icon"><mat-icon>people</mat-icon></div>
                <div class="qa-text">
                  <span class="qa-label">View Employees</span>
                  <span class="qa-sub">24 total members</span>
                </div>
                <mat-icon class="qa-arrow">chevron_right</mat-icon>
              </a>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Recent Activity -->
        <mat-card class="activity-card">
          <mat-card-header>
            <mat-card-title>Recent Activity</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="activity-list">
              <div class="activity-item" *ngFor="let activity of recentActivities">
                <div class="activity-icon" [class]="'ai-' + activity.colorClass">
                  <mat-icon>{{ activity.icon }}</mat-icon>
                </div>
                <div class="activity-body">
                  <div class="activity-employee">{{ activity.employee }}</div>
                  <div class="activity-action">{{ activity.action }}</div>
                </div>
                <div class="activity-time">{{ activity.time }}</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    /* Attendance bar */
    .att-bar-card {
      margin-bottom: 24px;
      animation: fadeSlideUp 0.5s ease 0.3s both;
    }

    .att-bar-card mat-card-content {
      padding: 16px 20px !important;
    }

    .att-bar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .att-bar-title {
      font-size: 0.85rem;
      font-weight: 500;
      color: #94a3b8;
    }

    .att-bar-pct {
      font-size: 1.1rem;
      font-weight: 700;
      color: #cd853f;
    }

    .att-bar-track {
      height: 8px;
      background: rgba(255,255,255,0.05);
      border-radius: 4px;
      overflow: hidden;
    }

    .att-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #a0522d, #cd853f);
      border-radius: 4px;
      animation: barGrow 1.2s cubic-bezier(0.4,0,0.2,1) 0.6s both;
      box-shadow: 0 0 8px rgba(160,82,45,0.4);
    }

    .att-bar-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
    }

    .present-label { font-size: 0.78rem; color: #22c55e; font-weight: 500; }
    .absent-label  { font-size: 0.78rem; color: #ef4444; font-weight: 500; }

    /* Grid */
    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    @media (max-width: 768px) {
      .dashboard-grid { grid-template-columns: 1fr; }
    }

    /* Quick Actions */
    .quick-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 8px;
    }

    .qa-btn {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 14px;
      border-radius: 10px;
      text-decoration: none;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      cursor: pointer;
      transition: all 0.22s ease;
    }

    .qa-btn:hover {
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,255,255,0.12);
      transform: translateX(4px) translateY(-1px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }

    .qa-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .qa-icon mat-icon { font-size: 18px; width: 18px; height: 18px; }

    /* Brown, midnight, slate, danger accent variants */
    .qa-teal .qa-icon { background: rgba(160,82,45,0.15); color: #cd853f; }
    .qa-gold .qa-icon { background: rgba(245,158,11,0.15); color: #f59e0b; }
    .qa-blue .qa-icon { background: rgba(37,99,235,0.15);  color: #60a5fa; }
    .qa-rose .qa-icon { background: rgba(239,68,68,0.15);  color: #f87171; }

    .qa-teal:hover { border-color: rgba(160,82,45,0.3) !important;  box-shadow: 0 4px 20px rgba(160,82,45,0.12) !important; }
    .qa-gold:hover { border-color: rgba(245,158,11,0.3) !important; box-shadow: 0 4px 20px rgba(245,158,11,0.10) !important; }
    .qa-blue:hover { border-color: rgba(37,99,235,0.3) !important;  box-shadow: 0 4px 20px rgba(37,99,235,0.12) !important; }
    .qa-rose:hover { border-color: rgba(239,68,68,0.3) !important;  box-shadow: 0 4px 20px rgba(239,68,68,0.10) !important; }

    .qa-text {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .qa-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #f0f4ff;
    }

    .qa-sub {
      font-size: 0.75rem;
      color: #94a3b8;
    }

    .qa-arrow {
      color: #4b5563;
      font-size: 18px !important;
      width: 18px !important;
      height: 18px !important;
      transition: transform 0.2s ease, color 0.2s ease;
    }

    .qa-btn:hover .qa-arrow {
      transform: translateX(3px);
      color: #94a3b8;
    }

    /* Activity list */
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding-top: 8px;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 8px;
      border-radius: 8px;
      transition: background 0.18s ease;
      animation: rowIn 0.35s ease both;
    }

    .activity-item:nth-child(1) { animation-delay: 0.4s; }
    .activity-item:nth-child(2) { animation-delay: 0.48s; }
    .activity-item:nth-child(3) { animation-delay: 0.56s; }
    .activity-item:nth-child(4) { animation-delay: 0.64s; }
    .activity-item:nth-child(5) { animation-delay: 0.72s; }

    .activity-item:hover {
      background: rgba(255,255,255,0.03);
    }

    .activity-icon {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .activity-icon mat-icon { font-size: 16px; width: 16px; height: 16px; }

    .ai-teal  { background: rgba(160,82,45,0.15);  color: #cd853f; }
    .ai-gold  { background: rgba(245,158,11,0.15); color: #f59e0b; }
    .ai-blue  { background: rgba(37,99,235,0.15);  color: #60a5fa; }
    .ai-rose  { background: rgba(239,68,68,0.15);  color: #f87171; }

    .activity-body {
      flex: 1;
    }

    .activity-employee {
      font-size: 0.85rem;
      font-weight: 600;
      color: #f0f4ff;
    }

    .activity-action {
      font-size: 0.75rem;
      color: #94a3b8;
    }

    .activity-time {
      font-size: 0.7rem;
      color: #4b5563;
      white-space: nowrap;
    }
  `]
})
export class DashboardComponent {
  recentActivities: RecentActivity[] = [
    { employee: 'Rahul Sharma',  action: 'Marked Present',     time: 'Today 9:05 AM',  icon: 'check_circle',  colorClass: 'teal' },
    { employee: 'Priya Mehta',   action: 'Applied for Leave',  time: 'Today 10:20 AM', icon: 'event_note',    colorClass: 'gold' },
    { employee: 'Arjun Reddy',   action: 'Leave Approved',     time: 'Yesterday',      icon: 'how_to_reg',    colorClass: 'blue' },
    { employee: 'Sneha Kapoor',  action: 'Marked Absent',      time: 'Today 9:00 AM',  icon: 'cancel',        colorClass: 'rose' },
    { employee: 'Vikram Singh',  action: 'Applied for Leave',  time: 'Yesterday',      icon: 'event_note',    colorClass: 'gold' },
  ];
}
