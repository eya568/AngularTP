import { Component, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../../feautures/projects/services/project.service';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminProjectsComponent implements OnInit {
  projects = signal<any[]>([]);
  isLoading = signal(true);

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects.set(projects);
      this.isLoading.set(false);
    });
  }
}
