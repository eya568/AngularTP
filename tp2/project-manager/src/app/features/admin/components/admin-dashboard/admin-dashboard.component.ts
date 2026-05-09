import { Component, ChangeDetectionStrategy, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../../../feautures/projects/services/project.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent implements OnInit {
  projects = signal<any[]>([]);
  isLoading = signal(true);

  stats = computed(() => {
    const allProjects = this.projects();
    const totalTasks = allProjects.reduce((sum, p) => sum + (p.tasks?.length || 0), 0);
    const completedTasks = allProjects.reduce((sum, p) => 
      sum + (p.tasks?.filter((t: any) => t.status === 'Terminé').length || 0), 0);
    const inProgressTasks = totalTasks - completedTasks;

    return [
      { label: 'Projets totaux', value: allProjects.length, icon: '📊' },
      { label: 'Utilisateurs', value: 156, icon: '👥' },
      { label: 'Tâches complétées', value: completedTasks, icon: '✅' },
      { label: 'Tâches en cours', value: inProgressTasks, icon: '⚙️' }
    ];
  });

  recentActivities = [
    { id: 1, action: 'Nouveau projet créé', timestamp: '2 heures' },
    { id: 2, action: 'Utilisateur inscrit', timestamp: '5 heures' },
    { id: 3, action: 'Projet supprimé', timestamp: '1 jour' }
  ];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects.set(projects);
      this.isLoading.set(false);
    });
  }
}
