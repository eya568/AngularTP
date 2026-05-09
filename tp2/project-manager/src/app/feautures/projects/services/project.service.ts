import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  status: 'En cours' | 'Terminé' | 'En attente';
  tasks?: Task[];
  progress?: number;
}

export interface Task {
  id: number;
  title: string;
  priority: 'Haute' | 'Moyenne' | 'Basse';
  status: 'En attente' | 'En cours' | 'Terminé';
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 1,
      name: 'Projet 1',
      description: 'Description détaillée du Projet 1',
      createdAt: new Date('2024-01-15'),
      status: 'En cours',
      progress: 65,
      tasks: [
        { id: 1, title: 'Tâche 1', priority: 'Haute', status: 'Terminé' },
        { id: 2, title: 'Tâche 2', priority: 'Moyenne', status: 'En cours' },
        { id: 3, title: 'Tâche 3', priority: 'Basse', status: 'En attente' }
      ]
    },
    {
      id: 2,
      name: 'Projet 2',
      description: 'Description détaillée du Projet 2',
      createdAt: new Date('2024-02-10'),
      status: 'Terminé',
      progress: 100,
      tasks: [
        { id: 1, title: 'Tâche 1', priority: 'Basse', status: 'Terminé' },
        { id: 2, title: 'Tâche 2', priority: 'Moyenne', status: 'Terminé' }
      ]
    },
    {
      id: 3,
      name: 'Projet 3',
      description: 'Description détaillée du Projet 3',
      createdAt: new Date('2024-03-05'),
      status: 'En attente',
      progress: 0,
      tasks: [
        { id: 1, title: 'Tâche 1', priority: 'Haute', status: 'En attente' }
      ]
    }
  ];

  constructor() {}

  /**
   * Get all projects
   */
  getAllProjects(): Observable<Project[]> {
    return of([...this.projects]).pipe(delay(300));
  }

  /**
   * Get project by ID
   */
  getProjectById(id: number | string): Observable<Project | undefined> {
    const projectId = Number(id);
    const project = this.projects.find(p => p.id === projectId);
    return of(project).pipe(delay(300));
  }

  /**
   * Get task by ID within a project
   */
  getTaskById(projectId: number | string, taskId: number | string): Observable<Task | undefined> {
    const projId = Number(projectId);
    const taskIdNum = Number(taskId);
    const project = this.projects.find(p => p.id === projId);
    const task = project?.tasks?.find(t => t.id === taskIdNum);
    return of(task).pipe(delay(300));
  }

  /**
   * Get all tasks for a project
   */
  getProjectTasks(projectId: number | string): Observable<Task[]> {
    const project = this.projects.find(p => p.id === Number(projectId));
    return of(project?.tasks || []).pipe(delay(300));
  }

  /**
   * Update project
   */
  updateProject(id: number, updates: Partial<Project>): Observable<Project | undefined> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      this.projects[index] = { ...this.projects[index], ...updates };
      return of(this.projects[index]).pipe(delay(300));
    }
    return of(undefined).pipe(delay(300));
  }

  /**
   * Delete project
   */
  deleteProject(id: number): Observable<boolean> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      this.projects.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  /**
   * Create new project
   */
  createProject(project: Omit<Project, 'id'>): Observable<Project> {
    const newProject: Project = {
      ...project,
      id: Math.max(...this.projects.map(p => p.id), 0) + 1
    };
    this.projects.push(newProject);
    return of(newProject).pipe(delay(300));
  }
}
