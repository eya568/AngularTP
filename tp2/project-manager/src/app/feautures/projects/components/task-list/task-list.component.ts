import { Component, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // ✅ Ajouter RouterModule
import { trigger, transition, style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ Ajouter RouterModule ici
  templateUrl: './task-list.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  project = signal<Project | null>(null);
  isLoading = signal(true);
  selectedPriority = signal<string>('');
  selectedStatus = signal<string>('');
  sortBy = signal<'priority' | 'status' | 'title'>('priority');

  // Computed property pour obtenir l'ID du projet
  projectId = computed(() => {
    const currentProject = this.project();
    return currentProject?.id || null;
  });

  filteredTasks = computed(() => {
    let tasks = this.project()?.tasks || [];
    const priority = this.selectedPriority();
    const status = this.selectedStatus();
    const sort = this.sortBy();
    
    if (priority) {
      tasks = tasks.filter(task => task.priority === priority);
    }
    
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    
    return this.sortTasks(tasks, sort);
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  goToTaskComments(taskId: number): void {
    const projectId = this.projectId();
    if (projectId) {
      this.router.navigate(['/projects', projectId, 'tasks', taskId], {
        fragment: 'comments'
      });
    }
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.projectService.getProjectById(Number(id)).subscribe(proj => {
          this.project.set(proj || null);
          this.isLoading.set(false);
        });
      }
    });

    this.route.queryParamMap.subscribe(queryParams => {
      const sortParam = queryParams.get('sort');
      const statusParam = queryParams.get('status');
      const priorityParam = queryParams.get('priority');
      
      if (sortParam === 'priority' || sortParam === 'status' || sortParam === 'title') {
        this.sortBy.set(sortParam);
      }
      
      if (statusParam) {
        this.selectedStatus.set(statusParam);
      }
      
      if (priorityParam) {
        this.selectedPriority.set(priorityParam);
      }
    });
  }

  private sortTasks(tasks: any[], sortBy: string): any[] {
    const sorted = [...tasks];
    
    switch (sortBy) {
      case 'priority':
        const priorityOrder: Record<string, number> = { 'Haute': 0, 'Moyenne': 1, 'Basse': 2 };
        return sorted.sort((a, b) => {
          const orderA = priorityOrder[a.priority as string] || 3;
          const orderB = priorityOrder[b.priority as string] || 3;
          return orderA - orderB;
        });
      
      case 'status':
        const statusOrder: Record<string, number> = { 'En attente': 0, 'En cours': 1, 'Terminé': 2 };
        return sorted.sort((a, b) => {
          const orderA = statusOrder[a.status as string] || 3;
          const orderB = statusOrder[b.status as string] || 3;
          return orderA - orderB;
        });
      
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title, 'fr'));
      
      default:
        return sorted;
    }
  }

  changeStatus(task: any): void {
    task.status = task.status === 'Terminé' ? 'En cours' : 'Terminé';
  }

  updateQueryParams(): void {
    const queryParams: any = {};
    
    if (this.sortBy() !== 'priority') {
      queryParams.sort = this.sortBy();
    }
    
    if (this.selectedStatus()) {
      queryParams.status = this.selectedStatus();
    }
    
    if (this.selectedPriority()) {
      queryParams.priority = this.selectedPriority();
    }
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }
}