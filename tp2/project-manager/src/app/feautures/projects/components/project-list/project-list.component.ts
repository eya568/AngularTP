import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';    
import { TaskListComponent } from '../task-list/task-list.component';
import { ProjectDetailsComponent } from '../project-details/project-details.component'; // ✅ AJOUT
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,        
    TaskListComponent,
    ProjectDetailsComponent,
    FormsModule,
    
  ],
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent {
  selectedProject: any = null;
  searchTerm: string = ''; 
  projects = [
    {
      name: 'Projet 1',
      description: 'Description 1',
      createdAt: new Date(),
      status: 'En cours',
      tasks: [
        { title: 'Tâche 1', priority: 'Haute', status: 'En attente' },
        { title: 'Tâche 2', priority: 'Moyenne', status: 'En cours' }
      ]
    },
    {
      name: 'Projet 2',
      description: 'Description 2',
      createdAt: new Date(),
      status: 'Terminé',
      tasks: [
        { title: 'Tâche 1', priority: 'Basse', status: 'Terminé' }
      ]
    }
  ];
  selectProject(project : any){
    this.selectedProject = project;
  }
  get filteredProjects() {
  return this.projects.filter(project =>
    project.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
  
  
}

}


