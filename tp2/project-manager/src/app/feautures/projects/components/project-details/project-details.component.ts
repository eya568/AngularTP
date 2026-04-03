import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-project-details',
  imports: [CommonModule, TaskListComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailsComponent {
  @Input() project: any;
   getProgress(): number {
    if (!this.project?.tasks?.length) return 0;
const completed = this.project.tasks.filter((t: any) => t.status === 'Terminé').length;
    return (completed / this.project.tasks.length) * 100;
  }
}
