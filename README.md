# Employee Attendance & Leave Management System
**Project 23 — Angular 18 · Standalone Components · Angular Material**

---

## How to Run

```bash
ng serve
```
Open → **http://localhost:4200**

---

## Project Structure

```
src/app/
├── app.component.ts            ← Shell (Sidenav + Toolbar)
├── app.config.ts               ← provideRouter + provideAnimationsAsync
├── app.routes.ts               ← All 5 routes
└── components/
    ├── dashboard/              → /dashboard
    ├── employee-list/          → /employees
    ├── attendance-tracker/     → /attendance
    ├── leave-request/          → /leave
    └── leave-approval/         → /approve
```

---

## Routes

| URL | Component |
|---|---|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | DashboardComponent |
| `/employees` | EmployeeListComponent |
| `/attendance` | AttendanceTrackerComponent |
| `/leave` | LeaveRequestComponent |
| `/approve` | LeaveApprovalComponent |

---

## Components

### Dashboard `/dashboard`
Stat cards (Total Employees, Present, Absent, Pending Leaves), Quick Action buttons, Recent Activity list.

### Employee List `/employees`
Searchable `mat-table` of 10 mock employees with department, designation, email, and status.

### Attendance Tracker `/attendance`
Slide-toggle per employee to mark Present/Absent. Auto-records check-in time. Save button with snackbar.

### Leave Request `/leave`
Reactive Form — Employee, Leave Type, From/To Date (datepicker), Reason. Full validation. Leave Policy card.

### Leave Approval `/approve`
Tabbed view (Pending / All). One-click Approve ✅ / Reject ❌. Status badges update in real time.

---

## Angular Concepts Demonstrated

| Concept | Where |
|---|---|
| Standalone Components | All components (no NgModule) |
| `provideRouter` | `app.config.ts` |
| RouterLink / RouterLinkActive | Sidenav navigation |
| `<router-outlet>` | `app.component.ts` |
| Reactive Forms + Validators | `leave-request.component.ts` |
| Angular Material | Throughout all components |

---

## Tech Stack
- **Angular 18** (Standalone API)
- **Angular Material 18** (Indigo-Pink theme)
- **TypeScript 5.4**
- **Reactive Forms**
- **Angular Router**
