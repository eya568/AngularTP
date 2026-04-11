import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, Task } from '../models/project.model';
import { TaskListComponent } from '../task-list/task-list.component';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, TaskListComponent, StatusBadgeComponent],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
  @Input() project!: Project;
  @Output() statusChanged = new EventEmitter<void>();

  getProgress(): number {
    if (!this.project.tasks?.length) return 0;
    const completedTasks = this.project.tasks.filter(task => task.status === 'Terminé').length;
    return (completedTasks / this.project.tasks.length) * 100;
  }

  @Output() notify = new EventEmitter<string>();

onStatusChanged() {
  this.statusChanged.emit();
  this.notify.emit("Statut de la tâche mis à jour");
}
}