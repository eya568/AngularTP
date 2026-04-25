import { Routes } from '@angular/router';
import { ProjectListComponent } from './feautures/projects/components/project-list/project-list.component';
import { ContactForm } from './feautures/projects/components/contact-form/contact-form';

export const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: 'contact', component: ContactForm },
];
