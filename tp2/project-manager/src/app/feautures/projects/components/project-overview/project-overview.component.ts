import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-project-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectOverviewComponent implements OnInit {
  project = signal<Project | null>(null);
  isLoading = signal(true);

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
