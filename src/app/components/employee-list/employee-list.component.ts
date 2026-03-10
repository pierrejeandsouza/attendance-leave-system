import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

export interface Employee {
  id: number;
  name: string;
  department: string;
  designation: string;
  email: string;
  status: 'Active' | 'Inactive';
  initials: string;
  color: string;
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Employee <span>Directory</span></h1>
        <p>All registered employees in the organization</p>
      </div>

      <!-- Stats row -->
      <div class="emp-stats-row">
        <div class="emp-stat">
          <span class="es-number">{{ employees.length }}</span>
          <span class="es-label">Total</span>
        </div>
        <div class="emp-stat active">
          <span class="es-number">{{ activeCount }}</span>
          <span class="es-label">Active</span>
        </div>
        <div class="emp-stat inactive">
          <span class="es-number">{{ inactiveCount }}</span>
          <span class="es-label">Inactive</span>
        </div>
      </div>

      <mat-card>
        <!-- Card header with search -->
        <mat-card-header class="card-header">
          <mat-card-title>All Employees</mat-card-title>
          <span class="spacer"></span>
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search</mat-label>
            <input matInput [(ngModel)]="searchText" placeholder="Name, role, department…">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
        </mat-card-header>

        <mat-card-content>
          <table mat-table [dataSource]="filteredEmployees">

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Employee</th>
              <td mat-cell *matCellDef="let e">
                <div class="emp-cell">
                  <div class="emp-avatar" [style.background]="e.color">{{ e.initials }}</div>
                  <div class="emp-info">
                    <span class="emp-name">{{ e.name }}</span>
                    <span class="emp-email">{{ e.email }}</span>
                  </div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="department">
              <th mat-header-cell *matHeaderCellDef>Department</th>
              <td mat-cell *matCellDef="let e">
                <span class="dept-tag">{{ e.department }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="designation">
              <th mat-header-cell *matHeaderCellDef>Designation</th>
              <td mat-cell *matCellDef="let e">{{ e.designation }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let e">
                <span class="status-chip"
                      [class.approved]="e.status === 'Active'"
                      [class.rejected]="e.status === 'Inactive'">
                  {{ e.status }}
                </span>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <div class="empty-state" *ngIf="filteredEmployees.length === 0">
            <mat-icon>search_off</mat-icon>
            <p>No employees match your search</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    /* Stats row */
    .emp-stats-row {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }

    .emp-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 14px 24px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 10px;
      min-width: 90px;
      transition: border-color 0.22s, transform 0.22s;
      animation: cardPop 0.5s ease both;
    }

    .emp-stat:nth-child(1) { animation-delay: 0.05s; }
    .emp-stat:nth-child(2) { animation-delay: 0.12s; }
    .emp-stat:nth-child(3) { animation-delay: 0.19s; }

    .emp-stat:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-2px); }
    .emp-stat.active { border-color: rgba(160,82,45,0.25); }
    .emp-stat.inactive { border-color: rgba(239,68,68,0.2); }

    .es-number {
      font-size: 1.6rem;
      font-weight: 700;
      color: #f0f4ff;
    }

    .emp-stat.active .es-number { color: #cd853f; }
    .emp-stat.inactive .es-number { color: #ef4444; }

    .es-label {
      font-size: 0.7rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 500;
    }

    /* Card header */
    .card-header {
      display: flex;
      align-items: center;
      padding: 16px 20px 8px !important;
      flex-wrap: wrap;
      gap: 8px;
    }

    .spacer { flex: 1; }

    .search-field {
      width: 260px;
    }

    /* Employee cell */
    .emp-cell {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 0;
    }

    .emp-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      font-weight: 700;
      color: #fff;
      flex-shrink: 0;
    }

    .emp-info {
      display: flex;
      flex-direction: column;
    }

    .emp-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: #f0f4ff;
    }

    .emp-email {
      font-size: 0.75rem;
      color: #94a3b8;
    }

    /* Dept tag */
    .dept-tag {
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 0.72rem;
      font-weight: 500;
      background: rgba(37,99,235,0.12);
      color: #60a5fa;
      border: 1px solid rgba(37,99,235,0.22);
    }

    /* Empty state */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px;
      color: #4b5563;
    }

    .empty-state mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 8px;
      color: #2563eb;
      opacity: 0.4;
    }
  `]
})
export class EmployeeListComponent {
  searchText = '';

  employees: Employee[] = [
    { id: 1,  name: 'Rahul Sharma',   department: 'Engineering',  designation: 'Software Engineer',  email: 'rahul@company.com',   status: 'Active',   initials: 'RS', color: '#00b894' },
    { id: 2,  name: 'Priya Mehta',    department: 'HR',           designation: 'HR Executive',        email: 'priya@company.com',   status: 'Active',   initials: 'PM', color: '#fd79a8' },
    { id: 3,  name: 'Arjun Reddy',    department: 'Engineering',  designation: 'Senior Developer',    email: 'arjun@company.com',   status: 'Active',   initials: 'AR', color: '#74b9ff' },
    { id: 4,  name: 'Sneha Kapoor',   department: 'Marketing',    designation: 'Marketing Manager',   email: 'sneha@company.com',   status: 'Active',   initials: 'SK', color: '#fdcb6e' },
    { id: 5,  name: 'Vikram Singh',   department: 'Finance',      designation: 'Finance Analyst',     email: 'vikram@company.com',  status: 'Active',   initials: 'VS', color: '#a29bfe' },
    { id: 6,  name: 'Anjali Nair',    department: 'Engineering',  designation: 'QA Engineer',         email: 'anjali@company.com',  status: 'Active',   initials: 'AN', color: '#55efc4' },
    { id: 7,  name: 'Rohit Verma',    department: 'Operations',   designation: 'Operations Manager',  email: 'rohit@company.com',   status: 'Inactive', initials: 'RV', color: '#636e72' },
    { id: 8,  name: 'Meera Iyer',     department: 'HR',           designation: 'Talent Acquisition',  email: 'meera@company.com',   status: 'Active',   initials: 'MI', color: '#e17055' },
    { id: 9,  name: 'Karthik Raj',    department: 'Engineering',  designation: 'Tech Lead',           email: 'karthik@company.com', status: 'Active',   initials: 'KR', color: '#00cec9' },
    { id: 10, name: 'Divya Krishnan', department: 'Marketing',    designation: 'Content Strategist',  email: 'divya@company.com',   status: 'Active',   initials: 'DK', color: '#fab1a0' },
  ];

  get activeCount(): number   { return this.employees.filter(e => e.status === 'Active').length; }
  get inactiveCount(): number { return this.employees.filter(e => e.status === 'Inactive').length; }

  get filteredEmployees(): Employee[] {
    const q = this.searchText.toLowerCase().trim();
    if (!q) return this.employees;
    return this.employees.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q) ||
      e.designation.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q)
    );
  }

  displayedColumns = ['name', 'department', 'designation', 'status'];
}
