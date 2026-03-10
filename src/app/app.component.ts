import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgFor,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav">

        <!-- Logo / Brand -->
        <div class="sidenav-brand">
          <div class="brand-logo">
            <mat-icon>fingerprint</mat-icon>
          </div>
          <div class="brand-text">
            <span class="brand-title">AttendEase</span>
            <span class="brand-sub">Management Suite</span>
          </div>
        </div>

        <!-- Nav label -->
        <div class="nav-section-label">Main Menu</div>

        <mat-nav-list class="nav-list">
          <a mat-list-item
             *ngFor="let item of navItems"
             [routerLink]="item.route"
             routerLinkActive="active-link"
             class="nav-item">
            <div class="nav-item-inner">
              <div class="nav-icon-wrap">
                <mat-icon>{{ item.icon }}</mat-icon>
              </div>
              <span class="nav-label">{{ item.label }}</span>
            </div>
          </a>
        </mat-nav-list>

        <!-- Sidebar Footer -->
        <div class="sidenav-footer">
          <div class="user-chip">
            <div class="user-avatar">HR</div>
            <div class="user-info">
              <span class="user-name">HR Admin</span>
              <span class="user-role">Administrator</span>
            </div>
          </div>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="main-content-wrap">
        <!-- Top bar -->
        <header class="app-topbar">
          <button mat-icon-button (click)="sidenav.toggle()" class="menu-btn" aria-label="Toggle menu">
            <mat-icon>menu</mat-icon>
          </button>
          <div class="topbar-center">
            <span class="topbar-title">Employee Attendance &amp; Leave Management</span>
          </div>
          <div class="topbar-actions">
            <button mat-icon-button matTooltip="Notifications" class="icon-btn">
              <mat-icon>notifications_none</mat-icon>
            </button>
            <button mat-icon-button matTooltip="Settings" class="icon-btn">
              <mat-icon>settings</mat-icon>
            </button>
          </div>
        </header>

        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    /* ── Layout ── */
    .sidenav-container {
      height: 100vh;
      background: #0a0e1a;
    }

    /* ── Sidenav ── */
    .sidenav {
      width: 256px;
      background: #111827;
      border-right: 1px solid rgba(37,99,235,0.12) !important;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* Brand */
    .sidenav-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 24px 20px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      margin-bottom: 12px;
    }

    .brand-logo {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: linear-gradient(135deg, #a0522d, #cd853f);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px rgba(160,82,45,0.4);
      flex-shrink: 0;
      transition: box-shadow 0.22s ease;
    }

    .brand-logo:hover {
      box-shadow: 0 0 28px rgba(205,133,63,0.5);
    }

    .brand-logo mat-icon {
      color: #fff;
      font-size: 22px;
      width: 22px;
      height: 22px;
    }

    .brand-text {
      display: flex;
      flex-direction: column;
    }

    .brand-title {
      font-size: 1rem;
      font-weight: 700;
      color: #f0f4ff;
      letter-spacing: -0.2px;
    }

    .brand-sub {
      font-size: 0.68rem;
      color: #94a3b8;
      font-weight: 400;
    }

    /* Nav section label */
    .nav-section-label {
      padding: 4px 20px 8px;
      font-size: 0.65rem;
      font-weight: 700;
      color: #4b5563;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* Nav list */
    .nav-list {
      flex: 1;
      padding: 0 10px !important;
    }

    .nav-item {
      border-radius: 10px !important;
      margin-bottom: 2px !important;
      height: 48px !important;
      transition: background 0.2s ease !important;
    }

    .nav-item:hover {
      background: rgba(255,255,255,0.05) !important;
    }

    .nav-item.active-link {
      background: rgba(160,82,45,0.14) !important;
    }

    .nav-item.active-link .nav-icon-wrap {
      background: rgba(160,82,45,0.22);
    }

    .nav-item.active-link .nav-icon-wrap mat-icon {
      color: #cd853f;
    }

    .nav-item.active-link .nav-label {
      color: #cd853f;
      font-weight: 600;
    }

    .nav-item-inner {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      height: 100%;
    }

    .nav-icon-wrap {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.04);
      transition: background 0.2s ease;
    }

    .nav-icon-wrap mat-icon {
      color: #94a3b8;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .nav-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #94a3b8;
      transition: color 0.2s ease;
    }

    /* Sidebar Footer */
    .sidenav-footer {
      padding: 16px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }

    .user-chip {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-radius: 10px;
      background: rgba(255,255,255,0.04);
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .user-chip:hover {
      background: rgba(160,82,45,0.10);
    }

    .user-avatar {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: linear-gradient(135deg, #1e3a5f, #2563eb);
      color: #f0f4ff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-weight: 700;
      border: 1px solid rgba(37,99,235,0.3);
      flex-shrink: 0;
    }

    .user-info {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-size: 0.82rem;
      font-weight: 600;
      color: #f0f4ff;
    }

    .user-role {
      font-size: 0.7rem;
      color: #94a3b8;
    }

    /* ── Top bar ── */
    .app-topbar {
      height: 60px;
      background: rgba(17, 24, 39, 0.96);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(37,99,235,0.12);
      display: flex;
      align-items: center;
      padding: 0 16px;
      position: sticky;
      top: 0;
      z-index: 100;
      gap: 12px;
    }

    .menu-btn {
      color: #94a3b8 !important;
      transition: color 0.2s ease !important;
    }

    .menu-btn:hover {
      color: #f0f4ff !important;
    }

    .topbar-center {
      flex: 1;
      padding-left: 4px;
    }

    .topbar-title {
      font-size: 0.9rem;
      font-weight: 500;
      color: #f0f4ff;
    }

    .topbar-actions {
      display: flex;
      gap: 4px;
    }

    .icon-btn {
      color: #94a3b8 !important;
      transition: color 0.2s ease !important;
    }

    .icon-btn:hover {
      color: #cd853f !important;
    }

    /* ── Main content ── */
    .main-content-wrap {
      background: #0a0e1a !important;
    }

    .content {
      min-height: calc(100vh - 60px);
      background: #0a0e1a;
    }
  `]
})
export class AppComponent {
  navItems: NavItem[] = [
    { label: 'Dashboard',          icon: 'dashboard',    route: '/dashboard'  },
    { label: 'Employee List',      icon: 'people',       route: '/employees'  },
    { label: 'Attendance Tracker', icon: 'check_circle', route: '/attendance' },
    { label: 'Leave Request',      icon: 'event_note',   route: '/leave'      },
    { label: 'Leave Approval',     icon: 'how_to_reg',   route: '/approve'    },
  ];
}
