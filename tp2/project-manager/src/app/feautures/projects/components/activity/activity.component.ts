import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityComponent implements OnInit {
  project = signal<Project | null>(null);
  isLoading = signal(true);

  // Mock activity data
  activities = signal([
    {
      id: 1,
      type: 'created',
      message: 'Projet créé',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      id: 2,
      type: 'updated',
      message: 'Détails du projet mis à jour',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      id: 3,
      type: 'task_added',
      message: 'Nouvelle tâche ajoutée',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
    },
    {
      id: 4,
      type: 'task_completed',
      message: 'Tâche terminée',
      timestamp: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
    }
  ]);

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

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
  }

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'created': '📋',
      'updated': '✏️',
      'task_added': '➕',
      'task_completed': '✅',
      'comment': '💬'
    };
    return icons[type] || '📌';
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'à l\'instant';
    if (diffMins < 60) return `il y a ${diffMins}m`;
    if (diffHours < 24) return `il y a ${diffHours}h`;
    return `il y a ${diffDays}j`;
  }
}
