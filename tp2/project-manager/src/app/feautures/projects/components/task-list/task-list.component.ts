import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {

  @Input() tasks: any[] = [];

  getColor(status: string): string {
  switch (status) {
    case 'En attente':
      return 'border-yellow-400 bg-yellow-50';
    case 'En cours':
      return 'border-blue-400 bg-blue-50';
    case 'Terminé':
      return 'border-green-400 bg-green-50';
    default:
      return 'border-gray-400 bg-gray-50';
  }
}

  
}






