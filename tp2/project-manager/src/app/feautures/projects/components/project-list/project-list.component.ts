import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';      // ✅ AJOUT
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,        
    TaskListComponent
  ],
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent {

  projects = [
    {
      name: 'Projet 1',
      description: 'Description 1',
      status: 'En cours',
      tasks: [
        { title: 'Tâche 1', priority: 'Haute', status: 'En attente' },
        { title: 'Tâche 2', priority: 'Moyenne', status: 'En cours' }
      ]
    },
    {
      name: 'Projet 2',
      description: 'Description 2',
      status: 'Terminé',
      tasks: [
        { title: 'Tâche 1', priority: 'Basse', status: 'Terminé' }
      ]
    }
  ];
}


