import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService, Task } from '../../services/project.service';
import { CommentFormComponent } from '../comment-form/comment-form.component';
@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule,CommentFormComponent],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent implements OnInit {
  task = signal<Task | null>(null);
  projectId = signal<number | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectId = params.get('id');
      const taskId = params.get('taskId');
      
      if (projectId && taskId) {
        this.projectId.set(Number(projectId));
        this.loadTask(Number(projectId), Number(taskId));
      }
    });

    // Handle fragment navigation for comments section
    this.route.fragment.subscribe(fragment => {
      if (fragment === 'comments') {
        this.scrollToComments();
      }
    });
  }

  private loadTask(projectId: number, taskId: number): void {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.projectService.getTaskById(projectId, taskId).subscribe({
      next: (task) => {
        if (task) {
          this.task.set(task);
        } else {
          this.error.set('Tâche non trouvée');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Erreur lors du chargement de la tâche');
        this.isLoading.set(false);
      }
    });
  }

  private scrollToComments(): void {
    // Use setTimeout to ensure DOM is updated
    setTimeout(() => {
      const commentsSection = document.getElementById('comments-section');
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  navigateToComments(): void {
    const projId = this.projectId();
    const taskId = this.task()?.id;
    if (projId && taskId) {
      this.router.navigate(
        ['/projects', projId, 'tasks', taskId],
        { fragment: 'comments' }
      );
    }
  }

  goBack(): void {
    const projId = this.projectId();
    if (projId) {
      this.router.navigate(['/projects', projId, 'board']);
    }
  }

  goToBoard(): void {
    const projId = this.projectId();
    if (projId) {
      this.router.navigate(['/projects', projId, 'board']);
    }
  }

  getPriorityColor(): string {
    const t = this.task();
    if (!t) return 'gray';
    switch (t.priority) {
      case 'Haute': return 'red';
      case 'Moyenne': return 'yellow';
      case 'Basse': return 'green';
      default: return 'gray';
    }
  }

  getStatusColor(): string {
    const t = this.task();
    if (!t) return 'gray';
    switch (t.status) {
      case 'Terminé': return 'green';
      case 'En cours': return 'blue';
      case 'En attente': return 'gray';
      default: return 'gray';
    }
  }
}
