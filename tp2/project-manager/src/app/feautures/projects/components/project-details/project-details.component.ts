import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, RouterOutlet],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailsComponent implements OnInit {
  project = signal<Project | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);
  activeTab = signal<string>('overview');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProject(Number(id));
      }
    });

    // Subscribe to route changes to update active tab
    this.route.url.subscribe(url => {
      if (url.length > 0) {
        this.activeTab.set(url[0].path);
      }
    });
  }

  private loadProject(id: number): void {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.projectService.getProjectById(id).subscribe({
      next: (project) => {
        if (project) {
          this.project.set(project);
        } else {
          this.error.set('Projet non trouvé');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Erreur lors du chargement du projet');
        this.isLoading.set(false);
      }
    });
  }

  getProgress(): number {
    const proj = this.project();
    if (!proj?.tasks?.length) return 0;
    const completedTasks = proj.tasks.filter(task => task.status === 'Terminé').length;
    return (completedTasks / proj.tasks.length) * 100;
  }

  onStatusChanged(): void {
    console.log('Task status changed');
  }

  navigateToTab(tab: string): void {
    const projectId = this.project()?.id;
    if (projectId) {
      this.router.navigate(['/projects', projectId, tab]);
    }
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }
}