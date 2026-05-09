import { Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { PROJECT_DETAIL_ROUTES } from './project-detail.routes';

export const PROJECTS_ROUTES: Routes = [
  {
    path: 'projects',
    component: ProjectListComponent
  },
  {
    path: 'projects/:id',
    component: ProjectDetailsComponent,
    children: PROJECT_DETAIL_ROUTES
  },
  {
    path: 'projects/:id/tasks/:taskId',
    component: TaskDetailComponent
  }
];