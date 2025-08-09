import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MemberListComponent } from './admin/member-list/member-list.component';
import { PaymentsComponent } from './admin/payments/payments.component';
import { AttendanceComponent } from './admin/attendance/attendance.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['member'] },
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'members', component: MemberListComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
