import { Routes } from '@angular/router';
import { ProjectOverviewComponent } from './components/project-overview/project-overview.component';
import { ProjectBoardComponent } from './components/project-board/project-board';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ActivityComponent } from './components/activity/activity.component';

export const PROJECT_DETAIL_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: ProjectOverviewComponent
  },
  {
    path: 'board',
    component: ProjectBoardComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent
  },
  {
    path: 'activity',
    component: ActivityComponent
  }
];
