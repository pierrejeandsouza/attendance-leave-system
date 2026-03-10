import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AttendanceTrackerComponent } from './components/attendance-tracker/attendance-tracker.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { LeaveApprovalComponent } from './components/leave-approval/leave-approval.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'employees',  component: EmployeeListComponent },
  { path: 'attendance', component: AttendanceTrackerComponent },
  { path: 'leave',      component: LeaveRequestComponent },
  { path: 'approve',    component: LeaveApprovalComponent },
  { path: '**',         redirectTo: 'dashboard' }
];
