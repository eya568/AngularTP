import { Routes } from '@angular/router';
import { ContactForm } from './feautures/projects/components/contact-form/contact-form';
import { PROJECTS_ROUTES } from './feautures/projects/projects.routes';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  },
  {
    path: '',
    children: PROJECTS_ROUTES,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'contact',
    component: ContactForm
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];