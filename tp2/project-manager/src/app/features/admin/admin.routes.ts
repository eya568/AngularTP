import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminProjectsComponent } from './components/admin-projects/admin-projects.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboardComponent
  },
  {
    path: 'projects',
    component: AdminProjectsComponent
  },
  {
    path: 'users',
    component: AdminUsersComponent
  }
];
