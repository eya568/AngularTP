import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ProjectService, Project } from '../../feautures/projects/services/project.service';

export const projectResolver: ResolveFn<Project | null> = (route, state) => {
  const projectService = inject(ProjectService);
  const id = route.paramMap.get('id');

  if (!id) {
    return of(null);
  }

  return projectService.getProjectById(Number(id)).pipe(
    map(project => project || null),
    catchError((error) => {
      console.error('Error loading project:', error);
      return of(null);
    })
  );
};
