import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  @Input() projects: any[] = [];

  get totalProjects(): number {
    return this.projects.length;
  }

  get totalTasks(): number {
    return this.projects.reduce((sum, p) => sum + (p.tasks?.length || 0), 0);
  }

  get completedTasks(): number {
    return this.projects.reduce(
      (sum, p) =>
        sum + (p.tasks?.filter((t: any) => t.status === 'Terminé').length || 0),
      0
    );
  }

  get globalProgress(): number {
    if (this.totalTasks === 0) return 0;
    return (this.completedTasks / this.totalTasks) * 100;
  }
}