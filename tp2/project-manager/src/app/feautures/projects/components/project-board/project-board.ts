import { Component, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-project-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-board.html',
  styleUrl: './project-board.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectBoardComponent implements OnInit {
  project = signal<Project | null>(null);
  isLoading = signal(true);

  // Computed signals for task statuses
  pendingTasks = computed(() => this.project()?.tasks?.filter(t => t.status === 'En attente') || []);
  inProgressTasks = computed(() => this.project()?.tasks?.filter(t => t.status === 'En cours') || []);
  completedTasks = computed(() => this.project()?.tasks?.filter(t => t.status === 'Terminé') || []);

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
}
